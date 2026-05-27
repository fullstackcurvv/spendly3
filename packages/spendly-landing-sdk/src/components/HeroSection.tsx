import { Link } from 'react-router-dom'

function DashboardMockup() {
  return (
    <div
      style={{
        backgroundColor: '#ebebea',
        borderRadius: '16px',
        padding: '18px 18px 0',
        marginTop: '56px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
      }}
    >
      {/* macOS window chrome */}
      <div style={{ display: 'flex', gap: '6px', paddingBottom: '14px' }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c840', display: 'inline-block' }} />
      </div>

      {/* Dashboard inner area */}
      <div
        style={{
          backgroundColor: '#f5f4f2',
          borderRadius: '10px 10px 0 0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { label: 'This month',   value: '₹18,240', sub: '+12% vs last',   subColor: '#d4183d' },
            { label: 'Budget left',  value: '₹6,760',  sub: '43% remaining',  subColor: '#2ca85a' },
            { label: 'Transactions', value: '34',       sub: 'this month',     subColor: '#9a9a9a' },
          ].map(card => (
            <div
              key={card.label}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '16px 18px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontSize: '12px', color: '#9a9a9a', marginBottom: '8px' }}>{card.label}</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#111', lineHeight: 1.1 }}>{card.value}</div>
              <div style={{ fontSize: '13px', color: card.subColor, marginTop: '6px', fontWeight: 500 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Category progress bars */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {[
            { label: 'Food',   color: '#e8a020', pct: 76 },
            { label: 'Travel', color: '#4b9cd3', pct: 54 },
            { label: 'Bills',  color: '#7b6ae0', pct: 44 },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ width: '46px', fontSize: '13px', color: '#6b6b6b', textAlign: 'right', flexShrink: 0 }}>
                {row.label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: '8px',
                  backgroundColor: '#e8e6e3',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${row.pct}%`,
                    height: '100%',
                    backgroundColor: row.color,
                    borderRadius: '9999px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface HeroSectionProps {
  onSeeHowItWorks?: () => void
}

export function HeroSection({ onSeeHowItWorks }: HeroSectionProps) {
  return (
    <section style={{ maxWidth: '780px', margin: '0 auto', padding: '80px 24px 0', textAlign: 'center' }}>
      {/* Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          backgroundColor: '#e8f5ee',
          border: '1px solid #b5e0c6',
          borderRadius: '9999px',
          padding: '7px 16px',
          fontSize: '13px',
          color: '#1e6b3c',
          marginBottom: '28px',
        }}
      >
        <span style={{ color: '#2ca85a', fontSize: '9px', lineHeight: 1 }}>●</span>
        Free to use · No credit card needed
      </div>

      {/* Headline */}
      <h1
        style={{
          fontSize: '68px',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: '0 0 22px',
          color: '#0f0f0f',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        }}
      >
        Track every rupee.<br />
        <span style={{ color: '#2ca85a' }}>Know where it goes.</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '17px',
          lineHeight: 1.65,
          color: '#6b6b6b',
          maxWidth: '500px',
          margin: '0 auto 36px',
        }}
      >
        Spendly helps you log expenses, spot patterns, and stay on budget — without the spreadsheet headache.
      </p>

      {/* CTA buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
        <Link
          to="/register"
          style={{
            backgroundColor: '#111111',
            color: '#ffffff',
            padding: '13px 26px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 600,
            display: 'inline-block',
          }}
        >
          Create free account
        </Link>
        <button
          onClick={onSeeHowItWorks}
          style={{
            backgroundColor: '#111111',
            color: '#ffffff',
            padding: '13px 26px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 600,
            display: 'inline-block',
          }}
        >
          See how it works
        </button>
      </div>

      {/* Dashboard mockup */}
      <DashboardMockup />
    </section>
  )
}
