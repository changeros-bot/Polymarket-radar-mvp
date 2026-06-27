import { useEffect, useMemo, useState } from 'react';

const emptyPayload = {
  items: [],
  count: 0,
  source: 'loading',
  fallback: false,
  updatedAt: null
};

const formatTime = (value) => {
  if (!value) return 'Not updated yet';
  try {
    return new Date(value).toLocaleString();
  } catch (_error) {
    return value;
  }
};

const sourceLabel = (payload) => {
  if (!payload) return 'Loading';
  if (payload.fallback) return 'Mock fallback';
  if (payload.source === 'polymarket-gamma') return 'Gamma API';
  return payload.source || 'Unknown';
};

export default function Home() {
  const [traders, setTraders] = useState(emptyPayload);
  const [signals, setSignals] = useState(emptyPayload);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [traderResponse, signalResponse] = await Promise.all([
          fetch('/api/traders'),
          fetch('/api/trades/recent')
        ]);

        const [traderPayload, signalPayload] = await Promise.all([
          traderResponse.json(),
          signalResponse.json()
        ]);

        if (!active) return;
        setTraders(traderPayload);
        setSignals(signalPayload);
      } catch (err) {
        if (!active) return;
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, []);

  const liveStatus = useMemo(() => {
    if (loading) return 'Loading';
    if (error) return 'Error';
    if (traders.fallback || signals.fallback) return 'Fallback';
    return 'Live';
  }, [loading, error, traders.fallback, signals.fallback]);

  return (
    <main className="page">
      <section className="hero">
        <div className="badge">Preview Mode · No real trading</div>
        <h1>Polymarket Radar MVP</h1>
        <p>Mobile-first radar for finding high-quality Polymarket signals before any real-money copy trading is considered.</p>
      </section>

      <section className="grid">
        <div className="card">
          <span className="label">Data Status</span>
          <h2>{liveStatus}</h2>
          <p>{error ? error : `Traders: ${sourceLabel(traders)} · Signals: ${sourceLabel(signals)}`}</p>
        </div>
        <div className="card">
          <span className="label">Trading Mode</span>
          <h2>Read-Only</h2>
          <p>No private keys, no live orders, no fund movement. Current step is live data verification only.</p>
        </div>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <div>
            <h2>Live Market Radar</h2>
            <small>{formatTime(traders.updatedAt)}</small>
          </div>
          <span className={traders.fallback ? 'pill warning' : 'pill'}>{sourceLabel(traders)}</span>
        </div>
        <div className="list">
          {(traders.items || []).map((t) => (
            <a className="row linkRow" key={t.id || t.name} href={t.url || '#'} target="_blank" rel="noreferrer">
              <div>
                <strong>{t.name}</strong>
                <small>Tier {t.tier} · {t.status}</small>
              </div>
              <div className="score">
                <span>{t.score}</span>
                <small>{t.performance}</small>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <div>
            <h2>Recent Read-Only Signals</h2>
            <small>{formatTime(signals.updatedAt)}</small>
          </div>
          <span className={signals.fallback ? 'pill warning' : 'pill'}>{sourceLabel(signals)}</span>
        </div>
        <div className="list">
          {(signals.items || []).map((t, index) => (
            <a className="row linkRow" key={t.sourceId || index} href={t.url || '#'} target="_blank" rel="noreferrer">
              <div>
                <strong>{t.source}</strong>
                <small>{t.topic} · {t.side}</small>
              </div>
              <div className="score">
                <span>{t.size}</span>
                <small>{t.mode}</small>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="card footerCard">
        <span className="label">Next Step</span>
        <h2>Wallet Radar</h2>
        <p>Add wallet search and watchlist after live read-only endpoints are stable.</p>
      </section>
    </main>
  );
}
