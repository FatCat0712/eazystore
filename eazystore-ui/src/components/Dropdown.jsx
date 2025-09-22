import React from 'react'

export default function Dropdown({label, options, value, handleSort}) {
  return (
    <div className='flex items-center gap-2 justify-end pr-12 flex-1 font-primary'>
      <label className='text-lg font-semibold text-primary dark:text-light'>{label}</label>
      <select 
        className='px-3 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-900 dark:text-lighter'
        value={value} onChange={(event) => handleSort(event.target.value)}
      >
        {options.map((optionVal, index) => <option key={index} value={optionVal} className='dark:bg-darkbg'>{optionVal}</option>)}
      </select>
    </div>
  )
}
