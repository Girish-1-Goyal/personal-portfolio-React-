# Component Relationships and Data Flow

## Core Components

### App Component
- Root component
- Manages theme context
- Handles routing

### Layout Components
1. **Navbar**
   - Navigation menu
   - Theme toggle
   - Mobile responsiveness

2. **Footer**
   - Social links
   - Contact information

### Feature Components

1. **Home**
   ```
   Dependencies:
   - Typography
   - AnimatedText
   - ProfileImage
   Data:
   - Personal information
   - Typing animation text
   ```

2. **About**
   ```
   Dependencies:
   - GlassCard
   - Typography
   Data:
   - Personal bio
   - Professional summary
   ```

3. **Skills**
   ```
   Dependencies:
   - ProgressBar
   - SkillCard
   Data:
   - Technical skills
   - Proficiency levels
   ```

4. **Projects**
   ```
   Dependencies:
   - ProjectCard
   - Modal
   Data:
   - Featured projects
   - Project details
   ```

5. **Resume**
   ```
   Dependencies:
   - Timeline
   - ExperienceCard
   Data:
   - Work experience
   - Education history
   ```

6. **CompetitiveProgramming**
   ```
   Dependencies:
   - StatsCard
   - ProfileCard
   Data:
   - Coding profiles
   - Problem-solving stats
   ```

## Data Flow

```
App
├── ThemeContext
│   └── Theme preferences
├── DataContext
│   └── Static content
└── Components
    ├── State management
    └── Props drilling
```

## Component Communication

1. Parent to Child: Props
2. Child to Parent: Callbacks
3. Global State: Context API
4. UI State: Local state

## Styling Architecture

1. Material-UI Theme
2. Styled Components
3. CSS-in-JS
4. Responsive utilities
