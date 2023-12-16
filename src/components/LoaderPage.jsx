import React from 'react'
import { Image } from '@nextui-org/react'

export default function LoaderPage() {
  return (
    <div className='bg-white flex justify-center h-full absolute w-full items-center'>
        <Image width={150} height={150} src={'/plane-loader.gif'}/>
    </div>
  )
}
