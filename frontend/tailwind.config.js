/**
 * Tailwind configuration file.
 * Responsible for listing the path of template files (for this project, mainly typescript and tsx sources)
 * In addition, can contain custom color presets, transition/animation properties and more styling options
 *
 */

/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                react: {
                    DEFAULT: '#282c34',
                },

                //Custom colors, added as css classes like bg-textfield, font-textfield etc.
                textfield: '#495E77',
                textcolor: '#C7D3D1',
                panel: '#334155',
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
