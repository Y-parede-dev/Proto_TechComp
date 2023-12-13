/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    
    env:{
        HOST:process.env.HOST,
        FB_APIKEY:process.env.FB_APIKEY,
        FB_AUTH_DOMAIN:process.env.FB_AUTH_DOMAIN,
        FB_PROJECT_ID:process.env.FB_PROJECT_ID,
        FB_STORAGE_BUCKET:process.env.FB_STORAGE_BUCKET,
        FB_MESSAGING_SENDER_ID:process.env.FB_MESSAGING_SENDER_ID,
        FB_APP_ID:process.env.FB_APP_ID,
        FB_MEASUREMENT_ID:process.env.FB_MEASUREMENT_ID,
        NEXT_PUBLIC_FB_PROJECT_ID:process.env.NEXT_PUBLIC_FB_PROJECT_ID,
        GTMID:process.env.GTMID
    },
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: "firebasestorage.googleapis.com"
            }
        ],
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    serverRuntimeConfig: {
        experimental: {
            useServerComponents: true,
        },
    },
}

module.exports = nextConfig