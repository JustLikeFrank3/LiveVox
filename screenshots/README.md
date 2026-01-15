# Screenshots Folder

This folder is for storing screenshots and demo GIFs of the Audio Monitor application.

## 📸 Taking Screenshots

### For Static Screenshots:
- **Windows**: Press `Win + Shift + S` or use Snipping Tool
- **macOS**: Press `Cmd + Shift + 4` to capture a selection
- **Linux**: Use `gnome-screenshot` or your desktop's screenshot tool
- **Browser**: Most browsers have built-in screenshot tools (F12 → Device Toolbar → Screenshot icon)

### For Animated GIFs:

**Recommended Tools:**
- [ScreenToGif](https://www.screentogif.com/) - Windows (Free, open-source)
- [Kap](https://getkap.co/) - macOS (Free, open-source)
- [Peek](https://github.com/phw/peek) - Linux (Free, open-source)
- [LICEcap](https://www.cockos.com/licecap/) - Windows/macOS (Free)

**Tips for Great GIFs:**
1. Keep recordings short (3-10 seconds)
2. Show one feature at a time
3. Use a reasonable frame rate (10-15 fps is usually enough)
4. Optimize file size (aim for under 5MB)
5. Crop to show just the relevant UI area

## 📝 Suggested Screenshots

Here are some recommended screenshots to capture:

1. **audio-monitor-main.png** - The main interface when monitoring is active
2. **pitch-indicator.gif** - Animated demo of the pitch indicator responding to voice
3. **waveform-demo.gif** - The waveform visualization in action
4. **device-selection.png** - The input device dropdown menu
5. **settings-panel.png** - The controls section with sliders and switches
6. **clipping-warning.gif** - The clipping indicator appearing when volume is too high

## 🔗 Using in README

Once you've added screenshots here, they'll automatically appear in the main README.md file using these references:

```markdown
![Audio Monitor Interface](./screenshots/audio-monitor-main.png)
![Pitch Indicator Demo](./screenshots/pitch-indicator.gif)
```

## 📦 Optimizing Images

Before committing, consider optimizing your images:

**For PNG screenshots:**
- Use [TinyPNG](https://tinypng.com/) or [ImageOptim](https://imageoptim.com/)
- Or use CLI tools like `pngquant` or `optipng`

**For GIF animations:**
- Use [Gifski](https://gif.ski/) for high-quality compression
- Or online tools like [ezGIF](https://ezgif.com/optimize)

Keep file sizes reasonable (aim for <1MB for PNGs, <5MB for GIFs) so the README loads quickly for viewers.
