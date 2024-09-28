"use client"
import React, { useEffect, useState } from "react";
import ImagesSlider from "../Global/ImageSlider";
import { Heart, ShoppingCart } from "lucide-react";
import usePostStore from "@/store/post";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCartStore from "@/store/cart";
import { useToast } from "@/hooks/use-toast";
import useWishlistStore from "@/store/wishlist";
import PropertyDetailSkeleton from "../Skeletons/PropertyDetailSkeleton";
import useUserStore from "@/store/auth";
import { useRouter } from "next/navigation";
// import SavePost from "../shared/SavePost";

const PropertyDetail = ({ id }: any) => {
    const { user } = useUserStore()
    const { toast } = useToast()
    const { post, fetchPostById } = usePostStore()
    const [loading, setLoading] = useState<boolean>(true)
    const { cart, addToCart, fetchCart } = useCartStore()
    const { wishlist, addToWishlist, fetchWishlist } = useWishlistStore()
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchPostById(id)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    // console.log(cart)
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                await fetchCart()
                // console.log(response)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCartData()
    }, [cart?.items?.length])
    useEffect(() => {

        const fetchWishlistData = async () => {
            try {
                await fetchWishlist()
                // console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchWishlistData()
    }, [wishlist?.items?.length])
    const handleAddtoCart = async (id: string) => {

        if (!user?.email) {
            toast({
                title: "Failed",
                description: "Please authenticate yourself before adding property to cart."
            })
            router.push("/login")
            return
        }
        const data: any = cart?.items?.find((item: any) => item?.post?._id === id)
        if (data) {
            console.log("Item already in cart")
            toast({
                title: "Property already present in cart"
            })
            return;
        }
        try {
            await addToCart(id)
            if (!data) {
                toast({
                    title: "Property added to cart."
                })
                return;
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleAddtoWishlist = async (id: string) => {

        if (!user?.email) {
            toast({
                title: "Failed",
                description: "Please authenticate yourself before adding property to wishlist."
            })
            router.push("/login")
            return
        }
        const data: any = wishlist?.items?.find((item: any) => item?.post?._id === id)
        if (data) {
            toast({
                title: "Property already present in wishlist."
            })
            return;
        }
        try {
            const response = await addToWishlist(id)
            if (!data) {
                toast({
                    title: "Property added to wishlist."
                })
                return;
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=" mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 mt-20 mb-24">
            {loading ? <PropertyDetailSkeleton /> :
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <ImagesSlider images={post?.images} />
                    </div>
                    <div className="space-y-6">
                        <div className=" flex gap-2 items-center ">
                            <div >
                                {post?.user?.avatar ?
                                    <Avatar className=" w-12 h-12">
                                        <AvatarImage src={post?.user?.avatar} className=" cursor-pointer w-12 h-12" />
                                        <AvatarFallback>{post?.user?.fullName}</AvatarFallback>
                                    </Avatar>
                                    :
                                    <Avatar className=" w-9 h-9">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post?.user?.fullName?.split("")[0]}`} className=" cursor-pointer w-9 h-9" />
                                        <AvatarFallback>{post?.user?.fullName}</AvatarFallback>
                                    </Avatar>
                                }
                            </div>
                            <div className=" flex  flex-col">
                                <h5 className=" text-gray-800 font-semibold"> {post?.user?.fullName}</h5>
                                <p className=" text-gray-600 font-medium">{post?.user?.email}</p>
                            </div>

                        </div>
                        <h1 className="text-xl font-bold">{post?.title}</h1>
                        <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: post?.desc }} ></p>
                        <p className="text-xl text-gray-700 font-semibold mt-2"> Amount : {post?.price ? post?.price?.toLocaleString('en-IN') + '$' : 'N/A'}</p>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">More Information:</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">

                                <li>{post?.bedroom} bedrooms</li>
                                <li>{post?.bathroom} bathrooms</li>
                                <li>{post?.size} meters area</li>
                            </ul>
                        </div>
                        {/* <div className="flex items-center space-x-4">
                        <span className="font-semibold">Quantity:</span>
                        <div className="flex items-center">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={decreaseQuantity}
                                className="h-8 w-8 rounded-r-none"
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="h-8 w-14 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={increaseQuantity}
                                className="h-8 w-8 rounded-l-none"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div> */}
                        <div className=" flex sm:flex-row flex-col gap-2">

                            <Button size={"lg"} variant={"outline"} onClick={() => handleAddtoWishlist(post?._id)} className="w-full md:w-auto text-sm font-medium mr-2">
                                <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                            </Button>
                            <Button size={"lg"} onClick={() => handleAddtoCart(post?._id)} className="w-full md:w-auto ">
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default PropertyDetail;
