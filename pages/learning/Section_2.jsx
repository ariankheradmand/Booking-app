import Image from 'next/image'
import React from 'react'

function Section_two({data}) {
  return (
    <div dir='rtl' className='flex items-center justify-center w-full text-white overflow-hidden pb-14'>
    <div className=' w-11/12 relative flex flex-col items-end animate__animated animate__backInLeft'>
    <div className='w-[255px]'>
      <Image className='absolute left-0' src={"/Learning-Shapes/Rectangle-" + 2 + ".svg"} width={255} height={200}/>
      <h2 className='pr-4 relative text-sm font-extralight mt-2'>{data.d_header}</h2>
      {data.d_contents.map((data , index) => {
        return (
          <p  className='pr-4 py-1 relative text-sm w-64 font-thin'>{data}</p>
        )
      })}
      </div>
    </div>
    </div>
  )
}

export default Section_two