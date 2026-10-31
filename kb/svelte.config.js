import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import path from 'node:path';

/** Render harness for the support kb export: .svx pages with the runbook layout. */
export default {
  extensions: ['.svelte', '.svx'],
  preprocess: [mdsvex({ extensions: ['.svx'], layout: { runbook: path.resolve('src/lib/layouts/runbook.svelte') } })],
  kit: {
    adapter: adapter({ strict: false }),
    alias: { '#lib': 'src/lib', '#lib/*': 'src/lib/*' },
    prerender: { entries: ['/kb', '/kb/incidents/4471', '/kb/incidents/4471-split', '/kb/triage/dedupe', '/kb/decisions/0001-dedupe-by-subject'], handleHttpError: 'warn' },
  },
};
