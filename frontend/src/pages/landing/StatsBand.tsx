const stats = [
  { value: '2,400+', label: 'Users tracking' },
  { value: '48K+',   label: 'Expenses logged' },
  { value: '7',      label: 'Categories' },
]

export function StatsBand() {
  return (
    <section style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 24px 48px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}
      >
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginTop: '6px',
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
