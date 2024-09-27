import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CardSkeletons = () => {
    return (
        <div className="p-4 space-y-3">
            <Skeleton className="w-full h-36 rounded-md" />
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-1/2 h-4" />
            <div className="flex justify-between gap-4 ">
                <Skeleton className="w-1/3 h-5" />
                <Skeleton className="w-1/3 h-5" />
            </div>
            <Skeleton className=" w-full h-10 rounded-md" />
        </div>
    )
}

export default CardSkeletons