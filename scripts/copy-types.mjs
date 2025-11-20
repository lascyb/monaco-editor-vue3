import {copyFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, '..', 'src', 'index.d.ts');
const dest = resolve(here, '..', 'dist', 'index.d.ts');

mkdirSync(dirname(dest), {recursive: true});
copyFileSync(src, dest);
console.log(`[copy-types] ${src} -> ${dest}`);

