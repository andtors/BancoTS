'use client'

import { useEffect, useState } from "react";
import DashboardPage from '@/app/dashboard/page'
import AuthPage from '@/app/auth/page'
import useAuth from "@/hooks/useAuth";

export default function Home() {
/*
  const [token, setToken] = useState([])
  const {getUserToken} = useAuth()

  useEffect(() => {
    const decodedToken = getUserToken()
    setToken(decodedToken)
  }, [])

  if(!token){
    return <AuthPage />
   } else {
    return (
      <DashboardPage />
     )
   }

  */
}
