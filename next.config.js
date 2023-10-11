/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL: 'http://localhost:8000/v1/',
	},
	basePath: '/admin',
};

module.exports = nextConfig;
