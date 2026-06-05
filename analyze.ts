import https from 'https';

https.get('https://davet.vercel.app/assets/index-C9LCVH2y.js', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const texts = data.match(/children:(\[[^\]]+\]|"[^"]+")/g) || [];
    console.log('CHILDREN:', texts.slice(0, 50));
  });
});
