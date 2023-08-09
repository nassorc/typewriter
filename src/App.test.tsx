import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders hello world', () => {
    // ARRANGE - setup
    render(<App />)
    // ACT - do the things user do
    // EXPECT - expected outcome
    expect(screen.getByRole('heading', {
      level: 1
    })).toHaveTextContent('Hello World');
  })
})