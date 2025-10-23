import React from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser';

const Expense = () => {
  useUser();
  return (
      <Dashboard activeMenu="Expense">
        This Expense page 
      </Dashboard>
  )
}

export default Expense