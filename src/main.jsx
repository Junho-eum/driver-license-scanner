import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Debug from "./pages/Debug.jsx"

//Note we can create a settings file to ensure we are allowed to debug
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
    {window.location.pathname == "/debug" ? 
    <Debug /> : <App />
    }

  </React.StrictMode>,
)
