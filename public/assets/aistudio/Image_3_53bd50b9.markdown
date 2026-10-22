---
name: Mindful Cadence
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#404944'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#00342f'
  on-tertiary: '#ffffff'
  tertiary-container: '#004d46'
  on-tertiary-container: '#53c2b5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '700'
    lineHeight: 3.5rem
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.6rem
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.45rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.2rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.005em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  stat-counter:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies intentional focus, quiet ambition, and organic personal growth. Designed for professionals, creators, and disciplined individuals seeking clarity over chaos, the interface prioritizes tranquil efficiency over gamified distraction. 

The aesthetic blends **Modern Minimalism** with subtle **Tactile Precision**:
- High-breathing room architecture with generous white space to decompress mental load.
- Restrained color application where saturated hues strictly communicate progress, milestones, and habit cadence rather than decorative clutter.
- Crisp boundary definitions combined with soft elevation shifts to create physical calm and reassurance.
- The UI evokes the sensation of opening a pristine, high-grade linen notebook structured with surgical clarity.

## Colors

The palette grounds the user with deep botanical tones, energized by warm metallic rewards and supported by mineral slates.

### Roles & Semantic Balance
- **Primary (`#064E3B`)**: Represents grounding, primary habit completion, primary action buttons, active tab states, and the core anchor of the visual hierarchy. Deep Emerald asserts quiet discipline.
- **Secondary (`#D97706`)**: Reserved for motivational mechanics—streak tallies, milestone badges, celebration rings, and attention-worthy streak maintenance warnings.
- **Tertiary (`#0D9488`)**: A calming, muted teal deployed for habit domain categories, sub-tags, and secondary informational indicators.
- **Surfaces & Backgrounds**: The canvas foundation rests on `#F8FAFC`, transitioning inward to elevated `#FFFFFF` container cards with `#F1F5F9` nested micro-surfaces.
- **Structural Lines**: Subtle stone edges defined by `#E2E8F0` maintain container definition without visual friction.
- **Text & Content**: Deep slate `#0F172A` provides effortless legibility for primary text, accompanied by `#475569` for meta-labels and `#94A3B8` for placeholders or inactive markers.

## Typography

The type pairing combines the humanized, contemporary geometry of **Plus Jakarta Sans** for editorial headers and milestone metrics with the utilitarian legibility of **Inter** for actionable checklist controls, habit logs, and metadata.

- **Numerics & Counters**: Use `stat-counter` using tabular figures (`font-variant-numeric: tabular-nums`) to ensure zero visual jitter as streak counts or session timers tick up.
- **Microcopy**: Keep badge and tag text in `label-sm` with tight tracking and medium-to-semibold weights to ensure sharp readability against tinted pill backdrops.

## Layout & Spacing

The layout operates on an intentional 8pt spatial grid configured to maintain spatial calm across varying screen sizes.

### Structure
- **Desktop (1024px+)**: 12-column responsive grid centered inside a max-width boundary of `1280px`. Left-aligned persistent navigation rail (64px icon rail or 240px expanded drawer), dynamic 8-column main dashboard canvas, and a 4-column secondary analytics/streak sidebar.
- **Tablet (768px - 1023px)**: 8-column fluid layout; analytics collapse beneath primary habit agendas.
- **Mobile (<768px)**: Single-column full-width flow bounded by `1rem` safe margins and anchored by a 64px floating bottom action bar.

### Spacing Rules
- Daily habit entries stack with `space-sm` (8px) gaps to reinforce a continuous rhythm.
- Section domains (e.g., "Morning Rituals" vs. "Deep Work") maintain `space-xl` (40px) separations to preserve cognitive compartmentalization.

## Elevation & Depth

Visual hierarchy uses a refined **tonal layering and ambient glow** paradigm rather than deep drop shadows. This preserves the minimalist air of the canvas while ensuring clarity in layer stacking.

- **Ground Level (`0`)**: Canvas baseline (`#F8FAFC`). Flat with no shadows.
- **Layer 1 (Cards, Modules)**: Elevated white cards (`#FFFFFF`) with a hairline border (`1px solid #E2E8F0`) and an ambient, low-opacity whisper shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Layer 2 (Hover & Interactive Cards)**: On interaction, checklist tiles lift slightly with an expanded soft shadow: `0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -4px rgba(15, 23, 42, 0.02)`.
- **Layer 3 (Modals, Slide-overs & Popovers)**: High ambient dispersion: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)` with a soft tinted backdrop filter blur (`backdrop-filter: blur(4px); background-color: rgba(15, 23, 42, 0.2)`).

## Shapes

The design system adopts a balanced, rounded visual language (`roundedness: 2` = 0.5rem base radius) that softens functional rigor without drifting into novelty:
- **Base Cards & Inputs**: `0.5rem` (8px) for crisp containment.
- **Grouped Containers & Panels**: `rounded-lg` (`1rem` / 16px) to bundle associated actions into a unified visual block.
- **Badges, Streak Counters & Checkbox Targets**: Fully pill-shaped (`9999px`) or hyper-rounded squares (`0.5rem`) to communicate comfort, touch friendliness, and satisfaction.

## Components

### Buttons
- **Primary Action**: Emerald background (`#064E3B`), white text (`#FFFFFF`), `0.5rem` radius, `0.75rem 1.5rem` padding. Hover: `#0F5132`. Active: subtle transform scale `0.98`.
- **Secondary Action**: Bordered variant using `#E2E8F0` border, `#0F172A` text, `#FFFFFF` background. Hover: `#F8FAFC` with `#CBD5E1` border.
- **Streak Celebration Button**: Gradient accent or warm gold fill (`#D97706`), white text, reserved exclusively for milestones and streak claims.

### Checklist & Habit Controls
- **Habit Checkbox**: 24x24px rounded square (6px radius). Default state: 1.5px border `#CBD5E1` against `#FFFFFF`. 
- **Completed State**: Background morphs into `#064E3B` with a crisp white animated checkmark. The title text gently transitions to `#94A3B8` with an optional subtle strikethrough.

### Chips & Badges
- **Category Badge**: Pill-shaped (`rounded-full`), `space-xs` vertical by `space-sm` horizontal padding. Built with muted tertiary teal tint (`#CCFBF1` background, `#0D9488` text).
- **Streak Badge**: Pill-shaped container featuring an amber micro-flame icon, `#FEF3C7` background, and `#B45309` text displaying the numeric frequency (e.g., `14d`).

### Cards & Modules
- Main habit containers sit on `#FFFFFF` with `1px solid #E2E8F0` border and `1rem` internal padding. 
- Integrated progress rings or horizontal segmented bars leverage `#064E3B` for completion and `#F1F5F9` for remaining intervals.

### Form Inputs
- Standard inputs maintain a 44px height, `#FFFFFF` fill, `#E2E8F0` border, and text set in `Inter` 14px. Focused state uses an outline ring of `2px solid #064E3B` with zero pixel offset.