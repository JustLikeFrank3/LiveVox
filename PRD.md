# Planning Guide

A real-time audio monitoring application that routes microphone input directly to speaker output, enabling users to hear themselves while singing along to music from streaming services.

**Experience Qualities**: 
1. **Immediate** - Sub-10ms latency optimized for headphone microphones with real-time latency monitoring
2. **Transparent** - Clean, natural audio passthrough that doesn't color or distort the voice
3. **Effortless** - Simple one-button operation with automatic headphone microphone detection

**Complexity Level**: Micro Tool (single-purpose application)
This is a focused utility that does one thing exceptionally well - enabling audio monitoring. It requires real-time audio processing but maintains simplicity through minimal controls.

## Essential Features

### Audio Monitoring Toggle
- **Functionality**: Activates/deactivates microphone-to-speaker passthrough using Web Audio API with optimized low-latency settings
- **Purpose**: Allows users to hear themselves in real-time while music plays from other applications, automatically prioritizing headphone microphones
- **Trigger**: User clicks the main toggle button
- **Progression**: Click button → Request microphone permission (if needed) → Detect headphone microphone → Activate audio stream with 48kHz sample rate → Monitor input through output → Display device and latency info → Visual feedback of active state
- **Success criteria**: User can hear their own voice through speakers with <10ms latency when using headphones, audio continues until manually stopped, headphone mic is automatically selected when available

### Microphone Device Selector
- **Functionality**: Dropdown selector that lists all available audio input devices and allows manual selection
- **Purpose**: Gives users control to choose specific microphones when multiple devices are connected or automatic detection selects the wrong device
- **Trigger**: User opens device selector dropdown
- **Progression**: Load available devices → Display list with device names → User selects device → If monitoring is active, restart stream with new device → Update current device badge
- **Success criteria**: All connected audio input devices appear in list with readable names, selected device persists between sessions, switching devices while monitoring seamlessly transitions to new input

### Volume Control
- **Functionality**: Adjusts the gain of the microphone input to prevent feedback or allow comfortable monitoring levels
- **Purpose**: Prevents audio feedback loops and allows users to balance their voice against music
- **Trigger**: User adjusts the volume slider while monitoring is active
- **Progression**: Drag slider → Adjust gain node in audio graph → Immediate volume change → Visual feedback of level
- **Success criteria**: Volume changes apply instantly without clicks/pops, range from muted to full input level

### Visual Audio Level Indicator
- **Functionality**: Real-time visualization of microphone input levels with waveform display, level meter, and clipping detection
- **Purpose**: Provides visual confirmation that audio is being captured, helps users optimize their distance from the mic, and alerts when signal is too hot
- **Trigger**: Automatically displays when monitoring is active
- **Progression**: Audio input detected → Analyze amplitude and peak values → Update visual meter and waveform → Detect clipping threshold (>95%) → Display clipping warning badge and pulsing meter → Continuous real-time updates
- **Success criteria**: Meter responds to voice input within 16ms (60fps), clearly shows clipping danger zone, prominent red "CLIPPING" badge appears when audio peaks exceed 95%, clipping indicator persists for 1 second after last clip event

### Device and Latency Display
- **Functionality**: Shows current input device name and measured audio latency in milliseconds
- **Purpose**: Confirms headphone mic is being used and provides transparency about audio delay
- **Trigger**: Automatically displays when monitoring starts
- **Progression**: Monitoring activated → Detect device → Measure AudioContext latency → Display badges with device name and latency value
- **Success criteria**: Correct device name displayed, latency measurement accurate within 1ms, color-coded badges (green <10ms, yellow <20ms, orange ≥20ms)

### Boost/Amplification Control
- **Functionality**: Provides additional gain boost (up to 300%) for users who need extra volume beyond standard monitoring levels
- **Purpose**: Enables users with quiet microphones or soft voices to hear themselves clearly without maxing out system volume
- **Trigger**: User adjusts boost slider while monitoring is active
- **Progression**: Drag slider → Adjust boost gain node in audio graph → Apply amplification multiplier → Immediate volume increase → Visual feedback with percentage badge → Monitor for clipping
- **Success criteria**: Boost applies instantly without clicks/pops, range from 0% (no boost) to 100% (4x amplification), clearly labeled with actual gain multiplier, compressor prevents harsh distortion, clipping indicator warns if signal is too hot

### Ultra-Low Latency Mode Toggle
- **Functionality**: Switch between ultra-low latency mode (minimal processing) and balanced mode (with compression and smoothing)
- **Purpose**: Allows users to prioritize absolute minimum latency over audio processing, or choose balanced quality with protection
- **Trigger**: User toggles the low latency mode switch
- **Progression**: Toggle switch → Stop current monitoring → Reconfigure audio context with latency hint of 0 vs 'interactive' → Remove compression and smoothing in low latency mode → Restart monitoring with new settings → Display mode status
- **Success criteria**: Ultra-low mode uses latencyHint: 0, FFT size of 128, no smoothing, no compression for absolute minimum delay. Balanced mode uses latencyHint: 'interactive', FFT size of 256, smoothing, and dynamic compression for quality. Setting persists between sessions. Seamless transition when monitoring is active.

### Pitch Detection and Tuning Indicator
- **Functionality**: Real-time pitch detection using autocorrelation algorithm that identifies the musical note being sung and displays how close it is to being in tune
- **Purpose**: Helps singers practice pitch accuracy and stay in tune by providing immediate visual feedback on their vocal pitch
- **Trigger**: Automatically displays when monitoring is active
- **Progression**: Audio input detected → Apply autocorrelation to detect fundamental frequency → Map frequency to nearest musical note → Calculate cents deviation from perfect pitch → Display note name, octave, and tuning meter → Show "In Tune" badge when within ±15 cents → Animate tuning needle position → Continuous real-time updates
- **Success criteria**: Accurately detects pitch for frequencies 60Hz-1000Hz (roughly C2 to C6), responds within 100ms, displays correct note names with octave numbers, shows cents deviation with visual meter, "In Tune" badge appears when within ±15 cents, tuning needle smoothly animates left (flat) or right (sharp), gracefully handles periods of silence

## Edge Case Handling

- **No microphone permission**: Display clear message explaining why permission is needed, with retry button
- **No microphone detected**: Show helpful error message suggesting checking device connections
- **No headphone mic found**: Falls back to default microphone automatically and displays the selected device
- **Multiple audio devices**: Shows all available devices in selector, prioritizes headphone/headset/bluetooth microphones as default, persists user's manual selection
- **Audio feedback loop**: Provide warning about using headphones, disable monitoring if dangerous levels detected
- **Browser compatibility**: Detect and display message if Web Audio API is not supported
- **Background tab**: Continue monitoring even when tab is not focused
- **Microphone already in use**: Handle gracefully with error message about closing other apps using the mic
- **High latency detection**: Visual warning if latency exceeds 20ms
- **Ultra-low latency mode with high boost**: Display warning that compression is bypassed and clipping may occur at high boost levels
- **Mode switching during monitoring**: Seamlessly stop and restart audio stream with new latency settings
- **No vocal input during pitch detection**: Display "Sing or play a note" placeholder message when no pitch is detected
- **Pitch outside detection range**: Gracefully ignore frequencies below 60Hz or above 1000Hz without displaying incorrect notes
- **Unstable pitch (vibrato, pitch bends)**: Autocorrelation handles natural voice variations, updates smoothly without jitter

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
  - Switch (shadcn) - Ultra-low latency mode toggle, styled to feel like hardware power switch
  - Slider (shadcn) - Volume and boost controls, customized with larger thumb for precise control
  - Select (shadcn) - Microphone device selector for choosing input device
  - Card (shadcn) - Container for the main interface with subtle elevation
  - Progress (shadcn) - Audio level meter, customized with gradient to show safe/warning/danger zones
  - Alert (shadcn) - For permission requests and error messages
  - Badge (shadcn) - For device name, latency, boost level, and clipping indicators
  
- **Customizations**: 
  - Custom audio visualizer component using canvas for real-time level metering
  - Custom waveform component for real-time audio visualization
  - Custom pitch indicator component with autocorrelation-based pitch detection
  - Gradient-based progress bar with green (safe) → yellow (optimal) → red (clipping) zones
  - Pulsing ring animation around active monitoring button
  - Animated tuning meter with needle that moves left (flat) or right (sharp)
  - Color-coded tuning feedback: emerald for in tune, yellow for sharp, blue for flat
  
- **States**: 
  - Toggle button: Inactive (muted colors) → Hover (subtle glow) → Active (bright accent color with pulse animation) → Disabled (grayed out)
  - Slider: Resting → Hover (thumb enlarges) → Dragging (increased thumb size, trail effect)
  - Level meter: Continuous smooth animation responding to audio input
  
- **Icon Selection**: 
  - Microphone icon (phosphor) for main toggle when active
  - MicrophoneSlash icon for inactive state
  - SpeakerHigh icon for volume control
  - Lightning icon for boost amplification control
  - Warning icon for error/feedback alerts and clipping
  - Headphones icon for device indicator badge
  - Gauge icon for ultra-low latency mode toggle
  - MusicNote icon for pitch detection section
  
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
