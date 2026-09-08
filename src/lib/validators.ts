import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['FARMER', 'EXPORTER', 'CONSUMER', 'REGULATOR', 'ADMIN']).default('FARMER'),
    phone: z.string().optional(),
    farmName: z.string().optional(),
    location: z.string().optional(),
    state: z.string().optional(),
    district: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const createBatchSchema = z.object({
    crop: z.string().min(1, 'Crop type is required'),
    quantity: z.number().positive('Quantity must be positive'),
    harvestDate: z.string().min(1, 'Harvest date is required'),
    location: z.string().min(1, 'Farm location is required'),
    certificateUrl: z.string().optional(),
    certificateType: z.string().optional(),
});

export const createShipmentSchema = z.object({
    batchId: z.string().min(1, 'Batch ID is required'),
    destinationCountry: z.string().min(1, 'Destination country is required'),
    quantity: z.number().positive('Quantity must be positive'),
});

export const certificateUploadSchema = z.object({
    batchId: z.string().min(1, 'Batch ID is required'),
    certificateType: z.string().min(1, 'Certificate type is required'),
    fileUrl: z.string().min(1, 'File URL is required'),
    fileHash: z.string().min(1, 'File SHA-256 hash is required'),
    issuer: z.string().min(1, 'Issuer name is required'),
    expiryDate: z.string().min(1, 'Expiry date is required'),
});

export const investigateFraudSchema = z.object({
    alertId: z.string().min(1, 'Alert ID is required'),
    action: z.enum(['APPROVE', 'REJECT', 'RESOLVE', 'FALSE_POSITIVE']),
    notes: z.string().optional(),
});

export const consumerChatSchema = z.object({
    batchId: z.string().min(1, 'Batch ID is required'),
    query: z.string().min(1, 'Query is required'),
});
