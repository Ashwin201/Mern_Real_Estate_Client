"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import logoText from "../../../assets/logo_text.png"
import logoImage from "../../../../public/assets/logo.webp"
import loginImage from "../../../../public/assets/signup.webp"
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "@/themeApi/auth"
import { LucideEye, LucideEyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/auth';
import { motion } from "framer-motion"
import useAuthMiddleware from '@/customMiddleware';
const LoginSchema = z.object({
    email: z.string().email("Please enter valid email"),
    password: z.string().min(6, "Passowrd must have atleast 6 characters."),
})

type LoginSchemaValues = z.infer<typeof LoginSchema>
const Login = () => {
    useAuthMiddleware()

    const { user, setUser } = useUserStore()
    const router = useRouter()
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    // console.log(user)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        if (user?.token?.length > 0) {
            router.push("/")
        }
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const form = useForm<LoginSchemaValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }

    })

    async function OnSubmit(values: LoginSchemaValues) {
        try {
            // console.log(values)
            const response: any = await loginUser(values)

            if (response.status === 201) {
                // console.log(response)
                const values = {
                    _id: response?.data?.user?.id,
                    fullName: response?.data?.user?.fullName,
                    email: response?.data?.user?.email,
                    avatar: response?.data?.user?.avatar,
                    token: response?.data?.token
                }
                setUser(values)

                router.push("/")

                toast({
                    title: "Login Successful.",
                    description: "Congratulation, you have logged in successfully..",
                })
                form.reset()
            } else {
                toast({
                    variant: "destructive",
                    title: "Invalid credentials.",
                    description: `${response?.response?.data?.message}`,
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: `Please try again later.`,
            })
            console.log(error)
        }
    }
    return (
        <>

            {loading ?
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className='w-screen h-screen bg-white overflow-x-hidden overflow-y-hidden flex justify-center items-center'
                >
                    <Image src={logoImage} alt="logo" className=" w-32 h-auto  ml-3 mb-2" />
                </motion.div>
                :
                <div className="flex flex-col md:flex-row  h-screen  md:h-screen w-full overflow-hidden relative">
                    {/* Left side */}
                    <div className=" hidden md:flex w-[50%]  h-[100vh] justify-center items-center  bg-gradient-to-r from-purple-950 to-purple-800 shadow-xl  md:rounded-r-3xl shadow-gray-500   ">
                        <Image src={loginImage} alt="logo" className=" px-5 w-full sm:w-[380px] h-auto  mx-auto" />
                    </div>

                    {/* Right side */}
                    <div className=" w-[100%] h-full md:w-[50%] bg-white  px-2 min-[660px]:px-12  flex flex-col  lg:px-[70px] xl:px-36 justify-center  items-start  md:mt-auto  md:my-auto">
                        <Image src={logoImage} alt="logo" className=" w-32 h-auto  ml-3 mb-2" />
                        <Card className=' border-none shadow-none -mx-2 '>
                            <CardHeader>
                                <CardTitle className=' flex gap-2 items-center text-2xl font-bold mb-3 mt-1 '>Welcome Back to Homio</CardTitle>
                                <CardDescription className=' text-gray-400 dark:text-gray-700 text-sm font-normal tracking-normal'>
                                    Welcome to Homio, the ultimate platform designed to guide you on
                                    your journey to finding your dream home. Start your quest for the
                                    perfect home today and turn your dreams into reality.</CardDescription>
                            </CardHeader>
                            <br />
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(OnSubmit)} className=' space-y-5'>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder=' Enter Your Email' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password *</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input placeholder="Enter Your Password" {...field} type={showPassword ? "text" : "password"} />
                                                            <span className=" cursor-pointer absolute inset-y-0 right-1 top-0 grid place-content-center px-2">
                                                                {showPassword ? (
                                                                    <span
                                                                        className=" text-gray-400 dark:text-gray-500"
                                                                        onClick={() => setShowPassword(false)}
                                                                    >
                                                                        <LucideEyeOff size={20} />
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className=" text-gray-400 dark:text-gray-500"
                                                                        onClick={() => setShowPassword(true)}
                                                                    >
                                                                        <LucideEye size={20} />
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}


                                        />

                                        <Button type="submit" className="w-full">Login</Button>
                                    </form>
                                </Form>
                            </CardContent>

                            <div className=' flex font-medium text-sm text-gray-500 justify-end  mt-2 gap-1'>Don&apos;t have an account? <Link href="/register" className="text-blue-600">Sign up</Link></div>
                        </Card>
                    </div>
                    <div className=' hidden sm:block text-gray-400 dark:text-gray-600 text-[15px] absolute bottom-4 md:right-4 text-center md:text-end w-full '>
                        Copyright @2024, Ashmin Sharma
                    </div>
                </div>
            }
        </>
    );
};

export default Login