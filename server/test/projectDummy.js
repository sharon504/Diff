import Project from "../src/models/projects-model.js";

const dummyProjects = [
  // ... (previous dummy projects)
  {
    name: "Project Gamma",
    description: "A cutting-edge AI assistant for businesses",
    owner: "507f1f77bcf86cd799439011",
    techStacks: ["Python", "TensorFlow", "React"],
    status: "active",
    projectURL: "https://projectgamma.ai",
    readmeFile: "",
    contributors: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439011"],
    sponsorship: [
      {
        sponsor: "507f1f77bcf86cd799439011",
        amount: 50000,
        startDate: "2023-03-01",
        endDate: "2024-02-28",
      },
    ],
    vacancies: ["Machine Learning Engineer", "Front-end Developer"],
    applications: [],
    summary:
      "Project Gamma provides AI-powered virtual assistants for businesses.",
  },
  {
    name: "Project Delta",
    description: "A decentralized blockchain-based voting platform",
    owner: "507f1f77bcf86cd799439011",
    techStacks: ["Solidity", "Ethereum", "React Native"],
    status: "completed",
    projectURL: "https://projectdelta.org",
    readmeFile: "",
    contributors: ["507f1f77bcf86cd799439011"],
    sponsorship: [],
    vacancies: [],
    applications: [],
    summary:
      "Project Delta enables secure and transparent voting through blockchain technology.",
  },
  {
    name: "Project Epsilon",
    description: "A cloud-based platform for collaborative coding",
    owner: "507f1f77bcf86cd799439011",
    techStacks: ["Node.js", "React", "MongoDB"],
    status: "active",
    projectURL: "https://projectepsilon.io",
    readmeFile: "",
    contributors: [
      "507f1f77bcf86cd799439011",
      "507f1f77bcf86cd799439011",
      "507f1f77bcf86cd799439011",
    ],
    sponsorship: [],
    vacancies: ["Full-stack Developer", "DevOps Engineer"],
    applications: [
      {
        user: "507f1f77bcf86cd799439011",
        status: "pending",
      },
    ],
    summary:
      "Project Epsilon enables real-time collaboration on code projects.",
  },
  {
    name: "Project Zeta",
    description: "An e-commerce platform for sustainable fashion",
    owner: "507f1f77bcf86cd799439011",
    techStacks: ["Ruby on Rails", "PostgreSQL", "React"],
    status: "active",
    projectURL: "https://projectzeta.com",
    readmeFile: "",
    contributors: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439011"],
    sponsorship: [
      {
        sponsor: "507f1f77bcf86cd799439011",
        amount: 20000,
        startDate: "2023-01-01",
        endDate: "2023-12-31",
      },
    ],
    vacancies: ["Back-end Developer", "UI/UX Designer"],
    applications: [],
    summary:
      "Project Zeta promotes sustainable fashion through an online marketplace.",
  },
  {
    name: "Project Eta",
    description: "A mobile app for tracking personal fitness and nutrition",
    owner: "507f1f77bcf86cd799439011",
    techStacks: ["React Native", "Node.js", "MongoDB"],
    status: "active",
    projectURL: "https://projecteta.app",
    readmeFile: "",
    contributors: ["507f1f77bcf86cd799439011"],
    sponsorship: [],
    vacancies: ["Mobile Developer", "Data Analyst"],
    applications: [
      {
        user: "507f1f77bcf86cd799439011",
        status: "accepted",
      },
      {
        user: "507f1f77bcf86cd799439011",
        status: "rejected",
      },
    ],
    summary: "Project Eta helps users track their fitness and nutrition goals.",
  },
  {
    name: "Project Theta",
    description: "An open-source platform for online learning",
    owner: "507f1f77bcf86cd799439011",
    techStacks: ["Django", "PostgreSQL", "React"],
    status: "active",
    projectURL: "https://projecttheta.edu",
    readmeFile: "",
    contributors: [
      "507f1f77bcf86cd799439011",
      "507f1f77bcf86cd799439011",
      "507f1f77bcf86cd799439011",
    ],
    sponsorship: [
      {
        sponsor: "507f1f77bcf86cd799439011",
        amount: 30000,
        startDate: "2023-06-01",
        endDate: "2024-05-31",
      },
    ],
    vacancies: ["Instructor", "Content Creator"],
    applications: [],
    summary:
      "Project Theta provides free online courses and educational resources.",
  },
  {
    name: "Project Iota",
    description: "A social networking platform for professionals",
    owner: "507f1f77bcf86cd799439011",
    techStacks: ["Node.js", "React", "PostgreSQL"],
    status: "active",
    projectURL: "https://projectiota.net",
    readmeFile: "",
    contributors: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439011"],
    sponsorship: [],
    vacancies: ["Back-end Developer", "Front-end Developer"],
    applications: [
      {
        user: "507f1f77bcf86cd799439011",
        status: "pending",
      },
      {
        user: "507f1f77bcf86cd799439011",
        status: "accepted",
      },
    ],
    summary: "Project Iota connects professionals and facilitates networking.",
  },
  {
    name: "Project Kappa",
    description: "A decentralized platform for secure file storage",
    owner: "507f1f77bcf86cd799439011",
    techStacks: ["Go", "IPFS", "React"],
    status: "completed",
    projectURL: "https://projectkappa.io",
    readmeFile: "",
    contributors: ["507f1f77bcf86cd799439011"],
    sponsorship: [],
    vacancies: [],
    applications: [],
    summary:
      "Project Kappa provides secure and decentralized file storage using IPFS.",
  },
  {
    name: "Project Lambda",
    description: "A cloud-based platform for data analysis and visualization",
    owner: "507f1f77bcf86cd799439011",
    techStacks: ["Python", "Dash", "AWS"],
    status: "active",
    projectURL: "https://projectlambda.cloud",
    readmeFile: "",
    contributors: [
      "507f1f77bcf86cd799439011",
      "507f1f77bcf86cd799439011",
      "507f1f77bcf86cd799439011",
    ],
    sponsorship: [
      {
        sponsor: "507f1f77bcf86cd799439011",
        amount: 40000,
        startDate: "2023-04-01",
        endDate: "2024-03-31",
      },
    ],
    vacancies: ["Data Scientist", "DevOps Engineer"],
    applications: [],
    summary:
      "Project Lambda provides advanced data analysis and visualization tools.",
  },
];

// Insert dummy projects into the database
const dummyProjectsAdd = async (dummyProjects) => {
  dummyProjects.forEach(async (project) => {
    try {
      const newProject = new Project(project);
      await newProject.save();
      console.log(`Project "${project.name}" saved to the database.`);
    } catch (err) {
      console.error(`Error saving project "${project.name}":`, err);
    }
  });
};

export { dummyProjectsAdd, dummyProjects };
