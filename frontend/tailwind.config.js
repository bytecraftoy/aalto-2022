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
        extend: {
            colors: {
            
                primary: {
                    light: '#757ce8',
                    main: '#3f50b5',
                    dark: '#002884',
                    contrastText: '#fff',
                  },
                  secondary: {
                    light: '#ff7961',
                    main: '#f44336',
                    dark: '#ba000d',
                    contrastText: '#000',
                  },

                  background: '#CFD8DC',
                  surface: '#fff',
                  onSurface: '#000',
                  onBackground: '#000',

                  test: '#d0d7de'
            },
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
