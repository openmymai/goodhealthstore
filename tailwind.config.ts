import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-thai)', 'sans-serif'], // Match --bs-body-font-family
        heading: ['var(--font-prompt)', 'sans-serif'], // Match --heading-font (using Nunito from HTML)
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        cyan: '#79FFE1',
        primary: {
          DEFAULT: '#6BB252', // --bs-primary
          subtle: '#FFF9EB', // --bs-primary-bg-subtle (Adjusted, original was yellow-ish)
        },
        secondary: {
          DEFAULT: '#364127', // --bs-secondary
        },
        danger: {
          DEFAULT: '#F95F09', // --bs-danger
          subtle: '#FFEADA', // --bs-danger bg from btn-danger
        },
        success: {
          DEFAULT: '#a3be4c', // --bs-success
          subtle: '#eef5e5', // --bs-success-bg-subtle
        },
        warning: {
          DEFAULT: '#ffc107', // Bootstrap default warning, used for stars
          subtle: '#FCF7EB', // --bs-warning bg from btn-warning
        },
        light: {
          DEFAULT: '#f8f8f8', // --bs-light-rgb
          hover: '#EFEFEF', // From btn-outline-light hover
        },
        dark: {
          DEFAULT: '#333333', // --bs-link-color
          hover: '#000000', // --bs-link-hover-color
        },
        body: '#747474', // --bs-body-color
        'border-color': '#F7F7F7', // --bs-border-color
        'border-subtle': '#E2E2E2', // Used in product item buttons
        'border-dashed': '#d1d1d1', // Used in offcanvas menu
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
        lsone: '-0.04em',
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
        '7': '0.8rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
        cl: '0px 5px 22px rgba(0, 0, 0, 0.04)',
        ch: '0px 20px 44px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
