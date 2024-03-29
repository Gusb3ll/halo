import type { Component } from 'solid-js'

import 'uno.css'
import { render } from 'solid-js/web'
import { Show, Suspense } from 'solid-js'
import { createGraphQLClient, gql } from '@solid-primitives/graphql'

const App: Component = () => {
  const query = createGraphQLClient('https://halo-api.kivotos.sh/graphql') // http://localhost:4000/graphql
  const [data, { refetch }] = query<{ getCunny: { ok: boolean; url: string; name: string } }>(
    gql`query GetCunny { getCunny { ok, url, name } }`,
  )
  return (
    <>
      <div class="flex h-full flex-col items-center gap-4">
        <h1 class="md:text-3xl text-2xl">Questionable image generator</h1>
        <button onClick={refetch} class="-mt-2 mb-2 py-2 px-8 border-0 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded cursor-pointer transition-all text-lg font-thin">
          Get another pic
        </button>
        <Suspense fallback={<div class="text-2xl text-cyan">loading</div>}>
          <Show when={data()}>
            {data => (
              (data().getCunny.ok && data().getCunny.url && data().getCunny.name)
                ? <a href={data().getCunny.url} target="_blank" rel="noreferrer">
                  <img src={data().getCunny.url} alt={data().getCunny.name} class="max-w-[90vw]" />
                </a>
                : <h1 class="text-2xl text-cyan">
                  Error loading image, probably rate limit
                </h1>
            )}
          </Show>
        </Suspense>
        <footer class="flex flex-col justify-center items-center">
          <a href="https://github.com/gusb3ll/halo" target="_blank" rel="noreferrer">
            <img src="/github.svg" alt="Github" />
          </a>
          <p class="select-none">Made with 😭 by Gusbell</p>
        </footer>
      </div>
    </>
  )
}

render(() => <App />, document.getElementById('root') as HTMLElement)
