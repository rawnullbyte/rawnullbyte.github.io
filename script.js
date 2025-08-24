class CyberpunkBiolink {
  constructor() {
    this.config = null
    this.musicPlaying = false
    this.cursorTrails = []
    this.init()
  }

  async init() {
    await this.loadConfig()
    this.setupBackground()
    this.setupProfile()
    this.setupLinks()
    this.setupSocials()
    this.setupMusic()
    this.setupCursor()
    this.setupMatrixRain()
    this.setupAnimations()
  }

  async loadConfig() {
    try {
      const response = await fetch("config.json")
      this.config = await response.json()
    } catch (error) {
      console.error("Failed to load config:", error)
      // Fallback config
      this.config = {
        name: "NullByte",
        bio: "Cyberpunk Developer | Code Samurai",
        avatar: "/anime-cyberpunk-demon-lord-character.png",
        background: {
          type: "image",
          url: "/cyberpunk-city-neon.png",
        },
        links: [
          { title: "GitHub", url: "https://github.com", icon: "💻", color: "primary" },
          { title: "Portfolio", url: "#", icon: "🌐", color: "accent" },
        ],
        socials: [
          { platform: "twitter", url: "https://twitter.com", icon: "🐦" },
          { platform: "discord", url: "https://discord.com", icon: "💬" },
        ],
      }
    }
  }

  setupBackground() {
    const bgElement = document.getElementById("backgroundMedia")
    const bg = this.config.background

    if (bg.type === "video") {
      bgElement.innerHTML = `<video autoplay muted loop class="w-full h-full object-cover"><source src="${bg.url}" type="video/mp4"></video>`
    } else {
      bgElement.innerHTML = `<img src="${bg.url}" alt="Background" class="w-full h-full object-cover">`
    }
  }

  setupProfile() {
    document.getElementById("profileImage").src = this.config.avatar
    document.getElementById("displayName").textContent = this.config.name
    document.getElementById("displayName").setAttribute("data-text", this.config.name)

    // Typing animation for bio
    this.typeText("bio", this.config.bio)

    // Setup stats if available
    if (this.config.stats) {
      const statsContainer = document.getElementById("stats")
      statsContainer.innerHTML = Object.entries(this.config.stats)
        .map(([key, value]) => `<div><span class="text-accent font-bold">${value}</span> ${key}</div>`)
        .join("")
    }
  }

  setupLinks() {
    const container = document.getElementById("linksContainer")
    container.innerHTML = this.config.links
      .map(
        (link, index) => `
            <a href="${link.url}" 
               target="_blank" 
               class="link-card block w-full p-4 bg-card border border-border rounded-lg hover:border-accent text-center group"
               style="animation-delay: ${index * 0.1}s">
                <div class="flex items-center justify-center space-x-3">
                    <span class="text-2xl">${link.icon}</span>
                    <span class="font-semibold text-card-foreground group-hover:text-accent transition-colors">${link.title}</span>
                </div>
                ${link.description ? `<p class="text-sm text-muted-foreground mt-2">${link.description}</p>` : ""}
            </a>
        `,
      )
      .join("")
  }

  setupSocials() {
    const container = document.getElementById("socialContainer")
    container.innerHTML = this.config.socials
      .map(
        (social) => `
            <a href="${social.url}" 
               target="_blank" 
               class="social-icon w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:border-accent hover:bg-accent hover:text-accent-foreground">
                <span class="text-xl">${social.icon}</span>
            </a>
        `,
      )
      .join("")
  }

  setupMusic() {
    const audio = document.getElementById("bgMusic")
    const toggle = document.getElementById("musicToggle")
    const icon = document.getElementById("musicIcon")

    if (this.config.music) {
      audio.src = this.config.music
      toggle.addEventListener("click", () => {
        if (this.musicPlaying) {
          audio.pause()
          icon.textContent = "🎵"
          this.musicPlaying = false
        } else {
          audio.play()
          icon.textContent = "🔊"
          this.musicPlaying = true
        }
      })
    } else {
      toggle.style.display = "none"
    }
  }

  setupCursor() {
    const cursor = document.querySelector(".cursor")
    let mouseX = 0,
      mouseY = 0
    let cursorX = 0,
      cursorY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Create trail effect
      this.createCursorTrail(mouseX, mouseY)
    })

    // Smooth cursor following
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1

      cursor.style.left = cursorX - 10 + "px"
      cursor.style.top = cursorY - 10 + "px"

      requestAnimationFrame(updateCursor)
    }
    updateCursor()

    // Cursor hover effects
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(1.5)"
        cursor.style.borderColor = "var(--color-accent)"
      })
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)"
        cursor.style.borderColor = "var(--color-accent)"
      })
    })
  }

  createCursorTrail(x, y) {
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    trail.style.left = x - 2 + "px"
    trail.style.top = y - 2 + "px"
    document.body.appendChild(trail)

    setTimeout(() => {
      trail.style.opacity = "0"
      trail.style.transform = "scale(0)"
      setTimeout(() => trail.remove(), 300)
    }, 100)
  }

  setupMatrixRain() {
    const container = document.getElementById("matrixBg")
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    const createMatrixChar = () => {
      const char = document.createElement("div")
      char.className = "matrix-char"
      char.textContent = chars[Math.floor(Math.random() * chars.length)]
      char.style.left = Math.random() * 100 + "%"
      char.style.animationDuration = Math.random() * 3 + 2 + "s"
      char.style.animationDelay = Math.random() * 2 + "s"
      container.appendChild(char)

      setTimeout(() => char.remove(), 5000)
    }

    // Create matrix rain effect
    setInterval(createMatrixChar, 200)
  }

  setupAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"
        }
      })
    })

    document.querySelectorAll(".link-card").forEach((card) => {
      card.style.animationPlayState = "paused"
      observer.observe(card)
    })
  }

  typeText(elementId, text) {
    const element = document.getElementById(elementId)
    element.textContent = ""
    element.classList.add("typing")

    let i = 0
    const typeInterval = setInterval(() => {
      element.textContent += text[i]
      i++
      if (i >= text.length) {
        clearInterval(typeInterval)
        element.classList.remove("typing")
      }
    }, 50)
  }
}

// Initialize the biolink when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CyberpunkBiolink()
})

// Add some interactive effects
document.addEventListener("click", (e) => {
  // Create click ripple effect
  const ripple = document.createElement("div")
  ripple.style.position = "fixed"
  ripple.style.left = e.clientX - 25 + "px"
  ripple.style.top = e.clientY - 25 + "px"
  ripple.style.width = "50px"
  ripple.style.height = "50px"
  ripple.style.border = "2px solid var(--color-accent)"
  ripple.style.borderRadius = "50%"
  ripple.style.pointerEvents = "none"
  ripple.style.animation = "ripple 0.6s ease-out"
  ripple.style.zIndex = "10000"

  document.body.appendChild(ripple)
  setTimeout(() => ripple.remove(), 600)
})

// Add ripple animation
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
    }
`
document.head.appendChild(style)
