export const getDataSourceFilters = (sources) => {
  const regions = Array.from(
    new Set(sources.map((source) => source.data.region).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const providers = Array.from(
    new Set(sources.map((source) => source.data.provider).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const dataTypes = Array.from(
    new Set(sources.flatMap((source) => source.data.dataTypes ?? []))
  ).sort((a, b) => a.localeCompare(b));

  return { regions, providers, dataTypes };
};
