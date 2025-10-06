export const API_HOST = (process.env.NEXT_PUBLIC_API_HOST || '').replace(/\/$/, '');
export const homePagePath = '/tickets';

export function buildUrl(params: Record<string, any> = {}, additionalPath: string = homePagePath) {
  const filtered: Record<string, string> = {};
  for (const k of Object.keys(params)) {
    const v = (params as any)[k];
    if (v === undefined || v === null || v === '') continue;
    filtered[k] = String(v);
  }

  const query = new URLSearchParams(filtered).toString();
  const base = API_HOST || '';
  const path = additionalPath.startsWith('/') ? additionalPath : '/' + additionalPath;

  if (!query) return base ? `${base}${path}` : `${path}`;
  return base ? `${base}${path}?${query}` : `${path}?${query}`;
}
