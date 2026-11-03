/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4F5FF',
          100: '#E8E8FF',
          200: '#D5D5FF',
          300: '#B4B0FF',
          400: '#8A82FF',
          500: '#605BFF', // Primary base brand color
          600: '#4E46E5',
          700: '#3D35C7',
          800: '#2E279D',
          900: '#201A73',
        },
        surface: {
          light: '#F8F9FD',
          card: '#FFFFFF',
          border: '#F0F2F8',
          hover: '#F4F5F9',
        },
        content: {
          title: '#1B2559',
          body: '#2B3674',
          subtle: '#707EAE',
          muted: '#A3AED0',
        },
        status: {
          success: '#10B981',
          'success-bg': '#E8F8F0',
          warning: '#F59E0B',
          'warning-bg': '#FFF4EB',
          danger: '#EF4444',
          'danger-bg': '#FEECEB',
          cyan: '#00B5D8',
          'cyan-bg': '#E6F7FF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px 0 rgba(112, 144, 176, 0.08)',
        'soft-sm': '0 2px 10px 0 rgba(112, 144, 176, 0.06)',
        'soft-lg': '0 10px 30px 0 rgba(112, 144, 176, 0.12)',
        'glow': '0 4px 20px 0 rgba(96, 91, 255, 0.35)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      }
    },
  },
  plugins: [],
}
