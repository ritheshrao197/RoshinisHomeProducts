import { NextResponse } from 'next/server';
import { generatePayUHash } from '@/lib/payments';

const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY || 'gtKFFx';
const PAYU_MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT || 'eCwWELxi';
const PAYU_HOST = 'https://test.payu.in/_payment';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, customer, items } = body;

        const txnid = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const productinfo = "Roshinis Home Products Order";

        const hash = generatePayUHash(
            PAYU_MERCHANT_KEY,
            txnid,
            amount.toString(),
            productinfo,
            customer.name.split(' ')[0] || 'Customer',
            customer.email,
            PAYU_MERCHANT_SALT
        );

        const surl = `http://localhost:3000/api/payments/payu/callback`;
        const furl = `http://localhost:3000/api/payments/payu/callback`;

        // Rather than returning a JSON for frontend to POST, we can return an HTML form string 
        // that the frontend renders and auto-submits, or return parameters to build a form.
        const formHtml = `
      <form id="payu-form" action="${PAYU_HOST}" method="post">
        <input type="hidden" name="key" value="${PAYU_MERCHANT_KEY}" />
        <input type="hidden" name="txnid" value="${txnid}" />
        <input type="hidden" name="productinfo" value="${productinfo}" />
        <input type="hidden" name="amount" value="${amount}" />
        <input type="hidden" name="email" value="${customer.email}" />
        <input type="hidden" name="firstname" value="${customer.name.split(' ')[0] || 'Customer'}" />
        <input type="hidden" name="surl" value="${surl}" />
        <input type="hidden" name="furl" value="${furl}" />
        <input type="hidden" name="phone" value="${customer.phone}" />
        <input type="hidden" name="hash" value="${hash}" />
      </form>
      <script type="text/javascript">document.getElementById("payu-form").submit();</script>
    `;

        // In a real app we save pending DB order here

        return NextResponse.json({
            success: true,
            formHtml: formHtml
        });
    } catch (error: any) {
        console.error('PayU Payment Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
