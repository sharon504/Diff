const summary =
	"Provide a summary of the given text only in text in a single paragraph with maximum of 4 sentences";
const description =
	"Provide a detailed description of the given text only in text in a single paragraph with maximum of 6 sentences";
const tech_stacks =
	"give me a comma separated string containing all the tech stacks required by the project based on this abstract. I DO NOT want arrays, json objects, or any other fancy stuff. simple plain comma separated words corresponding to the tech stack for the project, if there are not tech stacks, just type ''";
const prompts = { summary, description, tech_stacks };

export default prompts;
