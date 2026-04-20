# Design System Specification: Industrial Sophistication

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Fluid"**

This design system moves away from the "industrial commodity" look common in the plastic tank industry. Instead, it positions the brand as a premium engineering authority. We achieve this by blending the structural reliability of industrial manufacturing with the fluid, high-end feel of modern architectural software.

The system breaks the "template" look through **Intentional Asymmetry**. We utilize generous white space (breathing room) contrasted against bold, overlapping "glass" containers and high-impact editorial typography. The goal is to make the user feel they are investing in a precision-engineered solution, not just a plastic container.

---

## 2. Colors & Tonal Depth
The color strategy is rooted in high-contrast "functional beauty." We use a clean, expansive neutral base to allow the brand’s fiery accents and cool teal highlights to command attention.

### The Color Palette
*   **Primary Accent (`#af2900` to `#d63c10`):** A vibrant, fiery gradient representing energy and durability. Reserved for high-conversion CTAs and primary brand moments.
*   **Secondary Highlight (`#006970`):** A sophisticated teal-blue used for technical callouts, borders of glass elements, and trust-building iconography.
*   **Neutral Foundation:** A sophisticated white (`#f9f9f9`) and surface-container scale that moves from `lowest` (#ffffff) to `highest` (#e2e2e2).

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. To separate a product specification section from a hero area, transition from `surface` (#f9f9f9) to `surface-container-low` (#f3f4f3). This creates a seamless, modern flow that feels "built" rather than "drawn."

### Glassmorphism & Signature Textures
To achieve the "Architectural Fluid" look, use **Glassmorphism** for floating cards and navigation overlays. 
*   **The Glass Recipe:** Use `surface_container_lowest` at 70% opacity with a `24px` backdrop blur. 
*   **Signature Gradient:** Main hero backgrounds or "Why Us" sections should feature a subtle radial gradient transitioning from `primary` (#af2900) to `primary_container` (#d63c10) at a 15-degree angle to provide a sense of movement and "soul."

---

## 3. Typography
The system utilizes a dual-sans-serif approach to balance technical precision with approachable modernism.

*   **Display & Headlines (Manrope):** Chosen for its geometric stability and high-end editorial feel. 
    *   *Display-LG (3.5rem):* Use for bold, asymmetric hero statements.
    *   *Headline-MD (1.75rem):* Used for section titles with tight letter-spacing (-0.02em).
*   **Body & Labels (Inter):** The gold standard for readability.
    *   *Body-LG (1rem):* Used for product descriptions to ensure maximum clarity and trust.
    *   *Label-MD (0.75rem):* Used for technical specifications and data points, often in All-Caps with +0.05em tracking.

The typographic hierarchy is designed to lead the eye through a "Scan, Interest, Read" flow, reinforcing the conversion-focused nature of the brand.

---

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering** and **Ambient Light**.

*   **The Layering Principle:** Depth is achieved by stacking. Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f3f4f3) background. This creates a natural, soft lift that mimics fine paper or smooth polymer.
*   **Ambient Shadows:** If a "floating" element (like a Quote Request Modal) is required, use a shadow with a 40px blur, 0px offset, and 6% opacity of the `on_surface` color. This feels like environmental light rather than a digital effect.
*   **The "Ghost Border" Fallback:** For interactive states (e.g., a focused input), use the `secondary` teal at 20% opacity. Never use a 100% opaque border unless it is for the brand-specific teal accent line.
*   **Glass Depth:** Layered glass elements should have a subtle 0.5px "inner glow" using `outline_variant` (#e4beb5) at 30% opacity to simulate the edge of a high-quality material.

---

## 5. Components

### Buttons
*   **Primary:** A gradient fill (`primary` to `primary_container`) with `xl` (0.75rem) rounded corners. Text is `on_primary` (White).
*   **Secondary:** Ghost style. Transparent background with a `secondary` (#006970) "Ghost Border" at 40% opacity. 
*   **Interaction:** On hover, buttons should scale 2% (1.02) and increase shadow diffusion to signal tangibility.

### Cards & Technical Specs
*   **The Card Rule:** No dividers. Use `title-md` for headers and `body-sm` for content, separated by 24px of vertical white space.
*   **Technical Chips:** Use `secondary_container` (#96f1fa) with `on_secondary_container` (#006f77) text for tank capacities and material types. Corner radius: `full`.

### Input Fields
*   **Style:** Minimalist. `surface_container_low` background with a bottom-only "Ghost Border." 
*   **Focus State:** The bottom border transitions to 100% `secondary` (teal), and the label floats upward using the `label-sm` scale.

### Industrial Progress Indicators
*   For multi-step quote forms, use a horizontal "Liquid Bar" that fills with the `primary` gradient, reflecting the fluid nature of the product.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts where text is left-aligned and imagery overlaps the container edges.
*   **Do** use large, high-fidelity photography of the tanks in architectural settings or clean industrial environments.
*   **Do** rely on the spacing scale to create hierarchy rather than adding lines or boxes.
*   **Do** apply `backdrop-filter: blur(12px)` to all glassmorphic containers.

### Don't
*   **Don't** use pure black (#000000). Use `on_surface` (#1a1c1c) for all "black" text to maintain a premium, ink-on-paper feel.
*   **Don't** use standard "drop shadows" (e.g., #000 25% opacity). They look cheap and dated.
*   **Don't** use 1px solid borders to separate sections.
*   **Don't** use the `primary` red-orange for large background areas; it is a high-energy accent meant to guide the eye, not overwhelm it.