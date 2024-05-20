"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
	const session = useSession();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="link">
					<Avatar className="mr-2">
						<AvatarImage src={session.data?.user?.image ?? ""} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>

					{session.data?.user?.name}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() =>
						signOut({
							callbackUrl: "/",
						})
					}
				>
					<LogOutIcon className="mr-2" />
					Sign Out
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() =>
						signOut({
							callbackUrl: "/",
						})
					}
				>
					<DeleteIcon className="mr-2" />
					Delete Account
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function Header() {
	const session = useSession();
	const isLoggedIn = !!session.data;

	return (
		<header className="py-2 bg-gray-100 dark:bg-gray-900 z-10 relative">
			<div className="container mx-auto flex justify-between items-center">
				<Link
					href="/"
					className="flex gap-2 items-center text-xl hover:underline"
				>
					<Image
						src="/programming.png"
						width="50"
						height="50"
						alt="the application icon of a programmer"
					/>
					DevFinder
				</Link>

				<nav className="flex gap-4">
					{isLoggedIn && (
						<>
							<Link className="hover:underline" href="/browse">
								Browse
							</Link>
							<Link className="hover:underline" href="/your-rooms">
								Your Rooms
							</Link>
						</>
					)}
				</nav>

				<div className="flex items-center gap-4">
					{isLoggedIn && <AccountDropdown />}
					{!isLoggedIn && (
						<Button
							onClick={() =>
								signIn("github", {
									callbackUrl: "/",
								})
							}
							variant="link"
						>
							<LogInIcon className="mr-2" /> Sign In
						</Button>
					)}
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
