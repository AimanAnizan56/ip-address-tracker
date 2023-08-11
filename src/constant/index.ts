const apiKey = `?apiKey=${import.meta.env.VITE_IPIFY_API_KEY}`;
export const exactUrl = `https://geo.ipify.org/api/v2/country,city${apiKey}`;
export const domainRegex = /([a-z0-9A-Z]\.)*[a-z0-9-]+\.([a-z0-9]{2,24})+(\.co\.([a-z0-9]{2,24})|\.([a-z0-9]{2,24}))*/g;
