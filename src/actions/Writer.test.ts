import { describe, it, expect, vi, beforeEach } from 'vitest';
import Writer from './Writer'
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
  const elmIDSelector = '#writer'
  it('should create an instance of type Writer', () => {
    expect(new Writer(elmIDSelector)).toBeInstanceOf(Writer);
  })
  it('should throw error if querySelector does not select valid element', () => {
    // const writerInstance = 
    expect(() => new Writer('#does-not-exist')).toThrow();
  })
  it('should append "H" to selected element', () => {
    vi.useFakeTimers();
    const writerInstance = new Writer(elmIDSelector)
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

    const writerInstance = new Writer(elmIDSelector, {
      speed: speed
    })

    writerInstance.type(content).go()
    vi.advanceTimersByTime(totalDuration)
    
    const writerElm = dom.window.document.querySelector(elmIDSelector);
    writerElm?.removeChild(writerElm.querySelector('span'))
    const queryElement = writerElm.textContent
    expect(queryElement).toBe(content)
  })
  it('should type Java, pause for 5 seconds, then type Script', () => {
    vi.useFakeTimers()
    const java = "Java"
    const script = "Script"
    const pause = 5000
    const speed = 50
    const writerDuration = (java.length * speed) + (script.length * speed) + pause
    const writerInstnace = new Writer(elmIDSelector, {
      speed
    })
    writerInstnace
      .type(java)
      .pause(pause)
      .type(script)
      .go()
    vi.advanceTimersByTime(writerDuration)

    const writerElm = dom.window.document.querySelector(elmIDSelector)
    const textContent = writerElm?.textContent?.replace('|', '')
    expect(textContent).toBe(java+script)
  })
  it('should clear the element when release method is called', () => {
    vi.useFakeTimers()
    const speed = 50
    const writerInstance = new Writer(elmIDSelector, {speed})
    writerInstance.type("text").go()
    vi.advanceTimersByTime(4 * speed)
    expect(dom.window.document.querySelector(elmIDSelector)?.textContent?.replace('|', ''))
      .toBe('text')
    writerInstance.release()
    expect(dom.window.document.querySelector(elmIDSelector)?.textContent)
      .toBe('')
  })
})