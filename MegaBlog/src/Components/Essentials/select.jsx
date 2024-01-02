import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
    
}, ref) {
   
    const id = useId();

  return (
      <div className='w-full'>
          {label && <label htmlFor={id} className=''></label>} 
          <select name="" id={id} ref= {ref} className={`${className} inline-block px-6 py-6 duration-200 hover:bg-blue-100 rounded-full`}>
              {options?.map((option) => (
                  <option key={option} value={option}>
                      {option}
                </option>
            ))}  
          </select>
    </div>
  )
}

export default React.forwardRef(Select);