export function baseUrl() {
  const getUrl = window.location;
  return `${getUrl.protocol}//${getUrl.host}`;
}

export const isBrowser = () => typeof window !== 'undefined';
