/* eslint-disable import/no-unused-modules */
import { NextRequest, NextResponse } from 'next/server';
import { WEB_ROUTES } from '@utils/constants/routes.constant';
import { REQUIRE_ENV } from '@utils/helpers';

async function middleware(request: NextRequest) {
  const accessToken = JSON.parse(request.cookies.get('auth')?.value!)?.state
    ?.auth?.accessToken;

  if (request.nextUrl.pathname === WEB_ROUTES.HOME) {
    if (accessToken) {
      return NextResponse.redirect(new URL(WEB_ROUTES.DASHBOARD, request.url));
    }
    return NextResponse.redirect(new URL(WEB_ROUTES.LOGIN, request.url));
  }

  if (request.nextUrl.pathname === WEB_ROUTES.LOGIN && accessToken) {
    return NextResponse.redirect(new URL(WEB_ROUTES.DASHBOARD, request.url));
  }

  if (request.nextUrl.pathname === WEB_ROUTES.DASHBOARD && !accessToken) {
    return NextResponse.redirect(new URL(WEB_ROUTES.LOGIN, request.url));
  }

  const missingEnv: string[] = [];

  REQUIRE_ENV.forEach((env) => {
    if (!process.env?.[env]) {
      missingEnv.push(env);
    }
  });

  if (missingEnv.length > 0) {
    return new NextResponse(JSON.stringify({ missingEnv }));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|common|avatars|top-page).*)',
  ],
};

export default middleware;
