import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },

        async session({ session, token, user }) {
            // session.accessToken = token.accessToken
            // session.user.id = token.id
            // console.log(user, token)
            
            return session
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;