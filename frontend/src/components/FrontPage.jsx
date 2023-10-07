import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../css/FrontPage.css'

function FrontPage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <h2>Welcome to our project guys!</h2>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">

          <a href="/client">
              <button>  Visit the client page! </button>
              </a>
      </div>

    </>
  )
}

export default FrontPage
