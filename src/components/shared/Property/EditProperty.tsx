"use client"
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import ReactQuill from "react-quill";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import "react-quill/dist/quill.snow.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import UploadWidget from "../../../lib/UploadWidget"
import usePostStore from "@/store/post";
import useUserStore from "@/store/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const PostSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    desc: z.string().min(1, { message: "Description is required" }),
    price: z.number().min(0, { message: "Price must be a non-negative number" }),
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    bedroom: z.number().min(1, { message: "Bedroom count must be at least 1" }),
    bathroom: z.number().min(1, { message: "Bathroom count must be at least 1" }),
    type: z.enum(["rent", "buy"]).default("rent"),
    property: z.enum(["land", "house", "apartment"]).default("apartment"),
    pet: z.enum(["allowed", "not-allowed"]).default("allowed"),
    income: z.string().optional(),
    size: z.number().optional(),
});

type PostSchemaType = z.infer<typeof PostSchema>;


const EditProperty = (id: any) => {
    const { post, fetchPostById, updatePost, removePost } = usePostStore()
    const [images, setImages] = useState<any[]>(post?.images);
    const { user } = useUserStore()
    const { toast } = useToast()
    const router = useRouter()
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        if (user?.token?.length === 0) {
            router.push("/login")
        }
    }, [])
    const form = useForm<PostSchemaType>({
        resolver: zodResolver(PostSchema),
        defaultValues: post
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchPostById(id?.id)
                setIsFetching(false)
            } catch (error) {
                console.log(error)
                setIsFetching(false)
            }
        }
        form.reset(post)
        fetchData()
    }, [])

    useEffect(() => {
        if (!isFetching && post) {
            form.reset(post);
            setImages(post.images || []);
        }
    }, [isFetching, post, form]);
    const handleDelete = async (id: string) => {
        try {
            await removePost(id)
            // console.log(response)
            toast({
                title: "Property deleted successfully."
            })
            router.push(`/profile`)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (values: PostSchemaType) => {
        try {
            setIsLoading(true)
            const data = { ...values, images: images }
            await updatePost(post?._id, data)
            toast({
                title: "Property updated successfully"
            })
            setIsLoading(false)
            router.push(`/property/${post?._id}`)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong."
            })
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    };

    return user?.email && (
        <Card className=" mt-20 mb-24 mx-4 sm:mx-8 md:mx-16 lg:mx-24  xl:mx-32 relative border-none">
            <CardHeader>
                <CardTitle className=" text-xl font-bold ">Upload your property</CardTitle>
                <CardDescription className="  mt-2">Upload your property by filling the details below</CardDescription>
            </CardHeader>
            <br />
            <CardContent>
                <>
                    <div className=" grid-cols-12 mb-6">
                        <label
                            htmlFor="image"
                            className=" col-span-12 w-full   text-base font-semibold text-gray-800 dark:text-gray-200"
                        >
                            {" "}
                            Upload images of your property
                        </label>

                        <div
                            className={` mt-2  ${post?.images?.length > 0
                                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
                                : " flex"
                                }     rounded-md gap-5  mr-1 sm:mr-0`}
                        >
                            {post?.images?.length > 0 &&
                                post?.images &&
                                post?.images?.map((image: string, index: number) => (
                                    <div
                                        key={index}
                                        className="  col-span-1 rounded-md border-2 border-gray-200 dark:border-gray-800 "
                                    >
                                        <img
                                            src={image}
                                            alt="Image"
                                            width={100}
                                            height={100}
                                            className=" cursor-pointer h-32 w-full rounded-md object-cover object-center "
                                        />
                                    </div>
                                ))}
                            <div
                                className={` bg-slate-50 dark:bg-gray-800 ${post?.images?.length < 1
                                    ? " w-[100%] py-[70px] "
                                    : "col-span-1 py-[50px]"
                                    }    flex  justify-center items-center rounded-md border-2 border-gray-300 dark:border-gray-800 shadow-sm focus-within:border-2`}
                            >
                                <UploadWidget
                                    uwConfig={{
                                        cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
                                        uploadPreset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
                                        maxImageFileSize: 2000000,
                                        folder: "real-estate-images",
                                    }}
                                    setState={setImages}
                                />
                            </div>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="col-span-1 sm:col-span-2 md:col-span-3">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Textarea defaultValue={post?.title} placeholder="Enter Title" rows={2} className=" resize-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="desc"
                                render={({ field }) => (
                                    <FormItem className=" col-span-1 sm:col-span-2 md:col-span-3">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <ReactQuill theme="snow" defaultValue={post?.desc} onChange={field.onChange} placeholder="Enter description " />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" defaultValue={post?.price}  {...field} onChange={(e: any) => {
                                                const value = parseInt(e.target.value)
                                                field.onChange(value)
                                            }} placeholder="Enter price" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={post?.address} placeholder="Enter address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={post?.city} placeholder="Enter city" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter image URLs" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                            <FormField
                                control={form.control}
                                name="bedroom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bedrooms</FormLabel>
                                        <FormControl>
                                            <Input type="number" defaultValue={post?.bedroom} onChange={(e: any) => {
                                                const value = parseInt(e.target.value)
                                                field.onChange(value)
                                            }} placeholder="Enter number of bedrooms" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bathroom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bathrooms</FormLabel>
                                        <FormControl >
                                            <Input type="number" defaultValue={post?.bathroom} onChange={(e: any) => {
                                                const value = parseInt(e.target.value)
                                                field.onChange(value)
                                            }} placeholder="Enter number of bathrooms" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={post?.type}  >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={"rent"}>
                                                    Rent
                                                </SelectItem>
                                                <SelectItem value={"buy"}>
                                                    Buy
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="property"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Property</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={post?.property} >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select property" defaultValue={post?.property || "Select Property"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="land">
                                                    Land
                                                </SelectItem>
                                                <SelectItem value="house">
                                                    House
                                                </SelectItem>
                                                <SelectItem value="apartment">
                                                    Apartment
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pet"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pet</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={post?.pet}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={post?.pet} placeholder="Select Pet Info" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={"allowed"}>
                                                    Allowed
                                                </SelectItem>
                                                <SelectItem value={"not-allowed"}>
                                                    Not Allowed
                                                </SelectItem>

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="income"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Income</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={post?.income} placeholder="Enter income information" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Size (in meters)</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={post?.size} type="number" onChange={(e: any) => {
                                                const value = parseInt(e.target.value)
                                                field.onChange(value)
                                            }} placeholder="Enter size" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end w-full mt-6 col-span-1 sm:col-span-2 md:col-span-3">
                                <Button disabled={isLoading} type="submit" className=" w-fit ">
                                    {isLoading ? "Updating" : "Update"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </>
                <Dialog >
                    <DialogTrigger className=" absolute left-4 bottom-4">
                        <Button variant={"destructive"} className=" w-fit ">
                            Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your property.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant={"outline"}>Cancel</Button>
                            <Button onClick={() => handleDelete(post?._id)} variant={"destructive"}>Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </CardContent>
        </Card >
    );
};

export default EditProperty;