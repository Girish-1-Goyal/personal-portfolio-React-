# Data Structure Documentation

## Static Data Models

### Profile
```
Profile {
  name: string
  title: string
  bio: string
  image: string
  social: {
    github: string
    linkedin: string
    twitter: string
  }
  contact: {
    email: string
    phone: string
    location: string
  }
}
```

### Skills
```
Skill {
  category: string
  items: [{
    name: string
    level: number
    icon: string
    color: string
  }]
}
```

### Projects
```
Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  featured: boolean
}
```

### Resume
```
Experience {
  role: string
  company: string
  duration: string
  description: string[]
  technologies: string[]
}

Education {
  degree: string
  institution: string
  year: string
  details: string[]
}
```

### CompetitiveProgramming
```
CodingProfile {
  name: string
  handle: string
  currentRating: number
  maxRating: number
  stars: string
  globalRank: string
  countryRank: string
  country: string
  totalSolved: number
  hardSolved: number
  mediumSolved: number
  easySolved: number
  institute: string
}
```

## Data Relationships

1. **Profile -> Skills**
   - One-to-many relationship
   - Profile contains multiple skill categories

2. **Profile -> Projects**
   - One-to-many relationship
   - Profile showcases multiple projects

3. **Profile -> Experience**
   - One-to-many relationship
   - Profile lists multiple work experiences

4. **Profile -> Education**
   - One-to-many relationship
   - Profile includes multiple educational qualifications

5. **Profile -> CodingProfile**
   - One-to-one relationship
   - Profile links to competitive programming stats

## Data Flow

1. Static data stored in JSON/JS files
2. Loaded at component mount
3. Cached in Context if needed
4. Updated through admin interface (if implemented)

## Data Validation

1. PropTypes for runtime validation
2. TypeScript interfaces (if using TS)
3. Schema validation for forms

## Data Storage

1. Local JSON files
2. Environment variables for sensitive data
3. Browser localStorage for preferences
4. Backend API integration (optional)
