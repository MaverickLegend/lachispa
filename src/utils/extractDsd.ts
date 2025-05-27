export function extractDSDId(urn: string): string | null {
  const pattern = /^urn:sdmx:org\.sdmx\.infomodel\.datastructure\.DataStructure=([^:]+):([^\(]+)\(([^\)]+)\)$/;
  const matches = urn.match(pattern);
  return matches?.[2] ?? null;
}
