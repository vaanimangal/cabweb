/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f4f4f5', 100: '#e4e4e7', 200: '#c4c4c8', 300: '#9a9aa1',
          400: '#6b6b73', 500: '#3f3f46', 600: '#27272a', 700: '#18181b',
          800: '#0e0e10', 900: '#08080a', 950: '#050506',
        },
        red: {
          50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
          400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
          800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a',
        },
        gold: {
          50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047',
          400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207',
          800: '#854d0e', 900: '#713f12',
        },
        success: { 50: '#fef2f2', 100: '#fee2e2', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c' },
        warning: { 50: '#fefce8', 100: '#fef9c3', 500: '#eab308', 600: '#ca8a04', 700: '#a16207' },
        danger:  { 50: '#fef2f2', 100: '#fee2e2', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c' },
        info:    { 50: '#f4f4f5', 100: '#e4e4e7', 500: '#3f3f46', 600: '#27272a', 700: '#18181b' },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(8,8,10,0.05), 0 4px 16px rgba(8,8,10,0.06)',
        card: '0 1px 2px rgba(8,8,10,0.06), 0 10px 30px -12px rgba(8,8,10,0.14)',
        glow: '0 0 0 4px rgba(239,68,68,0.18)',
        glowGold: '0 0 0 4px rgba(234,179,8,0.22)',
        glowRed: '0 8px 30px -8px rgba(239,68,68,0.5)',
      },
      borderRadius: { '2xl': '1.25rem', '3xl': '1.75rem' },
      keyframes: {
        'fade-in': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'slide-in-right': { '0%': { opacity: '0', transform: 'translateX(24px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        'scale-in': { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        'pulse-ring': { '0%': { transform: 'scale(0.8)', opacity: '0.7' }, '70%': { transform: 'scale(1.6)', opacity: '0' }, '100%': { transform: 'scale(1.6)', opacity: '0' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'ping-slow': { '0%, 100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.15)', opacity: '0.8' } },
        'route-dash': { to: { 'stroke-dashoffset': '-1000' } },
        'toggle-pop': { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-right': 'slide-in-right 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite',
        'ping-slow': 'ping-slow 2s ease-in-out infinite',
        'route-dash': 'route-dash 20s linear infinite',
        'toggle-pop': 'toggle-pop 0.4s ease-out',
      },
    },
  },
  plugins: [],
};
