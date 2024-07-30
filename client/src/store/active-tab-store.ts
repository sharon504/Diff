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

export const setActiveTab = (tab: T_ActiveTab) => {
	activeTabAtom.set(tab);
};
