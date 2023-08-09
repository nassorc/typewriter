type Options = {
  startDelay: number
  speed: number
} 
class Writer {
  element: HTMLElement | null
  options: Options

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