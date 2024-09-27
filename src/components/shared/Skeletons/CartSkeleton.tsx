import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CartSkeleton = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className=' md:col-span-2 space-y-6'>
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

            </div>
            <div className=' border-gray-200 border-2 h-fit flex flex-col gap-4 rounded-md p-4'>
                <Skeleton className=' w-[40%] h-6 rounded-md' />
                <Separator />
                <div className=' w-full flex justify-between items-center'>
                    <Skeleton className='  h-6 w-[38%]' />
                    <Skeleton className='  h-6 w-[30%]' />

                </div>
                <Skeleton className=' w-full h-12 rounded-md' />
            </div>
        </div>
    )
}

export default CartSkeleton