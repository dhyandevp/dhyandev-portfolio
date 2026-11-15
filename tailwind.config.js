/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FFFFFF',
          subtle: '#FAFAFA',
          light: '#F4F4F4',
          card: '#FFFFFF'
        },
        ink: {
          DEFAULT: '#0A0A0A',
          muted: '#555555',
          faint: '#888888'
        },
        hairline: {
          DEFAULT: '#E5E5E5',
          dark: '#CCCCCC'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        curvy: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        pixel: ['"Pixelify Sans"', 'Silkscreen', 'monospace'],
        signature: ['Caveat', 'cursive'],
        mono: ['JetBrains Mono', 'Fira Code', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(49, 94, 189, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(49, 94, 189, 0.05) 1px, transparent 1px)",
        'grid-pattern-dense': "linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)"
      },
      backgroundSize: {
        'grid-sm': '16px 16px',
        'grid-md': '24px 24px',
        'grid-lg': '32px 32px'
      }
    },
  },
  plugins: [],
}
