/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'asrieeyxvotzrfsocbmn.supabase.co',
            'static.vecteezy.com'
        ]
    },
    experimental: {
        serverActions: true,
    },

}

module.exports = nextConfig
