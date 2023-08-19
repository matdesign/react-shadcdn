"use client";

import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { useGlobalContext } from "../context/store";
import { useLayoutEffect } from "react";
import SidebarNav from "@/components/SidebarNav";

const inter = Inter({ subsets: ["latin"] });

const sidebarNavItems: ISidebarNavItem[] = [
	{
		title: "Agents",
		href: "/home",
	},
	{
		title: "Settings",
		href: "/home/settings",
	},
];

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	const { username, isLogin } = useGlobalContext();
	const router = useRouter();

	useLayoutEffect(() => {
		if (!isLogin) {
			router.replace("/");
		}
	}, [isLogin, router]);

	return (
		<div className="flex">
			<aside className="w-1/5">
				<h1 className="text-4xl my-8 mx-3 text-center font-bold">maxo.ai</h1>
				<SidebarNav items={sidebarNavItems} />
			</aside>

			{children}
		</div>
	);
}
