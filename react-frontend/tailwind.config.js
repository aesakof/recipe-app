/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif']
            },
        },
    },
    corePlugins: {
        aspectRatio: false,
      },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
}
