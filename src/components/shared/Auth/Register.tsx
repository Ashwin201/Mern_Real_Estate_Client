"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import logoText from "../../../assets/logo_text.png"
import logoImage from "../../../../public/assets/logo.webp"
import defaultLogo from "../../../../public/assets/default.jpg"

import Image from 'next/image';
import Link from 'next/link';
import registerImg from "../../../../public/assets/signin.png"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUser } from "@/themeApi/auth"
import { LucideEye, LucideEyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import UploadWidget from '@/lib/UploadWidget';


const RegisterSchema = z.object({
    fullName: z.string().min(3, "Name is required (must have atleast 3 character)."),
    email: z.string().email("Please enter valid email"),
    password: z.string().min(6, "Passowrd must have atleast 6 characters."),
})

type RegisterSchemaValues = z.infer<typeof RegisterSchema>
const Register = () => {
    const [avatar, setAvatar] = useState([]);
    const router = useRouter()
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<RegisterSchemaValues>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",

        }
    })

    async function OnSubmit(values: RegisterSchemaValues) {
        try {
            // console.log(values)
            const data = { ...values, avatar: avatar[0] }
            const response: any = await registerUser(data)
            // console.log(response)
            if (response?.status === 201) {
                toast({
                    title: "Registration Successful.",
                    description: "Congratulation, you have registered your account.",
                })
                form.reset()
                router.push("/login")
            } else if (response?.status === 400) {
                toast({
                    variant: "destructive",
                    title: "Registration Failed.",
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
        <div className="flex flex-col md:flex-row  h-screen  md:h-screen w-full overflow-hidden  relative">
            {/* Left side */}
            <div className=" w-[100%] h-full md:w-[50%] bg-white  px-2 min-[660px]:px-10  flex flex-col  lg:px-[70px] xl:px-36 justify-center  items-start  md:mt-auto  md:my-auto">
                <Image src={logoImage} alt="logo" className=" w-32 h-auto ml-3 mb-2 " />
                <Card className=' border-none shadow-none -mx-2  '>
                    <CardHeader>
                        <CardTitle className=' flex gap-2 items-center text-2xl font-bold mb-1.5'>Welcome to Homio </CardTitle>
                        <CardDescription className=' text-gray-400 dark:text-gray-700 text-sm font-normal tracking-normal'>
                            Welcome to Homio, the ultimate platform designed to guide you on
                            your journey to finding your dream home.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center w-full my-4 ">
                            <div className="relative   cursor-pointer w-24 h-24">
                                <Image
                                    src={avatar[0] || defaultLogo}
                                    width={100}
                                    height={100}
                                    alt="Profile Picture"
                                    className=" w-24 h-24 rounded-full object-cover object-center border-2 border-gray-300 dark:border-gray-900"
                                />
                                <span className=" flex justify-center items-center z-20 bg-gray-100 dark:bg-gray-900 p-2 rounded-full shadow-md shadow-gray-300 dark:shadow-gray-600 absolute -bottom-1 -right-1">
                                    {" "}
                                    <UploadWidget
                                        uwConfig={{
                                            cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
                                            uploadPreset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
                                            multiple: false,
                                            maxImageFileSize: 2000000,
                                            folder: "avatars",
                                        }}
                                        setState={setAvatar}
                                    />
                                </span>
                            </div>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(OnSubmit)} className=' space-y-4'>

                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name *</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder=' Enter Your Name' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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

                                {/* <FormField
                                        control={form.control}
                                        name="profile.profilePhoto"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Upload Image</FormLabel>
                                                <FormControl>
                                                    <Input type="file" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                <Button type="submit" className="w-full">Register</Button>
                            </form>
                        </Form>
                    </CardContent>
                    <div className=' flex font-medium text-sm text-gray-500 justify-end mt-2 gap-1'>Already have an account? <Link href="/login" className="text-blue-600">Sign In</Link></div>
                </Card>
            </div>
            <div className=' hidden sm:block text-gray-400 dark:text-gray-600 text-[15px] absolute bottom-4 md:right-4 text-center md:text-end w-full '>
                Copyright @2024, Ashmin Sharma
            </div>


            {/* Right side */}
            <div className=" hidden md:flex w-[50%] text-white h-[100vh] justify-center items-center   bg-gradient-to-l from-purple-950 to-purple-800 md:rounded-l-3xl shadow-gray-500 shadow-xl ">
                <Image src={registerImg} alt="logo" className=" w-full sm:w-[380px] h-auto  mx-auto px-5" />

            </div>
        </div >
    );
};

export default Register