import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SalarySlipGeneration() {
  const params=useParams();
  const user_id=params.user_id;
  return (
    <div>User ID: {user_id}
        
    </div>

  )
}
