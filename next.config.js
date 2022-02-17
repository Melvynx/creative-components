/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  env: {
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_API_TOKEN: process.env.NOTION_API_TOKEN,
  },
};

module.exports = nextConfig;
