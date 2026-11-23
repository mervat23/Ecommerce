import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
 const token=await getToken({req:request})
  const {pathname}=request.nextUrl


  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/register", request.url))
  }


  const authPage=["/login","/register"]
  const routes=["/","/productDetails","/cart","/categories","/brands","/payment","/allOrders"]

 if(!token&&routes.includes(pathname)){
  return NextResponse.redirect(new URL('/login', request.url))
 }

  if(token&&authPage.includes(pathname)){
    return NextResponse.redirect(new URL('/', request.url))
  
  
 }



  return NextResponse.next()
}

export const config = {
  matcher: ["/","/productDetails","/cart","/categories","/brands","/login","/register","/payment","/allOrders"],
}