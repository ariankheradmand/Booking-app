import Image from 'next/image'
import React from 'react'

function index() {
  return (
    <div className='flex flex-col gap-7 items-center justify-center mt-16'>
        <h1 className='font-bold text-3xl w-56 text-text text-center border-text border-r-2  border-l-2'
        dir='rtl'>
            مراقبت از پوست با تیلدا
            <span className='inline-block align-middle'>
                <Image src="Face-Hero.svg" width={36} height={25} alt="face hero"/>
            </span>
        </h1>
        <button className='bg-first text-main_text py-1 px-4 rounded-xl'>برای مشاوره کلیک کنید</button>
        <div className='w-11/12 bg-first h-[2px] rounded-full'></div>
    </div>
  )
}

export default index
