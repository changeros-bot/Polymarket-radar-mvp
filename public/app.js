const formatUsd = (value) => {
  const sign = value > 0 ? '+' : '';
  return `${sign}$${Number(value).toFixed(2)}`;
};

const formatPercent = (value) => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${Number(value).toFixed(2)}%`;
};

const shortWallet = (wallet) => {
  if (!wallet || wallet.length < 12) return wallet;
  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
};

const radarScore = (metric) => {
  const roiScore = Math.min(Math.max(metric.roiPercent, 0), 100) * 0.35;
  const winScore = Math.min(Math.max(metric.winRatePercent, 0), 100) * 0.35;
  const drawdownScore = Math.max(0, 100 - metric.maxDrawdownPercent * 4) * 0.2;
  const activityScore = Math.min(metric.tradeCount / 2, 100) * 0.1;
  return Math.round(roiScore + winScore + drawdownScore + activityScore);
};

const fetchJson = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }
  return response.json();
};

const renderHealth = async () => {
  const badge = document.getElementById('health-badge');
  try {
    const health = await fetchJson('/health');
    badge.textContent = health.previewMode ? 'SAFE MODE' : 'LIVE MODE';
    if (!health.previewMode) {
      badge.classList.add('danger');
    }
  } catch (error) {
    badge.textContent = 'API ERROR';
    badge.classList.add('danger');
  }
};

const renderPaperSummary = async () => {
  const summary = await fetchJson('/api/paper/summary');
  document.getElementById('paper-roi').textContent = formatPercent(summary.roiPercent);
  document.getElementById('paper-pnl').textContent = formatUsd(summary.totalPnlUsd);
  document.getElementById('paper-win-rate').textContent = formatPercent(summary.winRatePercent);
  document.getElementById('paper-open-trades').textContent = String(summary.openTrades);
};

const renderTraders = async () => {
  const data = await fetchJson('/api/traders');
  const list = document.getElementById('trader-list');
  const metrics = [...data.metrics].sort((a, b) => radarScore(b) - radarScore(a));

  list.innerHTML = metrics
    .map((metric) => {
      const score = radarScore(metric);
      return `
        <article class="trader-card">
          <div class="trader-card-header">
            <div>
              <div class="trader-label">${metric.label}</div>
              <div class="wallet">${shortWallet(metric.wallet)}</div>
            </div>
            <div class="score-pill">${score}</div>
          </div>
          <div class="stat-row">
            <div><span>ROI</span><strong>${formatPercent(metric.roiPercent)}</strong></div>
            <div><span>Win</span><strong>${formatPercent(metric.winRatePercent)}</strong></div>
            <div><span>PnL</span><strong>${formatUsd(metric.realizedProfitUsd)}</strong></div>
            <div><span>DD</span><strong>-${Number(metric.maxDrawdownPercent).toFixed(1)}%</strong></div>
          </div>
        </article>
      `;
    })
    .join('');
};

const renderRecentTrades = async () => {
  const data = await fetchJson('/api/trades/recent');
  const list = document.getElementById('trade-list');

  list.innerHTML = data.trades
    .map((trade) => {
      const time = new Date(trade.timestamp).toLocaleString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
      });

      return `
        <article class="trade-card">
          <div class="trade-card-header">
            <div>
              <div class="trade-market">${trade.market}</div>
              <div class="wallet">${shortWallet(trade.wallet)}</div>
            </div>
            <div class="score-pill">${trade.side}</div>
          </div>
          <div class="trade-meta">
            Outcome: ${trade.outcome} · Price: ${Number(trade.price).toFixed(2)} · Size: ${formatUsd(trade.sizeUsd)} · ${time}
          </div>
        </article>
      `;
    })
    .join('');
};

const boot = async () => {
  try {
    await Promise.all([
      renderHealth(),
      renderPaperSummary(),
      renderTraders(),
      renderRecentTrades(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

boot();
