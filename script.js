// Configuration loaded from settings.json
let config = {}

// Load configuration
async function loadConfig() {
  try {
    const response = await fetch("settings.json")
    config = await response.json()
    applyConfig()
  } catch (error) {
    console.error("Error loading settings.json:", error)
    // Fallback to default config if settings.json fails to load
    loadDefaultConfig()
  }
}

// Default configuration fallback
function loadDefaultConfig() {
  config = {
    profile: {
      name: "Takahashi",
      title: "Cyberpunk Hacker | Digital Architect",
      bio: "Navigating the digital underworld of 2099. Code is my weapon, data is my domain.",
      image: "/cyberpunk-hacker-avatar-with-orange-glowing-eyes.png",
      favicon: "⚡",
    },
    theme: {
      cursor: "cyber",
      animations: true,
      particles: true,
      glowEffects: true,
    },
    music: {
      enabled: true,
      title: "Neon Dreams",
      artist: "Cyberpunk 2099 OST",
      duration: "3:42",
      url: "",
    },
    links: [
      {
        title: "Neural Interface",
        url: "https://github.com/takahashi",
        icon: "🧠",
        description: "My digital consciousness repository",
      },
      {
        title: "Data Streams",
        url: "https://twitter.com/takahashi2099",
        icon: "📡",
        description: "Real-time thought broadcasts",
      },
      {
        title: "Encrypted Comms",
        url: "mailto:takahashi@cyberspace.net",
        icon: "🔐",
        description: "Secure communication channel",
      },
      {
        title: "Digital Portfolio",
        url: "https://takahashi.dev",
        icon: "💻",
        description: "Showcase of digital architectures",
      },
    ],
    social: [
      {
        platform: "GitHub",
        url: "https://github.com/takahashi",
        icon: "💻",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/takahashi2099",
        icon: "🐦",
      },
      {
        platform: "Discord",
        url: "https://discord.gg/cyberpunk2099",
        icon: "💬",
      },
      {
        platform: "Email",
        url: "mailto:takahashi@cyberspace.net",
        icon: "📧",
      },
    ],
    seo: {
      title: "Takahashi | Demon Lord 2099",
      description: "Cyberpunk hacker and digital architect from the year 2099",
    },
  }
  applyConfig()
}

// Apply configuration to the page
function applyConfig() {
  // Update SEO
  document.getElementById("page-title").textContent = config.seo.title
  document.getElementById("page-description").setAttribute("content", config.seo.description)
  document.title = config.seo.title

  // Update favicon
  const favicon = document.getElementById("favicon")
  favicon.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${config.profile.favicon}</text></svg>`

  // Update profile
  document.getElementById("profile-image").src = config.profile.image
  document.getElementById("profile-image").alt = config.profile.name
  document.getElementById("profile-name").textContent = config.profile.name
  document.getElementById("profile-title").textContent = config.profile.title
  document.getElementById("profile-bio").textContent = config.profile.bio

  // Update music
  if (config.music.enabled) {
    document.getElementById("music-title").textContent = config.music.title
    document.getElementById("music-artist").textContent = config.music.artist
    document.getElementById("music-duration").textContent = config.music.duration
    if (config.music.url) {
      document.getElementById("music-source").src = config.music.url
      document.getElementById("background-music").load()
    }
  } else {
    document.getElementById("music-section").style.display = "none"
  }

  // Generate links
  generateLinks()

  // Generate social links
  generateSocialLinks()

  // Apply theme settings
  applyTheme()

  // Initialize particles if enabled
  if (config.theme.particles) {
    initParticles()
  }

  // Initialize animations
  if (config.theme.animations) {
    initAnimations()
  }
}

// Generate main links
function generateLinks() {
  const container = document.getElementById("links-container")
  container.innerHTML = ""

  config.links.forEach((link, index) => {
    const linkElement = document.createElement("a")
    linkElement.href = link.url
    linkElement.target = "_blank"
    linkElement.rel = "noopener noreferrer"
    linkElement.className =
      "block w-full p-4 glass-effect rounded-lg link-card transition-all duration-300 cursor-pointer animate-fade-in-up hover:scale-105"
    linkElement.style.animationDelay = `${0.3 + index * 0.1}s`

    linkElement.innerHTML = `
            <div class="flex items-center space-x-4">
                <div class="text-2xl">${link.icon}</div>
                <div class="flex-1 text-left">
                    <h3 class="font-montserrat font-semibold text-white">${link.title}</h3>
                    <p class="text-sm text-muted-foreground font-opensans">${link.description}</p>
                </div>
                <div class="text-primary">→</div>
            </div>
        `

    container.appendChild(linkElement)
  })
}

// Generate social links
function generateSocialLinks() {
  const container = document.getElementById("social-container")
  container.innerHTML = ""

  config.social.forEach((social, index) => {
    const socialElement = document.createElement("a")
    socialElement.href = social.url
    socialElement.target = "_blank"
    socialElement.rel = "noopener noreferrer"
    socialElement.className =
      "w-12 h-12 glass-effect rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-primary animate-fade-in-up"
    socialElement.style.animationDelay = `${0.6 + index * 0.1}s`
    socialElement.title = social.platform

    socialElement.innerHTML = `<span class="text-xl">${social.icon}</span>`

    container.appendChild(socialElement)
  })
}

// Apply theme settings
function applyTheme() {
  const body = document.body

  // Apply cursor style
  if (config.theme.cursor === "cyber") {
    body.style.cursor =
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="%23ea580c" stroke-width="2"/><circle cx="10" cy="10" r="2" fill="%23ea580c"/></svg>\'), auto'
  }

  // Toggle animations
  if (!config.theme.animations) {
    const style = document.createElement("style")
    style.textContent = "* { animation: none !important; transition: none !important; }"
    document.head.appendChild(style)
  }

  // Toggle glow effects
  if (!config.theme.glowEffects) {
    const style = document.createElement("style")
    style.textContent =
      ".animate-glow, .text-glow, .profile-image { animation: none !important; text-shadow: none !important; filter: none !important; }"
    document.head.appendChild(style)
  }
}

// Initialize particle system
function initParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "absolute w-1 h-1 bg-primary rounded-full opacity-20"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 3 + "s"
    particle.style.animation = "float 3s ease-in-out infinite"
    particlesContainer.appendChild(particle)
  }
}

// Initialize animations and interactions
function initAnimations() {
  // Stagger animation for elements
  const animatedElements = document.querySelectorAll(".animate-fade-in-up")
  animatedElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`
  })

  // Music player functionality
  const musicToggle = document.getElementById("music-toggle")
  const playIcon = document.getElementById("play-icon")
  const musicProgress = document.getElementById("music-progress")
  const backgroundMusic = document.getElementById("background-music")

  let isPlaying = false
  let progress = 0
  let progressInterval

  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      // Pause music
      backgroundMusic.pause()
      playIcon.textContent = "▶"
      clearInterval(progressInterval)
    } else {
      // Play music
      if (config.music.url) {
        backgroundMusic.play().catch((e) => console.log("Audio play failed:", e))
      }
      playIcon.textContent = "⏸"

      // Simulate progress (since we might not have actual audio)
      progressInterval = setInterval(() => {
        progress += 1
        if (progress > 100) progress = 0
        musicProgress.style.width = progress + "%"
      }, 1000)
    }
    isPlaying = !isPlaying
  })

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll("a, button")
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (config.theme.glowEffects) {
        el.style.boxShadow = "0 0 20px rgba(234, 88, 12, 0.5)"
      }
    })

    el.addEventListener("mouseleave", () => {
      el.style.boxShadow = ""
    })
  })
}

// Initialize the application
document.addEventListener("DOMContentLoaded", loadConfig)

// Handle window resize for responsive particles
window.addEventListener("resize", () => {
  if (config.theme && config.theme.particles) {
    document.getElementById("particles").innerHTML = ""
    initParticles()
  }
})
