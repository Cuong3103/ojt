import { Session } from "next-auth";

export const setToken = (session?: Session) => {
  "use client"

  if (session) {
    localStorage.setItem('token', session.accessToken)
  }
}

export const getToken = () => {
  "use client"
  return localStorage.getItem('token')
}
