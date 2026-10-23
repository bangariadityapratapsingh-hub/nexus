async function check() {
  const res = await fetch('http://localhost:3000/dashboard?t=' + Date.now());
  const html = await res.text();
  const cssMatches = Array.from(html.matchAll(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/g)).map(m => m[1]);
  console.log('CSS files:', cssMatches);
  for (const file of cssMatches) {
    const cssRes = await fetch('http://localhost:3000' + file);
    const css = await cssRes.text();
    console.log(file, 'length:', css.length);
    console.log('Has --theme-bg:', css.includes('--theme-bg'));
    console.log('Has div[class*="bg-[#0b0e20]"]:', css.includes('bg-[#0b0e20]'));
  }
}
check();
