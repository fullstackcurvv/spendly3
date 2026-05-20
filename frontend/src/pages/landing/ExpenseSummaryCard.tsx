const TOTAL = 12450

const categories = [
  { name: 'Bills',     amount: 4500, color: '#2ca85a' },
  { name: 'Food',      amount: 3200, color: '#e8a020' },
  { name: 'Health',    amount: 2050, color: '#6b8fd4' },
  { name: 'Transport', amount: 1800, color: '#9b7ec8' },
]

export function ExpenseSummaryCard() {
  return (
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '18px',
        border: '1px solid var(--border)',
        padding: '24px 28px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '22px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontWeight: 500,
            letterSpacing: '0.07em',
          }}
        >
          MARCH 2026
        </span>
        <span
          style={{
            fontSize: '26px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1,
          }}
        >
          ₹12,450
        </span>
      </div>

      {/* Category rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
        {categories.map(cat => (
          <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                width: '72px',
                fontSize: '13px',
                color: 'var(--text-muted)',
                flexShrink: 0,
              }}
            >
              {cat.name}
            </span>

            {/* Track */}
            <div
              style={{
                flex: 1,
                height: '5px',
                backgroundColor: 'var(--border)',
                borderRadius: '9999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(cat.amount / TOTAL) * 100}%`,
                  height: '100%',
                  backgroundColor: cat.color,
                  borderRadius: '9999px',
                }}
              />
            </div>

            <span
              style={{
                width: '52px',
                textAlign: 'right',
                fontSize: '13px',
                color: 'var(--text-primary)',
                flexShrink: 0,
              }}
            >
              ₹{cat.amount.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
