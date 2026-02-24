# M&L Consultorías y Peritajes

Ultra modern automotive expert appraisal and technical consultancy landing page.

## Project Constraints

### 1. Atomic Design
The project follows the Atomic Design methodology to organize components:
- **Atoms**: Basic building blocks (buttons, inputs, labels).
- **Molecules**: Groups of atoms functioning together (form groups, navigation items).
- **Organisms**: Complex components composed of molecules and/or atoms (header, footer, hero section).
- **Templates**: Page-level layouts that provide context to organisms.
- **Pages**: Specific instances of templates with real content.

### 2. BEM Styling (Block Element Modifier)
Styling is strictly managed using BEM naming convention to ensure predictability and avoid specificity issues.
- Pattern: `.block`, `.block__element`, `.block--modifier`.

### 3. SCSS Modules
All styles are written in SCSS and scoped using CSS Modules. No utility-first frameworks (like Tailwind) are permitted.

### 4. DOM Identity
- Every HTML tag must have a unique `id`.
- Iterative items (lists, maps) must have generated sub-id indexes (e.g., `item-0`, `item-1`).

### 5. Tech Stack
- **Framework**: Next.js 16.1.6
- **Language**: TypeScript
- **State Management**: Zustand
- **Animations**: GSAP (@gsap/react)
- **3D Graphics**: Three.js (@react-three/fiber, @react-three/drei)
- **Smooth Scroll**: Lenis

### 6. SSR Guardrails
- 3D and heavy animation components are wrapped in SSR-safe containers or dynamically imported with `ssr: false`.
- Hooks like `useEffect` are used to ensure client-side only execution where necessary.

### 7. Responsiveness
- Every component must be fully responsive across all device sizes.
- Mobile-first approach using SCSS media queries.
- Flexible layouts (Flexbox, Grid) and fluid typography (`clamp()`).

## Getting Started

```bash
npm install
npm run dev
```
