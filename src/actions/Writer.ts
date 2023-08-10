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
    const cursor = document.createElement('span')
    cursor.appendChild(document.createTextNode('|'))
    cursor.classList.add('cursor')
    cursor.style.fontSize = '1.4em'
    // this.element.appendChild(cursor)
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
        this.element?.querySelector('span').classList.remove('cursor')
        const event = this.events.shift()
        event()
        this.go()
      }, this.options.speed)
    }
    else {
      this.element?.querySelector('span').classList.add('cursor')
    }
    return this
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