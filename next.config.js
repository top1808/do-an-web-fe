/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL: process.env.NEXT_PUBLIC_API_URL,
		API_UPLOAD_URL: process.env.NEXT_PUBLIC_API_UPLOAD_URL,
	},
};

module.exports = nextConfig;
