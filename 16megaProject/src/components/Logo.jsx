import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div>
      <img className='w-[60px] relative bottom-3' src="logo.png" />
    </div>
  )
}

export default Logo