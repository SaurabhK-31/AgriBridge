import assert from 'node:assert';
import { generateBatchHash, generateFileHash } from '../src/lib/blockchain';
import { predictSpoilage } from '../src/lib/services/spoilageService';

async function runTests() {
    console.log('🧪 Running AgriBridge AI Service Unit Tests...\n');

    // Test 1: SHA-256 Batch Hash Generation
    const payload = {
        batchCode: 'AG-2847',
        farmerId: 'farmer-101',
        crop: 'Alphonso Mango',
        quantity: 2400,
        harvestDate: '2026-03-12',
        location: 'Nashik, Maharashtra',
    };

    const hash1 = generateBatchHash(payload);
    const hash2 = generateBatchHash(payload);

    assert.ok(hash1, 'Hash should be defined');
    assert.strictEqual(hash1, hash2, 'Identical payload must produce identical SHA-256 hash');
    assert.ok(hash1.startsWith('0x'), 'Hash must have 0x hex prefix');
    assert.strictEqual(hash1.length, 66, '0x + 64 hex characters = 66 length');
    console.log('✅ TEST 1 PASSED: Cryptographic SHA-256 batch hash deterministic & valid.');

    // Test 2: SHA-256 Certificate File Hash
    const certText = 'APEDA Phytosanitary Certificate Document 2026';
    const fileHash = generateFileHash(certText);
    assert.ok(fileHash, 'File hash should be defined');
    assert.strictEqual(fileHash.length, 64, 'SHA-256 hex string length must be 64');
    console.log('✅ TEST 2 PASSED: Certificate document SHA-256 hash generated successfully.');

    // Test 3: Spoilage Prediction Engine
    const result = await predictSpoilage('Alphonso Mango', 12.5, 3);
    assert.strictEqual(result.crop, 'Alphonso Mango');
    assert.ok(result.remainingDays > 0, 'Remaining days must be positive');
    assert.ok(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(result.spoilageRisk), 'Valid risk level');
    console.log('✅ TEST 3 PASSED: Spoilage prediction thermal stress engine calculated shelf-life.');

    console.log('\n🎉 ALL AGRIBRIDGE SERVICE UNIT TESTS PASSED SUCCESSFULLY!');
}

runTests().catch((err) => {
    console.error('❌ TEST FAILURE:', err);
    process.exit(1);
});
