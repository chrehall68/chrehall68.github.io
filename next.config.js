/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'leetcard.jacoblin.cool',
            },
        ],
        dangerouslyAllowSVG: true,
    },
}

module.exports = nextConfig
