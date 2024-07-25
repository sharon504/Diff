import { prompt, fetchRepoData, PROMPTS } from "./utils.js";

const fill_project_details = async (project_url) => {
	try {
		const { readmeContent, contributors } = await fetchRepoData(project_url);
		const project_data = {
			readme_file: repo_data.readmeContent,
			contributors: contributors,
			summary: prompt(project.readme_file, PROMPTS.summary),
			description: prompt(project.readme_file, PROMPTS.description),
			tech_stacks: prompt(project.readme_file, PROMPTS.tech_stacks),
		};
	} catch (error) {
		console.log(error);
	}
	return project_data;
};

export default fill_project_details;
