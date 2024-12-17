import Image from 'next/image'
import React from 'react'

export default function index() {
  return (
    <nav className='h-36 w-full bg-accent flex items-center justify-center rounded-b-xl nav-show'>
    <Image src="/Main-Logo.svg" width={150} height={100} />
    </nav>
  )
}
