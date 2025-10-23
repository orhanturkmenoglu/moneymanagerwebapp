import React from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser';

const Filter = () => {
   useUser();
  return (
      <Dashboard activeMenu="Filter">
        This Filter page 
      </Dashboard>
  )
}

export default Filter