# Contributing to Audio Monitor

Thank you for your interest in contributing to Audio Monitor! This document provides guidelines and information for contributors.

## 🎯 Project Overview

Audio Monitor is a real-time voice passthrough application built as a GitHub Spark. It uses the Web Audio API to provide professional-grade audio monitoring with ultra-low latency.

## 🏗️ Architecture

### Core Technologies
- **React 19** - Component-based UI
- **TypeScript 5.7** - Type safety
- **Web Audio API** - Real-time audio processing
- **Vite 7** - Build tooling
- **Tailwind CSS 4** - Styling

### Key Components

**Audio Processing Chain:**
```
MediaStream → AudioContext → GainNode (boost) → GainNode (volume) 
  → DynamicsCompressor (balanced mode only) → AnalyserNode → Destination
```

**React Components:**
- `App.tsx` - Main application logic and audio setup
- `AudioLevelMeter.tsx` - Visual level meter with clipping detection
- `Waveform.tsx` - Real-time oscilloscope display
- `PitchIndicator.tsx` - Pitch detection and tuning visualization

### State Management
- React hooks (`useState`, `useEffect`, `useRef`) for local state
- `useKV` hook for persistent storage (volume, boost, device selection)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Modern browser with Web Audio API support
- Microphone for testing

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd spark-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Project Structure
```
src/
├── App.tsx                    # Main application
├── components/
│   ├── AudioLevelMeter.tsx   # Volume meter
│   ├── Waveform.tsx           # Waveform display
│   ├── PitchIndicator.tsx    # Pitch detection
│   └── ui/                    # Shadcn components (40+ prebuilt)
├── index.css                  # Theme and global styles
├── lib/
│   └── utils.ts               # Helper functions
└── hooks/
    └── use-mobile.ts          # Responsive hook
```

## 💡 How to Contribute

### Reporting Bugs

**Before submitting:**
- Check if the issue already exists
- Try reproducing in a clean browser profile
- Test in multiple browsers if possible

**Include in your report:**
- Browser and OS version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
- Audio device information

### Suggesting Features

**Good feature requests include:**
- Clear description of the feature
- Use case / problem it solves
- How you envision it working
- Any potential challenges or considerations

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with descriptive messages**
   ```bash
   git commit -m "Add: feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request**

### Code Style Guidelines

**TypeScript:**
- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Prefer functional components

**React:**
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Clean up effects properly (return cleanup functions)

**Styling:**
- Use Tailwind utility classes
- Follow existing color variable conventions
- Maintain responsive design patterns
- Test on mobile viewports

**Audio:**
- Always clean up audio nodes properly
- Handle browser permission errors gracefully
- Test latency impacts of changes
- Consider CPU usage

### Component Guidelines

**When creating new components:**
```typescript
// Good component structure
interface MyComponentProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export default function MyComponent({ 
  value, 
  onChange, 
  disabled = false 
}: MyComponentProps) {
  // Component logic
  
  return (
    <div className="...">
      {/* JSX */}
    </div>
  )
}
```

**Audio-related components should:**
- Accept `analyser` or audio nodes as props
- Handle null/inactive states gracefully
- Cancel animation frames on unmount
- Update at 60fps or less (avoid over-rendering)

### Testing Your Changes

**Manual Testing Checklist:**
- [ ] Does it work with monitoring off and on?
- [ ] Does it handle permission denial gracefully?
- [ ] Does it work with multiple microphones?
- [ ] Does it persist settings correctly?
- [ ] Does it work on mobile?
- [ ] Does it work in Chrome, Firefox, Safari?
- [ ] Are there any console errors?
- [ ] Does it perform well (no lag)?

**Audio-specific Testing:**
- [ ] Does it introduce latency?
- [ ] Does it handle clipping properly?
- [ ] Does it work in both latency modes?
- [ ] Does it clean up audio nodes on unmount?

## 🎨 Design Guidelines

### Color Usage
- Use CSS variables from `index.css`
- Primary color for main actions and active states
- Accent for highlights and success states
- Destructive for warnings and errors
- Muted for secondary information

### Typography
- Use IBM Plex Sans for UI text
- Use IBM Plex Serif for headings (if needed)
- Use Fira Code for monospace (technical info)
- Maintain clear hierarchy

### Animations
- Keep animations subtle and purposeful
- Use Framer Motion for complex animations
- Transitions should be 150-300ms
- Avoid animations that delay user actions

### Accessibility
- Maintain proper contrast ratios
- Provide text alternatives for visual info
- Ensure keyboard navigation works
- Don't rely solely on color to convey info

## 🔊 Audio Processing Guidelines

### Working with Web Audio API

**Creating Audio Nodes:**
```typescript
// Always store references for cleanup
const gainNode = audioContext.createGain()
gainNodeRef.current = gainNode

// Connect nodes explicitly
sourceNode.connect(gainNode)
gainNode.connect(destination)
```

**Cleanup Pattern:**
```typescript
useEffect(() => {
  // Setup audio nodes
  
  return () => {
    // Always disconnect and nullify
    if (nodeRef.current) {
      nodeRef.current.disconnect()
      nodeRef.current = null
    }
  }
}, [dependencies])
```

**Performance Tips:**
- Use `requestAnimationFrame` for visualizations
- Limit FFT size to what you need (smaller = faster)
- Cancel animation frames on cleanup
- Avoid creating new nodes every render

### Latency Considerations

**Things that add latency:**
- Dynamic compression
- High FFT sizes
- Additional processing nodes
- Smoothing and filtering

**Things that reduce latency:**
- `latencyHint: 0` in AudioContext
- Smaller FFT sizes (128 vs 2048)
- Direct node connections
- Disabling smoothing

## 📚 Resources

### Documentation
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)

### Audio Processing
- [Web Audio API Spec](https://www.w3.org/TR/webaudio/)
- [Audio Context Latency](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/baseLatency)
- [Autocorrelation Pitch Detection](https://github.com/cwilso/PitchDetect)

## 🙋 Questions?

If you have questions about contributing:
1. Check existing issues and discussions
2. Review the PRD.md for design decisions
3. Open a new issue with the "question" label

## 📄 License

By contributing to Audio Monitor, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Audio Monitor! 🎤✨
