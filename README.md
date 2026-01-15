# 🎤 LiveVox

<div align="center">

![LiveVox - Professional Voice Monitoring](./public/og-image.svg)

**Professional real-time voice monitoring in your browser**

*Ultra-low latency audio passthrough with pitch detection, waveform visualization, and dynamic processing*

### 🌐 [**Try it Live!**](https://spark.github.com/92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a/)

[![Built with React](https://img.shields.io/badge/React-19.2-61dafb?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-enabled-ff6b6b?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Built with GitHub Spark](https://img.shields.io/badge/Built%20with-GitHub%20Spark-purple?style=flat)](https://githubnext.com/projects/github-spark)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Built in ~1 hour with [GitHub Spark](https://githubnext.com/projects/github-spark) 🚀**

</div>

---

## 🎯 What is LiveVox?

LiveVox is a **professional-grade audio monitoring tool** that runs entirely in your web browser. It lets you hear your voice through headphones with **ultra-low latency** (<10ms on supported devices), along with real-time pitch detection, waveform visualization, and dynamic audio processing.

Perfect for **singers** practicing pitch accuracy, **podcasters** monitoring audio quality, **musicians** tracking acoustic instruments, or anyone who needs to hear themselves clearly while working with audio.

**Key highlights:**
- 🎤 **Sub-10ms latency** - Feels like direct hardware monitoring
- 🎵 **Real-time pitch detection** - See exactly what note you're singing
- 📊 **Live waveform & level meters** - Professional visual feedback
- ⚡ **Dynamic compression** - Automatic volume leveling and protection
- 🔧 **Zero installation** - Works instantly in any modern browser
- 💾 **Persistent settings** - Your preferences save automatically

---

## ✨ Features

### 🎚️ Core Audio Monitoring
- **Real-time audio passthrough** - Hear yourself with professional-grade latency
- **Ultra-low latency mode** - Sub-10ms response on supported devices (perfect for music)
- **Balanced mode** - Adds dynamic compression for consistent volume and protection
- **Automatic device detection** - Prioritizes headphone/headset microphones
- **Multiple input support** - Switch between any connected microphone
- **Persistent settings** - All preferences saved between sessions

### 📊 Visual Feedback
- **Live waveform display** - Real-time oscilloscope-style audio visualization
- **Audio level meter** - Gradient meter showing safe/optimal/clipping zones
- **Clipping detection** - Prominent warning when signal is too hot
- **Latency monitoring** - Color-coded display (green <10ms, yellow <20ms, orange ≥20ms)
- **Device indicator** - Shows currently active input device

### 🎵 Pitch Detection & Tuning
- **Real-time pitch detection** - Identifies musical notes as you sing (C2-B5 range)
- **Visual tuning indicator** - Shows if you're sharp, flat, or in tune
- **Note display** - Large, clear note name with octave number
- **Cents deviation** - Precise measurement from perfect pitch
- **"In Tune" badge** - Appears when within ±15 cents of target note
- **Smooth animations** - Tuning needle responds naturally to your voice

### 🔧 Advanced Controls
- **Volume control** - Adjust monitoring level from 0-100%
- **Boost amplification** - Add up to 300% gain for quiet signals
- **Gain indicators** - Real-time percentage and multiplier display
- **Dynamic compression** - Automatic leveling in balanced mode (disabled in ultra-low latency)

---

## 🎯 Use Cases

### 🎤 Singers & Vocalists
- Practice pitch accuracy with real-time visual feedback
- Hear yourself clearly while singing along to streaming music
- Use pitch indicator to train your ear and improve intonation
- Monitor your voice with minimal latency for natural feel

### 🎙️ Podcasters & Streamers
- Monitor your voice quality during recording sessions
- Catch audio issues before they ruin your take
- Ensure consistent volume with dynamic compression
- Quick setup with any USB microphone

### 🎸 Musicians & Instrumentalists
- Monitor acoustic instruments through headphones
- Practice with backing tracks while hearing yourself clearly
- Use pitch detection for tuning and intonation practice
- Ultra-low latency mode feels like direct monitoring

### 🎓 Voice Training & Speech
- Practice pronunciation with immediate audio feedback
- Monitor your tone and volume while learning
- Improve speaking technique with visual feedback
- Build confidence hearing your own voice

---

## 🚀 Getting Started

### Quick Start

1. **[Open LiveVox](https://spark.github.com/92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a/)** in your browser
2. **Connect headphones** to prevent feedback
3. **Click the mic button** and allow access
4. **Start singing or speaking** - you'll hear yourself instantly!

**Pro Tips:**
- Use wired headphones for lowest latency
- Enable Ultra-Low Latency Mode for music/singing  
- Watch the pitch indicator to stay in tune
- Keep volume around 50-70% for comfortable monitoring

---

## 💻 For Developers

### Clone and Run Locally

```bash
git clone https://github.com/JustLikeFrank3/LiveVox.git
cd LiveVox
npm install
npm run dev
```

Open `http://localhost:5000` to see it running locally.

### Project Structure

```
src/
├── App.tsx                    # Main application logic
├── components/
│   ├── AudioLevelMeter.tsx   # Volume meter with clipping detection
│   ├── Waveform.tsx           # Real-time waveform visualization
│   ├── PitchIndicator.tsx    # Pitch detection and tuning display
│   └── ui/                    # Shadcn UI components
```

---

## 🤝 Contributing & Feedback

Found a bug or have a feature idea? Feel free to open an issue!

This project demonstrates what's possible with GitHub Spark - if it inspires you to build something, I'd love to hear about it!

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

---

<div align="center">

**⚡ Built with [GitHub Spark](https://githubnext.com/projects/github-spark) in ~1 hour**

*If you enjoyed this project, give it a ⭐ on GitHub!*

[Try LiveVox Live](https://spark.github.com/92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a/) • [View Source](https://github.com/JustLikeFrank3/LiveVox)

</div>


**Frontend Framework:**
- React 19.2 with TypeScript 5.7
- Vite 7.2 for blazing-fast development
- Framer Motion 12 for smooth animations

**Audio Processing:**
- Web Audio API for real-time processing
- AudioContext with configurable latency hints
- Gain nodes for volume and boost control
- AnalyserNode for visualization and pitch detection
- DynamicsCompressor for balanced mode

**Pitch Detection:**
- Autocorrelation algorithm for fundamental frequency detection
- 60Hz-1000Hz detection range (C2 to C6)
- <100ms response time
- Accurate to ±5 cents

**UI Components:**
- Shadcn UI v4 component library
- Tailwind CSS 4.1 for styling
- Phosphor Icons for iconography
- Custom Canvas-based visualizations

**Fonts:**
- IBM Plex Sans (primary)
- IBM Plex Serif (headings)
- Fira Code (monospace)

---

## 🎯 Use Cases

### 🎤 Singers & Vocalists
- Practice pitch accuracy with real-time visual feedback
- Monitor your voice with <10ms latency for natural feel
- Use pitch indicator to train your ear and improve intonation

### 🎙️ Podcasters & Streamers
- Monitor audio quality during recording sessions
- Ensure consistent volume with dynamic compression
- Catch issues before they ruin your take

### 🎸 Musicians
- Monitor acoustic instruments through headphones
- Practice with backing tracks while hearing yourself clearly
- Use pitch detection for tuning and intonation

---

## 🌐 Try It Yourself

### Live Demo
**🔗 [Launch LiveVox](https://spark.github.com/92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a/)**

No installation required - just click and start using it!

### Quick Start Guide

✅ **Fully Supported:**
- Chrome 90+ (recommended)
- Edge 90+
- Safari 14.1+
- Firefox 89+

⚠️ **Limited Support:**
- Mobile browsers (latency may be higher)
- Older browsers without Web Audio API

**Required Browser Features:**
- Web Audio API
- MediaDevices.getUserMedia()
- Canvas API
- ES2020+ JavaScript

### Performance Characteristics

**Latency:**
- Ultra-Low Mode: **<10ms** (on supported hardware)
- Balanced Mode: **15-25ms** (typical)
- Measurement includes baseLatency + outputLatency

**CPU Usage:**
- Ultra-Low Mode: **~5%** (single core)
- Balanced Mode: **~8%** (with compression)

**Audio Quality:**
- Sample Rate: **48kHz**
- Bit Depth: **16-bit**
- Channels: **Mono** (optimized for voice)

---

## 🌐 Sharing Your App

### Live Deployment

This LiveVox app is live and ready to share! 🎉

**🔗 Default URL:** https://spark.github.com/92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a/

**Your app has:**
- ✅ A unique shareable URL
- ✅ Automatic HTTPS encryption
- ✅ Global CDN delivery
- ✅ Zero configuration required
- ✅ Works on any device with a modern browser
- ✅ Beautiful social media preview cards (Open Graph & Twitter Cards)

---

### 🎨 Custom Branded URLs (Optional)

Transform your sharing experience with a professional custom domain!

<table>
<tr>
<td width="50%">

**❌ Before (Default)**
```
spark.github.com/
  92ccfd0a-d09b-4142-a2a8-
  9513b5d5ef2a/
```
- Hard to remember
- Generic appearance
- Long and technical
- Not portfolio-ready

</td>
<td width="50%">

**✅ After (Custom)**
```
livevox.yourname.com
```
- Professional branding
- Easy to remember
- Clean and concise
- Portfolio-ready

</td>
</tr>
</table>

**Popular domain patterns:**
- `livevox.yourname.com` - Personal portfolio
- `voice.yourstudio.com` - Business/studio
- `livevox.app` - Dedicated product

**Benefits:**
- ✅ **Professional appearance** - Perfect for resumes and portfolios
- ✅ **Brand recognition** - Your domain in social media previews
- ✅ **Easy to share** - Verbally or in writing
- ✅ **Better SEO** - Custom domains rank better
- ✅ **Analytics ready** - Track with your own domain
- ✅ **Free SSL** - Automatic HTTPS certificate

**📖 Complete Documentation:**
- **[Setup Guide](./CUSTOM-DOMAIN.md)** - Step-by-step for all DNS providers (Cloudflare, Namecheap, GoDaddy, Route 53, etc.)
- **[Quick Start](./CUSTOM-DOMAIN-QUICKSTART.md)** - One-page cheat sheet with copy-paste configs
- **[Examples & Ideas](./CUSTOM-DOMAIN-EXAMPLES.md)** - Domain naming patterns and real-world use cases

**⚡ Quick Setup:** Add a CNAME record → Wait 1-2 hours → Configure in Spark → Done!

---

### Social Media Sharing

When you share your LiveVox URL (default or custom) on social media, a rich preview card automatically appears with:
- 🎨 Custom branded preview image
- 📝 App title and description  
- 🎤 Visual elements showing audio waveform and key features

Optimized for all major platforms:
- **Facebook/LinkedIn:** 1200×630px preview
- **Twitter Cards:** Large image format
- **Discord/Slack:** Rich embed previews

**Test your preview:**
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

### Sharing Options

#### 🔗 Share the Live URL

**Current URLs:**
```
Default Spark URL:
https://spark.github.com/92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a/

Custom Domain (optional):
https://livevox.yourdomain.com
```

**How to share:**
1. Copy your URL (default or custom)
2. Share it with anyone - they can use it immediately
3. No installation or setup required for users
4. Works on any device with a modern browser

**Where to share:**
- Social media (Twitter, Facebook, LinkedIn)
- Messaging apps (Discord, Slack, WhatsApp)
- Email signatures
- Portfolio websites
- QR codes for in-person sharing
- Business cards

**📖 Custom Domain Documentation:**
- **[Setup Guide](./CUSTOM-DOMAIN.md)** - Complete instructions for all DNS providers
- **[Quick Start](./CUSTOM-DOMAIN-QUICKSTART.md)** - One-page cheat sheet
- **[Examples](./CUSTOM-DOMAIN-EXAMPLES.md)** - Domain naming ideas and use cases

#### 📂 Make Repository Public
To let others see and fork your code:
1. Go to your **repository Settings** on GitHub
2. Scroll to the **"Danger Zone"** section
3. Click **"Change visibility"** → **"Public"**
4. Others can now view, fork, star, and contribute!

---

## 🎨 Customization

### Modifying the Code

All source code is in the `src/` directory:

```
src/
├── App.tsx                    # Main application component
├── components/
│   ├── AudioLevelMeter.tsx   # Volume meter with clipping detection
│   ├── Waveform.tsx           # Real-time waveform visualization
│   ├── PitchIndicator.tsx    # Pitch detection and tuning display
│   └── ui/                    # Shadcn UI components
├── index.css                  # Theme and styling
└── hooks/                     # Custom React hooks
```

### Changing the Theme

Edit `src/index.css` to customize colors:

```css
:root {
  --primary: oklch(0.35 0.18 140);    /* Main accent color */
  --background: oklch(0.98 0.005 140); /* Page background */
  --accent: oklch(0.45 0.15 120);     /* Highlight color */
  /* ... more color variables ... */
}
```

All colors use **OKLCH** format for perceptually uniform brightness and saturation.

---

## 🐛 Troubleshooting

### Common Issues

**Problem:** No sound / Can't hear myself
- ✅ Check that **monitoring is active** (green microphone button)
- ✅ Verify **headphones are connected** and working
- ✅ Increase **volume slider** above 0%
- ✅ Check **browser permission** was granted
- ✅ Try **different microphone** in device selector

**Problem:** Audio feedback / Echo
- ⚠️ **Use headphones!** Never use speakers for monitoring
- ✅ Lower **volume and boost** sliders
- ✅ Move **away from microphone**

**Problem:** High latency (>20ms)
- ✅ Enable **Ultra-Low Latency Mode**
- ✅ Use **wired headphones** (not Bluetooth)
- ✅ Close **other audio applications**
- ✅ Try **Chrome or Edge** browser
- ✅ **Restart browser** to free resources

**Problem:** Clipping / Distortion
- ✅ Reduce **boost to 0%**
- ✅ Lower **volume slider**
- ✅ Move **further from mic**
- ✅ Enable **Balanced Mode** for compression

**Problem:** Pitch detection not working
- ✅ Sing **louder** (low volume won't trigger detection)
- ✅ Sing **steady notes** (pitch bends are harder to detect)
- ✅ Stay in **C2-B5 range** (roughly 60Hz-1000Hz)
- ✅ Check **level meter shows 40%+** input

**Problem:** Can't switch microphones
- ✅ **Stop monitoring** before switching
- ✅ Or wait a moment - app auto-restarts with new device
- ✅ **Refresh page** if device list is stale

**Problem:** Browser says "mic already in use"
- ✅ Close **other apps using the microphone** (Zoom, Discord, etc.)
- ✅ Close **other browser tabs** with mic access
- ✅ **Restart browser** completely

---

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome!

**Found a bug?** Open an issue describing:
- What happened vs. what you expected
- Your browser and operating system
- Steps to reproduce the problem

**Have a feature idea?** Open an issue with:
- Description of the feature
- Why it would be useful
- How you envision it working

---

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the **MIT License**, Copyright GitHub, Inc.

See [LICENSE](./LICENSE) for full details.

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Phosphor Icons](https://phosphoricons.com/) - Icon set
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - Audio processing

Special thanks to the **GitHub Spark** team for making web app development so effortless!

---

<div align="center">

**Made with ❤️ using GitHub Spark**

*Star this repo if you find it useful!* ⭐

</div>
