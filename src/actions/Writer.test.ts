import { describe, it, expect, vi, beforeEach } from 'vitest';
import Writer, { changeStateToTrue } from './Writer'
import { JSDOM } from 'jsdom'

describe('Writer', () => {
  it('should create an instance of type Writer', () => {
    expect(new Writer("#writer")).toBeInstanceOf(Writer);
  })
})

describe('changeStateToTrue', () => {
  it('should change state to true', () => {
    vi.useFakeTimers();
    const state = {
      value: false
    }
    changeStateToTrue(state)
    vi.advanceTimersByTime(2000);
    expect(state.value).toBe(true);
  })
})
