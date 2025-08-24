// showcase/showcase.config.ts in YOUR repository
// This file will be fetched automatically by our build pipeline

// Import the type definition (we'll provide the interface structure below)
interface ProjectData {
  slug: string;
  metadata: ProjectMetadata;
  techStack: TechStackCategory[];
  features: Feature[];
  highlights?: Highlight[];
  screenshots?: Screenshot[];
  links: Link[];
  metrics?: Metric[];
  lessons?: string[];
  challenges?: string[];
  futureImprovements?: string[];
}

interface ProjectMetadata {
  title: string;
  name: string;
  description: string;
  detailedDescription: string;
  category: string;
  startDate: string;
  role: string;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  featured: boolean;
}

interface TechStackCategory {
  category: string;
  items: string[];
}

interface Feature {
  title: string;
  description: string;
  impact: string;
}

interface Highlight {
  title: string;
  description: string;
  achievements: string[];
}

interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  category: 'desktop' | 'mobile' | 'tablet' | 'feature';
}

interface Link {
  type: 'github' | 'live' | 'docs' | 'demo';
  url: string;
  label: string;
}

interface Metric {
  label: string;
  value: string;
  description: string;
}

const showcaseConfig: ProjectData = {
  slug: 'gemini-cli-demo',
  metadata: {
    title: 'Gemini CLI Demo',
    name: 'gemini-cli-demo',
    description: 'A showcase of web component-based applications built by Gemini.',
    detailedDescription: `This project is a showcase of web component-based applications built by Gemini. The showcase is a single-page application that displays a collection of web component apps in a card-based layout. When a card is clicked, the corresponding app is launched in a modal window.

## Key Features

- A collection of web component-based applications.
- A single-page application that displays the apps in a card-based layout.
- A modal window to launch the apps.

## Technical Implementation

- **Web Components**: The project is built using Web Components, a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.
- **Functional Programming**: Functional programming principles are preferred.
- **BEM CSS**: BEM (Block, Element, Modifier) naming convention is used for CSS classes.

## Development Process

- **Test-Driven Development (TDD)**: TDD is the desired approach.
- **Modular Architecture**: The project follows a modular architecture, with each app built as a self-contained web component.
- **Web Components**: Web Components are the primary design pattern used for building the applications.`,
    category: 'AI/CLI Development',
    startDate: '2025-08',
    role: 'Full-Stack Developer',
    difficulty: 'Medium',
    featured: true
  },
  techStack: [
    {
      category: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript', 'Web Components']
    },
    {
      category: 'Development Tools',
      items: ['GitHub', 'VS Code']
    }
  ],
  features: [
    {
      title: 'Showcase App',
      description: 'A single-page application that displays a collection of web component apps in a card-based layout.',
      impact: 'Provides a central location to view all the web component apps.'
    },
    {
      title: 'Web Component Apps',
      description: 'A collection of self-contained web component apps.',
      impact: 'Demonstrates the power and flexibility of Web Components.'
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
      url: 'https://gemini-cli-demo.vercel.app',
      label: 'Live Demo'
    }
  ],
  screenshots: [
    {
      src: '/images/projects/gemini-cli-demo/01-desktop-home-desktop.webp',
      alt: 'Gemini CLI Demo showcase homepage',
      caption: 'Main showcase interface displaying all web component apps',
      category: 'desktop'
    },
    {
      src: '/images/projects/gemini-cli-demo/03-feature-demo-feature.webp',
      alt: 'Drawing app demonstration',
      caption: 'Interactive drawing application built with Web Components',
      category: 'feature'
    },
    {
      src: '/images/projects/gemini-cli-demo/04-feature-demo-feature.webp',
      alt: 'Todo list app demonstration',
      caption: 'Functional todo list with local storage persistence',
      category: 'feature'
    }
  ],
  metrics: [
    {
      label: 'Web Components',
      value: '3 apps',
      description: 'Self-contained web component applications'
    },
    {
      label: 'Code Quality',
      value: '100% Vanilla JS',
      description: 'No framework dependencies, pure web standards'
    },
    {
      label: 'Performance',
      value: '<50KB total',
      description: 'Lightweight bundle size for all apps'
    },
    {
      label: 'Browser Support',
      value: 'All modern',
      description: 'Works in Chrome, Firefox, Safari, Edge'
    }
  ],
  lessons: [
    'Web Components provide true encapsulation without framework overhead',
    'BEM CSS methodology scales well even in component-based architecture',
    'Functional programming patterns work effectively with vanilla JavaScript',
    'Browser native APIs are powerful enough for complex interactions',
    'AI can successfully generate working web applications from specifications'
  ],
  challenges: [
    'Managing state across isolated Web Components without a framework',
    'Implementing drag-and-drop functionality in the drawing app',
    'Ensuring consistent styling with Shadow DOM boundaries',
    'Creating a modal system that works with Web Components',
    'Handling browser compatibility for newer Web Component features'
  ],
  futureImprovements: [
    'Add more interactive web component applications',
    'Implement a weather app with API integration',
    'Create a shared component library for reuse',
    'Add unit tests for all components',
    'Implement PWA features for offline functionality'
  ]
};

export default showcaseConfig;
