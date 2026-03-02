import { z } from 'zod';

export const addressSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    addressLine1: z.string().min(5, "Address must be at least 5 characters"),
    addressLine2: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
});

export const orderPayloadSchema = z.object({
    customer: addressSchema,
    items: z.array(z.object({
        id: z.string(),
        quantity: z.number().int().positive(),
    })).min(1, "Cart cannot be empty"),
    amount: z.number().positive(),
    method: z.enum(['cod', 'phonepe', 'payu']),
});

export const productSchema = z.object({
    name: z.string().min(3),
    slug: z.string(),
    price: z.number().positive(),
    compare_price: z.number().positive().optional(),
    stock: z.number().int().nonnegative(),
    category: z.string(),
    short_desc: z.string(),
    description: z.string(),
});
