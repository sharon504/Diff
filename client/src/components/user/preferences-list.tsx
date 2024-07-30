import React, { useEffect } from "react";

import { UserIcon } from "lucide-react";

import {
	type T_PreferencesTab,
	activeTabAtom,
	setActiveTab,
	E_PreferenceCategory,
} from "../../store/active-tab-store";
import { useStore } from "@nanostores/react";

type T_PreferenceCategory = {
	name: string;
};

const itemVariants = {
	base: "px-1 py-2 text-xl text-center border rounded-lg hover:bg-pink-600 ease-in-out duration-500",
	active: "bg-pink-600/40 border-2 border-pink-600",
};

const PreferenceListItems: Array<T_PreferenceCategory> = [
	{
		name: "Profile",
	},
	{
		name: "Privacy",
	},
	{
		name: "Account",
	},
	{
		name: "Notifications",
	},
];

const PreferencesList = () => {
	const activeTab = useStore(activeTabAtom) as T_PreferencesTab;
	useEffect(() => {
		setActiveTab({
			name: "Preferences",
			activePreference: "Profile" as E_PreferenceCategory,
		});
	}, []);
	return (
		<div className="border w-1/4 p-3 flex flex-col items-center flex-shrink-0 rounded-xl">
			<div className="w-1/2 aspect-square flex items-center justify-center">
				<UserIcon size={64} />
			</div>
			<div className="w-full p-1 flex flex-col gap-2">
				{PreferenceListItems.map((item) => (
					<h2
						className={`${itemVariants.base} ${
							activeTab.activePreference === item.name
								? itemVariants.active
								: ""
						}`}
						onClick={() =>
							setActiveTab({
								name: "Preferences",
								activePreference: item.name as E_PreferenceCategory,
							})
						}
					>
						{item.name}
					</h2>
				))}
			</div>
		</div>
	);
};

export default PreferencesList;
