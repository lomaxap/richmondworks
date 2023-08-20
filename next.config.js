/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "s3.us-west-2.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "notion.so",
            },
        ],
    },
}

module.exports = nextConfig
