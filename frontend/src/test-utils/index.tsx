import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { AppStore, RootState, setupStore } from '../store'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

Element.prototype.scrollIntoView = jest.fn();
// window.HTMLElement.prototype.scrollIntoView = function() {};

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore,
  initialEntries?: string[]
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    initialEntries,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    console.log('initialentries', initialEntries)
    return (
      <Provider store={store}>
        { initialEntries ?
          // Used only in Gist.test.tsx
          <MemoryRouter initialEntries={initialEntries} initialIndex={0}>{children}</MemoryRouter> :
          // Used in rest of the test files
          <BrowserRouter>{children}</BrowserRouter>
        }
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}