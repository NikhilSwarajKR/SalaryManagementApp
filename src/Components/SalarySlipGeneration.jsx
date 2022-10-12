import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SalarySlipGeneration() {
  const params=useParams();
  const user_id=params.user_id;
  return (
    <div>{user_id}
        
    </div>

  )
}
