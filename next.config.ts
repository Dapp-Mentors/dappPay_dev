// next.config.js
/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    // Enable MCP server
    mcp: {
      enabled: true,
      // You can optionally specify a port, e.g., port: 3000,
    },
  },
}

module.exports = nextConfig
