import React, { useState } from 'react';

const DeleteButton = ({ label, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  
  if (showConfirm) {
    return (
      <div className='fixed z-[999] inset-0 bg-black/80 flex justify-center items-center'>
        <div className='rounded-lg p-5 bg-white text-black flex flex-col items-center'>
          <h2>Are you sure to DELETE?</h2>
          <div className='flex gap-2 mt-4'>
            <button type='button' className='p-2 rounded-lg border' onClick={() => setShowConfirm(false)}>Cancel</button>
            <button type='button' className='btn' onClick={onDelete}>Confirm del</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button type='button' onClick={() => setShowConfirm(true)}>{label}</button>
    </div>
  );
}

export default DeleteButton;
