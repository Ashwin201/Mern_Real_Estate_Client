import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import CardSkeletons from './CardSkeletons'

const ProfileSkeleton = () => {
    return (
        <div className=''>
            <div className=' flex items-center flex-col sm:flex-row justify-center sm:justify-normal gap-2'>
                <Skeleton className=' w-20 h-20 rounded-full' />
                <div className=' flex flex-col  items-center sm:items-start  gap-2'>
                    <Skeleton className=' w-36 h-6' />
                    <Skeleton className=' w-48 h-5' />
                </div>
            </div>


            <h1 className="text-2xl font-bold mb-2 mt-10">Your Properties</h1>
            <p className="mb-8 text-base text-gray-500">All properties posted by you.</p>
            <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                {
                    [1, 2, 3, 4, 5, 6].map((item: any, index: number) => <CardSkeletons key={index} />)
                }
            </div>

        </div>
    )
}

export default ProfileSkeleton