type RetryOptions = {
  retries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
};

const DEFAULT_RETRIES = 2;
const DEFAULT_BASE_DELAY_MS = 750;
const DEFAULT_MAX_DELAY_MS = 4_000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableError = (error: unknown) => {
  if (!error || typeof error !== 'object') return false;

  const maybeError = error as { status?: number; code?: string; message?: string };
  const status = maybeError.status;

  if (status && [408, 425, 429, 500, 502, 503, 504].includes(status)) {
    return true;
  }

  const message = maybeError.message?.toLowerCase() ?? '';
  return [
    'failed to fetch',
    'network',
    'timeout',
    'too many connections',
    'connection',
    'temporarily unavailable',
  ].some((pattern) => message.includes(pattern));
};

export async function withSupabaseRetry<T>(
  operation: () => PromiseLike<T>,
  options: RetryOptions = {},
): Promise<T> {
  const retries = options.retries ?? DEFAULT_RETRIES;
  const baseDelayMs = options.baseDelayMs ?? DEFAULT_BASE_DELAY_MS;
  const maxDelayMs = options.maxDelayMs ?? DEFAULT_MAX_DELAY_MS;

  let lastThrownError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const result = await operation();
      const resultError = (result as { error?: unknown })?.error;

      if (!resultError || !isRetryableError(resultError) || attempt === retries) {
        return result;
      }
    } catch (error) {
      lastThrownError = error;

      if (!isRetryableError(error) || attempt === retries) {
        throw error;
      }
    }

    const jitter = Math.floor(Math.random() * 200);
    const delay = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt) + jitter;
    await sleep(delay);
  }

  throw lastThrownError;
}
