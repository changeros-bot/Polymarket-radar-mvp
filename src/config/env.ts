import dotenv from 'dotenv';

dotenv.config();

const readBoolean = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
};

const readNumber = (value: string | undefined, defaultValue: number): number => {
  if (value === undefined) return defaultValue;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : defaultValue;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: readNumber(process.env.PORT, 3000),
  previewMode: readBoolean(process.env.PREVIEW_MODE, true),
  copySize: readNumber(process.env.COPY_SIZE, 1),
  maxOrderSizeUsd: readNumber(process.env.MAX_ORDER_SIZE_USD, 2),
  paperStartingBalanceUsd: readNumber(process.env.PAPER_STARTING_BALANCE_USD, 100),
  paperTradingDays: readNumber(process.env.PAPER_TRADING_DAYS, 14),
  mongodbUri: process.env.MONGODB_URI ?? '',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? '',
  telegramChatId: process.env.TELEGRAM_CHAT_ID ?? '',
  privateKey: process.env.PRIVATE_KEY,
  proxyWallet: process.env.PROXY_WALLET,
};

export const assertSafeMode = (): void => {
  if (!env.previewMode) {
    throw new Error('PREVIEW_MODE must be true during Phase 1 and Phase 2.');
  }

  if (env.privateKey || env.proxyWallet) {
    throw new Error('PRIVATE_KEY and PROXY_WALLET must not be set during Phase 1 and Phase 2.');
  }
};
