import { Clock, IndianRupee, Target, type LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  body: string
}

const features: Feature[] = [
  {
    icon: IndianRupee,
    title: 'Log expenses instantly',
    body: 'Add any expense in seconds. Category, amount, date, description — all in one simple form.',
  },
  {
    icon: Target,
    title: 'Understand your patterns',
    body: 'See exactly where your money goes with category breakdowns and monthly summaries.',
  },
  {
    icon: Clock,
    title: 'Filter by time period',
    body: 'View your spending for any date range — last week, last month, or a custom period.',
  },
]

export function FeaturesSection() {
  return (
    <section style={{ backgroundColor: 'var(--section-alt)', padding: '72px 0' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          {features.map(feat => (
            <div
              key={feat.title}
              style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                padding: '28px 24px',
              }}
            >
              <feat.icon
                size={20}
                style={{ color: 'var(--text-muted)', marginBottom: '16px' }}
              />
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: '15px',
                  color: 'var(--text-primary)',
                  margin: '0 0 8px',
                }}
              >
                {feat.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {feat.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
