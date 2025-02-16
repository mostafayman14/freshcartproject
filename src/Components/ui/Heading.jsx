import React from 'react'

export default function Heading({titlePage}) {
  return (
    <div className='flex justify-center'>
        <h1 className='headingTitle text-center w-fit pb-[10px] md:pb-[12px] lg:pb-[1rem] text-4xl md:text-5xl lg:text-6xl'>{titlePage}</h1>
    </div>
  )
}
