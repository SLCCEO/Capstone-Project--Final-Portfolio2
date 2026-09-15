# Portfolio Project Milestone 4 - Jeremiah Hass

## Accessibility (WAVE & WCAG AA Compliance)
- **Zero WAVE Errors**: Verified across `index.html`, `projects.html`, and `about.html`.
- **WCAG AA Contrast**: Background `#f8fafc`, Card text `#0f172a`, Navigation `#0b2d5c`, and Buttons `#0d9488` meet or exceed 4.5:1 ratio requirements.
- **Keyboard Navigation**: Focus rings (`:focus-visible`), interactive mobile navigation (`aria-expanded`), project filters, and dynamically populated form errors (`aria-describedby`, `aria-invalid`) are completely operable via keyboard.

## Features & JavaScript Interactions
1. **Dynamic Mobile Navigation & Footer Updates**: Script builds standard toggle buttons for mobile screens and updates footer copyright dates automatically.
2. **Interactive Project Category Filtering**: `projects.html` features live filtering by software, hardware, or web categories without page reloads.
3. **Live GitHub Telemetry API Integration**: `index.html` dynamically fetches profile data, repositories, and avatars from `api.github.com/users/SLCCEO`.
4. **Accessible Form Validation**: `about.html` inspects name, email format, drop-down selection, and message input prior to submission with live screen-reader feedback.

## Folder Hierarchy
```text
portfolio/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
├── projects.html
├── about.html
└── README.md