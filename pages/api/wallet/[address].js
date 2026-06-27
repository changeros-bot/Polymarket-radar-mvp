import { getWalletProfile } from '../../../lib/polymarket';

export default async function handler(req, res) {
  const { address } = req.query;

  try {
    const wallet = await getWalletProfile({ address });
    res.status(200).json({
      ok: true,
      wallet,
      source: wallet.source,
      fallback: false,
      updatedAt: wallet.updatedAt
    });
  } catch (error) {
    res.status(200).json({
      ok: false,
      wallet: {
        address: String(address || ''),
        source: 'mock-fallback',
        profileUrl: address ? `https://polymarket.com/@${address}` : 'https://polymarket.com',
        tradeCount: 0,
        totalVolume: 0,
        recentItems: [],
        note: 'Wallet lookup failed or returned no supported activity yet.'
      },
      source: 'mock-fallback',
      fallback: true,
      error: error.message,
      updatedAt: new Date().toISOString()
    });
  }
}
