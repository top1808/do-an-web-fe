import axiosClient from '@/api/axiosClient';
import { randomBytes, randomUUID } from 'crypto';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'Enter Username' },
				password: { label: 'Password', type: 'password', placeholder: 'Enter Password' },
			},
			async authorize(credentials) {
				try {
					const res = await axiosClient.post('/auth/login', JSON.stringify(credentials));

					if (res.status === 200 && res.data) {
						return res.data;
					}

					return null;
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (err: any) {
					throw new Error(JSON.stringify(err.response.data.message));
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/admin/login',
		signOut: '/admin/login',
		error: '/admin/login',
	},
	session: {
		maxAge: 24 * 60 * 60,
		generateSessionToken: () => {
			return randomUUID?.() ?? randomBytes(32).toString('hex');
		},
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true;
		},

		async session({ session, token, user }) {
			return session;
		},
		async jwt({ token, user, account, profile }) {
			return token;
		},
		async redirect({ url, baseUrl }) {
			return baseUrl + '/admin';
		},
	},
};
