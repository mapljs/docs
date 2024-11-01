import { join } from 'node:path/posix';
import { Glob, $ } from 'bun';
import { watch } from 'node:fs';

$.env({
  D2_LAYOUT: 'elk',
  D2_THEME: '200',

  D2_SKETCH: 'true',
});

const SRC_DIR = join(import.meta.dir, 'src/');
const OUT_DIR = join(import.meta.dir, '../public/diagrams/');
const pattern = new Glob('*.d2');

let files = await Array.fromAsync(pattern.scan(SRC_DIR));

async function rebuild() {
  return Promise.all(
    files.map(
      (file) => $`d2 ${SRC_DIR + file} ${OUT_DIR + file.slice(0, -2)} && d2 fmt ${SRC_DIR + file}`
    )
  );
}
rebuild();

export function watchChanges() {
  watch(SRC_DIR, async (type) => {
    if (type === 'rename') {
      console.log('Reloading files...');
      files = await Array.fromAsync(pattern.scan(SRC_DIR));
    }

    console.log('Recompiling...');
    await rebuild();
  });
}
