# Cyberpunk Biolink Website

A beautiful, animated biolink website inspired by cyberpunk aesthetics, designed for programmers and tech enthusiasts. Features smooth animations, customizable themes, and easy JSON-based configuration.

## Features

- 🎨 **Cyberpunk Aesthetic**: Dark theme with neon accents and glitch effects
- ⚡ **Smooth Animations**: Matrix rain, neon glow, cursor trails, and hover effects
- 🎵 **Background Music**: Optional background music support
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎯 **Easy Customization**: Configure everything via JSON file
- 🚀 **Static HTML**: Host anywhere (GitHub Pages, Netlify, Vercel)
- 🎮 **Interactive Elements**: Custom cursor, click ripples, and hover effects

## Quick Setup

1. **Clone or Download** this repository
2. **Edit `config.json`** with your information
3. **Replace placeholder images** with your actual assets
4. **Host on GitHub Pages** or any static hosting service

## Configuration

Edit the `config.json` file to customize your biolink:

\`\`\`json
{
  "name": "Your Name",
  "bio": "Your bio description",
  "avatar": "path/to/your/avatar.jpg",
  "background": {
    "type": "image",
    "url": "path/to/background.jpg"
  },
  "music": "path/to/background-music.mp3",
  "links": [
    {
      "title": "GitHub",
      "url": "https://github.com/yourusername",
      "icon": "💻",
      "description": "My code repository",
      "color": "primary"
    }
  ],
  "socials": [
    {
      "platform": "twitter",
      "url": "https://twitter.com/yourusername",
      "icon": "🐦"
    }
  ]
}
\`\`\`

## Customization Options

### Colors
- `primary`: Main brand color
- `accent`: Neon accent color
- `secondary`: Secondary accent
- `muted`: Subtle elements

### Background
- **Image**: Set `type: "image"` and provide image URL
- **Video**: Set `type: "video"` and provide video URL

### Animations
Toggle animations in the config:
- Matrix rain effect
- Glitch text effects
- Neon glow animations
- Custom cursor trails

## File Structure

\`\`\`
cyberpunk-biolink/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── config.json         # Configuration file
└── README.md           # This file
\`\`\`

## Hosting on GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Performance Tips

- Optimize images (use WebP format when possible)
- Keep background music files small (under 5MB)
- Use CDN for faster loading

## License

MIT License - feel free to use and modify for your own projects!

## Credits

- Inspired by cyberpunk aesthetics and anime culture
- Built with vanilla HTML, CSS, and JavaScript
- Uses Tailwind CSS for styling
- Matrix rain effect inspired by The Matrix
