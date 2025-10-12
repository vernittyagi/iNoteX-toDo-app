import React from 'react'

function Navbar() {
  return (
    <nav className='bg-[#33398A] text-white flex justify-around p-2'>
        <div className="logo">
          <span className='font-bold text-xl cursor-pointer'>iNoteX</span>
        </div>
        <ul className='flex gap-10 text-lg font-bold'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>About Us</li>
            <li className='cursor-pointer'>Contact Us</li>
        </ul>
    </nav>
  )
}

export default Navbar
