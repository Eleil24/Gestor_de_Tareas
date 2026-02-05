/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-app': '#121212',
                'bg-surface': '#1e1e1e',
                'bg-surface-hover': '#2d2d2d',
                'bg-input': '#2d2d2d',
                'primary': {
                    DEFAULT: '#646cff',
                    hover: '#535bf2',
                },
                'secondary': '#4a4a4a',
                'danger': '#ef4444',
                'success': '#10b981',
                'text-primary': 'rgba(255, 255, 255, 0.92)',
                'text-secondary': 'rgba(255, 255, 255, 0.6)',
                'border': '#3f3f3f',
            },
            borderRadius: {
                DEFAULT: '8px',
            },
            boxShadow: {
                DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            }
        },
    },
    plugins: [],
}
