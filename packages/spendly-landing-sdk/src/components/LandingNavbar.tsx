import { Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export function LandingNavbar() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--page-bg)',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 24px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '15px',
          }}
        >
          <span style={{ color: 'var(--brand-green)', fontSize: '16px' }}>◆</span>
          Spendly
        </Link>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ThemeToggle />
          <Link
            to="/login"
            style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '13px',
              padding: '7px 14px',
              borderRadius: '8px',
            }}
          >
            Sign in
          </Link>
          <Link
            to="/register"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              textDecoration: 'none',
              fontSize: '13px',
              padding: '8px 18px',
              borderRadius: '9999px',
              fontWeight: 500,
            }}
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  )
}
