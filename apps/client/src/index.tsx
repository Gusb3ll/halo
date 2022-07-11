import type { Component } from 'solid-js'

import 'uno.css'
import { render } from 'solid-js/web'
import { Show, Suspense } from 'solid-js'
import { createGraphQLClient, gql } from '@solid-primitives/graphql'

const App: Component = () => {
  const query = createGraphQLClient('https://sorasaki-778099165569843233.rcf2.deploys.app/graphql') // http://localhost:4000/graphql
  const [data, { refetch }] = query<{ getCunny: { ok: boolean; url: string; name: string } }>(
    gql`query GetCunny { getCunny { ok, url, name } }`,
  )
  return (
    <>
        <div class="flex min-h-screen flex-col items-center gap-4">
          <h1 class="text-3xl">Questionable image generator</h1>
        <button onClick={refetch} class="-mt-2 mb-2 py-2 px-8 border-0 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded cursor-pointer transition-all text-lg font-thin">
          Get another pic
        </button>
          <Suspense fallback={<div class="text-2xl text-cyan">loading</div>}>
            <Show when={data()}>
            {({ getCunny }) => (
              (getCunny.ok && getCunny.url && getCunny.name)
                ? <a href={getCunny.url} target="_blank" rel="noreferrer">
                  <img src={getCunny.url} alt={getCunny.name} class="max-w-[90vw]" />
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
