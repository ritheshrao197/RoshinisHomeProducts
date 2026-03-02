import { NextResponse } from 'next/server';
import { generatePhonePeHash } from '@/lib/payments';

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT';
const SALT_KEY = process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const PHONEPE_HOST = 'https://api-preprod.phonepe.com/apis/pg-sandbox';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, customer } = body;

        const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const payload = JSON.stringify({
            merchantId: MERCHANT_ID,
            merchantTransactionId: transactionId,
            merchantUserId: 'MUID' + Date.now(),
            amount: Math.round(amount * 100), // in paise
            redirectUrl: `http://localhost:3000/api/payments/phonepe/callback?id=${transactionId}`,
            redirectMode: "POST",
            callbackUrl: `http://localhost:3000/api/payments/phonepe/callback?id=${transactionId}`,
            mobileNumber: customer.phone,
            paymentInstrument: {
                type: "PAY_PAGE"
            }
        });

        const endpoint = '/pg/v1/pay';
        const { base64Payload, checksum } = generatePhonePeHash(payload, endpoint, SALT_KEY, SALT_INDEX);

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            body: JSON.stringify({ request: base64Payload })
        };

        const response = await fetch(`${PHONEPE_HOST}${endpoint}`, options);
        const data = await response.json();

        if (data.success) {
            // In a real app we would save the initial Order status in DB here
            return NextResponse.json({
                success: true,
                redirectUrl: data.data.instrumentResponse.redirectInfo.url,
            });
        } else {
            console.error('PhonePe API Error:', data);
            return NextResponse.json({ success: false, message: data.message }, { status: 400 });
        }
    } catch (error: any) {
        console.error('Payment Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
