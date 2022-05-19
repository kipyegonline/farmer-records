/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: { loader: "custom" },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  env: { user: "kipyegonline", api: "./api/api.php", jules: "jules" },
};
