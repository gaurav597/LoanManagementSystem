import React from 'react'
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {;
    const history = useNavigate()

  return (
    <div>
            <br /> <br />
            <div className='container'>
                <h2 style={{ color: "green" }}>Employee Dashboard</h2>
             </div>
        </div>
  )
}

export default EmployeeDashboard