let leaders = import.meta.glob(
  '../*.(webp|png)',
  {
    query: '?base64',
    import: 'default'
  }
)

const keyToBase64 = async (spriteName, ext) => {
  let path = `../${spriteName}.${ext}`;

  if(!leaders[path]) return false;

  let test = await leaders[path]();

  return test;
}

export async function GET({ params }) {
  const {leader, ext} = params;

  let sprite = await keyToBase64(leader, ext)

  if (!sprite) {
    return new Response('Not found', {
      status: 404
    });
  }

  return new Response(Buffer.from(sprite, 'base64'), {
    headers: {
      'Content-Type': `image/${ext}`
    }
  });
}
