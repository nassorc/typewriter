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
    vi.useFakeTimers();
    const writerInstance = new Writer('#writer')
    writerInstance.type('H').go()
    vi.advanceTimersByTime(50)
    const writerElm = dom.window.document.querySelector('#writer');
    writerElm?.removeChild(writerElm.querySelector('span'))
    const queryElement = writerElm.textContent
    expect(queryElement).toBe('H')
  })
  it('should append each character in "Hello" with a delay', () => {
    vi.useFakeTimers();
    const content = 'Hello'
    const speed = 50
    const totalDuration = content.length * speed;

    const writerInstance = new Writer('#writer', {
      speed: speed
    })

    writerInstance.type(content).go()
    vi.advanceTimersByTime(totalDuration)
    
    const writerElm = dom.window.document.querySelector('#writer');
    writerElm?.removeChild(writerElm.querySelector('span'))
    const queryElement = writerElm.textContent
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
