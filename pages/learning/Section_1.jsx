import Image from 'next/image'
import React from 'react'

function Section_one({data}) {
  if (!data) {
    return null; // Don't render the section if data is missing
  }
  return (
    <div dir='rtl' className='flex items-center justify-center w-full text-white mt-6 overflow-hidden pb-14'>
    <div className=' w-11/12 relative animate__animated animate__backInRight '>
      <Image className='absolute right-0 ' src={"/Learning-Shapes/Rectangle-" + 1 + ".svg"} width={230} height={200}/>
      <h2 className='pr-4 relative text-sm font-extralight mt-2'>{data.d_header}</h2>
      {data.d_contents.map((data , index) => {
        return (
          <p  className='pr-4 relative text-sm w-44 font-thin'>{data}</p>
        )
      })}
      
    </div>
    </div>
  )
}

export default Section_one