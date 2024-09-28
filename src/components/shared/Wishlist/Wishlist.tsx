"use client"

import { useEffect, useState } from 'react'
import { AreaChart, Bath, Bed, MapPinned, MessageCircleWarning, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import useWishlistStore from '@/store/wishlist'
import WishlistSkeleton from '../Skeletons/WishlistSkeleton'
import useAuthMiddleware from '@/customMiddleware'

function Wishlist() {
    useAuthMiddleware()
    const { wishlist, removeFromWishlist, fetchWishlist } = useWishlistStore()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchWishlistData = async () => {
            try {
                const response = await fetchWishlist()
                console.log(response)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchWishlistData()
    }, [wishlist?.items?.length])
    const handleRemoveItem = async (id: any) => {
        await removeFromWishlist(id)
        console.log("removed from wishlist")
    }
    return (
        <div className=" mx-4 sm:mx-8 md:mx-16 lg:mx-28 xl:mx-40 mt-20 mb-24">
            <h1 className="text-2xl font-bold mb-2">Your Wishlist</h1>
            <p className="mb-8 text-base text-gray-500">All products that you kept for later are here.</p>

            {
                loading ? <div className=' flex flex-col gap-6'>
                    <WishlistSkeleton />
                    <WishlistSkeleton />
                    <WishlistSkeleton />
                </div> : wishlist?.items?.length > 0 ?
                    <div className="grid grid-cols-1  gap-8">
                        {wishlist?.items?.map((item: any) => (
                            <Card key={item?.post?._id} className="mb-4">
                                <CardContent className="  relative">
                                    <div className="flex items-start flex-col gap-5 sm:gap-4 sm:flex-row">

                                        <Link href={`/property/${item?.post?._id}`} aria-label='Link'>
                                            <Image src={item?.post?.images?.[0]} alt={"Image"} width={80} height={80} className="rounded-md w-40 h-36 sm:w-36 " />
                                        </Link>
                                        <div className="sm:ml-4 flex-grow space-y-1.5 1">
                                            <Link href={`/property/${item?.post?._id}`} aria-label='Link'>
                                                <h3 className=" text-lg font-semibold line-clamp-2 sm:line-clamp-1 sm:mr-8">{item?.post?.title}</h3>
                                            </Link>
                                            <h3 className=" flex items-center text-base font-medium text-gray-500"><MapPinned className="w-4 h-4 mr-1" />{item?.post?.address}</h3>

                                            <div className="flex justify-start text-sm text-gray-500  gap-4 sm:gap-6">
                                                <span className="flex items-center font-medium">
                                                    <Bed className="w-5 h-5 mr-2" /> {item?.post?.bedroom} Bedrooms
                                                </span>
                                                <span className="flex items-center font-medium">
                                                    <Bath className="w-5 h-5 mr-2" /> {item?.post?.bathroom} Bathrooms
                                                </span>
                                                <span className=" hidden sm:flex items-center font-medium">
                                                    <AreaChart className="w-5 h-5 mr-2" /> {item?.post?.size} meters size
                                                </span>
                                            </div>
                                            <p className="text-[15px] text-gray-700 flex font-semibold items-center ">Amount :&nbsp;${item?.post.price?.toFixed(2)}</p>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={` rounded-full ml-4 absolute p-1 top-0 right-0 "}`}
                                            onClick={() => handleRemoveItem(item?._id)}
                                        >
                                            <Trash2 className="h-5 w-5 text-gray-600" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div> : <div className=' flex flex-col gap-3 items-center justify-center my-28'>
                        <MessageCircleWarning className=' h-16 w-16 text-gray-500' />
                        <p className=' text-lg font-semibold text-gray-500'>Your wishlist is Empty.</p>
                    </div>
            }
        </div>
    )
}

export default Wishlist