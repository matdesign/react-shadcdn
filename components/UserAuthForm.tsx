"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context/store";
import Icons from "./Icons";
import { SIGNIN } from "@/app/constants";

const formSchema = z.object({
	username: z.string().trim().min(2, { message: "User name must be atleat 2 characters dear.." }).max(50),
	password: z.string().trim().min(2, { message: "Password must be atleat 2 characters dear.." }).max(50),
});

const UserAuthForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { username, isLogin, setIsLogin, setUsername } = useGlobalContext();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});
	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setIsLoading(true);
		setTimeout(() => {
			setUsername(values.username);
			setIsLogin(true);
			router.push("/home");
		}, 1000);
	}

	useLayoutEffect(() => {
		if (isLogin) {
			router.push("/home");
		}
	}, [isLogin, router]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="enter user name"
									{...field}
									disabled={isLoading}
								/>
							</FormControl>
							<FormDescription>This is your public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="enter password"
									type="password"
									{...field}
									disabled={isLoading}
								/>
							</FormControl>
							<FormDescription>This is your secret password.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="w-full"
					type="submit"
					disabled={isLoading}
				>
					{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
					{SIGNIN}
				</Button>
			</form>
		</Form>
	);
};

export default UserAuthForm;
