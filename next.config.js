/** @type {import('next').NextConfig} */
const webpack = require('webpack');

// List of server-side modules to ignore in the client bundle
const serverSideModules = [
  'async_hooks',
  'child_process',
  'cluster',
  'crypto',
  'dgram',
  'dns',
  'fs',
  'http2',
  'https',
  'module',
  'net',
  'os',
  'path',
  'perf_hooks',
  'readline',
  'repl',
  'tls',
  'vm',
  'worker_threads',
  'zlib',
  // Third-party server-side modules
  '@opentelemetry',
  '@grpc/grpc-js',
  'grpc',
  'express',
  'http2',
  'https',
  'node-fetch',
  'nodemailer',
  'pg',
  'redis',
  'sqlite3',
  'typeorm',
  'webpack',
];

const nextConfig = {
  // Disable React 18 concurrent features to prevent hydration issues
  reactStrictMode: true,
  
  // Disable TypeScript and ESLint during build for now
  typescript: {
    ignoreBuildErrors: true,
  },
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
  webpack: (config, { isServer, dev }) => {
    // Client-side configuration
    if (!isServer) {
      // Create a new object to avoid mutating the original
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        // Node.js core modules
        fs: false,
        net: false,
        tls: false,
        dns: 'empty',
        child_process: false,
        dgram: false,
        module: false,
        async_hooks: false,
        path: require.resolve('path-browserify'),
        util: require.resolve('util/'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        vm: require.resolve('vm-browserify'),
        // Additional modules that might be needed
        querystring: require.resolve('querystring-es3'),
        url: require.resolve('url/'),
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser'),
      };

      // Ensure plugins array exists
      config.plugins = config.plugins || [];

      // Add IgnorePlugin for server-side modules
      serverSideModules.forEach(module => {
        config.plugins.push(
          new webpack.IgnorePlugin({
            resourceRegExp: new RegExp(`^${module}(/.*)?$`),
          })
        );
      });

      // Provide polyfills for Node.js globals
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
          'process.browser': JSON.stringify(true),
          'process.platform': JSON.stringify('browser'),
          'process.versions.node': JSON.stringify(process.version || '0.0.0'),
        })
      );

      // Add resolve aliases for browser-compatible versions
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'http2': false,
        'net': false,
        'tls': false,
        'dns': false,
        'fs': false,
        'child_process': false,
        'module': false,
        'perf_hooks': false,
        'readline': false,
        'repl': false,
        'worker_threads': false,
        'zlib': false,
      };

      // Add module rules to handle specific files
      config.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // Disable the behavior that requires the .mjs extension
        },
      });
    }

    return config;
  },
  
  // Enable external directory for better module resolution
  experimental: {
    externalDir: true,
  },
  
  // Environment variables that should be exposed to the browser
  env: {
    // Public env vars (exposed to browser)
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
  
  // Environment variables with NEXT_PUBLIC_ prefix are automatically exposed to the browser
  // No need to manually expose them in next.config.js
  // Remove the env and publicRuntimeConfig sections as they're not needed
  // and might cause confusion or conflicts

  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;
