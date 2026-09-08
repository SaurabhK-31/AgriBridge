import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding AgriBridge AI Database...');

    // Password hashing
    const passwordHash = await bcrypt.hash('Password123!', 10);

    // 1. Seed Users
    const farmerUser = await prisma.user.upsert({
        where: { email: 'farmer@agribridge.ai' },
        update: {},
        create: {
            name: 'Rajesh Kumar',
            email: 'farmer@agribridge.ai',
            password: passwordHash,
            role: 'FARMER',
            phone: '+91 98765 43210',
            farmerProfile: {
                create: {
                    farmName: 'Kumar Organic Farms',
                    location: 'Nashik, Maharashtra',
                    state: 'Maharashtra',
                    district: 'Nashik',
                },
            },
        },
    });

    const exporterUser = await prisma.user.upsert({
        where: { email: 'exporter@agribridge.ai' },
        update: {},
        create: {
            name: 'Sunrise Exports Ltd',
            email: 'exporter@agribridge.ai',
            password: passwordHash,
            role: 'EXPORTER',
            phone: '+91 98111 22334',
        },
    });

    const consumerUser = await prisma.user.upsert({
        where: { email: 'consumer@agribridge.ai' },
        update: {},
        create: {
            name: 'Aaditya Verma',
            email: 'consumer@agribridge.ai',
            password: passwordHash,
            role: 'CONSUMER',
            phone: '+91 99000 11223',
        },
    });

    const regulatorUser = await prisma.user.upsert({
        where: { email: 'regulator@agribridge.ai' },
        update: {},
        create: {
            name: 'Dr. Amit Sharma (FSSAI/APEDA Regulator)',
            email: 'regulator@agribridge.ai',
            password: passwordHash,
            role: 'REGULATOR',
            phone: '+91 91111 55555',
        },
    });

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@agribridge.ai' },
        update: {},
        create: {
            name: 'System Admin',
            email: 'admin@agribridge.ai',
            password: passwordHash,
            role: 'ADMIN',
            phone: '+91 90000 00000',
        },
    });

    console.log('👤 Users seeded successfully.');

    // 2. Seed Master Products
    const mango = await prisma.product.upsert({
        where: { name: 'Alphonso Mango' },
        update: {},
        create: {
            name: 'Alphonso Mango',
            category: 'Fruits',
            description: 'GI-tagged premium export grade Alphonso Mangoes from Ratnagiri/Nashik belt.',
        },
    });

    const rice = await prisma.product.upsert({
        where: { name: 'Basmati Rice' },
        update: {},
        create: {
            name: 'Basmati Rice',
            category: 'Grains',
            description: 'Aromatic long-grain Basmati Rice harvested from Punjab plains.',
        },
    });

    const grapes = await prisma.product.upsert({
        where: { name: 'Nashik Grapes' },
        update: {},
        create: {
            name: 'Nashik Grapes',
            category: 'Fruits',
            description: 'Export grade seedless table grapes grown under APEDA strict guidelines.',
        },
    });

    const saffron = await prisma.product.upsert({
        where: { name: 'Kesar Saffron' },
        update: {},
        create: {
            name: 'Kesar Saffron',
            category: 'Spices',
            description: 'Grade 1 ISO certified pure Kashmir Saffron with rich crocin content.',
        },
    });

    const tea = await prisma.product.upsert({
        where: { name: 'Darjeeling Tea' },
        update: {},
        create: {
            name: 'Darjeeling Tea',
            category: 'Beverages',
            description: 'First flush organic GI-certified tea leaves from Darjeeling hills.',
        },
    });

    console.log('🌾 Products seeded successfully.');

    // 3. Seed Batches & Related Models
    const batch1 = await prisma.batch.upsert({
        where: { batchCode: 'AG-2847' },
        update: {},
        create: {
            batchCode: 'AG-2847',
            farmerId: farmerUser.id,
            productId: mango.id,
            quantity: 2400,
            harvestDate: new Date('2026-03-12'),
            location: 'Nashik, Maharashtra',
            status: 'Exported',
            blockchainHash: '0x7f3a89a2b4c1d6e8f9a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4',
            blockchainTransactionHash: '0x7f3a1234567890abcdef1234567890abcdef1234567890abcdef12345678904d92',
            trustScore: 87,
        },
    });

    const batch2 = await prisma.batch.upsert({
        where: { batchCode: 'AG-2841' },
        update: {},
        create: {
            batchCode: 'AG-2841',
            farmerId: farmerUser.id,
            productId: grapes.id,
            quantity: 1800,
            harvestDate: new Date('2026-03-08'),
            location: 'Nashik, Maharashtra',
            status: 'In Transit',
            blockchainHash: '0x3b1c90e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9',
            blockchainTransactionHash: '0x3b1c90e1888877776666555544443333222211110000aaaabbbbccccddddeeee',
            trustScore: 76,
        },
    });

    const batch3 = await prisma.batch.upsert({
        where: { batchCode: 'AG-2835' },
        update: {},
        create: {
            batchCode: 'AG-2835',
            farmerId: farmerUser.id,
            productId: rice.id,
            quantity: 5200,
            harvestDate: new Date('2026-03-02'),
            location: 'Amritsar, Punjab',
            status: 'Delivered',
            blockchainHash: '0x9d4e11c4a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9',
            blockchainTransactionHash: '0x9d4e11c49999888877776666555544443333222211110000aaaabbbbccccdddd',
            trustScore: 92,
        },
    });

    const batch4 = await prisma.batch.upsert({
        where: { batchCode: 'AG-2829' },
        update: {},
        create: {
            batchCode: 'AG-2829',
            farmerId: farmerUser.id,
            productId: saffron.id,
            quantity: 120,
            harvestDate: new Date('2026-02-24'),
            location: 'Pampore, Kashmir',
            status: 'Delivered',
            blockchainHash: '0x5a2f33b8a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9',
            blockchainTransactionHash: '0x5a2f33b81111222233334444555566667777888899990000aaaabbbbccccdddd',
            trustScore: 95,
        },
    });

    const batch5 = await prisma.batch.upsert({
        where: { batchCode: 'AG-2821' },
        update: {},
        create: {
            batchCode: 'AG-2821',
            farmerId: farmerUser.id,
            productId: tea.id,
            quantity: 680,
            harvestDate: new Date('2026-02-18'),
            location: 'Darjeeling, West Bengal',
            status: 'Flagged',
            blockchainHash: '0x1c8b44a9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9',
            blockchainTransactionHash: '0x1c8b44a95555666677778888999900001111222233334444aaaabbbbccccdddd',
            trustScore: 61,
        },
    });

    console.log('📦 Batches seeded successfully.');

    // 4. Seed Certificates
    await prisma.certificate.createMany({
        data: [
            {
                batchId: batch1.id,
                certificateType: 'APEDA Phytosanitary Certificate',
                fileUrl: '/uploads/certificates/apeda_ag2847.pdf',
                fileHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
                issuer: 'APEDA Regional Office Mumbai',
                issueDate: new Date('2026-03-13'),
                expiryDate: new Date('2027-03-13'),
                verificationStatus: 'VERIFIED',
            },
            {
                batchId: batch2.id,
                certificateType: 'GLOBALG.A.P Organic Certificate',
                fileUrl: '/uploads/certificates/globalgap_ag2841.pdf',
                fileHash: 'f4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afb',
                issuer: 'Control Union Certifications',
                issueDate: new Date('2026-03-09'),
                expiryDate: new Date('2027-03-09'),
                verificationStatus: 'VERIFIED',
            },
            {
                batchId: batch3.id,
                certificateType: 'Kashmir GI Tag Registry',
                fileUrl: '/uploads/certificates/gi_ag2835.pdf',
                fileHash: '7852b855e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b',
                issuer: 'Geographical Indications Registry India',
                issueDate: new Date('2026-03-03'),
                expiryDate: new Date('2028-03-03'),
                verificationStatus: 'VERIFIED',
            },
        ],
    });

    // 5. Seed Shipments
    const shipment1 = await prisma.shipment.upsert({
        where: { shipmentCode: 'EX-1923' },
        update: {},
        create: {
            shipmentCode: 'EX-1923',
            batchId: batch1.id,
            exporterId: exporterUser.id,
            destinationCountry: 'UK',
            quantity: 2500,
            status: 'In Transit',
            riskScore: 12,
        },
    });

    const shipment2 = await prisma.shipment.upsert({
        where: { shipmentCode: 'EX-1917' },
        update: {},
        create: {
            shipmentCode: 'EX-1917',
            batchId: batch2.id,
            exporterId: exporterUser.id,
            destinationCountry: 'UAE',
            quantity: 5000,
            status: 'Under Review',
            riskScore: 45,
        },
    });

    const shipment3 = await prisma.shipment.upsert({
        where: { shipmentCode: 'EX-1904' },
        update: {},
        create: {
            shipmentCode: 'EX-1904',
            batchId: batch5.id,
            exporterId: exporterUser.id,
            destinationCountry: 'Singapore',
            quantity: 3000,
            status: 'Flagged',
            riskScore: 78,
        },
    });

    console.log('🚢 Shipments seeded successfully.');

    // 6. Seed Fraud Alerts
    await prisma.fraudAlert.createMany({
        data: [
            {
                batchId: batch1.id,
                shipmentId: shipment1.id,
                fraudType: 'DUPLICATE_CERTIFICATE',
                severity: 'CRITICAL',
                description: 'Certificate hash for Shipment EX-1923 matches a previously uploaded certificate from another exporter batch.',
                confidence: 0.98,
                status: 'OPEN',
            },
            {
                batchId: batch5.id,
                shipmentId: shipment3.id,
                fraudType: 'WEIGHT_DISCREPANCY',
                severity: 'HIGH',
                description: 'Shipment EX-1904 shows 18% weight loss between source mandi and Mumbai JNPT port.',
                confidence: 0.92,
                status: 'UNDER_REVIEW',
            },
        ],
    });

    // 7. Seed Trust Scores
    await prisma.trustScore.upsert({
        where: { batchId: batch1.id },
        update: {},
        create: {
            batchId: batch1.id,
            blockchainScore: 18,
            certificateScore: 16,
            coldChainScore: 15,
            inspectionScore: 17,
            complianceScore: 12,
            qualityScore: 9,
            finalScore: 87,
            factorsJson: JSON.stringify([
                { name: 'Blockchain Verification', score: 18, max: 20, desc: 'All supply chain events recorded on Polygon blockchain', shap: 3.2 },
                { name: 'Certificate Authenticity', score: 16, max: 20, desc: 'Phytosanitary certificate verified against APEDA registry', shap: 2.1 },
                { name: 'Cold Chain Integrity', score: 15, max: 20, desc: 'Minor temperature breach during port loading', shap: -0.8 },
                { name: 'Inspection Results', score: 17, max: 20, desc: 'APEDA pre-shipment Grade A classification', shap: 2.8 },
                { name: 'Regulatory Compliance', score: 12, max: 20, desc: 'EU allergen form pending clearance', shap: -1.5 },
                { name: 'ML Quality Assessment', score: 9, max: 20, desc: 'Computer vision color variation detected', shap: -2.3 },
            ]),
            explanation: 'Alphonso Mango batch AG-2847 has received a Trust Score of 87/100 (High Premium). Strongest factors are complete blockchain registration and Grade A inspection.',
        },
    });

    // 8. Seed Supply Chain Events
    await prisma.supplyChainEvent.createMany({
        data: [
            {
                batchId: batch1.id,
                eventType: 'FARM_REGISTERED',
                actorId: farmerUser.id,
                location: 'Nashik, Maharashtra',
                metadata: 'Farm registration confirmed with APEDA ID #MH-9924',
                blockchainTransactionHash: '0x7f3a1234567890abcdef1234567890abcdef1234567890abcdef12345678904d92',
            },
            {
                batchId: batch1.id,
                eventType: 'HARVESTED',
                actorId: farmerUser.id,
                location: 'Nashik, Maharashtra',
                metadata: '2,400 kg harvested at 80% maturity stage',
            },
            {
                batchId: batch1.id,
                eventType: 'TRANSFERRED_TO_MANDI',
                actorId: farmerUser.id,
                location: 'APMC Nashik Hub',
                metadata: 'Primary grading passed Grade A',
            },
            {
                batchId: batch1.id,
                eventType: 'EXPORTED',
                actorId: exporterUser.id,
                location: 'JNPT Port, Mumbai',
                metadata: 'Loaded into reefer container #MAEU-9912 at 13°C',
            },
        ],
    });

    // 9. Seed AI Agent Activity Logs
    await prisma.aiAgentLog.createMany({
        data: [
            {
                agentName: 'Fraud Detection Agent',
                task: 'Certificate Hash Scan',
                input: 'Shipment EX-1923 certificate payload',
                output: 'FLAGGED: Duplicate certificate hash detected matching Feb 2026 record',
                confidence: 0.98,
                status: 'FLAGGED',
            },
            {
                agentName: 'Compliance Agent',
                task: 'UK Border Export Screening',
                input: 'Shipment EX-1923 against EC 396/2005 regulations',
                output: 'PASSED: Pesticide residue levels compliant with EU MRL limits',
                confidence: 0.99,
                status: 'PASSED',
            },
            {
                agentName: 'Quality Intelligence Agent',
                task: 'Shelf Life Estimation',
                input: 'Batch AG-2841 temperature 5.2°C and humidity 78%',
                output: 'Estimated remaining shelf life: 12 days',
                confidence: 0.87,
                status: 'COMPLETED',
            },
        ],
    });

    console.log('✅ AgriBridge AI Seeding Completed Successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
