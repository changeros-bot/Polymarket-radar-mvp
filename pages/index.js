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

const formatUsd = (value) => {
  const amount = Number(value || 0);
  return `$${Math.round(amount).toLocaleString()}`;
};

export default function Home() {
  const [traders, setTraders] = useState(emptyPayload);
  const [signals, setSignals] = useState(emptyPayload);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletInput, setWalletInput] = useState('');
  const [walletResult, setWalletResult] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);

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

  const searchWallet = async (event) => {
    event.preventDefault();
    const query = walletInput.trim();
    if (!query) return;

    setWalletLoading(true);
    setWalletResult(null);

    try {
      const response = await fetch(`/api/wallet/${encodeURIComponent(query)}`);
      const payload = await response.json();
      setWalletResult(payload);
    } catch (err) {
      setWalletResult({
        ok: false,
        fallback: true,
        error: err.message || 'Wallet 查詢失敗',
        wallet: { address: query, tradeCount: 0, totalVolume: 0, recentItems: [] }
      });
    } finally {
      setWalletLoading(false);
    }
  };

  const wallet = walletResult?.wallet;

  return (
    <main className="page">
      <section className="hero">
        <div className="badge">MVP v0.2 · Wallet Radar · 僅監看</div>
        <h1>Polymarket Radar</h1>
        <p>先用只讀資料查詢 Wallet 活動，之後再加入 ROI、勝率、模擬跟單與 AI 跟單評分。</p>
      </section>

      <section className="section validationCard">
        <span className="label">本版驗證重點</span>
        <h2>請測 Wallet 搜尋</h2>
        <ul className="checklist">
          <li>輸入 Polymarket 使用者或 wallet 後是否能查詢</li>
          <li>查詢失敗時首頁不能壞掉</li>
          <li>是否能顯示近期活動筆數與成交量</li>
          <li>市場雷達連結仍可正確開到 Polymarket</li>
        </ul>
      </section>

      <section className="section walletCard">
        <span className="label">Wallet Radar</span>
        <h2>查詢神人 Wallet</h2>
        <form className="walletForm" onSubmit={searchWallet}>
          <input
            value={walletInput}
            onChange={(event) => setWalletInput(event.target.value)}
            placeholder="輸入 @mepp 或 wallet 地址"
          />
          <button type="submit" disabled={walletLoading}>{walletLoading ? '查詢中' : '查詢'}</button>
        </form>
        {wallet && (
          <div className="walletResult">
            <div>
              <small>查詢目標</small>
              <strong>{wallet.address}</strong>
            </div>
            <div className="walletStats">
              <div><span>{wallet.tradeCount || 0}</span><small>近期活動</small></div>
              <div><span>{formatUsd(wallet.totalVolume)}</span><small>估算成交量</small></div>
            </div>
            {wallet.profileUrl && <a className="textLink" href={wallet.profileUrl} target="_blank" rel="noreferrer">開啟 Polymarket 個人頁</a>}
            {walletResult?.error && <p className="errorText">{walletResult.error}</p>}
          </div>
        )}
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
          <p>沒有私鑰、沒有真實下單、沒有資金移動。這一版只驗證資料與 Wallet 查詢。</p>
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
    </main>
  );
}
