/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: "urlz.fr"
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true
    },
}

module.exports = nextConfig
