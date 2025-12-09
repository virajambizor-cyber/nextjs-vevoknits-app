import React from 'react'
import loading from '@/public/assets/images-1/loading.svg'
const loading = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-start mt-12'>
     <Image src={loading.src} height={80} widhth={80}
     alt='Loading'/>
    </div>
  )
}

export default loading