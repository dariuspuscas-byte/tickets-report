<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { splitTicket, type Problem } from '#lib/kb/problems';

  // filed: the ticket each problem now has, as a link.
  let { ticket, filed }: { ticket: number; filed: Partial<Record<Problem, string>> } = $props();

  const rows = reports as Report[];
  const groups = $derived(splitTicket(rows, tenantOf, notes.oneDayMove, ticket));
  const total = $derived(groups.reduce((n, g) => n + g.reports.length, 0));
  const exported = $derived(rows.filter((r) => r.mergedInto === ticket).length);
  const label = (u: string) => '#' + u.split('/').pop();
</script>

<p class="sum">
  <strong>{total}</strong> reports in #{ticket} ({exported} rows in the export; a report exported twice counts once) ·
  <strong>{groups.length}</strong> problems
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>tenants</th><th>seen</th><th>intake tag right</th><th>ticket</th></tr>
  </thead>
  <tbody>
    {#each groups as g (g.problem)}
      <tr>
        <td><code>{g.problem}</code></td>
        <td>{g.reports.length}</td>
        <td>{g.tenants}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        <td>{g.taggedRight} of {g.reports.length}</td>
        <td>{#if filed[g.problem]}<a href={filed[g.problem]}>{label(filed[g.problem]!)}</a>{:else}none yet{/if}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sum { font-size: 1.1rem; }
</style>
