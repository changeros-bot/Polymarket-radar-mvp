const traders = [
  { name: 'Theo4', tier: 'S', score: 94, roi: '+38.4%', status: 'Watching' },
  { name: 'sparklingwater123', tier: 'S', score: 91, roi: '+31.2%', status: 'Watching' },
  { name: 'fishalive', tier: 'S', score: 88, roi: '+24.8%', status: 'Watching' },
  { name: 'mintblade', tier: 'A', score: 84, roi: '+19.6%', status: 'Discovered' }
];

const trades = [
  { trader: 'Theo4', market: 'Election market', side: 'YES', size: '$120', result: 'Paper only' },
  { trader: 'fishalive', market: 'Football upset', side: 'NO', size: '$80', result: 'Paper only' },
  { trader: 'mintblade', market: 'Crypto market', side: 'YES', size: '$45', result: 'Paper only' }
];

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div className="badge">Preview Mode · No real trading</div>
        <h1>Polymarket Radar MVP</h1>
        <p>Mobile-first trader radar for tracking high-performing Polymarket wallets and simulating copy-trading before any real-money execution.</p>
      </section>

      <section className="grid">
        <div className="card">
          <span className="label">System Status</span>
          <h2>Online</h2>
          <p>Vercel preview dashboard is running with mock data.</p>
        </div>
        <div className="card">
          <span className="label">Trading Mode</span>
          <h2>Paper Only</h2>
          <p>Private keys, real orders, and fund movement are disabled.</p>
        </div>
      </section>

      <section className="section">
        <h2>Top Traders</h2>
        <div className="list">
          {traders.map((t) => (
            <div className="row" key={t.name}>
              <div>
                <strong>{t.name}</strong>
                <small>Tier {t.tier} · {t.status}</small>
              </div>
              <div className="score">
                <span>{t.score}</span>
                <small>{t.roi}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Recent Paper Signals</h2>
        <div className="list">
          {trades.map((t, index) => (
            <div className="row" key={index}>
              <div>
                <strong>{t.trader}</strong>
                <small>{t.market} · {t.side}</small>
              </div>
              <div className="score">
                <span>{t.size}</span>
                <small>{t.result}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card footerCard">
        <span className="label">Next Step</span>
        <h2>MVP v0.2</h2>
        <p>Replace mock data with read-only Polymarket official API data.</p>
      </section>
    </main>
  );
}
