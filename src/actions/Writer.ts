type Options = {
  startDelay: number
  speed: number
} 
class Writer {
  element: HTMLElement | null
  options: Options
  events: Array<any>

  constructor(
    querySelector: string, 
    options: Partial<Options> = {startDelay: 400, speed: 50})
  {
    if (!querySelector) {
      throw new Error('querySelector is required.')
    }
    this.element = document.querySelector(querySelector)
    if (!this.element) {
      throw new Error('The required DOM element was not found. QuerySelector must select a valid element.')
    }
    const cursor = this.createCursor()
    this.element.appendChild(cursor)
    this.options = options as Options
    this.events = []
  }

  public type(text: string) {
    for(const ch of text) {
      const event = () => {
        const textNode = document.createTextNode(ch)
        const cursor = this.element?.querySelector('span')
        this.element?.insertBefore(textNode, cursor)
      }
      this.events.push(event)
    }
    return this
  }

  public go() {
    if(this.events.length) {
      setTimeout(() => {
        // this.element?.querySelector('span').classList.remove('cursor')
        const event = this.events.shift()
        event()
        this.go()
      }, this.options.speed)
    }
    else {
      // this.element?.querySelector('span').classList.add('cursor')
    }
    return this
  }

  public move(moves: number) {
    // determine direction to move cursor
    const direction = moves > 0 ? 1 : -1;
    // shift items abs(moves) tomes
    for(let idx = 0; idx < Math.abs(moves); ++idx) {
      const event = () => {
        // search curosr location
        const elementRegExp = /<[\w\s=\-'";:.]+>[\s\S]*<\/\w+>/ 
        const cursorLoc = this.element?.innerHTML.search(elementRegExp);
        this.removeCursor() // not remove cursor leaves behind a trial of cursors

        // shift items depending on direction
        const text = this.element?.textContent
        const firstHalf = text?.substring(0, cursorLoc + direction)
        const secondHalf = text?.substring(cursorLoc + direction)

        // append items
        this.element.innerHTML = firstHalf
        this.element?.appendChild(this.createCursor())
        this.element.innerHTML += secondHalf
      }
      // push event
      this.events.push(event)
    }
    return this
  }

  public pause(ms: number) {
    const previousSpeed = this.options.speed
    const pause = () => {
      this.options.speed = ms
    }
    const resetSpeed = () => {
      this.options.speed = previousSpeed
    }
    this.events.push(pause)
    this.events.push(resetSpeed)
    return this
  }

  public changeSpeed(ms: number) {
    this.options.speed = ms;
  }

  private createCursor(): HTMLElement {
    const cursor = document.createElement('span')
    cursor.appendChild(document.createTextNode('|'))
    cursor.classList.add('cursor')
    cursor.style.fontSize = '1.4em'
    cursor.style.display = 'inline-block'
    cursor.style.width = '0'
    return cursor
  }
  private removeCursor() {
    this.element?.removeChild(this.element.querySelector('span.cursor'))
  }
}
function changeStateToTrue(state: {value: boolean}) {
  setTimeout(() => {
    state.value = true
  }, 2000);
}

export default Writer;
export {
  changeStateToTrue
}