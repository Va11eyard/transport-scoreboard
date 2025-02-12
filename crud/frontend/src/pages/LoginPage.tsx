import React from "react"

import Login from "../components/Auth/Login"

interface LoginPageProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Login setIsAuthenticated={setIsAuthenticated} />
    </div>
  )
}

export default LoginPage

