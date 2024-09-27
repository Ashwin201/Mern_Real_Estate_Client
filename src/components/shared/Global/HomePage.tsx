"use client"
import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, DollarSign, Building, MessageCircleWarning } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import banner from "../../../../public/assets/banner.png";
import img1 from "../../../../public/assets/banner.webp";
import img2 from "../../../../public/assets/person1.jpeg";
import img3 from "../../../../public/assets/person.jpeg";
import usePostStore from "@/store/post";
import PostCard from "./PostCard";
import CardSkeletons from "../Skeletons/CardSkeletons";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },


};

const stagger = {
    visible: { transition: { staggerChildren: 0.4 } }
};

const AnimatedSection = ({ children }: any) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            transition={{ duration: .2 }}
            animate={isInView ? "visible" : "hidden"}
            variants={stagger}
        >
            {children}
        </motion.div>
    );
};

export default function HomePage() {
    const { posts, fetchPosts } = usePostStore()
    const [postLoading, setPostLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (posts?.length === 0) {
                    await fetchPosts()
                    setPostLoading(false)
                } else {
                    setPostLoading(false)
                }
            } catch (error) {
                console.log(error)
                setPostLoading(false)
            }
            // console.log()
        }
        fetchData()
    }, [])

    return (
        <div className="flex flex-col min-h-[80vh]">
            <main className="flex-grow">
                <AnimatedSection>
                    <section className="px-6 py-14 md:py-16 bg-gray-100">
                        <div className="grid gap-12 lg:grid-cols-2 px-4 sm:px-10  md:px-20 lg:px-24 xl:px-32 mx-auto place-items-center">
                            <motion.div className="space-y-4" variants={fadeInUp}>
                                <h1 className="text-4xl tracking-tight font-bold sm:text-5xl xl:text-6xl/none">
                                    Find Your Best Smart Real Estate.
                                </h1>
                                <p className="max-w-[600px] text-gray-500 md:text-lg">
                                    We are a real estate agency that will help you find the best residence you dream of. Let&apos;s discuss for your dream house.
                                </p>
                                <br />
                                <Link href={"/property"} aria-label="Link">
                                    <Button className="w-full sm:w-auto" size="lg">
                                        Explore Now
                                    </Button>
                                </Link>
                            </motion.div>
                            <motion.div
                                className="relative hidden lg:block"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Image
                                    alt="Modern building"
                                    className="object-cover w-full h-full rounded-lg"
                                    height="500"
                                    src={banner}
                                    style={{
                                        aspectRatio: "500/500",
                                        objectFit: "cover",
                                    }}
                                    width="500"
                                />
                                <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-20" />
                            </motion.div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section className="px-6 py-14 bg-white">
                        <div className="max-w-6xl mx-auto space-y-8">
                            <motion.h2 className="text-3xl font-bold text-center" variants={fadeInUp}>
                                How it works?
                            </motion.h2>
                            <div className="grid gap-8 grid-cols-2 md:grid-cols-3">
                                {[
                                    { icon: Building, title: "Select Property" },
                                    { icon: Users, title: "Select Agent" },
                                    { icon: Home, title: "Choose House" },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex flex-col items-center text-center space-y-3"
                                        variants={fadeInUp}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="p-4 bg-blue-100 rounded-full">
                                            <item.icon className="w-9 h-9 text-blue-500" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                        <p className="text-sm tracking-normal text-gray-400">
                                            We are a real estate agency that will help you find the best residence you dream of.
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section className="px-5 py-14 bg-gray-100">
                        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 place-items-center  place-content-between">
                            <motion.div
                                className="relative"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Image
                                    alt="Modern house with pool"
                                    className="object-cover w-full h-full rounded-lg"
                                    height="400"
                                    src={img1}
                                    style={{
                                        aspectRatio: "600/400",
                                        objectFit: "cover",
                                    }}
                                    width="600"
                                />
                                <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-20" />
                            </motion.div>
                            <motion.div className="space-y-4 lg:justify-start " variants={fadeInUp}>
                                <h2 className="text-3xl font-bold">We always select best properties for you.</h2>
                                <p className="text-gray-500">
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected
                                    humour, or randomised words which don&apos;t look even slightly believable.
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                                    {[
                                        { value: "20+", label: "Years Experience" },
                                        { value: "50+", label: "Property Sell" },
                                        { value: "4.5+", label: "Customer Rating" },
                                    ].map((item, index) => (
                                        <motion.div key={index} variants={fadeInUp}>
                                            <p className="text-3xl font-bold mb-2">{item.value}</p>
                                            <p className="text-base font-medium text-gray-500">{item.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section className="px-6 py-14 bg-white">
                        <div className="max-w-6xl mx-auto space-y-10">
                            <motion.h2 className="text-3xl font-bold text-center" variants={fadeInUp}>
                                Why Choose Us
                            </motion.h2>
                            <div className="grid gap-8 md:grid-cols-3">
                                {[
                                    { icon: DollarSign, title: "Property Insurance" },
                                    { icon: Building, title: "Tax Advantage" },
                                    { icon: Users, title: "Lowest Commission" },
                                ].map((item, index) => (
                                    <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05 }}>
                                        <Card className="bg-slate-100">
                                            <CardHeader>
                                                <div className="p-2 bg-blue-100 rounded-full w-fit mb-3">
                                                    <item.icon className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <CardTitle className="text-lg">{item.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-gray-400 mt-2">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section className="px-6 py-14 bg-gray-100">
                        <div className="max-w-6xl mx-auto space-y-10">
                            <motion.h2 className="text-3xl font-bold text-center" variants={fadeInUp}>Featured Properties</motion.h2>

                            {postLoading ?
                                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                    <CardSkeletons />
                                    <CardSkeletons />
                                    <CardSkeletons />
                                </div>
                                : posts?.length > 0 ?
                                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                        {posts?.slice(0, 3)?.map((item: any, index: number) => (
                                            <motion.div key={index} variants={fadeInUp}>
                                                <PostCard data={item} />
                                            </motion.div>
                                        ))}
                                    </div> :
                                    <div className=' flex flex-col gap-3 items-center justify-center my-16'>
                                        <MessageCircleWarning className=' h-16 w-16 text-gray-500' />
                                        <p className=' text-lg font-semibold text-gray-500'>Property not available.</p>
                                    </div>
                            }
                            {/* {
                    posts?.length > 0 &&
                    <div className="text-center">
                        <Button>View All Listing</Button>
                    </div>
                } */}
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section className="px-6 py-14 bg-white">
                        <div className="max-w-6xl mx-auto space-y-10">
                            <motion.h2 className="text-3xl font-bold text-center" variants={fadeInUp}>
                                What our Client are Saying
                            </motion.h2>
                            <div className="grid gap-8 md:grid-cols-2">
                                {[
                                    { image: img2, name: "Julie Robert" },
                                    { image: img3, name: "John Doe" },
                                ].map((item, index) => (
                                    <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05 }}>
                                        <Card className="">
                                            <CardContent className="flex items-start space-x-4 pt-6">
                                                <Image src={item.image} className="w-10 h-10 rounded-full object-cover" alt="Image" />
                                                <div>
                                                    <p className='text-sm text-gray-500'>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                                                        leo.
                                                    </p>
                                                    <p className='mt-2 font-semibold'>{item.name}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
            </main>
        </div>
    );
}