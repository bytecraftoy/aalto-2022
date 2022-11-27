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
            // NEW COLORS for material design
            transparent: 'transparent',
            primary: {
                10: '#110563',
                20: '#282377',
                30: '#3F3C8F',
                40: '#5754A8',
                DEFAULT: '#5754A8',
                50: '#706DC3',
                60: '#8A87DF',
                70: '#A5A2FC',
                80: '#C3C0FF',
                90: '#E3DFFF',
                95: '#F2EFFF',
                99: '#FFFBFF',
            },
            secondary: {
                10: '#1A1A2C',
                20: '#2F2E42',
                30: '#464559',
                40: '#5E5C71',
                default: '#5E5C71',
                50: '#77758B',
                60: '#908EA5',
                70: '#ABA9C1',
                80: '#C7C4DD',
                90: '#E3E0F9',
                95: '#F2EFFF',
                99: '#FFFBFF',
            },
            red: {
                10: '#410002',
                20: '#690005',
                30: '#93000A',
                40: '#BA1A1A',
                default: '#BA1A1A',
                50: '#DE3730',
                60: '#FF5449',
                70: '#FF897D',
                80: '#FFB4AB',
                90: '#FFDAD6',
                95: '#FFEDEA',
                99: '#FFFBFF',
                //OLD COLORS, DELETE WHEN CHANGED TO NEW COLOR PALETTE
                400: '#f87171',
                500: '#ef4444',
                600: '#dc2626',
                700: '#b91c1c',
            },
            //i.e., gray
            neutral: {
                10: '#1B1B23',
                20: '#302F38',
                30: '#47464F',
                40: '#5F5D67',
                default: '#5F5D67',
                50: '#787680',
                60: '#928F9A',
                70: '#ACAAB4',
                80: '#C8C5D0',
                90: '#E4E1EC',
                95: '#F3EFFA',
                99: '#FFFBFF',
            },
            onSecondaryContainer: '#1D192B',
            onSurface: '#1C1B1F',

            //OLD COLORS, delete these when color scheme changed to new one
            //Secondary color
            purple: {
                300: '#d8b4fe',
                400: '#a78bfa',
                500: '#a855f7',
                600: '#9333ea',
                700: '#7e22ce',
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
            white: '#ffffff',
            black: '#000000',
        },

        extend: {
            opacity: {
                8: '.08',
                11: '.11',
                12: '.12',
                14: '.14',
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
