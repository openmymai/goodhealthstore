import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // เพิ่ม custom theme ตรงนี้ ถ้าต้องการ
      // เช่น สีจาก style.css ของคุณ
      fontFamily: {
        // ใช้ Noto Sans Thai เป็น default sans-serif
        sans: ['var(--font-noto-sans-thai)', 'sans-serif'],
        // สร้าง font family 'heading' ให้ใช้ Prompt ผ่าน CSS Variable
        heading: ['var(--font-prompt)', 'sans-serif'],
      },
      colors: {
        primary: '#6BB252', // --bs-primary
        secondary: '#364127', // --bs-secondary
        danger: '#F95F09', // --bs-danger
        success: '#a3be4c', // --bs-success
        // เพิ่มสีอื่นๆ ตามต้องการ
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
