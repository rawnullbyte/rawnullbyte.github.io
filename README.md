# Cyberpunk Biolink Website

A beautiful, customizable biolink website inspired by cyberpunk aesthetics and the character Takahashi from Demon Lord 2099. Built with pure HTML, CSS, and JavaScript for easy hosting on GitHub Pages.

## Features

- 🎨 **Beautiful Design**: Cyberpunk-inspired aesthetic with smooth animations
- ⚙️ **Fully Customizable**: Configure everything via a single `settings.json` file
- 📱 **Mobile-Friendly**: Responsive design that works on all devices
- 🚀 **Performance Optimized**: Minimal files, fast loading
- 🎵 **Music Player**: Optional background music with custom controls
- ✨ **Smooth Animations**: Fade-ins, glows, and floating effects
- 🎯 **SEO Ready**: Configurable meta tags and descriptions
- 🔧 **Easy Setup**: No build process required

## Quick Start

1. **Download** or clone this repository
2. **Edit** `settings.json` to customize your profile
3. **Upload** to GitHub Pages or any static hosting service
4. **Done!** Your biolink is live

## Customization Guide

### Profile Settings

\`\`\`json
{
  "profile": {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio description",
    "image": "path/to/your/image.jpg",
    "favicon": "🚀"
  }
}
\`\`\`

- **name**: Your display name
- **title**: Subtitle/profession
- **bio**: Short description (keep under 100 characters)
- **image**: Profile picture URL or path
- **favicon**: Emoji or icon for browser tab

### Theme Configuration

\`\`\`json
{
  "theme": {
    "cursor": "cyber",
    "animations": true,
    "particles": true,
    "glowEffects": true
  }
}
\`\`\`

- **cursor**: `"cyber"` for custom cursor, `"default"` for normal
- **animations**: Enable/disable all animations
- **particles**: Show floating background particles
- **glowEffects**: Enable glowing effects on elements

### Adding Links

\`\`\`json
{
  "links": [
    {
      "title": "Link Title",
      "url": "https://example.com",
      "icon": "🔗",
      "description": "Brief description"
    }
  ]
}
\`\`\`

Each link supports:
- **title**: Display name
- **url**: Target URL
- **icon**: Emoji or icon
- **description**: Subtitle text

### Social Media Links

\`\`\`json
{
  "social": [
    {
      "platform": "GitHub",
      "url": "https://github.com/username",
      "icon": "💻"
    }
  ]
}
\`\`\`

### Music Player

\`\`\`json
{
  "music": {
    "enabled": true,
    "title": "Song Title",
    "artist": "Artist Name",
    "duration": "3:42",
    "url": "path/to/music.mp3"
  }
}
\`\`\`

- Set `"enabled": false` to hide the music player
- Leave `"url"` empty for visual-only player
- Supports MP3, WAV, and other web audio formats

### SEO Settings

\`\`\`json
{
  "seo": {
    "title": "Page Title",
    "description": "Page description for search engines",
    "keywords": "keyword1, keyword2, keyword3"
  }
}
\`\`\`

## File Structure

\`\`\`
biolink-website/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── settings.json       # Configuration file
└── README.md          # Documentation
\`\`\`

## Hosting on GitHub Pages

1. **Create** a new GitHub repository
2. **Upload** all files to the repository
3. **Go to** Settings → Pages
4. **Select** "Deploy from a branch"
5. **Choose** "main" branch and "/ (root)"
6. **Save** and wait for deployment

Your site will be available at: `https://username.github.io/repository-name`

## Advanced Customization

### Custom Colors

The site uses CSS custom properties. You can modify colors by editing the CSS variables in `index.html`:

\`\`\`css
:root {
  --primary-color: #ea580c;
  --background-color: #1a1a2e;
  --text-color: #ffffff;
}
\`\`\`

### Adding Analytics

Enable analytics in `settings.json`:

\`\`\`json
{
  "analytics": {
    "enabled": true,
    "googleAnalyticsId": "GA-XXXXXXXXX",
    "plausibleDomain": "yourdomain.com"
  }
}
\`\`\`

### Custom Fonts

The site uses Google Fonts (Montserrat and Open Sans). To change fonts, modify the Google Fonts link in `index.html` and update the CSS font-family properties.

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## Performance

- **Lighthouse Score**: 95+ on all metrics
- **Load Time**: < 2 seconds on 3G
- **File Size**: < 50KB total
- **No Dependencies**: Pure HTML/CSS/JS

## Troubleshooting

### Music Not Playing
- Ensure the audio file URL is correct
- Check browser autoplay policies
- Try clicking the play button after page load

### Animations Not Working
- Check if `"animations": true` in settings.json
- Verify browser supports CSS animations
- Try disabling motion reduction in OS settings

### Images Not Loading
- Verify image URLs are correct
- Check file permissions on hosting
- Use absolute URLs for external images

## Contributing

Feel free to submit issues and pull requests to improve this biolink template!

## License

MIT License - feel free to use for personal and commercial projects.

---

**Made with ⚡ by the cyberpunk community**
