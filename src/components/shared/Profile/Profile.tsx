"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useUserStore from '@/store/auth'
import { userPosts } from '@/themeApi/auth'
import React, { useEffect, useState } from 'react'
import PostCard from '../Global/PostCard'
import ProfileSkeleton from '../Skeletons/ProfileSkeleton'
import { MessageCircleWarning } from 'lucide-react'
import useAuthMiddleware from '@/customMiddleware'


const Profile = () => {
    useAuthMiddleware()

    const { user } = useUserStore()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userPosts()
                // console.log(response)
                if (response?.status === 201) {

                    setData(response?.data?.posts)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    return (
        <div className='mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 mt-20 mb-24'>
            {
                loading ? <ProfileSkeleton /> :
                    <>
                        <div className=" flex gap-4 items-center justify-center min-[450px]:justify-start flex-col min-[450px]:flex-row relative ">
                            <div >
                                {user?.avatar ?
                                    <Avatar className=" w-20 h-20">
                                        <AvatarImage src={user?.avatar} className=" cursor-pointer w-20 h-20" />
                                        <AvatarFallback>{user?.fullName}</AvatarFallback>
                                    </Avatar>
                                    :
                                    <Avatar className=" w-20 h-20">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName?.split("")[0]}`} className=" cursor-pointer w-20 h-20" />
                                        <AvatarFallback>{user?.fullName}</AvatarFallback>
                                    </Avatar>
                                }
                            </div>
                            <div className=" flex  flex-col">
                                <h5 className=" text-xl text-gray-800 font-semibold min-[450px]:text-start text-center"> {user?.fullName}</h5>
                                <p className=" text-base text-gray-600 font-medium min-[450px]:text-start text-center">{user?.email}</p>
                            </div>

                            {/* <Link href={"/profile/update"} aria-label='Link'>
                                <Button variant={"outline"} className=' absolute top-0 right-0 flex gap-2 items-center font-medium' ><Edit className=' h-5 w-5' /> <span className=' hidden sm:flex'> &nbsp;Edit Profile</span></Button>
                            </Link> */}

                        </div>
                        <h1 className="text-2xl font-bold mb-2 mt-10">Your Properties</h1>
                        <p className="mb-8 text-base text-gray-500">All properties posted by you.</p>
                        <>
                            {data?.length > 0 ?
                                <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                                    {
                                        data?.map((item: any, index: number) => (
                                            <PostCard key={index}
                                                data={item} edit={true} />
                                        ))
                                    }
                                </div>

                                : <div className=' flex flex-col gap-3 items-center justify-center my-28'>
                                    <MessageCircleWarning className=' h-16 w-16 text-gray-500' />
                                    <p className=' text-lg font-semibold text-gray-500'>You had not posted any property yet.</p>
                                </div>}
                        </>
                    </>
            }
        </div>
    )
}

export default Profile