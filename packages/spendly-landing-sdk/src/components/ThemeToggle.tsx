import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '6px',
        cursor: 'pointer',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.15s ease, border-color 0.15s ease',
      }}
    >
      {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  )
}
