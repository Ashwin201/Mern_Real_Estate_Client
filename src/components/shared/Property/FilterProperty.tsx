"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import usePostStore from "@/store/post";
import { Button } from "@/components/ui/button";
import { ListRestart, Settings2 } from "lucide-react";

// Zod Schema

const FilterSchema = z.object({
    city: z.string().optional(),
    property: z.enum(["land", "house", "apartment", ""]).default(""),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional()
});

type Filter = z.infer<typeof FilterSchema>;

// Form Component
const FilterForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
    const [reset, setReset] = useState<boolean>(true)
    const { fetchPosts } = usePostStore()
    const form = useForm<Filter>({
        resolver: zodResolver(FilterSchema)
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (reset) {
                    form.reset({
                        minPrice: undefined,
                        maxPrice: undefined,
                        property: "",
                        city: ""
                    });
                    await fetchPosts()
                    setReset(false);
                    setOpen(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, []);
    const onSubmit = async (data: Filter) => {
        try {
            // console.log(data)
            const requestData = {
                ...data,
                minPrice: data.minPrice ? Number(data.minPrice) : undefined,
                maxPrice: data.maxPrice ? Number(data.maxPrice) : undefined,
            };
            await fetchPosts(requestData)
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" md:grid md:grid-cols-4 lg:grid-cols-5 gap-6 md:space-y-0 md:align-baseline">
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className=" flex flex-col items-start gap-2" >
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter city" {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <br className=' md:hidden' />
                <FormField
                    control={form.control}
                    name="property"
                    render={({ field }) => (
                        <FormItem className=" flex flex-col items-start gap-2">
                            <FormLabel>Property</FormLabel>
                            <Select onValueChange={field.onChange} >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={"house"}>  House  </SelectItem>
                                    <SelectItem value={"land"}>  Land  </SelectItem>
                                    <SelectItem value={"apartment"}>Apartment  </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <br className=' md:hidden' />
                <FormField
                    control={form.control}
                    name="minPrice"
                    render={({ field }) => (
                        <FormItem className=" flex flex-col md:hidden lg:flex items-start gap-2">
                            <FormLabel>Min Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter min price" onChange={(e: any) => {
                                    const value = parseInt(e.target.value)
                                    field.onChange(value)
                                }} className="w-full" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <br className=' md:hidden' />
                <FormField
                    control={form.control}
                    name="maxPrice"
                    render={({ field }) => (
                        <FormItem className=" flex flex-col items-start gap-2">
                            <FormLabel>Max Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter max price" onChange={(e: any) => {
                                    const value = parseInt(e.target.value)
                                    field.onChange(value)
                                }} className="w-full" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className=" flex gap-2  items-baseline pt-8  ">
                    <Button className="  flex gap-2 items-center font-medium tracking-normal" onClick={() => setReset(true)}>
                        <ListRestart className=" h-4 w-4" />  Reset
                    </Button>
                    <Button type="submit" className="  flex gap-2 items-center font-medium tracking-normal">
                        <Settings2 className=" h-4 w-4" />  Filter
                    </Button>

                </div>
            </form>
        </Form>
    );
};

export default FilterForm


export const FilterPosts = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className=" hidden md:block w-full">
                <FilterForm setOpen={setOpen} />
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className=" flex md:hidden">
                    <Button size={"icon"} className=" rounded-full md:hidden">
                        <Settings2 className=" h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className=" flex items-start text-lg font-bold">Filter Property</SheetTitle>
                        <SheetDescription className=" flex items-start  text-left">
                            Write details below for choosing your desire property
                        </SheetDescription>
                        <br className=' md:hidden' />
                        <FilterForm setOpen={setOpen} />
                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </>
    )
}