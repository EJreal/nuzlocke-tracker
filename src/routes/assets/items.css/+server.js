import items from '../items/_data.js';

export const prerender = true;

const extract = (id, str) => {
  try {
    const re = new RegExp(`\\.pk(item|m)-${id}{.*?}`);
    const res = re.exec(str);
    return res[0];
  } catch (e) {
    return null;
  }
};

export async function GET({ url }) {
  let queryI = null;
  try {
    queryI = url.searchParams.get('i');
  } catch (e) {
    // SvelteKit throws an error when accessing searchParams during prerendering.
    // Fallback to returning the full CSS for static builds.
    queryI = null;
  }

  if (!queryI) {
    return new Response(items, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=31536000',
        'Content-Type': 'text/css'
      }
    });
  }

  const ilist = queryI.split(',');
  const criticalCss = ilist.reduce((acc, it) => acc + extract(it, items), '');

  return new Response(criticalCss, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'Content-Type': 'text/css'
    }
  });
}
