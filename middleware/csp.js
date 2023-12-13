import { NextResponse } from "next/server";

export default function applyCSPMiddleware(handler) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = 
        `default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
        style-src 'self' 'nonce-${nonce}';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;`;
    const requestsHeaders = new Headers(request.headers);
    requestsHeaders.set('x-nonce', nonce)
    requestsHeaders.set(
        'Content-Security-Policy',
        contentSecurityPolicyValue
    )
    const response = NextResponse.next({
        request: {
            headers: requestsHeaders,
        },
    })
    response.headers.set(
        'Content-Security-Policy',
        contentSecurityPolicyHeaderValue
    )
    return response;
}
export const config = {
    matcher:[
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing:[
                {type: 'header', key: 'next-router-prefetch'},
                {type:'header', key:'purpose', value:'prefetch'},
            ],
        },
    ],
};