# Planning Guide

A real-time audio monitoring application that routes microphone input directly to speaker output, enabling users to hear themselves while singing along to music from streaming services.

**Experience Qualities**: 
1. **Immediate** - Zero perceptible latency between speaking/singing and hearing your voice
2. **Transparent** - Clean, natural audio passthrough that doesn't color or distort the voice
3. **Effortless** - Simple one-button operation without complex audio settings or configurations

**Complexity Level**: Micro Tool (single-purpose application)
This is a focused utility that does one thing exceptionally well - enabling audio monitoring. It requires real-time audio processing but maintains simplicity through minimal controls.

## Essential Features

### Audio Monitoring Toggle
- **Functionality**: Activates/deactivates microphone-to-speaker passthrough using Web Audio API
- **Purpose**: Allows users to hear themselves in real-time while music plays from other applications
- **Trigger**: User clicks the main toggle button
- **Progression**: Click button → Request microphone permission (if needed) → Activate audio stream → Monitor input through output → Visual feedback of active state
- **Success criteria**: User can hear their own voice through speakers with imperceptible latency (<20ms), audio continues until manually stopped

### Volume Control
- **Functionality**: Adjusts the gain of the microphone input to prevent feedback or allow comfortable monitoring levels
- **Purpose**: Prevents audio feedback loops and allows users to balance their voice against music
- **Trigger**: User adjusts the volume slider while monitoring is active
- **Progression**: Drag slider → Adjust gain node in audio graph → Immediate volume change → Visual feedback of level
- **Success criteria**: Volume changes apply instantly without clicks/pops, range from muted to full input level

### Visual Audio Level Indicator
- **Functionality**: Real-time visualization of microphone input levels
- **Purpose**: Provides visual confirmation that audio is being captured and helps users optimize their distance from the mic
- **Trigger**: Automatically displays when monitoring is active
- **Progression**: Audio input detected → Analyze amplitude → Update visual meter → Continuous real-time updates
- **Success criteria**: Meter responds to voice input within 16ms (60fps), clearly shows clipping danger zone

## Edge Case Handling

- **No microphone permission**: Display clear message explaining why permission is needed, with retry button
- **No microphone detected**: Show helpful error message suggesting checking device connections
- **Audio feedback loop**: Provide warning about using headphones, disable monitoring if dangerous levels detected
- **Browser compatibility**: Detect and display message if Web Audio API is not supported
- **Multiple audio devices**: Use system default microphone automatically, no device selection needed for simplicity
- **Background tab**: Continue monitoring even when tab is not focused
- **Microphone already in use**: Handle gracefully with error message about closing other apps using the mic

## Design Direction

The design should evoke a sense of professional audio equipment - like a hardware audio interface or studio monitor control. It should feel precise, reliable, and purpose-built, with a tactile quality to the controls that suggests real-world audio gear.

## Color Selection

A dark, studio-inspired color scheme that reduces eye strain and evokes professional audio equipment.

- **Primary Color**: Deep charcoal (oklch(0.25 0.01 260)) - Communicates professionalism and studio equipment aesthetic
- **Secondary Colors**: 
  - Muted slate (oklch(0.35 0.02 260)) - For secondary surfaces and controls
  - Dark navy background (oklch(0.18 0.02 260)) - For the main application background
- **Accent Color**: Electric cyan (oklch(0.75 0.15 195)) - High-tech, energetic color for active states and the monitoring indicator
- **Foreground/Background Pairings**: 
  - Background (oklch(0.18 0.02 260)): Light gray text (oklch(0.92 0.01 260)) - Ratio 11.2:1 ✓
  - Primary (oklch(0.25 0.01 260)): White text (oklch(0.98 0 0)) - Ratio 13.8:1 ✓
  - Accent (oklch(0.75 0.15 195)): Dark text (oklch(0.18 0.02 260)) - Ratio 8.4:1 ✓

## Font Selection

The typeface should convey technical precision and modern audio engineering, with clear readability for controls and strong hierarchy for the main action.

- **Typographic Hierarchy**: 
  - H1 (Main Status): Space Grotesk Bold/32px/tight letter spacing (-0.02em)
  - Body (Labels): Space Grotesk Medium/14px/normal tracking
  - Caption (Technical info): Space Grotesk Regular/12px/wide tracking (0.02em)

## Animations

Animations should feel responsive and purposeful, like physical studio equipment responding to touch. The monitoring indicator should pulse subtly when active to provide constant visual feedback. Volume changes should feel smooth and immediate. Transitions between states should be quick and decisive (150ms) to match the professional audio context.

## Component Selection

- **Components**: 
  - Button (shadcn) - Main monitoring toggle, modified with larger size and prominent active state
  - Switch (shadcn) - Alternative for monitoring toggle, styled to feel like hardware power switch
  - Slider (shadcn) - Volume control, customized with larger thumb for precise control
  - Card (shadcn) - Container for the main interface with subtle elevation
  - Progress (shadcn) - Audio level meter, customized with gradient to show safe/warning/danger zones
  - Alert (shadcn) - For permission requests and error messages
  
- **Customizations**: 
  - Custom audio visualizer component using canvas for real-time level metering
  - Gradient-based progress bar with green (safe) → yellow (optimal) → red (clipping) zones
  - Pulsing ring animation around active monitoring button
  
- **States**: 
  - Toggle button: Inactive (muted colors) → Hover (subtle glow) → Active (bright accent color with pulse animation) → Disabled (grayed out)
  - Slider: Resting → Hover (thumb enlarges) → Dragging (increased thumb size, trail effect)
  - Level meter: Continuous smooth animation responding to audio input
  
- **Icon Selection**: 
  - Microphone icon (phosphor) for main toggle when inactive
  - MicrophoneSlash icon for muted state
  - SpeakerHigh icon for volume control
  - Warning icon for error/feedback alerts
  
- **Spacing**: 
  - Main container: p-8 for breathing room
  - Control groups: gap-6 for clear separation
  - Labels to controls: gap-2 for tight association
  - Card to viewport edges: m-4 on mobile, centered with max-w-md on desktop
  
- **Mobile**: 
  - Stack controls vertically on mobile (flex-col)
  - Increase touch targets to min 48px height
  - Slider thumb enlarged to 24px for easier manipulation
  - Full-width card on mobile, centered with max width on desktop
  - Larger text sizes on mobile (16px base to prevent zoom on input focus)
