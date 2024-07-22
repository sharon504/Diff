import React, { useState } from "react";
import { EllipsisVerticalIcon } from "lucide-react";

const Nav = ({ current }: { current: string }) => {
	const [menuActive, setMenuActive] = useState<boolean>(false);
	const toggleMenu = () => setMenuActive(!menuActive);
	return (
		<div className="p-2 ease-in-out duration-300">
			<nav className="w-full px-5 py-1 flex justify-between items-center border rounded-full">
				<a className="text-xl font-bold text-center text-pink-600" href="/">
					Diff
				</a>
				<h1 className="px-2 text-lg font-semibold bg-pink-600/20 rounded-full">
					{current}
				</h1>
				<div className="relative flex">
					<button
						className="text-neutral-600 hover:text-pink-600"
						onClick={toggleMenu}
					>
						<EllipsisVerticalIcon size={24} />
					</button>
					{menuActive && (
						<div className="w-48 absolute top-10 right-2 bg-white border rounded-lg z-[999] ease-in-out duration-500">
							<a
								href="/auth/signin"
								className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100"
							>
								Sign In
							</a>
							<a
								href="/auth/signup"
								className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100"
							>
								Sign Up
							</a>
							<a
								href="/api/auth/signout"
								className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100"
							>
								Sign Out
							</a>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Nav;
