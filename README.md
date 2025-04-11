# Modern Portfolio Website

A modern, responsive portfolio website built with React, Material-UI, and various interactive features.

## Features

- 🌓 Light/Dark theme toggle
- 📱 Fully responsive design
- 📊 Real-time GitHub activity integration
- 📝 Blog section
- 📬 Contact form with email integration
- 🎨 Modern UI with smooth animations
- 📄 Downloadable resume
- 🔗 Social media integration

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd modern-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Configure EmailJS
- Sign up at [EmailJS](https://www.emailjs.com/)
- Create a new service and email template
- Update the following in `src/components/Contact/Contact.jsx`:
  - YOUR_SERVICE_ID
  - YOUR_TEMPLATE_ID
  - YOUR_USER_ID

4. Start the development server
```bash
npm start
```

## Technologies Used

- React
- Material-UI
- Framer Motion
- EmailJS
- React GitHub Calendar
- Styled Components
- React Router
- Axios

## Customization

1. Update personal information in `src/components/Home/Home.jsx`
2. Modify skills in `src/components/Skills/Skills.jsx`
3. Update GitHub username in `src/components/GithubActivity/GithubActivity.jsx`
4. Add/modify blog posts in `src/components/Blog/Blog.jsx`
5. Update social links in `src/components/Contact/Contact.jsx`

## Contributing

Feel free to fork this repository and make your own changes. Pull requests are welcome!

## License

MIT License - feel free to use this project for your own portfolio!
