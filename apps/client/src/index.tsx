import type { Component } from 'solid-js'

import 'uno.css'
import { render } from 'solid-js/web'
import { Show } from 'solid-js'
import { createGraphQLClient, gql } from '@solid-primitives/graphql'

const App: Component = () => {
  const query = createGraphQLClient('http://localhost:4000/graphql')
  const [data, { refetch }] = query<{ getCunny: { ok: boolean; url: string; name: string } }>(
    gql`
        query GetCunny {
          getCunny {
            ok
            url
            name
          }
        }
      `,
  )
  return (
    <>
        <div class="flex min-h-screen flex-col items-center gap-4">
          <h1 class="text-3xl">Questionable image generator</h1>
          <button onClick={refetch} class="-mt-2 mb-2">Get another pic</button>
          <Show when={data()}>
            {({ getCunny }) => (
            <a href={getCunny.url} target="_blank" rel="noreferrer">
              <img src={getCunny.url} alt={getCunny.name} class="max-w-[90vw]" />
            </a>
            )}
          </Show>
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
