export function LandingFooter() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--footer-bg)',
        padding: '52px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span style={{ fontSize: '22px', color: '#e8902a' }}>◆</span>
        <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '15px' }}>Spendly</span>
        <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', marginTop: '2px' }}>
          Track every rupee. Own your finances.
        </span>
      </div>
    </footer>
  )
}
