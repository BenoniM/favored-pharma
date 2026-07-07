const fs = require('fs');
const path = require('path');

const dir = 'src/routes';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'preview-hero.tsx' && f !== '__root.tsx');

const replacements = {
  'max-w-7xl': 'max-w-[1440px]',
  'px-4 sm:px-6': 'px-6 sm:px-8 lg:px-12',
  'text-5xl sm:text-7xl': 'text-4xl sm:text-6xl',
  'text-4xl sm:text-6xl': 'text-3xl sm:text-5xl',
  'text-4xl sm:text-5xl': 'text-3xl sm:text-4xl',
  'text-3xl sm:text-5xl': 'text-2xl sm:text-4xl',
  'text-3xl sm:text-4xl': 'text-2xl sm:text-3xl',
  'text-2xl sm:text-3xl': 'text-xl sm:text-2xl',
};

const regex = new RegExp(Object.keys(replacements).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(regex, matched => replacements[matched]);
  fs.writeFileSync(filePath, content, 'utf8');
});

let rootContent = fs.readFileSync('src/routes/__root.tsx', 'utf8');
rootContent = rootContent.replace(/max-w-7xl/g, 'max-w-[1440px]');
fs.writeFileSync('src/routes/__root.tsx', rootContent, 'utf8');
