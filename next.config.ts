
import type { NextConfig } from 'next';

console.log("Loading Next.js configuration...");

const nextConfig: NextConfig = {
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Configure webpack to handle Node.js modules
  webpack: (config, { isServer, webpack }) => {
    // Client-side configuration
    if (!isServer) {
      // Exclude Node.js modules from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        dgram: false,
        module: false,
        async_hooks: false,
        path: false,
        util: false,
        stream: false,
        crypto: false,
        http: false,
        https: false,
        os: false,
      };

      // Ignore OpenTelemetry and other server-only modules
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^@opentelemetry/,
        })
      );
    }

    return config;
  },
  // Disable React 18 concurrent features that might cause issues
  reactStrictMode: true,
  // Disable server components for now
  experimental: {
  },
};

console.log("Successfully loaded next.config.js.");

export default nextConfig;
