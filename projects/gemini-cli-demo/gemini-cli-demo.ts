import { ProjectData } from '@/interfaces/projects';

const project: ProjectData = {
  slug: 'gemini-cli-demo',
  metadata: {
    title: 'Gemini CLI Demo',
    name: 'gemini-cli-demo',
    description: 'A showcase of web component-based applications built with Gemini CLI.',
    detailedDescription: `This project is a showcase of web component-based applications built entirely by Gemini, a large language model from Google. The showcase demonstrates Gemini's ability to understand high-level requirements, break them down into smaller tasks, and generate the code for a complete web application.

**Key Features:**
• A showcase of multiple web component-based applications.
• Each app is self-contained and can be launched in a modal window.
• The showcase includes a To-Do List App, a Calculator, a Weather App, a Drawing App, a Data Visualization App, and a JSFiddle Clone.

**Technical Implementation:**
• The entire project is built with vanilla JavaScript, HTML, and CSS, with no external frameworks or libraries (except for Chart.js in the Data Visualization App).
• The application architecture is based on Web Components, with each app and its sub-components built as custom elements.
• The project uses a modular and organized file structure, with each app in its own directory.

**Development Process:**
• The project was built through a collaborative process between the user and Gemini.
• Gemini generated the code, managed the project structure, and wrote the documentation based on natural language prompts from the user.`,
    category: 'AI/CLI Development',
    startDate: '2025-08',
    endDate: '2025-08',
    duration: '1 day',
    role: 'AI Interaction Designer & Project Lead',
    difficulty: 'Medium',
    featured: true
  },
  techStack: [
    {
      category: 'AI Integration',
      items: ['Google Gemini API']
    },
    {
      category: 'Frontend Development',
      items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Web Components']
    },
    {
      category: 'Development Tools',
      items: ['Vercel', 'GitHub']
    }
  ],
  features: [
    {
      title: 'AI-Powered Development',
      description: 'The entire project was built by Gemini, demonstrating the power of AI in software development.',
      impact: 'Showcases the potential of AI to accelerate the development process and build complete applications from scratch.'
    },
    {
      title: 'Web Component Showcase',
      description: 'A collection of self-contained web component-based applications.',
      impact: 'Demonstrates the use of modern web technologies to build modular and reusable UI components without frameworks.'
    }
  ],
  highlights: [
    {
      title: 'Exploring AI Capabilities',
      description: 'The main challenge was to test a new AI model and figure out how to measure its success while still learning and exploring the AI space.',
      achievements: ['The showcase project provided a concrete way to explore the capabilities of Gemini CLI.', 'The project served as a hands-on learning experience in the AI space.']
    },
    {
      title: 'Overcoming Preconceptions',
      description: 'Another challenge was to overcome previous negative experiences with other AI chat apps and give Gemini CLI a fair chance.',
      achievements: ['Successfully detached from past experiences and evaluated the tool on its own merits.', 'Recognized the difference between a chat app and a CLI tool.']
    }
  ],
  links: [
    {
      type: 'github',
      url: 'https://github.com/balbonits/gemini-cli-demo',
      label: 'GitHub Repository'
    },
    {
      type: 'live',
      url: 'https://gemini-cli-demo.vercel.app/',
      label: 'Live Demo'
    }
  ],
  lessons: [
    'The potential of AI as a development partner.',
    'The power of Web Components for building modular and framework-free applications.',
    'The importance of clear communication and iterative development when working with AI.'
  ],
  challenges: [
    'Figuring out how to test a new AI model and measure its success.',
    'Overcoming preconceptions about AI tools based on past experiences.'
  ],
  futureImprovements: [
    'Add more complex applications to the showcase.',
    'Explore different ways to interact with the AI to build applications.',
    'Integrate more third-party APIs and libraries.'
  ]
};

export default project;