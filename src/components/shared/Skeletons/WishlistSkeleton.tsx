import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const WishlistSkeleton = () => {
    return (
        <div className='flex flex-col sm:flex-row gap-8'>
            <Skeleton className='  h-44 w-full sm:h-32 sm:w-40 d' />
            <div className=' w-full flex-col justify-normal gap-8 items-center'>
                <Skeleton className=' h-6 w-[90%] ' />
                <Skeleton className=' mt-3 h-4 w-[60%] ' />
                <div className=' flex gap-8 mt-3 items-center'>
                    <Skeleton className='  h-5  w-24 ' />
                    <Skeleton className='   h-5 w-24 ' />
                </div>
                <Skeleton className=' mt-3 h-5 w-[20%] ' />

            </div>
        </div>
    )
}

export default WishlistSkeleton