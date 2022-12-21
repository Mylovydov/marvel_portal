import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/style.scss'
import { MarvelApp } from './components/marvelApp'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<MarvelApp />)
