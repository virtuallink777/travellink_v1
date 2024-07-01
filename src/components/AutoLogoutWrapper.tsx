'use client'

import useAutoLogout from "@/hooks/useAutoLogout";



export function AutoLogoutWrapper({children} : {children: React.ReactNode}){
  useAutoLogout()
  return <>{children}</>
}