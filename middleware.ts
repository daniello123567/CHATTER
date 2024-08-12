import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';
const PublicRoute = createRouteMatcher(['/signIn(.*)', '/signUp(.*)','/feed(.*)','/']);
export default clerkMiddleware((auth, request) => {
  if(!PublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
