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
        GTMID:process.env.GTMID,
        POSTGRES_URL:process.env.POSTGRES_URL,
        POSTGRES_PRISMA_URL:process.env.POSTGRES_PRISMA_URL,
        POSTGRES_URL_NON_POOLING:process.env.POSTGRES_URL_NON_POOLING,
        POSTGRES_USER:process.env.POSTGRES_USER,
        POSTGRES_HOST:process.env.POSTGRES_HOST,
        POSTGRES_PASSWORD:process.env.POSTGRES_PASSWORD,
        POSTGRES_DATABASE:process.env.POSTGRES_DATABASE,
        ADMIN_UID:process.env.ADMIN_UID,
        MODO_UID:process.env.MODO_UID,
        MARKETING_UID: process.env.MARKETING_UID
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
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(mp4|webm|ogg)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        });
    
        return config;
      },
}

module.exports = nextConfig