"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { Bath, Bed, Edit, } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import useUserStore from '@/store/auth'
const PostCard = (data: any) => {
    data = data.data
    const { user } = useUserStore()
    // console.log(data)
    return (
        <Card className=' p-5 space-y-3 cursor-pointer'>
            <Image
                alt="Property"
                width={300}
                height={200}
                className=" w-full h-36 rounded-md object-cover"
                src={data?.images?.[0]}
            />
            <CardHeader>
                <div className=' flex items-start gap-2 justify-between mt-2'>
                    <CardTitle className=' text-lg font-semibold text-gray-800  line-clamp-1'>{data?.title}</CardTitle>
                    {data?.user?._id === user?._id && <Link href={`/property/edit/${data?._id}`} aria-label='Link' className=' -mt-1'>
                        <Button variant={"ghost"} size={"icon"}><Edit className=' h-5 w-5 text-gray-600 font-semibold' /></Button>
                    </Link>}

                </div>
                <CardDescription className=' line-clamp-1 font-medium'>{data?.address + ", " + data?.city}</CardDescription>
            </CardHeader>
            <CardContent className='  p-0 space-y-2'>
                <p className="text-base font-semibold text-gray-600">Amount :&nbsp; {data?.price?.toFixed(2)} $</p>
                <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center font-medium">
                        <Bed className="w-4 h-4 mr-1" /> {data?.bedroom} Bedrooms
                    </span>
                    <span className="flex items-center font-medium">
                        <Bath className="w-4 h-4 mr-1" /> {data?.bathroom} Bathrooms
                    </span>
                    {/* <span className="flex items-center font-medium">
                        <Ruler className="w-4 h-4 mr-1" /> {data?.size} meters
                    </span> */}
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`/property/${data?._id}`} className=' w-full'>
                    <Button className="w-full font-medium ">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default PostCard