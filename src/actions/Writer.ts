type Options = {
  startDelay: number
  speed: number
} 
type EventType = () => void
class Writer {
  element: HTMLElement | null
  options: Options
  events: Array<EventType>

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
      this.addEvent(event)
    }
    return this
  }

  public go() {
    if(this.events.length) {
      setTimeout(() => {
        // this.element?.querySelector('span').classList.remove('cursor')
        const event = this.events.shift()
        if (event) event()
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
        const cursorLoc = this.getCursorLocation()
        if(cursorLoc == -1) return
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
      this.addEvent(event)
    }
    return this
  }

  public delete(amount) {
    for(let idx = 0; idx < Math.abs(amount); ++idx) {
      const deleteEvent = () => {
        const cursorLoc = this.getCursorLocation()
        if(cursorLoc == -1) return
        this.removeCursor() // not remove cursor leaves behind a trial of cursors
        const text = this.element?.textContent
        const firstHalf = text?.substring(0, cursorLoc - 1)
        const secondHalf = text?.substring(cursorLoc)

        // append items
        this.element.innerHTML = firstHalf
        this.element?.appendChild(this.createCursor())
        this.element.innerHTML += secondHalf
      }
      this.addEvent(deleteEvent)
    }
    return this
  }

  public release() {
    this.element.innerHTML = ""
  }

  /**
   * Temporarily changes the iteration speed to match the pause time.
   * Then after pause duration, reset iteration speed to previous speed
   * @param ms Number of milliseconds to pause the writer
   * @returns 
   */
  public pause(ms: number) {
    // save previous speed in function environment for closures
    const previousSpeed = this.options.speed
    // when the pause event is called, it changes the go/class method's 
    // timeout speed to ms(pause duration) minus previous speed
    const pause = () => {
      // not subtracting the previous speed to the pause duration
      // results to a wrong pause timeout speed of ms + this.speed.
      // each event iteration is wrapped in a timeOut function with
      // a timeout duration of speed.ms
      // example: this.speed = 50; ms(pause duation) = 5000
      // this.speed + ms = 5050ms pause
      this.options.speed = Math.abs(ms - previousSpeed)
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
  private getCursorLocation(): number {
    const elementRegExp = /<[\w\s=\-'";:.]+>[\s\S]*<\/\w+>/ 
    const cursorLoc = this.element?.innerHTML.search(elementRegExp)
    return cursorLoc ? cursorLoc : -1
  }
  private addEvent(event: () => void) {
    this.events.push(event)
  }
}

export default Writer;