export function objectsToCSV(objects: any[]): string {
  const headers = [...new Set(objects.flatMap((obj) => Object.keys(obj)))];
  const rowifiedObjects = objects
    .map((obj) =>
      headers
        .map(
          (header) => `"${obj[header]?.toString().replace('"', '\\"') || ''}"`
        )
        .join(',')
    )
    .join('\n');
  return [headers, rowifiedObjects].join('\n');
}
