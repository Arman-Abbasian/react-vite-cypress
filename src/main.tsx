import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import  store  from './store/index.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
    <Provider store={store}>
      <App />
    {/* </ThemeProvider> */}
    </Provider>
  </React.StrictMode>,
)
