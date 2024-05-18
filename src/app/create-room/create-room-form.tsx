"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createRoomAction } from "./actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	name: z.string().min(1).max(50),
	description: z.string().min(1).max(250),
	tags: z.string().min(1).max(50),
	githubRepo: z.string().min(1).max(50),
});

export function CreateRoomForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			tags: "",
			githubRepo: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await createRoomAction(values);

		router.push("/");
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Dev Finder is awesome" />
								</FormControl>
								<FormDescription>This is your public room name</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Im working on a sideproject, come join me"
									/>
								</FormControl>
								<FormDescription>
									Please describe what you will be coding on
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="tags"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tags</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="typescript, nextjs, tailwind"
									/>
								</FormControl>
								<FormDescription>
									List your programming languages, frameworks, libraries so
									people can find your content
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="githubRepo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Github Repository</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="https://github.com/account/project"
									/>
								</FormControl>
								<FormDescription>
									Please provide a link to the project you are working on
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
