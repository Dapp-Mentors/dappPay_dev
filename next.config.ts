// next.config.js
/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    // Enable MCP server
    mcpServer: true,
    mcp: {
      enabled: true,
      port: 3000
      // You can optionally specify a port, e.g., port: 3000,
    },
  },
}

module.exports = nextConfig
