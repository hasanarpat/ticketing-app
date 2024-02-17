import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '../../../(models)/User';
import bcrypt from 'bcrypt';

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        // console.log('Profile Github', profile);

        let userRole = 'Github User';
        // if (profile?.email == process.env.ADMIN) {
        //   userRole = 'admin';
        // }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        // console.log('Profile Google', profile);

        let userRole = 'Google User';
        if (profile?.email == process.env.ADMIN) {
          userRole = 'admin';
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email:',
          type: 'text',
          placeholder: 'email',
        },
        password: {
          label: 'password:',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials) {
        console.log(credentials);
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();
          console.log('foundUser', foundUser);

          if (foundUser) {
            console.log('User exists');
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log('Good Pass');
              delete foundUser.password;

              foundUser['role'] = 'Unverified';

              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }

        return 'user not found';
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
