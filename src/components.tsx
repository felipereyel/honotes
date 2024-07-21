import { type Body } from './schema';

const page = (title: string, Child: JSX.Element) => (
  <html>
    <head>
      <title>{title} | Honotes</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com"></script>
      <script
        src="https://unpkg.com/htmx.org@1.9.6"
        integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni"
        crossorigin="anonymous"
      ></script>
      <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
    </head>
    <body id="body" class="bg-slate-900 text-white">
      {Child}
    </body>
  </html>
);

export const Home = page(
  'Home',
  <div hx-ext="ws" ws-connect="/ws" hx-target="entries">
    <div id="entries"></div>
    <div
      hx-get="/new"
      hx-target="#body"
      hx-swap="beforeend"
      class="absolute text-white text-center right-2 bottom-2 px-4 py-2 bg-blue-600 hover:bg-sky-100 hover:text-sky-900 border border-slate-600 rounded shadow-md cursor-pointer"
    >
      New
    </div>
  </div>,
);

export const NewPopup = (
  <div
    id="modal"
    hx-get="/ok"
    hx-target="#modal"
    hx-swap="delete"
    hx-trigger="click target:#modal"
    class="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-blur-sm"
  >
    <div id="modal-content" class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Add Entries</h3>
          <button
            hx-get="/ok"
            hx-target="#modal"
            hx-swap="delete"
            type="button"
            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close</span>
          </button>
        </div>
        <div class="p-4 md:p-5">
          <form class="space-y-4" hx-post="/new" hx-target="#modal" hx-swap="delete">
            <div>
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descriotion
              </label>
              <input
                name="description"
                id="description"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              ></input>
            </div>
            <button
              type="submit"
              class="w-full text-white text-center px-4 py-2 bg-blue-600 hover:bg-sky-100 hover:text-sky-900 border border-slate-600 rounded overflow-hidden shadow-md"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export const Entries = (entries: Body[]) => (
  <div id="entries">
    {entries.map((entry) => (
      <div class="p-4 border-b border-gray-200 dark:border-gray-600">
        <p class="text-lg font-semibold text-gray-900 dark:text-white">{entry.description}</p>
      </div>
    ))}
  </div>
);
