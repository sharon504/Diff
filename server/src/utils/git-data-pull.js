import axios from "axios";
async function fetchRepoData(owner, repo) {
  const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
  const contributorsUrl = `https://api.github.com/repos/${owner}/${repo}/contributors`;
  try {
    const readmeContent = await fetchReadme(readmeUrl);

    const contributors = await fetchContributors(contributorsUrl);
    return { readmeContent, contributors };
  } catch (error) {
    return { error: "Error fetching repo data" };
  }
}

async function fetchReadme(readmeUrl) {
  try {
    const response = await axios.get(readmeUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    const readmeContent = Buffer.from(response.data.content, "base64").toString(
      "utf-8",
    );
    return readmeContent;
  } catch (error) {
    return { error: "Error fetching readme" };
  }
}

async function fetchContributors(contributorsUrl) {
  try {
    const response = await axios.get(contributorsUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    const contributors = response.data.map((contributor) => contributor.login);
    return contributors;
  } catch (error) {
    return { error: "Error fetching contributors" };
  }
}
export default fetchRepoData;
