/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  env: { user: "kipyegonline", api: "./api/api.php", jules: "jules" },
};
