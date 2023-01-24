/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "orange-button":"#ff561e",
      },

    },
    boxShadow: {
      navbar: "0px 5px 10px 0px rgba(120, 120, 120, 0.1), 0 2px 3px -1px rgba(3, 3, 4, 0.05)", 
    }
  },
  plugins: [
    function ({addUtilities}) {
        const extendUnderline = {
            '.underline': {
                'textDecoration': 'underline',
                'text-decoration-color': '#ff561e',
            },
        }
        addUtilities(extendUnderline)
    }
  ]
}
