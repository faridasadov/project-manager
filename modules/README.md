# Module Architecture

script.js is a ~10K line monolith. New features go into modules/ as ES-module-ready
files, concatenated into script.js during build.

## Logical boundaries (for future extraction)

| Module          | Approx lines | Responsibility                            |
|-----------------|-------------|-------------------------------------------|
| utils.js        | 1–400       | escapeHtml, dates, labels, i18n, text()   |
| state.js        | 400–1200    | load/save, localStorage keys, normalize   |
| settings.js     | 1200–2200   | appSettings, syncSettingsForm, themes      |
| render-task.js  | 5300–5600   | renderTaskList, renderTaskInlineComments  |
| render-dash.js  | 5600–6000   | renderDashboard, renderReports            |
| render-gantt.js | 5700–5960   | renderGantt, gantt drag handlers          |
| supabase.js     | 6500–7300   | all supabase* functions, Realtime client  |
| handlers.js     | 8000–9991   | event listeners, bootApp                  |

## Adding a new feature

1. Create modules/feature-name.js
2. Export pure functions (no global side effects)
3. Import in script.js at the bottom OR load as <script type="module">
4. Add to this README

## Build script (future)

  node scripts/build.js   # concatenates modules → script.js
