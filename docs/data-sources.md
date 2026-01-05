# Data Sources Content

Collection: `data-sources` (see `src/content/config.ts`).

Required front matter
- title: string
- region: string
- provider: string
- providerType: string (optional)
- access: enum (portal | download | api | request)
- registrationRequired: boolean
- dataTypes: enum[]
- licence: string
- primaryUrl: string (https URL)
- lastChecked: date (YYYY-MM-DD)

Optional front matter
- summary: string
- licenceUrl: string (https URL)
- slug: string (optional; filename still determines the URL)
- coverage: string
- formats: string
- tags: string[]

Notes
- The slug is derived from the filename (e.g. `nlog.md` -> `/data/nlog`).
- The markdown body is used for notes/quirks and displayed on the detail page.
- Allowed dataTypes values: Well Log Data, Seismic Data, Production Data, Well / Borehole Metadata, Geological Models, Geophysical Surveys, Reports & Documents.
- Rule: formats, acquisition methods, and interpretations belong in Notes, not dataTypes.
