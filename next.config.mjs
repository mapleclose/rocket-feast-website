/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@untitledui/icons"],
    },
    async redirects() {
        return [{ source: "/privacy-policy", destination: "/privacy", permanent: true }];
    },
};

export default nextConfig;
