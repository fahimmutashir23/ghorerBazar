/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,jsx}',
  './components/**/*.{js,jsx}',
  './app/**/*.{js,jsx}',
  './src/**/*.{js,jsx}',
  ],
  theme: {
      // container: {
      //     center: true,
      //     padding: "2rem",
      //     screens: {
      //       "2xl": "1400px",
      //     },
      //   },
    extend: {
      colors: {
        bg_primary : 'white',
        bg_secondary : '#F5F5F5',
        bg_state : '#E0F5D7',
        text_primary : 'black',
        text_secondary : '#00964A',
        color_blue: '#29439A',
        primary: '#F3F4F6',
        secondary: '#0771BA',
        _nut: "#F9FAFB",
        _button: "#0771BA",
        _white: "#FFFFFF",
        text_gray: "#D1D5DB",
        bg_selected: "#06284B",
        text_color: "#111827",
        text_sidebar: "#9CA3AF",
        bg_green:"#16A34A",
        text_gray_6b:"#6B7280",
        bg_slate:"#374151",
        bg_lightSlate: "#D1D5DB",
        bg_yellow:"#FEF3C7",
        dark: '#041E41',
      },
      margin: {
        m_primary : '6px',
        m_small: '10px',
        m_base: '16px',
        m_secondary : '20px',
        m_large: '28px',
      },
      gap: {
        gap_primary : '12px',
        gap_secondary : '24px',
        gap_6px: '6px',
        gap_8px: '8px',
      },
      fontSize: {
        text_sm : '14px',
        text_md : '16px',
        text_lg : '20px',
        text_xl : '24px',
        text_xxl : '34px',
        text_xxxl : '50px',
      },
      padding: {
        p_primary : '8px',
        p_secondary: '10px',
        p_base: '16px',
        p_medium : '20px',
        p_large: '28px',
      },
      borderRadius : {
        rounded_primary: '6px',
        rounded_secondary: '10px',
      },
      keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        }
    },
  },
  plugins: [require('daisyui'), require("tailwindcss-animate")]
}

