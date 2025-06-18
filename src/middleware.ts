import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🔁 Redirect root path to /auth
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // ❌ Don't run middleware on static files, API, or auth
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get('authToken')?.value;
  const userType = request.cookies.get('userType')?.value;

  console.log('userType:', userType);

  // 🔐 Redirect to /auth if not logged in
  if (!authToken) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // 🧾 Define customer-only and seller-only routes
  const customerOnlyRoutes = [
    '/customer/my-orders',
    '/customer/wishlist',
    '/customer/profile',
    'shopping-cart',
    '/customer/overview',
    '/checkout',
  ];

  const sellerOnlyRoutes = [
    '/seller/overview',
    '/seller/products',
    '/seller/add-product',
    '/seller/edit-product',
    '/seller/orders',
  ];

  // 🔍 Match path prefix
  const isCustomerOnly = customerOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isSellerOnly = sellerOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isCustomerOnly && userType !== 'customer') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (isSellerOnly && userType !== 'seller') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}
