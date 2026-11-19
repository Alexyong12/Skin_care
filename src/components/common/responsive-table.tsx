import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

interface ResponsiveTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  className?: string;
}

/**
 * One data definition, two layouts:
 * - md and up: a normal table
 * - mobile: one stacked card per row (no sideways scrolling)
 */
export function ResponsiveTable<T>({
  columns,
  rows,
  getRowKey,
  className,
}: ResponsiveTableProps<T>) {
  return (
    <div className={className}>
      <div className="hidden overflow-hidden rounded-lg border md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className={cn("px-4 py-3 font-medium", c.className)}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y bg-card">
            {rows.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-4 py-3", c.className)}>
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 md:hidden">
        {rows.map((row) => (
          <li key={getRowKey(row)} className="rounded-lg border bg-card p-4">
            <dl className="space-y-2 text-sm">
              {columns.map((c) => (
                <div key={c.key} className="flex items-start justify-between gap-4">
                  <dt className="text-muted-foreground">{c.header}</dt>
                  <dd className="min-w-0 text-right">{c.cell(row)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
