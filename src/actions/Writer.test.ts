import { describe, it, expect, vi, beforeEach } from 'vitest';
import Writer, { changeStateToTrue } from './Writer'
import { JSDOM } from 'jsdom'

const ELEMENT_ID = "writer";
const dom = new JSDOM(`<!DOCTYPE html><div id="${ELEMENT_ID}"><div>`)
global.document = dom.window.document

beforeEach(() => {
  const selectedElement = dom.window.document.querySelector("#" + ELEMENT_ID)
  if(!selectedElement) return
  selectedElement.textContent = ""
})



describe('Writer', () => {
  it('should create an instance of type Writer', () => {
    expect(new Writer("#writer")).toBeInstanceOf(Writer);
  })
  it('should throw error if querySelector does not select valid element', () => {
    // const writerInstance = 
    expect(() => new Writer('#does-not-exist')).toThrow();
  })
  it('should append "H" to selected element', () => {
    const writerInstance = new Writer('#writer')
    writerInstance.type('H')
    const queryElement = dom.window.document.querySelector("#writer")?.textContent
    expect(queryElement).toBe('H')
  })
  it('should append "Hello" to selected element', () => {
    const content = 'Hello'
    const writerInstance = new Writer('#writer')
    writerInstance.type(content)
    const queryElement = dom.window.document.querySelector("#writer")?.textContent
    expect(queryElement).toBe(content)
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
