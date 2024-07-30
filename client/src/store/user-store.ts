import { atom } from "nanostores";
import { type T_project } from "./projects-store";

export type T_Profile = {
	profile_picture: string;
	year_of_study: number;
	tech_stacks: string[];
	description: string;
	projects: T_project[];
	cv: string;
	contact: {
		portfolio: string;
		linkedin: string;
		github: string;
		phone: string;
		email: string;
	};
	sponsored_projects: T_project[];
};

export type T_Privacy = {
	profile_visibility: {
		profile_picture: boolean;
		year_of_study: boolean;
		tech_stacks: boolean;
		description: boolean;
		projects: boolean;
		cv: boolean;
		contact: {
			portfolio: boolean;
			linkedin: boolean;
			github: boolean;
			phone: boolean;
			email: boolean;
		};
		sponsored_projects: boolean;
	};
};

export type T_Preferences = {
	theme: string;
	privacy: T_Privacy;
	diff_assist: boolean;
};

export type T_User = {
	name: string;
	username: string;
	email: string;
	profile: T_Profile;
	preferences: T_Preferences;
};

export const userAtom = atom<T_User>({
	name: "",
	username: "",
	email: "",
	profile: {
		profile_picture: "",
		year_of_study: 0,
		tech_stacks: [],
		description: "",
		projects: [],
		cv: "",
		contact: {
			portfolio: "",
			linkedin: "",
			github: "",
			phone: "",
			email: "",
		},
		sponsored_projects: [],
	},
	preferences: {
		theme: "system",
		privacy: {
			profile_visibility: {
				profile_picture: true,
				year_of_study: true,
				tech_stacks: true,
				description: true,
				projects: true,
				cv: true,
				contact: {
					portfolio: true,
					linkedin: true,
					github: true,
					phone: true,
					email: true,
				},
				sponsored_projects: true,
			},
		},
		diff_assist: true,
	},
});

export const getUser = (): T_User => {
	return userAtom.get();
};

export const setProfile = (profile: T_Profile) => {
	const user = getUser();
	user.profile = profile;
	userAtom.set(user);
};

export const setPreferences = (preferences: T_Preferences) => {
	const user = getUser();
	user.preferences = preferences;
	userAtom.set(user);
};

