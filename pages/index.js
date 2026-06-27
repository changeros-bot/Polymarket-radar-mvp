import { useEffect, useMemo, useState } from 'react';

const emptyPayload = {
  items: [],
  count: 0,
  source: 'loading',
  fallback: false,
  updatedAt: null
};

const formatTime = (value) => {
  if (!value) return '尚未更新';
  try {
    return new Date(value).toLocaleString('zh-TW', { hour12: false });
  } catch (_error) {
    return value;
  }
};

const sourceLabel = (payload) => {
  if (!payload) return '載入中';
  if (payload.fallback) return '備援資料';
  if (payload.source === 'polymarket-gamma') return 'Gamma API';
  return payload.source || '未知來源';
};

const liveStatusText = (status) => {
  if (status === 'Loading') return '載入中';
  if (status === 'Error') return '錯誤';
  if (status === 'Fallback') return '備援模式';
  return '即時資料';
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
        setError(err.message || '資料載入失敗');
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
        <div className="badge">MVP v0.1 · 僅監看 · 不下單</div>
        <h1>Polymarket Radar</h1>
        <p>先驗證 Polymarket 即時資料、手機瀏覽與市場連結。真正的 Wallet 跟單、AI 評分與模擬交易會在下一版開始。</p>
      </section>

      <section className="section validationCard">
        <span className="label">本版驗證重點</span>
        <h2>請先測這 5 件事</h2>
        <ul className="checklist">
          <li>API 是否能取得 Polymarket 資料</li>
          <li>手機版是否容易閱讀與滑動</li>
          <li>更新時間與資料來源是否清楚</li>
          <li>點擊 Market 是否能正確開到 Polymarket</li>
          <li>頁面是否穩定，沒有空白或錯誤</li>
        </ul>
      </section>

      <section className="grid">
        <div className="card">
          <span className="label">資料狀態</span>
          <h2>{liveStatusText(liveStatus)}</h2>
          <p>{error ? error : `市場：${sourceLabel(traders)} · 訊號：${sourceLabel(signals)}`}</p>
        </div>
        <div className="card">
          <span className="label">交易模式</span>
          <h2>僅監看</h2>
          <p>沒有私鑰、沒有真實下單、沒有資金移動。這一版只驗證資料與連結。</p>
        </div>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <div>
            <h2>即時市場雷達</h2>
            <small>{formatTime(traders.updatedAt)}</small>
          </div>
          <span className={traders.fallback ? 'pill warning' : 'pill'}>{sourceLabel(traders)}</span>
        </div>
        <div className="list">
          {(traders.items || []).map((t) => (
            <a className="row linkRow" key={t.id || t.name} href={t.url || '#'} target="_blank" rel="noreferrer">
              <div>
                <strong>{t.name}</strong>
                <small>{t.tier} · {t.status}</small>
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
            <h2>只讀市場訊號</h2>
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
                <small>僅監看</small>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="card footerCard">
        <span className="label">下一步</span>
        <h2>Wallet Radar</h2>
        <p>等 v0.1 驗證通過後，下一版開始做神人 Wallet 搜尋、追蹤清單與模擬跟單。</p>
      </section>
    </main>
  );
}
