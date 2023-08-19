"use client";

import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { useGlobalContext } from "../context/store";
import { useLayoutEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	const { username, isLogin } = useGlobalContext();
	const router = useRouter();

	useLayoutEffect(() => {
		if (!isLogin) {
			router.replace("/");
		}
	}, [isLogin, router]);

	return (
		<div>
			<h1>User Name: {username}</h1>
			{children}
		</div>
	);
}
