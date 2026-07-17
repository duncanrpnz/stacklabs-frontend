/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Product Strategy was retired as a service in July 2026. The page was
      // live and may be indexed, so send it to the services list rather than 404.
      {
        source: "/services/product-strategy",
        destination: "/#services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
