# WinWinTravel

## Task

### What needs to be done

The API provides filter data located in the file `filterData.json`

Based on this data, create a filter modal window — [Figma design](https://www.figma.com/file/cnBVURUTntc8peGEfKexoY/WWT-Test-task?type=design&node-id=0%3A1&mode=design&t=GZ0EY5BJ6KB7iy02-1)

The design should closely follow the layout. If indentations differ slightly in the layout — make them consistent across the modal

The modal window should be opened via a button on the homepage

When opening the filter modal, if the user has already selected some data previously, it should be pre-filled in the modal

The user should be able to modify the data and click the `Apply` button. This action should open a confirmation dialog

- If the user confirms the changes — the selected data should be saved to the global state (`App`)
- If the user cancels — keep the previously saved data without applying the new changes

Display the current selected filter data on the homepage in JSON format (no design required, just for debug/visibility)

The project must include a GitHub Action that automatically checks the code

Types:

- `FilterItem` — input data format from API / `filterData.json`
- `SearchRequestFilter` — output data format to be displayed on the homepage

### What technologies to use

Required:

- Git with `Conventional Commits`
- Semantic HTML layout
- React
- react-query
- tailwindcss
- i18n
- zustand

You may use other technologies already installed in the project, or install additional ones if needed

If you install any new technology, describe why you added it and what it’s used for in some file

### How to submit the task

- Create a **public** copy(not fork) of the repository, preserving the full commit history
- Complete the task in this private repository
- Inform HR that the task is complete and ready for review

Also, please let us know upfront whether you would like detailed feedback (what exactly was wrong and a score), or if a simple acceptance or rejection response is sufficient

## Solution

Live demo: https://ggylyon.github.io/wwt-frontend-tech-task/

### Structure

The code follows a light Feature-Sliced Design layout:

- `src/pages/Home` — homepage with the "Open filter" button and the debug JSON output
- `src/features/filter` — filter modal, confirmation dialog and the `react-query` hook that loads `FilterItem[]`
- `src/entities/filter` — `zustand` store with the saved `SearchRequestFilter` and pure helpers that convert between the draft selection and `SearchRequestFilter`
- `src/shared/api/filter` — mocked API request (reads `filterData.json` with a small delay) and query keys
- `src/shared/ui` — reusable `Button`, `Checkbox`, `CloseButton` and `Dialog`

### Behaviour

- The modal is pre-filled from the store every time it opens; edits live in a local draft
- `Apply` opens the confirmation dialog:
  - `Apply new filter` saves the draft to the store and closes both dialogs
  - `Use old filter` drops the draft and keeps the previously saved data
  - Closing the confirmation (cross, `Esc`, backdrop) returns to the filter modal
- `Clear all parameters` resets the draft; nothing is saved until confirmed
- Only filters with selected options get into `SearchRequestFilter`; order follows the API data

### Notes

- Dialogs use the native `<dialog>` element (`showModal`), which gives focus trapping, `Esc` handling and top-layer stacking without extra libraries
- No new dependencies were installed
- `vite.config.ts` got an explicit `@` alias because `vite-tsconfig-paths` did not resolve `@/*` imports
- The GitHub Action checks formatting, lint, unit tests (`vitest`) and build on Node.js 20 and 22; pnpm version is pinned via `packageManager`
- `deploy.yml` builds the app with the repository base path and publishes it to GitHub Pages on every push to `main`

## How to set up the project

All scripts described below (except for _**dependency installation**_) can be used with pnpm instead of npm. They work the same way

### Installing dependencies

After downloading the project's source code, you need to install the dependencies. To do this, you can use the following command:

```shell
pnpm i
# or
pnpm install
```

### Run

To start the project for development, use the script `dev`:

```shell
npm run dev
```

This script automatically refreshes the page after you make changes in the code and works quickly with `vite`.

### Build

To compile the project, use the script `build`:

```shell
npm run build
```

After executing this script, you will have a folder `dist` in which the project's output files will be located, which can be uploaded to hosting.

Also, to see how the compiled version of the program looks, you can use the script `preview`.

```shell
npm run preview
```
