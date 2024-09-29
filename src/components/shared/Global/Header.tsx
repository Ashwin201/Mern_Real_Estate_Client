"use client"
import {
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import logoImage from "../../../../public/assets/logo.webp"
import { CircleUserIcon, File, Heart, Home, LogIn, Menu, PlusSquare, ShoppingCartIcon, UserCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { logoutUser } from "@/themeApi/auth"
import { useToast } from "@/hooks/use-toast"
import useUserStore from "@/store/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useCartStore from "@/store/cart"
import { useEffect, useState } from "react"
import useWishlistStore from "@/store/wishlist"
import { deleteCookie } from "cookies-next"
const navLinks = [
    {
        id: 1,
        href: "/",
        title: "Home",
        icon: <Home className="h-4 w-4" />
    },
    {
        id: 2,
        href: "/property",
        title: "Property",
        icon: <File className="h-4 w-4" />
    },
    {
        id: 3,
        href: "/create-property",
        title: "Create Property",
        icon: <PlusSquare className="h-4 w-4" />
    },

]
const Header = () => {
    const pathName = usePathname()
    const router = useRouter()
    const { toast } = useToast()
    const { user, setUser } = useUserStore()
    const { cartCount, fetchCart } = useCartStore()
    const { wishlistCount, fetchWishlist } = useWishlistStore()
    const [open, setOpen] = useState<boolean>(false)
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                await fetchCart()
            } catch (error) {
                console.log(error)
            }
        }
        fetchCartData()
    }, [])

    useEffect(() => {
        const fetchWishlistData = async () => {
            try {
                await fetchWishlist()
            } catch (error) {
                console.log(error)
            }
        }
        fetchWishlistData()
    }, [])

    const handleLogOut = async () => {
        try {
            const response = await logoutUser()
            if (response?.status === 201) {
                setUser({})
                deleteCookie("authToken")
                toast({
                    title: "Logged out.",
                    description: "You have logged out successfully.",
                })
                router.refresh()
            } else {
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Please try again later.",
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    return pathName.startsWith("/register") || pathName.startsWith("/login") ? "" : (
        <header className={` flex h-14  w-full justify-between items-center gap-4  py-1 ${pathName === "/" ? "bg-slate-100  shadow-md " : "bg-white shadow-sm"} dark:shadow-gray-900 bg-muted/10 px-4 lg:h-[60px]  sm:px-6 md:px-10 lg:px-16 `}>


            <Link href="/" aria-label="logo" >
                <Image src={logoImage} alt="logo" className="  w-14 sm:w-16 h-auto" />
            </Link>

            <div className=" ">
                <nav className="  items-center gap-2  px-2 text-sm font-medium hidden sm:flex">
                    {
                        navLinks?.map((link: any) => (
                            <Link
                                key={link.id}
                                href={link?.href}
                                aria-label={link?.title}
                                className={`flex items-center gap-3 text-[15px]  rounded-lg px-3 py-2 transition-all 
                                    ${pathName === link?.href ? " text-gray-950  font-semibold " : "hover:text-primary text-gray-700 font-medium"}
                                    `}
                            >
                                {/* {link?.icon} */}
                                {link?.title}
                            </Link>
                        ))
                    }

                </nav>
            </div>
            <div className=" flex gap-4 items-center">
                <Link href={"/cart"} aria-label="Link" className=" relative ">
                    <Button variant={"ghost"} size={"icon"} className=" rounded-full">
                        <ShoppingCartIcon className=" h-6 w-6  m-2" />
                    </Button>
                    {user?.email && cartCount > 0 && <div className=" w-5 h-5 flex justify-center items-center absolute -top-1 -right-1 p-1 bg text-primary-foreground bg-primary rounded-full text-xs">
                        {user?.email &&
                            cartCount}</div>}
                </Link>
                <Link href={"/wishlist"} aria-label="Link" className=" relative  mr-2">
                    <Button variant={"ghost"} size={"icon"} className=" rounded-full ">
                        <Heart className=" h-6 w-6 m-2" />
                    </Button>
                    {user?.email && wishlistCount > 0 && <div className=" w-5 h-5 flex justify-center items-center absolute -top-1 -right-1 p-1 bg text-primary-foreground bg-primary rounded-full text-xs">
                        {user?.email &&
                            wishlistCount}</div>}
                </Link>
                {user?.token?.length > 0 ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            {user?.avatar ?
                                <Avatar className=" w-9 h-9">
                                    <AvatarImage src={user?.avatar} className=" cursor-pointer w-9 h-9" />
                                    <AvatarFallback>{user?.fullName}</AvatarFallback>
                                </Avatar>
                                :
                                <Avatar className=" w-9 h-9">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName?.split("")[0]}`} className=" cursor-pointer w-9 h-9" />
                                    <AvatarFallback>{user?.fullName}</AvatarFallback>
                                </Avatar>
                            }
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className=" p-4">
                            <div className=" w-full flex flex-col justify-start pb-1.5 ">
                                <CardTitle className=" mb-1">{user?.fullName}</CardTitle>
                                <CardDescription >{user?.email}</CardDescription>
                            </div>
                            <DropdownMenuSeparator />
                            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                            <DropdownMenuItem >
                                <Link href={"/profile"} aria-label="Profile" className=" flex gap-2 items-center text-sm font-medium text-gray-800 dark:text-gray-200">
                                    <CircleUserIcon className=" h-5 w-5" /> &nbsp;Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogOut} className=" flex gap-2 items-center text-sm font-medium text-gray-800 dark:text-gray-200"><LogIn className=" h-5 w-5 rotate-180" /> &nbsp;Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    : <div className=" hidden sm:flex items-center gap-2">
                        <Button variant={"outline"} className=" hidden md:flex">
                            <Link href={"/login"} aria-label="Login">Sign In</Link>
                        </Button>
                        <Button >
                            <Link href={"/register"} aria-label="Register">Sign Up</Link>
                        </Button>
                    </div>
                }

                <Sheet open={open} onOpenChange={setOpen} >
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 sm:hidden bg-slate-100 border-none"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col ">
                        <div className=" flex flex-col gap-5 -mx-2.5 ">
                            <Link href="/" aria-label="logo" className=" -mt-3 ">
                                <Image src={logoImage} alt="logo" className="  w-14 h-auto" />
                            </Link>
                            <nav className="flex flex-col w-full gap-2 text-lg font-medium  mt-3">
                                {
                                    navLinks?.map((link: any) => (
                                        <Link
                                            key={link.id}
                                            href={link?.href}
                                            onClick={() => setOpen(false)}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-1  font-medium transition-all  w-full hover:text-primary-foreground hover:bg-primary
                                                ${pathName === link?.href ? "text-primary-foreground bg-primary" : "text-gray-800"}
                                                `}
                                        >
                                            {link?.icon}
                                            {link?.title}
                                        </Link>
                                    ))
                                }

                            </nav>
                        </div>
                        {
                            user && user?.token?.length > 0 ? (
                                <div className="mt-auto -mx-2 flex gap-2 flex-col">
                                    <Button size={"lg"} className="flex gap-2 items-center w-full" onClick={() => { handleLogOut(), setOpen(false) }} variant={"outline"}><LogIn className=" h-5 w-5 rotate-180" /> &nbsp;Logout</Button>
                                    <Button size={"lg"} className="w-full border-none flex items-center gap-1.5" onClick={() => setOpen(false)}>
                                        <Link href={"/profile"} aria-label="Link" >
                                            <UserCircle2 className=" h-5 w-5" />   Profile
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col w-full gap-3 mt-auto -mx-2">
                                    <Link href={"/login"} aria-label="Login">
                                        <Button size={"lg"} onClick={() => setOpen(false)} variant={"outline"}>
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href={"/register"} aria-label="Register">
                                        <Button size={"lg"} onClick={() => setOpen(false)} >
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            )
                        }

                    </SheetContent>
                </Sheet>
            </div>
        </header >
    )
}

export default Header