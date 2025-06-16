const fs = require('fs');
const svg2png = require('svg2png');

async function convertSvgToPng(svgPath, pngPath, width, height) {
  const svgBuffer = fs.readFileSync(svgPath);
  const pngBuffer = await svg2png(svgBuffer, { width, height });
  fs.writeFileSync(pngPath, pngBuffer);
}

async function main() {
  // 转换 logo
  await convertSvgToPng('public/images/logo.svg', 'public/images/logo.png', 512, 512);
  
  // 转换 og 图片
  await convertSvgToPng('public/images/og.svg', 'public/images/og.png', 1200, 630);
  
  // 转换 favicon
  await convertSvgToPng('public/images/favicon.svg', 'public/images/favicon.png', 32, 32);
  
  console.log('所有图片转换完成！');
}

main().catch(console.error); 