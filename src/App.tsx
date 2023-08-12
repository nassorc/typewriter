import { useState, useEffect, useRef} from 'react'
import Writer from './actions/Writer';
import './App.css'

function App() {
  const elementRef = useRef()
  const [count, setCount] = useState(0);

  useEffect(() => {
    if(!elementRef.current) return
    const writerInstance = new Writer(`#${elementRef.current.id}`, {
      speed: 100
    });
    writerInstance.type("Hello.").move(-3).pause(1000).move(2).delete(2).type("Bye bye").go();
  }, []);

  return (
    <section>
      <h1 ref={elementRef} id="writer"></h1>
      <button onClick={() => {
        setCount(count + 1)
        console.log('doesnt hang' + count)
      }}>{count}</button>
    </section>
  )
}

export default App
