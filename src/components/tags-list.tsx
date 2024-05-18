"use client";

import { useRouter } from "next/navigation";
import { badgeVariants } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function TagsList({ tags }: { tags: string[] }) {
	const router = useRouter();

	return (
		<div className="flex gap-2 flex-wrap">
			{tags.map((tag) => (
				<Button
					className={cn(badgeVariants())}
					key={tag}
					onClick={() => {
						router.push(`/?search=${tag}`);
					}}
				>
					{tag}
				</Button>
			))}
		</div>
	);
}
