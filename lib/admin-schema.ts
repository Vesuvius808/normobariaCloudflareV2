export type SimpleFieldType = "text" | "textarea" | "lines" | "image" | "select"

export interface SimpleField {
  key: string
  label: string
  type: SimpleFieldType
  /** If true, the field exists per-language (pl/en/uk) and renders under language tabs. */
  langs?: boolean
  options?: { value: string; label: string }[]
  rows?: number
  hint?: string
}

export interface ListField {
  key: string
  label: string
  type: "list"
  langs?: boolean
  itemLabel: string
  fields: SimpleField[]
  /**
   * When true, list items are plain strings (e.g. "9-11") instead of objects.
   * Renders one labeled input per item; `fields[0]` provides the label/hint.
   */
  stringItems?: boolean
}

export type Field = SimpleField | ListField

export interface SectionDef {
  key: string
  label: string
  description: string
  fields: Field[]
}

const ICON_OPTIONS = [
  { value: "zap", label: "Zap (energy)" },
  { value: "brain", label: "Brain" },
  { value: "shield", label: "Shield" },
  { value: "activity", label: "Activity" },
  { value: "flame", label: "Flame" },
  { value: "clock", label: "Clock" },
  { value: "heart-pulse", label: "Heart pulse" },
  { value: "wind", label: "Wind" },
  { value: "moon", label: "Moon" },
  { value: "leaf", label: "Leaf" },
  { value: "sparkles", label: "Sparkles" },
  { value: "droplets", label: "Droplets" },
]

export const LANGS: { code: "pl" | "en" | "uk"; label: string }[] = [
  { code: "pl", label: "Polski" },
  { code: "en", label: "English" },
  { code: "uk", label: "Українська" },
]

export const CONTENT_SECTIONS: SectionDef[] = [
  {
    key: "navbar",
    label: "Navigation bar",
    description: "Brand name, menu links and the call-to-action button.",
    fields: [
      { key: "brand", label: "Brand name", type: "text" },
      { key: "blogLabel", label: "Blog link label", type: "text", langs: true, hint: "Only shown when at least one blog post is published." },
      {
        key: "copy.links",
        label: "Menu links",
        type: "list",
        langs: true,
        itemLabel: "Menu item",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "Link (href)", type: "text", hint: "e.g. #about or /blog" },
        ],
      },
      { key: "copy.cta", label: "Button text", type: "text", langs: true, hint: "Linked to the Location section." },
    ],
  },
  {
    key: "hero",
    label: "Hero (top section)",
    description: "The big headline, subtitle, stats and buttons at the top of the page.",
    fields: [
      { key: "image", label: "Background image", type: "image" },
      { key: "copy.heading", label: "Heading (2 lines)", type: "lines", langs: true, rows: 2 },
      { key: "copy.sub", label: "Subtitle", type: "textarea", langs: true, rows: 3 },
      { key: "copy.subHighlight", label: "Subtitle — highlighted ending", type: "text", langs: true },
      {
        key: "copy.stats",
        label: "Stats row",
        type: "list",
        langs: true,
        itemLabel: "Stat",
        fields: [
          { key: "value", label: "Value", type: "text" },
          { key: "unit", label: "Unit", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "copy.cta1", label: "Primary button", type: "text", langs: true },
      { key: "copy.cta2", label: "Secondary button", type: "text", langs: true },
    ],
  },
  {
    key: "about",
    label: "About section",
    description: "The “What is Normovita” text block with metric cards.",
    fields: [
      { key: "copy.eyebrow", label: "Eyebrow (small label above heading)", type: "text", langs: true },
      { key: "copy.heading", label: "Heading (2 lines)", type: "lines", langs: true, rows: 2 },
      { key: "copy.p1", label: "Paragraph 1", type: "textarea", langs: true, rows: 4 },
      { key: "copy.p2Pre", label: "Paragraph 2 — text before the name", type: "text", langs: true },
      { key: "copy.p2Bold", label: "Paragraph 2 — highlighted name", type: "text", langs: true },
      { key: "copy.p2", label: "Paragraph 2 — rest of the text", type: "textarea", langs: true, rows: 3 },
      { key: "copy.cta", label: "Button text", type: "text", langs: true },
      {
        key: "copy.metrics",
        label: "Metric cards",
        type: "list",
        langs: true,
        itemLabel: "Metric",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "value", label: "Value", type: "text" },
          { key: "desc", label: "Description", type: "text" },
        ],
      },
    ],
  },
  {
    key: "benefits",
    label: "Benefits section",
    description: "Benefit cards, the “who it's for” list and the disclaimer note.",
    fields: [
      { key: "copy.benefitsEyebrow", label: "Eyebrow (small label above heading)", type: "text", langs: true },
      { key: "copy.benefitsHeading", label: "Heading", type: "text", langs: true },
      {
        key: "copy.benefits",
        label: "Benefit cards",
        type: "list",
        langs: true,
        itemLabel: "Card",
        fields: [
          { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea", rows: 3 },
        ],
      },
      { key: "copy.whoEyebrow", label: "“Who it's for” — eyebrow", type: "text", langs: true },
      { key: "copy.whoHeading", label: "“Who it's for” — heading", type: "text", langs: true },
      { key: "copy.audiences", label: "“Who it's for” — list items", type: "lines", langs: true, rows: 5, hint: "One item per line." },
      { key: "copy.noteEyebrow", label: "Disclaimer — eyebrow", type: "text", langs: true },
      { key: "copy.noteMain", label: "Disclaimer — text before highlight", type: "textarea", langs: true, rows: 2 },
      { key: "copy.noteHighlight", label: "Disclaimer — highlighted part", type: "text", langs: true },
      { key: "copy.noteTail", label: "Disclaimer — text after highlight", type: "textarea", langs: true, rows: 2 },
      { key: "copy.noteSub", label: "Disclaimer — small print", type: "textarea", langs: true, rows: 3 },
    ],
  },
  {
    key: "locations",
    label: "Location & contact",
    description: "Address, contact details, opening info and session hours.",
    fields: [
      { key: "mapsUrl", label: "Google Maps link", type: "text" },
      {
        key: "hours.sessions",
        label: "Day session blocks",
        type: "list",
        stringItems: true,
        itemLabel: "Session block",
        fields: [
          { key: "value", label: "Time range", type: "text", hint: "e.g. 9-11" },
        ],
      },
      { key: "hours.nightSession", label: "Night session block", type: "text" },
      { key: "copy.name", label: "Location name", type: "text", langs: true },
      { key: "copy.tag", label: "Tag (small badge)", type: "text", langs: true },
      { key: "copy.address", label: "Address", type: "text", langs: true },
      { key: "copy.phone", label: "Phone", type: "text", langs: true },
      { key: "copy.email", label: "E-mail", type: "text", langs: true },
      { key: "copy.description", label: "Description", type: "textarea", langs: true, rows: 3 },
      { key: "copy.eyebrow", label: "Eyebrow (small label above heading)", type: "text", langs: true },
      { key: "copy.heading", label: "Heading (2 lines)", type: "lines", langs: true, rows: 2 },
      { key: "copy.addressLabel", label: "“Address” label", type: "text", langs: true },
      { key: "copy.phoneLabel", label: "“Phone” label", type: "text", langs: true },
      { key: "copy.emailLabel", label: "“E-mail” label", type: "text", langs: true },
      { key: "copy.hoursLabel", label: "“Session hours” label", type: "text", langs: true },
      { key: "copy.hoursNote", label: "Hours note", type: "text", langs: true },
      { key: "copy.nightLabel", label: "“Night session” label", type: "text", langs: true },
      { key: "copy.sessionsLabel", label: "“Day sessions” label", type: "text", langs: true },
      { key: "copy.sessionsHeading", label: "Booking heading", type: "text", langs: true },
      { key: "copy.sessionsDescription", label: "Booking description", type: "textarea", langs: true, rows: 3 },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "Footer tagline, links and the copyright line. Contact details come from the Location section.",
    fields: [
      { key: "brand", label: "Brand name", type: "text" },
      {
        key: "copy.links",
        label: "Links",
        type: "list",
        langs: true,
        itemLabel: "Link",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "Link (href)", type: "text" },
        ],
      },
      { key: "copy.tagline", label: "Tagline — text before the name", type: "text", langs: true },
      { key: "copy.taglineAuthor", label: "Tagline — highlighted name", type: "text", langs: true },
      { key: "copy.taglineEnd", label: "Tagline — rest of the text", type: "text", langs: true },
      { key: "copy.sourcesLabel", label: "“Sources” label", type: "text", langs: true },
      { key: "copy.contactLabel", label: "“Contact” label", type: "text", langs: true },
      { key: "copy.privacyLabel", label: "“Privacy policy” label", type: "text", langs: true },
      { key: "copy.copyright", label: "Copyright line", type: "textarea", langs: true, rows: 2, hint: "{year} is replaced with the current year." },
    ],
  },
  {
    key: "blog",
    label: "Blog labels",
    description: "Labels used around the public blog section and pages.",
    fields: [
      { key: "copy.eyebrow", label: "Eyebrow (small label above heading)", type: "text", langs: true },
      { key: "copy.heading", label: "Heading", type: "text", langs: true },
      { key: "copy.readMore", label: "“Read more” link", type: "text", langs: true },
      { key: "copy.viewAll", label: "“View all posts” link", type: "text", langs: true },
      { key: "copy.backToBlog", label: "“Back to blog” link", type: "text", langs: true },
      { key: "copy.noPosts", label: "“No posts” message", type: "text", langs: true },
    ],
  },
]
