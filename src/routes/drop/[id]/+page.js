// src/routes/drop/[code]/+page.js
export const prerender = false;
import { ungzip } from 'pako'; // Only if using compression

export async function load({ params }) {
  function decodeFromUrl(encoded) {
    try {
      const base64 = decodeURIComponent(encoded);
      const compressedStr = atob(base64);

      const compressed = new Uint8Array(compressedStr.split('').map(c => c.charCodeAt(0)));
      const jsonString = ungzip(compressed, { to: 'string' });
        return JSON.parse(jsonString);
    } catch (error) {
      console.error(`Decoding of ${encoded} failed:`, error);
      return null;
    }
  }

  const encoded = params.id;
  const decoded = decodeFromUrl(encoded);
  if (!decoded) {
    return { status: 400, error: 'Invalid code' };
  }
  return { data: decoded.data, save: decoded.save };
}