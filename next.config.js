/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL: process.env.NEXT_PUBLIC_API_URL,
		API_UPLOAD_URL: process.env.NEXT_PUBLIC_API_UPLOAD_URL,
		FIREBASE_VAPID_KEY: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
		FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
	},
};

module.exports = nextConfig;
