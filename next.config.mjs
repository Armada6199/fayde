/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/speechtotext",
        destination: `https://3a8c-178-20-188-157.ngrok-free.app/api/*`,
      },
    ];
  },
};

export default nextConfig;
