import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const PropertyDetailSkeleton = () => {
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 place-content-center items-center ">
            <div className='col-span-1 '>
                <Skeleton className=" w-full h-96 " />
                <div className=' flex flex-wrap gap-3 mt-4'>
                    <Skeleton className="h-16 w-20 "></Skeleton>
                    <Skeleton className="h-16 w-20 "></Skeleton>
                    <Skeleton className="h-16 w-20 "></Skeleton>
                    <Skeleton className="h-16 w-20 "></Skeleton>
                </div>
            </div>
            <div className=" col-span-1 flex flex-col gap-5">
                <div className=' flex gap-2'>
                    <Skeleton className=' w-12 h-12 rounded-full' />
                    <div className=' flex flex-col gap-1'>
                        <Skeleton className=' w-28 h-5' />
                        <Skeleton className=' w-44 h-4' />
                    </div>
                </div>
                <div>
                    <Skeleton className="h-8 w-[80%] "></Skeleton>
                    <Skeleton className="h-8 mt-1 w-[80%] "></Skeleton>
                </div>
                <div className=' flex flex-col gap-0.5'>
                    <Skeleton className="h-4 w-[90%] "></Skeleton>
                    <Skeleton className="h-4 w-[80%] "></Skeleton>
                    <Skeleton className="h-4 w-[96%] "></Skeleton>
                    <Skeleton className="h-4 w-[96%] "></Skeleton>
                    <Skeleton className="h-4 w-[96%] "></Skeleton>
                    <Skeleton className="h-4 w-[96%] "></Skeleton>
                    <Skeleton className="h-4 w-[95%] "></Skeleton>
                    <Skeleton className="h-4 w-[87%] "></Skeleton>
                    <Skeleton className="h-4 w-[40%] "></Skeleton>

                </div>
                <Skeleton className="h-4 w-28 "></Skeleton>

                <div className=" flex flex-col sm:flex-row  gap-2 items-center mb-3">
                    <Skeleton className="h-10 w-full sm:w-28 "></Skeleton>
                    <Skeleton className="h-10 w-full sm:w-28 "></Skeleton>
                </div>
                <span className="h-4 "></span>
            </div>
        </div>
    )
}

export default PropertyDetailSkeleton