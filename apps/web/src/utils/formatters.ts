// Utility functions for formatting and data transformation

export const formatNumber = (num: number, decimals: number = 1): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatCurrency = (num: number, currency: string = 'USD', decimals: number = 1): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };
  
  const symbol = symbols[currency] || '$';
  return `${symbol}${formatNumber(num, decimals)}`;
};

export const formatPercentage = (num: number, decimals: number = 1): string => {
  return `${num.toFixed(decimals)}%`;
};

export const formatGrowth = (growth: number, decimals: number = 1): string => {
  const sign = growth >= 0 ? '+' : '';
  return `${sign}${growth.toFixed(decimals)}%`;
};

export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const calculateCAGR = (initialValue: number, finalValue: number, years: number): number => {
  return ((Math.pow(finalValue / initialValue, 1 / years) - 1) * 100);
};

export const roundToDecimals = (num: number, decimals: number = 2): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
