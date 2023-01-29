import NextAuth, { ISODateString } from 'next-auth'
// import { AuthOptions } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
// import { iUser } from 'utils/interfaces/user'

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'FreeTask',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: any, req: any) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/credentials`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          },
        )

        const user = await res.json()

        console.log({ user })
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.provider = account.provider
      }
      // console.log({ token, account, profile })
      return token
    },
    async session({ session, token }: any) {
      // Send properties to the client, like an access_token and user id from a provider.

      if (session.user) {
        session.user.provider = token.provider
        const getOne = await fetch(
          `${process.env.NEXTAUTH_URL}/api/user?type=one&email=${session.user.email}`,
        )
        const oneUser = await getOne.json()

        if (session.user.provider !== 'credentials' && oneUser === null) {
          console.log({ us: session.user, token: token, oneUser })
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
            method: 'POST',
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
              provider: session.user.provider,
            }),
          })

          const user = res.json()
          console.log({ user })
        }
        session.user.id = oneUser?.id
        session.user.role = oneUser?.role
      }

      // console.log({ session })
      return session
    },
  },
}
export default NextAuth(authOptions)
