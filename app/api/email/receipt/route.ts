import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, orderId, totalAmount, items } = body;

        // TODO: Integrate Resend or Nodemailer
        /*
          import { Resend } from 'resend';
          const resend = new Resend(process.env.RESEND_API_KEY);
    
          await resend.emails.send({
            from: 'Roshinis Home Products <orders@roshinis.com>',
            to: email,
            subject: `Order Confirmation #${orderId}`,
            html: `<p>Thank you for your order! Your total is ₹${totalAmount}.</p>`
          });
        */

        console.log(`Email receipt sent to ${email} for order ${orderId}`);

        return NextResponse.json({ success: true, message: 'Email queued' });
    } catch (error: any) {
        console.error('Email Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
