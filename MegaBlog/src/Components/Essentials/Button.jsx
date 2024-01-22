import React from 'react'

function Button({
    children,
    type = '',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props

}) {

    return (
      <button className={`px-6 py-4 rounded-lg ${bgColor} ${textColor} ${className}`}  type={type} {...props}> {children}</button>
  )
}

export default Button