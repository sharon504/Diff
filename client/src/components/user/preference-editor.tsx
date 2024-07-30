import React from "react";

import { useStore } from "@nanostores/react";

import {
	type T_PreferencesTab,
	activeTabAtom,
} from "../../store/active-tab-store";

const PreferenceEditor = () => {
	const activeTab = useStore(activeTabAtom) as T_PreferencesTab;
	return (
		<div className="border w-full p-3 rounded-xl">
			<h1 className="text-xl font-bold text-center">
				{activeTab.activePreference}
			</h1>
		</div>
	);
};

export default PreferenceEditor;
