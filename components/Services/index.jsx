import React from 'react'
import Buttons from './button'
import Image from 'next/image'

function index() {
  return (
    <div className='relative flex flex-col items-center justify-center pt-7 mx-4'>
    <label className='border-black border-2 rounded-xl border-dashed py-2 px-4  mb-7 font-extrabold'>خدمات</label>
    <Image src={"/flower.svg"} width={50} height={50} className='absolute top-1 right-0'  ></Image>
    <Buttons/>
    <div className='w-full h-48'>
    <Image className='absolute right-0 bottom-10' src={"/sakura.svg"} width={100} height={100}></Image>
    <Image className='absolute bottom-10' src={"/sakura.svg"} width={100} height={100}></Image>
    </div>
    </div>
  )
}

export default index