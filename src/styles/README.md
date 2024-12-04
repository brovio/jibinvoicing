# Design System Guidelines

This document outlines the core design principles and components used throughout our application.

## Core Principles

1. **Consistency**: All components should follow the same design patterns
2. **Accessibility**: Ensure proper contrast ratios and semantic HTML
3. **Responsiveness**: All components should work across different screen sizes
4. **Maintainability**: Use design tokens and utility classes for easy updates

## Usage

Import the design system in your components:
```css
@import '../styles/design-system.css';
```

## Key Components

### Cards
- Use `.card-base` for consistent card styling
- Always maintain 24px (1.5rem) padding
- Include a border and subtle shadow

### Buttons
- Primary: Use `.button-primary` for main actions
- Outline: Use `.button-outline` for secondary actions
- Icon buttons: Maintain 16x16px (1rem) icon size

### Typography
- Headings: Use `.heading-lg` for card titles
- Body: Use `.text-base` for regular text
- Muted: Use `.text-muted` for secondary information

### Spacing
- Maintain consistent gaps (1.5rem) between grid items
- Use standard padding tokens (--spacing-*) for internal spacing

### Colors
- Primary: #4895EF (Brand blue)
- Secondary: #6B7280 (Gray)
- Accent: #3A0CA3 (Purple)

### Border Radius
- Cards: 0.75rem (12px)
- Buttons: 0.5rem (8px)
- Input fields: 0.375rem (6px)

## Examples

```jsx
<div className="card-base">
  <h2 className="heading-lg">Card Title</h2>
  <p className="text-base">Card content</p>
  <button className="button-primary">Action</button>
</div>
```

For more detailed implementation examples, refer to the Landing page components.