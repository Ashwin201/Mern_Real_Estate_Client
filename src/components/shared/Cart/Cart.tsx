"use client"

import { useEffect, useState } from 'react'
import { AlertCircle, AreaChart, Bath, Bed, CheckCircle, CheckCircleIcon, ListRestart, MapPinned, MessageCircleWarning, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import useCartStore from '@/store/cart'
import CartSkeleton from '../Skeletons/CartSkeleton'

import { loadStripe } from "@stripe/stripe-js"
import { useToast } from '@/hooks/use-toast'

function Cart() {
    const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
    const { cart, removeCartItem, fetchCart, resetCart } = useCartStore()
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()
    const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentFailed, setPaymentFailed] = useState(false)

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                await fetchCart()
                // console.log(response)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCartData()
    }, [cart?.items?.length])

    const handleRemoveItem = async (id: any) => {
        await removeCartItem(id)
        // console.log(response)
    }

    const calculateTotal = () => {
        interface CartItem {
            post: {
                price: number;
            };
        }
        return cart?.items?.reduce((total: number, item: CartItem) => total + item?.post?.price, 0).toFixed(2) || '0.00'
    }
    const resetCartItems = async () => {
        try {
            await resetCart()
        } catch (error) {
            console.log(error)
        }
    }

    const makePayment = async () => {
        setCheckoutLoading(true)
        try {
            const stripe = await stripePromise
            const body = {
                cart: cart.items
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                credentials: "include"
            });
            // console.log(res);

            if (!res.ok) {
                toast({
                    variant: "destructive",
                    title: "Checkout Failed"
                })
                setPaymentFailed(true)
                setCheckoutLoading(false)
                return;
            }
            const data = await res.json();
            if (stripe) {
                const result = await stripe.redirectToCheckout({ sessionId: data.id });
                // console.log(result);
                if (result.error) {
                    toast({
                        variant: "destructive",
                        title: "Checkout Failed"
                    })
                    setPaymentFailed(true)
                    setCheckoutLoading(false)
                } else {
                    setPaymentSuccess(true)
                    resetCartItems()
                }
            }
            setCheckoutLoading(false)

        } catch (error) {
            console.log(error)
            setPaymentFailed(true)
        } finally {
            setCheckoutLoading(false)
        }
    };

    return (
        <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 mt-20 mb-24">

            <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
            <p className="mb-8 text-base text-gray-500">All properties you added to cart.</p>
            {
                loading ? (
                    <CartSkeleton />
                ) : cart?.items?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            {cart?.items?.map((item: any) => (
                                <Card key={item?.post?._id} className="mb-4">
                                    <CardContent className="relative">
                                        <div className="flex items-start flex-col gap-5 sm:gap-4 sm:flex-row">
                                            <Link href={`/property/${item?.post?._id}`} aria-label='Link' className="rounded-md w-40 sm:w-36 h-36">
                                                <Image src={item?.post?.images?.[0]} alt={"Image"} width={120} height={120} className="rounded-md w-full h-full object-cover" />
                                            </Link>
                                            <div className="sm:ml-4 flex-grow space-y-1.5 1">
                                                <Link href={`/property/${item?.post?._id}`} aria-label='Link'>
                                                    <h3 className="text-lg font-semibold sm:mr-8 line-clamp-2 sm:line-clamp-1">{item?.post?.title}</h3>
                                                </Link>
                                                <h3 className="flex items-center text-base font-medium text-gray-500"><MapPinned className="w-4 h-4 mr-1" />{item?.post?.address}</h3>

                                                <div className="flex justify-start text-sm text-gray-500 gap-4 sm:gap-6">
                                                    <span className="flex items-center font-medium">
                                                        <Bed className="w-5 h-5 mr-2" /> {item?.post?.bedroom} Bedrooms
                                                    </span>
                                                    <span className="flex items-center font-medium">
                                                        <Bath className="w-5 h-5 mr-2" /> {item?.post?.bathroom} Bathrooms
                                                    </span>
                                                    <span className="hidden sm:flex items-center font-medium">
                                                        <AreaChart className="w-5 h-5 mr-2" /> {item?.post?.size} meters size
                                                    </span>
                                                </div>
                                                <p className="text-[15px] text-gray-700 flex font-semibold items-center ">Amount :&nbsp;${item?.post.price?.toFixed(2)}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="ml-4 absolute top-0 right-0"
                                                onClick={() => handleRemoveItem(item?._id)}
                                            >
                                                <Trash2 className="h-5 w-5 text-gray-600" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div>
                            <Card className='space-y-3'>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Separator className="my-4" />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${calculateTotal()}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className=' grid grid-cols-1 gap-2 mt-2'>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button className="w-full flex gap-2 items-center" variant={"outline"}> <ListRestart className=" h-5 w-5" />Reset  Cart</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will delete all properties from your cart.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant={"outline"}>Cancel</Button>
                                                <Button onClick={resetCartItems} >Reset</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Button disabled={checkoutLoading} onClick={makePayment} className="w-full flex gap-2 items-center"><CheckCircleIcon className=" h-5 w-5" />
                                        {checkoutLoading ? " Processing..." : "Book Now"}</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-3 items-center justify-center my-16'>
                        <MessageCircleWarning className='h-16 w-16 text-gray-600' />
                        <p className='text-lg font-semibold text-gray-600'>Your Cart is empty.</p>
                    </div>
                )
            }

            {/* Payment Success Dialog */}
            <Dialog open={paymentSuccess} onOpenChange={setPaymentSuccess}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Payment Successful</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center gap-4 py-8">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                        <p className="text-base font-medium text-gray-500 text-center">
                            Your payment has been processed successfully. Thank you for your purchase!
                        </p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setPaymentSuccess(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Payment Failed Dialog */}
            <Dialog open={paymentFailed} onOpenChange={setPaymentFailed}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center text-red-600">Payment Failed</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center gap-4 py-6">
                        <AlertCircle className="h-16 w-16 text-red-500" />
                        <p className="text-base font-medium text-gray-500 text-center">
                            We&apos;re sorry, but your payment could not be processed. Please try again or contact support for assistance.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setPaymentFailed(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Cart