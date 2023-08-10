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
    this.options = options as Options
    this.events = []
  }

  public type(text: string) {
    for(const ch of text) {
      const event = () => {
        const textNode = document.createTextNode(ch)
        this.element?.appendChild(textNode)
      }
      this.events.push(event)
    }
    return this
  }

  public go() {
    if(this.events.length) {
      setTimeout(() => {
        console.log(this.events)
        const event = this.events.shift()
        event()
        this.go()
      }, this.options.speed)
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