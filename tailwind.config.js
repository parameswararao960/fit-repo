/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          surfaceAlt: 'var(--color-surface-alt)',
          card: 'var(--color-card)',
          cardHover: 'var(--color-card-hover)',
          border: 'var(--color-border)',
          borderSoft: 'var(--color-border-soft)',
          text: 'var(--color-text)',
          textDim: 'var(--color-text-dim)',
          textMute: 'var(--color-text-mute)',
        },
        volt: {
          DEFAULT: 'var(--color-volt)',
          dim: 'var(--color-volt-dim)',
          glow: 'var(--color-volt-glow)',
        },
        ember: {
          DEFAULT: 'var(--color-ember)',
          glow: 'var(--color-ember-glow)',
        },
      },
      boxShadow: {
        'volt-glow': '0 0 12px var(--color-volt-glow)',
        'ember-glow': '0 0 12px var(--color-ember-glow)',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
