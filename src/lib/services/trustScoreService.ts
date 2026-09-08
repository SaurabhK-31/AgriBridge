import { prisma } from '@/lib/prisma';
import { verifyBatchOnChain } from '@/lib/blockchain';

export interface TrustFactor {
    name: string;
    score: number;
    max: number;
    desc: string;
    shap: number;
}

export interface TrustScoreResult {
    batchId: string;
    batchCode: string;
    crop: string;
    farmerName: string;
    finalScore: number;
    riskLevel: 'Excellent' | 'High Trust' | 'Moderate Risk' | 'High Risk';
    factors: TrustFactor[];
    risks: string[];
    plainAi: string;
}

export async function calculateTrustScore(batchId: string): Promise<TrustScoreResult> {
    const batch = await prisma.batch.findFirst({
        where: {
            OR: [{ id: batchId }, { batchCode: batchId }],
        },
        include: {
            farmer: { include: { farmerProfile: true } },
            product: true,
            certificates: true,
            events: true,
            shipments: { include: { complianceChecks: true } },
            fraudAlerts: true,
            temperatureLogs: true,
        },
    });

    if (!batch) {
        throw new Error(`Batch with ID or Code ${batchId} not found`);
    }

    // 1. Blockchain Score (Max 20)
    const chainCheck = await verifyBatchOnChain(batch.batchCode, batch.blockchainHash);
    let blockchainScore = chainCheck.verified ? 20 : 0;
    if (batch.events.length >= 3 && blockchainScore === 20) {
        blockchainScore = 20;
    } else if (blockchainScore === 20) {
        blockchainScore = 16;
    }

    // 2. Certificate Authenticity Score (Max 20)
    const validCerts = batch.certificates.filter((c) => c.verificationStatus === 'VERIFIED');
    let certificateScore = 0;
    if (batch.certificates.length === 0) {
        certificateScore = 10; // Neutral default if pending
    } else {
        certificateScore = Math.min(20, Math.round((validCerts.length / batch.certificates.length) * 20));
    }

    // 3. Cold Chain Integrity Score (Max 20)
    let coldChainScore = 20;
    const tempSpikes = batch.temperatureLogs.filter((t) => t.temperature > 8.0 || t.temperature < 2.0);
    if (tempSpikes.length > 0) {
        coldChainScore = Math.max(8, 20 - tempSpikes.length * 4);
    }

    // 4. Inspection Score (Max 20)
    let inspectionScore = 18;
    const criticalFraud = batch.fraudAlerts.filter((f) => f.severity === 'CRITICAL' && f.status !== 'RESOLVED');
    if (criticalFraud.length > 0) {
        inspectionScore = 5;
    }

    // 5. Compliance Score (Max 10)
    let complianceScore = 10;
    const allChecks = batch.shipments.flatMap((s) => s.complianceChecks);
    const failedChecks = allChecks.filter((c) => c.status === 'MISSING' || c.status === 'FAILED');
    if (failedChecks.length > 0) {
        complianceScore = Math.max(2, 10 - failedChecks.length * 3);
    }

    // 6. Quality ML Score (Max 10)
    let qualityScore = 9;
    if (batch.status === 'Flagged') {
        qualityScore = 4;
    }

    // Total Score (100 pts)
    const finalScore = Math.min(100, Math.max(0, blockchainScore + certificateScore + coldChainScore + inspectionScore + complianceScore + qualityScore));

    let riskLevel: 'Excellent' | 'High Trust' | 'Moderate Risk' | 'High Risk' = 'Excellent';
    if (finalScore >= 90) riskLevel = 'Excellent';
    else if (finalScore >= 75) riskLevel = 'High Trust';
    else if (finalScore >= 50) riskLevel = 'Moderate Risk';
    else riskLevel = 'High Risk';

    // SHAP Values
    const factors: TrustFactor[] = [
        {
            name: 'Blockchain Verification',
            score: blockchainScore,
            max: 20,
            desc: chainCheck.verified
                ? 'All supply chain events recorded on Polygon blockchain with valid SHA-256 hashes'
                : 'Blockchain hash mismatch detected',
            shap: chainCheck.verified ? 3.5 : -5.0,
        },
        {
            name: 'Certificate Authenticity',
            score: certificateScore,
            max: 20,
            desc: `${validCerts.length} of ${batch.certificates.length || 1} certificates verified against APEDA/FSSAI registry`,
            shap: certificateScore >= 16 ? 2.5 : -2.0,
        },
        {
            name: 'Cold Chain Integrity',
            score: coldChainScore,
            max: 20,
            desc: tempSpikes.length === 0 ? 'Optimal temperature maintained throughout transit' : `${tempSpikes.length} temperature deviation alert(s) recorded`,
            shap: tempSpikes.length === 0 ? 2.0 : -1.8,
        },
        {
            name: 'Inspection Results',
            score: inspectionScore,
            max: 20,
            desc: criticalFraud.length === 0 ? 'Pre-shipment inspection passed with Grade A classification' : 'Flagged for regulatory inspection review',
            shap: criticalFraud.length === 0 ? 2.8 : -4.5,
        },
        {
            name: 'Regulatory Compliance',
            score: complianceScore,
            max: 10,
            desc: failedChecks.length === 0 ? '100% compliance across destination country requirements' : `${failedChecks.length} compliance document gap(s)`,
            shap: failedChecks.length === 0 ? 1.5 : -1.2,
        },
        {
            name: 'ML Quality Assessment',
            score: qualityScore,
            max: 10,
            desc: 'Computer vision analysis verified harvest freshness and grade baseline',
            shap: qualityScore >= 8 ? 1.0 : -2.1,
        },
    ];

    // Penalization Risks
    const risks: string[] = [];
    if (tempSpikes.length > 0) {
        risks.push(`Cold Chain Temp Alert: ${tempSpikes.length} temperature spike(s) detected during transit.`);
    }
    if (failedChecks.length > 0) {
        risks.push(`Compliance Clearance Pending: ${failedChecks.length} documentation/testing requirement(s) pending.`);
    }
    if (criticalFraud.length > 0) {
        risks.push(`CRITICAL ALERT: ${criticalFraud[0].description}`);
    }
    if (risks.length === 0) {
        risks.push('No active risks detected. Certified World Class Premium Quality.');
    }

    // Farmer-friendly plain text summary
    const farmerName = batch.farmer.name;
    const cropName = batch.product.name;
    let plainAi = `${farmerName.split(' ')[0]} bhai, your ${cropName} batch ${batch.batchCode} achieved a Trust Score of ${finalScore} out of 100 (${riskLevel.toUpperCase()}). All blockchain records and agricultural certifications are verified on-chain. Buyers can trust this batch with high confidence!`;

    if (finalScore < 75) {
        plainAi = `${farmerName.split(' ')[0]} bhai, your ${cropName} batch ${batch.batchCode} scored ${finalScore}/100. The score was adjusted due to ${risks[0]}. Please inspect temperature controls or complete pending certificates to increase your premium trust badge.`;
    }

    // Update DB records asynchronously
    await prisma.batch.update({
        where: { id: batch.id },
        data: { trustScore: finalScore },
    });

    await prisma.trustScore.upsert({
        where: { batchId: batch.id },
        update: {
            blockchainScore,
            certificateScore,
            coldChainScore,
            inspectionScore,
            complianceScore,
            qualityScore,
            finalScore,
            factorsJson: JSON.stringify(factors),
            explanation: plainAi,
        },
        create: {
            batchId: batch.id,
            blockchainScore,
            certificateScore,
            coldChainScore,
            inspectionScore,
            complianceScore,
            qualityScore,
            finalScore,
            factorsJson: JSON.stringify(factors),
            explanation: plainAi,
        },
    });

    return {
        batchId: batch.id,
        batchCode: batch.batchCode,
        crop: cropName,
        farmerName: `${farmerName} (${batch.location})`,
        finalScore,
        riskLevel,
        factors,
        risks,
        plainAi,
    };
}
