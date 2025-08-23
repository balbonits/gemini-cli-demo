# AI Assistant Guide: Adding Project to Portfolio Showcase

**Instructions for AI assistants (Claude Code, Gemini, etc.):** Follow this guide to add this project to my portfolio showcase at https://www.jdilig.me

## 🎯 Overview

This project needs to be added to my personal portfolio website which uses a TypeScript-based project showcase system. The portfolio is built with Next.js and displays projects with images, metadata, and live demo links.

## 📋 Required Steps (AI: Execute These in Order)

### Step 1: Deploy to Vercel First
- **CRITICAL**: Deploy this project to Vercel before adding to portfolio
- Get the live demo URL (e.g., `https://your-project.vercel.app`)
- Ensure the deployment is working and accessible
- **Why**: Live demos are much more impressive than GitHub-only projects

### Step 2: Capture Screenshots
After deployment, capture these screenshots:
1. `01-desktop-home.png` (1200×800) - Main interface/homepage
2. `02-mobile-interface.png` (375×667) - Mobile view if applicable
3. `03-feature-demo.png` (800×600) - Key feature in action
4. `04-cli-usage.png` (1200×800) - Terminal/CLI usage if applicable

**Image Guidelines:**
- Use actual deployed app, not localhost
- High-quality, clear screenshots
- Show the app in use, not empty states
- Include both desktop and mobile views

### Step 3: Create Project Data Module

Create this exact file structure in the portfolio repo:
```
projects/[project-slug]/
├── [project-slug].ts          # TypeScript project data
├── images/                    # Screenshots from Step 2
│   ├── 01-desktop-home.png
│   ├── 02-mobile-interface.png
│   └── ...
└── PROJECT.md                 # Optional documentation
```

### Step 4: Project TypeScript Template

Create `projects/[project-slug]/[project-slug].ts` with this template:

```typescript
import { ProjectData } from '@/interfaces/projects';

const project: ProjectData = {
  slug: 'your-project-slug',
  metadata: {
    title: 'Your Project Title',
    name: 'your-project-slug',
    description: 'Brief one-line description for cards',
    detailedDescription: `Comprehensive project description with:

**Key Features:**
• Feature 1 with impact
• Feature 2 with benefits
• Feature 3 with results

**Technical Implementation:**
• Architecture decisions
• Technology choices
• Performance considerations

**Development Process:**
• How it was built
• Challenges overcome
• Solutions implemented`,
    category: 'AI/CLI Development', // or appropriate category
    startDate: 'YYYY-MM',
    endDate: 'YYYY-MM',
    duration: 'X weeks',
    role: 'Full-Stack Developer',
    difficulty: 'Medium', // Beginner | Easy | Medium | Hard | Expert
    featured: true
  },
  techStack: [
    {
      category: 'AI Integration',
      items: ['Google Gemini API', 'TypeScript', 'Node.js']
    },
    {
      category: 'CLI Framework',
      items: ['Commander.js', 'Inquirer.js', 'Other CLI tools']
    },
    {
      category: 'Development Tools',
      items: ['Vercel', 'GitHub Actions', 'ESLint']
    }
  ],
  features: [
    {
      title: 'AI-Powered Interface',
      description: 'Interactive AI integration using Gemini API',
      impact: 'Enhanced user experience and productivity'
    },
    {
      title: 'Developer-Friendly CLI',
      description: 'Intuitive command-line interface design',
      impact: 'Streamlined workflow and usability'
    }
  ],
  highlights: [
    {
      title: 'Technical Achievement 1',
      description: 'Specific implementation detail',
      achievements: ['Quantifiable result 1', 'Quantifiable result 2']
    },
    {
      title: 'Problem Solving',
      description: 'Challenge overcome during development',
      achievements: ['Solution implemented', 'Performance improvement']
    }
  ],
  links: [
    {
      type: 'github',
      url: 'https://github.com/username/repo-name',
      label: 'GitHub Repository'
    },
    {
      type: 'live',
      url: 'https://your-project.vercel.app',
      label: 'Live Demo'
    }
  ],
  lessons: [
    'AI API integration patterns',
    'CLI UX design principles',
    'Error handling strategies'
  ],
  challenges: [
    'API rate limiting and optimization',
    'User experience in command-line interfaces',
    'Error handling for AI responses'
  ],
  futureImprovements: [
    'Additional AI model support',
    'Enhanced CLI features',
    'Performance optimizations'
  ]
};

export default project;
```

### Step 5: Process Images and Generate

Run these commands in the portfolio repo:
```bash
# Process the images you added
npm run process-images [project-slug]

# Generate the project JSON
npm run generate:projects

# Build and test
npm run build
npm test
```

## 🎯 Project-Specific Guidance

### For Gemini CLI Projects:
- **Category**: "AI/CLI Development" or "Developer Tools"
- **Emphasize**: AI integration expertise (valuable for recruiters)
- **Include**: Terminal screenshots showing actual usage
- **Highlight**: Problem-solving with AI, developer productivity improvements

### Professional Presentation:
- **Quantify Results**: "Reduced setup time by 50%" vs "Made setup easier"
- **Show Technical Depth**: API integration patterns, error handling, architecture
- **Demonstrate Impact**: Before/after comparisons, productivity gains
- **Include Process**: How you used AI tools in development (meta!)

## 📊 Quality Standards

### Required Elements:
- ✅ Live demo URL (deployed to Vercel)
- ✅ GitHub repository link
- ✅ High-quality screenshots (4+ images)
- ✅ Detailed technical description
- ✅ Quantified impact/results
- ✅ Clear tech stack breakdown

### Professional Standards:
- **No Lorem Ipsum**: All content must be real and specific
- **Accurate Information**: Only include technologies actually used
- **Professional Language**: Technical but accessible descriptions
- **Measurable Impact**: Include metrics, performance improvements, or user benefits

## 🔧 AI Assistant Instructions

**When implementing this:**

1. **Ask for Project Details**: Get the actual project name, GitHub URL, tech stack used
2. **Verify Deployment**: Confirm the Vercel URL is live and working
3. **Create Real Content**: Don't use placeholder text - ask for specific details
4. **Follow TypeScript Standards**: Use the exact interface structure provided
5. **Test the Build**: Ensure the project builds successfully after adding

**Questions to Ask the Human:**
- What's the project's GitHub repository URL?
- What's the deployed Vercel URL?
- What specific technologies/frameworks were used?
- What problem does the project solve?
- What were the main challenges and how were they solved?
- Any quantifiable results or improvements achieved?

**Don't Assume:**
- Don't guess at tech stack - ask for specifics
- Don't create placeholder content - get real descriptions
- Don't skip the deployment step - live demos are critical
- Don't use generic descriptions - make them project-specific

## 🚀 Final Steps

After completing the setup:
1. **Test Locally**: Verify the project appears in the portfolio
2. **Check Build**: Ensure no TypeScript/build errors
3. **Review Content**: Verify all links work and content is accurate
4. **Deploy**: Push changes to deploy the updated portfolio

**Success Criteria:**
- Project appears in portfolio with working images
- All links (GitHub, live demo) are functional
- Content is professional and specific to the project
- No build errors or TypeScript issues

---

**AI Assistant: Use this guide to help add projects to the portfolio showcase. Ask questions about any unclear requirements and ensure all steps are completed thoroughly.**