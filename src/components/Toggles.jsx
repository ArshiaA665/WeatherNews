import React from 'react'

const Toggles = ({ handleChange, isChecked }) => {
  return (
    <div className='toggle-container absolute sm:top-[2.5em] sm:right-[1em] top-[1.7em] right-0'>
        <input 
        type="checkbox" 
        id='check'
        className='toggle flex items-center sm:text-[2em] text-[1.5em] cursor-pointer'
        onChange={handleChange}
        checked={isChecked}
        />
        <label 
        className='flex items-center sm:text-[2em] text-[1.5em] cursor-pointer'
        htmlFor="check"></label>
    </div>
  );
};

export default Toggles