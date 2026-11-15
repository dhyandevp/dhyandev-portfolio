# Design System: Dhyandev P Portfolio

<!-- impeccable:design-schema 1 -->

## World & Direction
An editorial technical journal fused with cinematic creative portfolio aesthetics. Combines the oversized, authoritative typography of modern product design with the structural precision of technical index documents and the atmospheric character of sage and burgundy accents.

## Palette
- **Canvas (Primary Background)**: `#F7F7F4` (Warm off-white)
- **Ink (Primary Foreground)**: `#111111` (Near-black)
- **Ink Muted**: `#5A5A55` (Secondary descriptive text)
- **Ink Faint**: `#8C8C84` (Technical annotations & coordinates)
- **Secondary Surface (Sage)**: `#B5C7AF` with `#D3DFCE` light tint and `#7D9476` dark boundary
- **Accent (Burgundy)**: `#790F0B` with `#520A07` dark hover and `#A31C16` active state
- **Technical Accent (Cobalt Blue)**: `#315EBD` (Brackets, indicators, index numbers)
- **Hairline Borders**: `#D8D8D2` (1px crisp structural grid)

## Colors
- `--color-canvas`: `#F7F7F4`
- `--color-ink`: `#111111`
- `--color-sage`: `#B5C7AF`
- `--color-burgundy`: `#790F0B`
- `--color-cobalt`: `#315EBD`
- `--color-hairline`: `#D8D8D2`

## Components
- **Navigation**: Sticky top bar with live IST telemetry, monospace brackets, responsive drawer.
- **Hero**: Colossal display headline, status pill, editorial narrative, and technical hardware spec sheet.
- **SectionHeader**: Minimal uppercase label, section index bracket `[01]`, display title, and category tag.
- **Projects**: Asymmetric split showcase cards with terminal telemetry consoles, spec tables, and modal dossier viewer.
- **Capabilities**: 3-column architectural matrix dividing daily production technologies from research topics.
- **TechnicalNotes**: Monospaced laboratory log ledger with expandable testbench methodologies.
- **Contact**: Direct transmission endpoint, 1-click clipboard copy, and verified developer profile grid.
- **Footer**: Dynamic year colophon, privacy guarantee, and return-to-top control.

## Typography
- **Headings & Display**: Space Grotesk / Inter (`font-display`, `font-extrabold`, tracking-tight)
- **Body & Prose**: Inter / system sans-serif (`font-sans`, 14px–16px, leading-relaxed)
- **Technical Annotations & Telemetry**: JetBrains Mono / Fira Code (`font-mono`, `[01]`, `[PRJ-01]`, `tabular-nums`)
- **Regional Identity (Malayalam)**: Noto Sans Malayalam / Manjari (`font-malayalam`, `ധ്യാനദേവ് പി`)

## Layout & Composition
- **Grid**: 12-column responsive grid with a subtle 24px×24px engineering graph paper background pattern (`rgba(49, 94, 189, 0.04)`).
- **Hairlines**: 1px borders define all functional boundaries, avoiding floating amorphous card containers.
- **Corners**: Crisp square corners (`rounded-none`) to maintain physical sheet / laboratory index authenticity.
- **Pacing**: Generous vertical separation (64px–96px) balanced with dense, tightly aligned technical data strips.

## Browser Surfaces
- **Selection**: `::selection { background: #790F0B; color: #FFFFFF; }`
- **Scrollbar**: 6px custom scrollbar (`#F7F7F4` track, `#8A9E84` thumb, `#790F0B` hover).
- **Focus Rings**: `2px solid #790F0B` with `2px outline-offset`.
- **Numbers**: `font-variant-numeric: tabular-nums` for all clocks, indices, and coordinates.
