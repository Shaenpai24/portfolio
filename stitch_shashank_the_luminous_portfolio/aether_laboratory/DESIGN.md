---
name: Aether Laboratory
colors:
  surface: '#0d1515'
  surface-dim: '#0d1515'
  surface-bright: '#333b3b'
  surface-container-lowest: '#080f10'
  surface-container-low: '#151d1e'
  surface-container: '#192122'
  surface-container-high: '#232b2c'
  surface-container-highest: '#2e3637'
  on-surface: '#dce4e4'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dce4e4'
  inverse-on-surface: '#2a3232'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#76d6d5'
  on-secondary: '#003737'
  secondary-container: '#007f7f'
  on-secondary-container: '#ddfffe'
  tertiary: '#fff6e4'
  on-tertiary: '#3b2f00'
  tertiary-container: '#fed83a'
  on-tertiary-container: '#725e00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#93f2f2'
  secondary-fixed-dim: '#76d6d5'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#004f4f'
  tertiary-fixed: '#ffe173'
  tertiary-fixed-dim: '#e8c423'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#554500'
  background: '#0d1515'
  on-background: '#dce4e4'
  surface-variant: '#2e3637'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 160px
---

## Brand & Style

The design system is built upon the visual language of high-precision research environments and cinematic technology interfaces. It evokes a sense of "The Quiet Lab"—a place where complex engineering happens behind a veil of minimalist sophistication. The aesthetic avoids overused "hacker" tropes in favor of a premium, structured, and atmospheric experience.

The style is a hybrid of **Minimalism** and **Atmospheric Glassmorphism**. It utilizes pure black voids to create infinite depth, punctuated by sharp technical lines and ethereal light leaks. Every element should feel intentional, engineered, and high-fidelity, prioritizing white space to allow the "technical artifacts" (code, data, projects) to breathe.

## Colors

The palette is anchored in a **Pure Black (#000000)** foundation to achieve maximum OLED contrast and a cinematic "infinite" feel. 

- **Primary Cyan (#00f2ff):** Used sparingly for active states, key data points, and "light-leak" glows to simulate an energized technical environment.
- **Deep Teal (#008080):** Provides a sophisticated, low-energy counterpoint to the primary cyan, used for subtle gradients and secondary interactive elements.
- **Flashlight White (#ffffff):** High-contrast triggers for headings and primary actions, providing a sharp "clinical" clarity.
- **Muted Silver (#a1a1aa):** Reduces visual noise for secondary information and long-form body text.

## Typography

The typographic system utilizes a "Human-Machine" contrast. **Geist** provides the engineered, architectural feel for headlines, while **Inter** ensures that body copy remains approachable and highly legible. **JetBrains Mono** is reserved for technical labels, metadata, and code snippets to reinforce the research-lab narrative.

Headlines should use tight tracking (letter-spacing) to feel impactful and modern, while body text uses slightly generous tracking to improve readability against the pure black background. All uppercase transformations are strictly reserved for the `label-mono` tier to denote status or categories.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to maintain a controlled, gallery-like presentation. The layout is centered with a maximum width of 1200px, creating a focused "stage" for content.

- **Vertical Rhythm:** Large section gaps (160px+) are used to create cinematic pacing, ensuring the user focuses on one "discovery" at a time.
- **The Grid:** A 12-column system is used, but content often occupies the center 8 columns to increase focus and white space.
- **Responsive Behavior:** On mobile, margins shrink to 20px and section gaps reduce to 80px. Grid columns collapse to a single-column stack, prioritizing verticality and scroll-based motion.

## Elevation & Depth

Depth is not communicated through traditional shadows, but through **light emission and opacity layers**. 

1.  **Level 0 (The Void):** Pure black #000000.
2.  **Level 1 (Sub-surface):** Subtle 1px borders with 10% white opacity to define container edges without lifting them.
3.  **Level 2 (Active Surface):** Glassmorphism. Semi-transparent fills (white at 5% opacity) with a 12px backdrop-blur to simulate frosted laboratory glass.
4.  **The Glow:** Use cyan radial gradients with high diffusion (100px+ blur) placed *behind* components to create the "atmospheric lighting" effect. These represent the "flashlight" or "ambient glow" of the lab equipment.

## Shapes

The shape language is disciplined and geometric. A **Soft (0.25rem)** corner radius is applied to most UI components to prevent the interface from feeling "sharp" or aggressive, while maintaining a precise, technical look. 

Buttons and small interactive tags use the same consistent radius. Circle shapes are permitted only for status indicators or avatar masks to provide a singular point of organic contrast against the otherwise rectilinear grid.

## Components

### Buttons
- **Primary:** Solid white background with pure black text. No shadow. On hover, it emits a subtle primary cyan outer glow.
- **Secondary/Ghost:** 1px white border (20% opacity). Text in white. On hover, background shifts to 10% white opacity.

### Technical Cards
Cards should be treated as "Research Containers." They feature a 1px border (#ffffff at 10% opacity) and a subtle backdrop blur. Titles inside cards use `label-mono` for a categorized look.

### Input Fields
Minimalist execution. Only a bottom border (1px silver). When focused, the border turns primary cyan and a faint cyan glow appears beneath the line.

### Chips & Tags
Used for "Tech Stack" or "Field of Study." These are small, non-interactive boxes with 1px borders and `label-mono` typography.

### Data Lists
Standard lists should use a dotted "leader" line (like a table of contents) to connect titles to their metadata, reinforcing the technical documentation aesthetic.

### Scroll Progress
A thin, 2px cyan line at the very top of the viewport to track the user's progress through the portfolio "report."