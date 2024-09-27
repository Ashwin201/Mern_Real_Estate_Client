"use client"
import React, { useEffect, useState } from 'react'
import { FilterPosts } from './FilterProperty'
import usePostStore from '@/store/post'
import PostCard from '../Global/PostCard'
import CardSkeletons from '../Skeletons/CardSkeletons'
import { MessageCircleWarning } from 'lucide-react'
import { CardDescription } from '@/components/ui/card'

const Property = () => {
    const { posts, fetchPosts } = usePostStore()
    const [loading, setLoading] = useState(true)
    // console.log(posts)

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (posts?.length === 0) {
                    await fetchPosts()
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className=' flex space-y-10 flex-col mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 my-20'>
            <div className=' flex flex-row justify-between md:justify-start md:flex-col gap-5 md:gap-10'>
                <div>
                    <h2 className=' text-2xl font-bold'>View Top Listing Properties</h2>
                    <CardDescription className=' mt-2 text-base font-medium text-gray-400'>Here you will find all properties posted by their owners.</CardDescription>
                </div>
                <FilterPosts />
            </div>
            <div>
                {
                    loading ? <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <CardSkeletons />
                        <CardSkeletons />
                        <CardSkeletons />
                        <CardSkeletons />
                        <CardSkeletons />
                        <CardSkeletons />
                    </div>
                        : posts?.length > 0 ?
                            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                {posts?.map((item: any, index: number) => (
                                    <PostCard key={index} data={item} />
                                ))
                                }
                            </div>
                            :
                            <div className=' flex flex-col gap-3 items-center justify-center my-28'>
                                <MessageCircleWarning className=' h-16 w-16 text-gray-500' />
                                <p className=' text-lg font-semibold text-gray-500'>Property not available.</p>
                            </div>
                }
            </div>
        </div>
    )
}

export default Property