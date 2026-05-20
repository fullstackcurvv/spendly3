import { Link } from 'react-router-dom'

export function CtaSection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--page-bg)',
        padding: '96px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '42px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: '0 0 12px',
            lineHeight: 1.15,
          }}
        >
          Ready to take control?
        </h2>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '15px',
            margin: '0 0 36px',
          }}
        >
          Join thousands of people who track their expenses with Spendly.
        </p>
        <Link
          to="/register"
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-fg)',
            padding: '13px 32px',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Create free account
        </Link>
      </div>
    </section>
  )
}
