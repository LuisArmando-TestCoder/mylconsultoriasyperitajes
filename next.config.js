/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@use "@/styles/abstracts/variables" as *;`,
  },
};

module.exports = nextConfig;
