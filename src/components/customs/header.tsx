'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight, ChevronRight, Search, UserCircle, X } from "lucide-react";
import { LoginForm } from "../login-form";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Input } from "../ui/input";

interface HeaderProps {
    className?: string
    menus?: Menu[] | null
}

type Menu = {
    name: string
    desc?: string
    display?: "list" | "grid"
    list?: {
        name: string
        href: string
    }[]
    slug?: string
}

const Header: FunctionComponent<HeaderProps> = ({ className, menus }) => {
    const [offset, setOffset] = useState(0);
    const [openSearch, setOpenSearch] = useState(false)
    const [openAuth, setOpenAuth] = useState(false)
    useEffect(() => {
        function onScroll() {
            setOffset(window.scrollY);
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [])
    return (<>
        <header
            data-scrolling={offset > 50}
            className={cn("top-0 data-[scrolling=true]:-top-10 duration-300 fixed w-full z-50 left-0", className)}>
            <div data-top={offset < 50} className="bg-black border-b border-transparent text-white">
                <div data-top={offset < 50} className="max-w-6xl mx-auto flex gap-5 py-3 data-[top=true]:*:hover:text-orange-300">
                    <Link href={"/company/brand-assets"} className="text-xs font-medium">
                        Brand Assets
                    </Link>
                    <Link href={"/company/media-center"} className="text-xs font-medium">
                        Media Center
                    </Link>
                    <Link href={"/contact-us"} className="text-xs font-medium">
                        Contact Us
                    </Link>
                    <span className="ml-auto text-xs opacity-75">
                        GSTIN: 20AAPCR0279N1Z0
                    </span>
                </div>
            </div>
            <div data-top={offset < 50} data-scrolling={offset > 50} className="bg-white py-2 group duration-300 border-b-2 shadow-[0_8px_0_0] shadow-neutral-400/20 border-black data-[top=true]:shadow-transparent data-[top=true]:border-white/20">
                <div className="max-w-6xl mx-auto h-full flex items-center">
                    <Link href={"/"} className="mr-10">
                        <Image src={"/logo.png"} width={120} height={50} alt="Rokad's Logo" unoptimized />
                    </Link>
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            {menus?.map((item, i) => item.slug ? <NavigationMenuItem key={i}>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href={"/" + item.slug}>{item.name}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem> : <NavigationMenuItem key={i}>
                                <NavigationMenuTrigger className="text-sm">{item.name}</NavigationMenuTrigger>
                                <NavigationMenuContent className="border-0! bg-transparent! pt-4! shadow-none!">
                                    {item.display === "grid" && <ul className="grid w-[600px] border border-neutral-100 rounded-lg p-4 bg-white grid-cols-2 gap-4">
                                        <li className="p-4 col-span-2">
                                            <div className="font-medium text-xl">{item.name}</div>
                                            <div className="text-muted-foreground overflow-ellipsis">
                                                {item.desc}
                                            </div>
                                        </li>
                                        {item.list?.map((nav, i) => <li key={i}>
                                            <NavigationMenuLink asChild className="p-4 pl-6 group/ml border rounded-full flex flex-row items-center">
                                                <Link href={nav.href}>
                                                    {nav.name}
                                                    <ChevronRight strokeWidth={1} className="ml-auto size-6 opacity-0 group-hover/ml:opacity-100 group-hover/ml:translate-x-1 duration-300" />
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>)}
                                    </ul>}
                                    {item.display === "list" && <ul className="w-64 border border-neutral-100 rounded-lg p-4 bg-white grid-cols-2 gap-4">
                                        {item.list?.map((nav, i) => <li key={i}>
                                            <NavigationMenuLink asChild className="p-4 rounded-full pl-6 group/ml flex flex-row items-center">
                                                <Link href={nav.href}>
                                                    {nav.name}
                                                    <ChevronRight strokeWidth={1} className="ml-auto size-6 opacity-0 group-hover/ml:opacity-100 group-hover/ml:translate-x-1 duration-300" />
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>)}
                                    </ul>}
                                </NavigationMenuContent>
                            </NavigationMenuItem>)}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="ml-auto flex items-center">
                        <Button variant={"secondary"} onClick={() => setOpenSearch(true)} size={"icon"} className="size-9 bg-transparent hover:text-orange-600 ml-4 shadow-none cursor-pointer">
                            <Search className="size-5" />
                        </Button>
                        <Button variant={"secondary"} onClick={() => setOpenAuth(true)} size={"icon"} className="size-9 bg-transparent hover:text-orange-600 ml-2 shadow-none cursor-pointer">
                            <UserCircle className="size-5" />
                        </Button>
                        <Button className="ml-2 bg-orange-600 hover:bg-orange-700" size={"sm"} asChild>
                            <Link href={"/contact-us"}>
                                Let&apos;s talk <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
        <div data-open={openAuth} className="fixed opacity-0 invisible data-[open=true]:opacity-100 data-[open=true]:visible top-0 p-10 left-0 flex items-center gap-10 duration-300 bg-black/30 h-screen w-full z-99">
            <div data-open={openAuth} className="bg-white rounded-xl translate-x-10 opacity-0 data-[open=true]:opacity-100 data-[open=true]:translate-x-0 duration-500 flex flex-col p-8 ml-auto relative w-96 h-full">
                <Button className="rounded-full absolute top-8 right-8" size={"icon"} onClick={() => setOpenAuth(false)}>
                    <X className="size-7" strokeWidth={1} />
                </Button>
                <Image src={"/logo.png"} width={120} height={50} alt="Rokad's Logo" unoptimized />
                <LoginForm className="mt-20" />
            </div>
        </div>
        <div data-open={openSearch} data-top={offset < 50} className="fixed opacity-0 invisible data-[open=true]:opacity-100 data-[open=true]:visible data-[top=true]:top-26 top-16 p-2 left-0 duration-300 w-full h-screen bg-black/10 z-99">
            <div className="max-w-6xl mx-auto flex items-center gap-5 justify-center">
                <div data-open={openSearch} className="bg-white rounded-xl translate-y-10 opacity-0 data-[open=true]:opacity-100 data-[open=true]:translate-y-0 duration-500 flex flex-col relative w-full">
                    <Input className="p-6 border-0 rounded-xl" placeholder="Search the term..." autoFocus />
                </div>
                <Button data-open={openSearch} className="rounded-full translate-y-10 opacity-0 data-[open=true]:opacity-100 data-[open=true]:translate-y-0 duration-500" size={"icon"} onClick={() => setOpenSearch(false)}>
                    <X className="size-6" />
                </Button>
            </div>
        </div>
    </>);
}

export default Header;