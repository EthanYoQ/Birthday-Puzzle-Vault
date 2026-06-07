/** @type {import('next').NextConfig} */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const basePath =
  rawBasePath && rawBasePath !== "/" ? rawBasePath.replace(/\/$/, "") : undefined;

const nextConfig = {
  poweredByHeader: false,
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
