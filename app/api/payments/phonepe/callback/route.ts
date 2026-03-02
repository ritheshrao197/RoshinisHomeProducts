import { NextResponse } from 'next/server';
import { generatePhonePeWebhookHash } from '@/lib/payments';

const SALT_KEY = process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';

export async function POST(request: Request) {
    try {
        const rawBody = await request.text();
        const headers = request.headers;
        const xVerify = headers.get('x-verify');

        // In production, we'd extract the actual payload and verify
        // const { response: base64Payload } = JSON.parse(rawBody);
        // const expectedChecksum = generatePhonePeWebhookHash(base64Payload, SALT_KEY, SALT_INDEX);

        // if (expectedChecksum !== xVerify) {
        //   return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
        // }

        // Decode and process
        // const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
        // if (payload.code === 'PAYMENT_SUCCESS') {
        //    // Update DB order status to 'processing'
        // }

        // Since this can be hit by browser redirect as well, we redirect to success page
        const url = new URL(request.url);
        const orderId = url.searchParams.get('id') || 'UNKNOWN';

        return NextResponse.redirect(`${url.origin}/checkout/success?orderId=${orderId}&method=phonepe`, {
            status: 302,
        });
    } catch (error: any) {
        console.error('PhonePe Callback Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
