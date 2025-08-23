import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Theme colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Hackathon custom colors
        'neon-cyan': 'hsl(var(--neon-cyan))',
        'neon-purple': 'hsl(var(--neon-purple))',
        'neon-pink': 'hsl(var(--neon-pink))',
        'dark-bg': 'hsl(var(--dark-bg))',
        'glass-bg': 'hsl(var(--glass-bg))',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Custom color palette
        'argentinian-blue': {
          DEFAULT: '#33A5FF',
          50: '#E6F4FF',
          100: '#CCE9FF',
          200: '#99D3FF',
          300: '#66BDFF',
          400: '#33A5FF',
          500: '#0080FF',
          600: '#0066CC',
          700: '#004D99',
          800: '#003366',
          900: '#001A33',
          950: '#000D1A',
        },
        'periwinkle': {
          DEFAULT: '#C1D9FF',
          50: '#FFFFFF',
          100: '#F5F9FF',
          200: '#E1ECFF',
          300: '#C1D9FF',
          400: '#A0C6FF',
          500: '#7FB3FF',
          600: '#5F9FFF',
          700: '#3F8CFF',
          800: '#1F79FF',
          900: '#0066FF',
          950: '#0052CC',
        },
        'argentinian-blue-2': {
          DEFAULT: '#42A7FF',
          50: '#E8F4FF',
          100: '#D1E9FF',
          200: '#A3D3FF',
          300: '#75BDFF',
          400: '#47A7FF',
          500: '#1A91FF',
          600: '#0074E0',
          700: '#0057A8',
          800: '#003A70',
          900: '#001D38',
          950: '#000E1C',
        },
        'lavender-web': {
          DEFAULT: '#DEEAFD',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F5F8FF',
          300: '#DEEAFD',
          400: '#C7DCFD',
          500: '#B0CEFD',
          600: '#99C0FD',
          700: '#82B2FD',
          800: '#6BA4FD',
          900: '#5496FD',
          950: '#3D88FD',
        },
        'steel-blue': {
          DEFAULT: '#0083D1',
          50: '#E6F4FF',
          100: '#CCE9FF',
          200: '#99D3FF',
          300: '#66BDFF',
          400: '#33A7FF',
          500: '#0083D1',
          600: '#0068A7',
          700: '#004D7D',
          800: '#003253',
          900: '#001729',
          950: '#000C14',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-bg': 'var(--gradient-bg)',
        'gradient-glow': 'var(--gradient-glow)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'digit-flip': 'digit-flip 0.6s ease-in-out',
        'particle-float': 'particle-float 4s ease-in-out infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px hsl(var(--neon-cyan) / 0.5)',
            transform: 'scale(1)' 
          },
          '50%': { 
            boxShadow: '0 0 40px hsl(var(--neon-cyan) / 0.8)',
            transform: 'scale(1.05)' 
          },
        },
        'digit-flip': {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        'particle-float': {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)', 
            opacity: '0.3' 
          },
          '33%': { 
            transform: 'translateY(-20px) rotate(120deg)', 
            opacity: '1' 
          },
          '66%': { 
            transform: 'translateY(-10px) rotate(240deg)', 
            opacity: '0.7' 
          },
        }
      },
    },
  },
};

export default config;
