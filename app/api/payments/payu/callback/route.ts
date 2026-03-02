import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const status = formData.get('status');
        const txnid = formData.get('txnid') as string;
        const hash = formData.get('hash');

        // In production, verify the reverse hash here:
        // salt|status|||||||||||email|firstname|productinfo|amount|txnid|key
        // Compare with the hash received from PayU.

        const url = new URL(request.url);

        if (status === 'success') {
            // Update DB order status
            return NextResponse.redirect(`${url.origin}/checkout/success?orderId=${txnid}&method=payu`, {
                status: 302,
            });
        } else {
            // Payment Failed
            return NextResponse.redirect(`${url.origin}/checkout?error=payment_failed`, {
                status: 302,
            });
        }
    } catch (error: any) {
        console.error('PayU Callback Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
