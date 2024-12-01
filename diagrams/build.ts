import { join } from 'node:path/posix';
import { Glob, $ } from 'bun';
import { watch } from 'node:fs';
import { modify } from './modify.js';

const ignored = ['shared.d2'];

export const SRC_DIR = join(import.meta.dir, 'src/');
export const OUT_DIR = join(import.meta.dir, '../public/diagrams/');

export const d2Pattern = new Glob('*.d2');
export const svgPattern = new Glob('*.svg');

let files = await Array.fromAsync(d2Pattern.scan(SRC_DIR));

async function rebuild() {
  await Promise.all(
    files.map(
      async (file) => {
        if (ignored.includes(file)) return;
        await $`d2 ${SRC_DIR + file} ${OUT_DIR + file.slice(0, -2)}svg && d2 fmt ${SRC_DIR + file}`;
      }
    )
  );

  await modify();
}
rebuild();

export function watchChanges() {
  watch(SRC_DIR, async (type) => {
    if (type === 'rename') {
      console.log('Reloading files...');
      files = await Array.fromAsync(d2Pattern.scan(SRC_DIR));
    }

    console.log('Recompiling...');
    await rebuild().catch(console.error);
  });
}
