// What #4471 holds once each report is placed by what it shows, not by its subject line.
// A report the desk read as a one-day move (desk-notes.json) is its own problem: the date moved by a
// day, it did not flip. Every other report goes to its tenant's cause (causes.ts).
import { causeOf, uniqueById, type Cause, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = Cause | 'one-day' | 'unplaced';

export function problemOf(r: Report, t: Tenant | undefined, oneDay: readonly string[]): Problem {
  if (oneDay.includes(r.id)) return 'one-day';
  return causeOf(r, t) ?? 'unplaced';
}

export type ProblemGroup = {
  problem: Problem;
  reports: Report[];
  // How many of these reports intake tagged with this problem's own name.
  taggedRight: number;
  tenants: number;
  firstSeen: string;
  lastSeen: string;
};

export function splitTicket(
  reports: Report[],
  tenantOf: (r: Report) => Tenant | undefined,
  oneDay: readonly string[],
  ticket: number,
): ProblemGroup[] {
  const byProblem = new Map<Problem, Report[]>();
  for (const r of uniqueById(reports).filter((r) => r.mergedInto === ticket)) {
    const p = problemOf(r, tenantOf(r), oneDay);
    byProblem.set(p, [...(byProblem.get(p) ?? []), r]);
  }
  return [...byProblem.entries()]
    .map(([problem, rs]) => {
      const days = rs.map((r) => r.receivedAt.slice(0, 10)).sort();
      return {
        problem,
        reports: rs,
        taggedRight: rs.filter((r) => r.meta.intakeTag === problem).length,
        tenants: new Set(rs.map((r) => r.tenant)).size,
        firstSeen: days[0],
        lastSeen: days[days.length - 1],
      };
    })
    .sort((a, b) => b.reports.length - a.reports.length);
}
