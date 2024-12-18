import React from 'react'
import Data from "../../libs/PackagesData";

function PackagesBox() {
  return (
    <>
    <div className='flex flex-row flex-wrap items-center justify-center gap-2  mt-4'>
    {Data.map((pakages , index) => {
        return (
                <div className='flex flex-col  w-44 bg-first h-44 rounded-lg relative'>
                <h3 className='text-end font-bold py-1 px-2 border-b text-white border-black'>
                    {pakages.name}
                </h3>
                <h4 dir='rtl' className='text-center px-2 text-xs'>
                    {pakages.details}
                </h4>
                <button className='mt-2 text-sm bg-accent w-full rounded-b-lg py-1 absolute bottom-0 text-first nav-show border-t-2 border-dashed border-black'>روزو وقت</button>
                </div>
        )
    })}
    </div>
    </>
  )
}

export default PackagesBox