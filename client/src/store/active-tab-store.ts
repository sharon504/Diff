import { atom } from "nanostores";

export enum E_PreferenceCategory {
	Profile = "Profile",
	Privacy = "Privacy",
	Account = "Account",
	Notifications = "Notifications",
}

export type T_ProjectsTab = {
	name: "Projects";
};

export type T_PreferencesTab = {
	name: "Preferences";
	activePreference: E_PreferenceCategory;
};

export type T_ActiveTab = T_ProjectsTab | T_PreferencesTab;

export const activeTabAtom = atom<T_ActiveTab>({
	name: "Projects",
});

export const getActiveTab = (): T_ActiveTab => {
	return activeTabAtom.get();
};

export const setActiveTab = (tab: T_ActiveTab) => {
	const activeTab = getActiveTab();
	activeTabAtom.set({ ...activeTab, ...tab });
};
