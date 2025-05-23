import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {SnackbarProvider} from 'notistack'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </>
)
