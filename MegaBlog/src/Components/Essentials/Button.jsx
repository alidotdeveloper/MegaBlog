import React from 'react'

function Button({
    Children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props

}) {

    return (
        <button className={`px-7 py-7 rounded-lg ${bgColor} ${textColor} ${className} {...props}`
} >
          {Children}
    </button>
  )
}

export default Button