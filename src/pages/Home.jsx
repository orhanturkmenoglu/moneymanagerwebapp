import React from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser'

const Home = () => {
  useUser();
  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        This home page 
      </Dashboard>
    </div>
  )
}

export default Home