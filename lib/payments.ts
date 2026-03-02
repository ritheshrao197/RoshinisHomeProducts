import crypto from 'crypto';

export function generatePhonePeHash(payload: string, endpoint: string, salt: string, saltIndex: string) {
    const base64Payload = Buffer.from(payload).toString('base64');
    const stringToHash = base64Payload + endpoint + salt;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const checksum = sha256 + '###' + saltIndex;

    return { base64Payload, checksum };
}

export function generatePhonePeWebhookHash(payload: string, salt: string, saltIndex: string) {
    const stringToHash = payload + salt;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    return sha256 + '###' + saltIndex;
}

export function generatePayUHash(key: string, txnid: string, amount: string, productinfo: string, firstname: string, email: string, salt: string) {
    // Hash sequence: key|txnid|amount|productinfo|firstname|email|||||||||||salt
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');
    return hash;
}
