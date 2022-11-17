/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Tailwind configuration file.
 * Responsible for listing the path of template files (for this project, mainly typescript and tsx sources)
 * In addition, can contain custom color presets, transition/animation properties and more styling options
 *
 */

/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

// eslint-disable-next-line no-undef
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            // Primary colors.
            // Primary same colors than blue in tailwind
            primary: {
                200: '#bfdbfe',
                300: '#93c5fd',
                DEFAULT: '#60a5fa',
                500: '#3b82f6',
                600: '#2563eb',
                700: '#1d4ed8',
            },
            gray: {
                50: '#f9fafb',
                100: '#f3f4f6',
                300: '#cbd5e1',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                900: '#111827',
            },
            //Secondary color
            purple: {
                300: '#d8b4fe',
                400: '#a78bfa',
                500: '#a855f7',
                600: '#9333ea',
                700: '#7e22ce',
            },
            red: {
                400: '#f87171',
                500: '#ef4444',
                600: '#dc2626',
                700: '#b91c1c',
            },
            white: '#ffffff',
            black: '#000000',
        },
    },
    plugins: [
        plugin(({ addBase, theme }) => {
            addBase({
                '.scrollbar': {},
                '.scrollbar::-webkit-scrollbar': {
                    width: '0.6rem',
                    borderRadius: '1rem',
                },
                '.scrollbar::-webkit-scrollbar-thumb': {
                    backgroundColor: '#D6D3D180',
                    borderRadius: '0.25rem',
                },
                '.scrollbar::-webkit-scrollbar-track': {
                    backgroundColor: '#33415540',
                    borderRadius: '0.25rem',
                },
            });
        }),
    ],
};
