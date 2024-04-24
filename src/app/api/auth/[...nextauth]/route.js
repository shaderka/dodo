import { connectMongoDB } from '@/app/lib/mongodb'
import User from '@/app/models/user'
import nextAuth from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs/dist/bcrypt'

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},

			async authorize(credentials) {
				const { tel, pass } = credentials
				try {
					await connectMongoDB()
					const user = await User.findOne({ tel })
					if (!user) return null
					const passMatch = await bcrypt.compare(pass, user.pass)
					if (!passMatch) return null
					return user
				} catch (error) {
					console.log(error)
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, trigger, user }) => {
			if (user) {
				token.uid = user
			}

			console.log('updated222')
			return token
		},
		session: async ({ session, token }) => {
			session.userData = {
				fio: token.uid.fio,
				email: token.uid.email,
				tel: token.uid.tel,
				isAdmin: token.uid.admin,
			}

			return session
		},
	},
	strategy: 'jwt',
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
