/** @type {import('next').NextConfig} */
const nextConfig = {
	'fontawesome-svg-core': {
		license: 'free',
	},
	env: {
		API_URL: 'http://localhost:8000/v1/',
	},
};

module.exports = nextConfig;
