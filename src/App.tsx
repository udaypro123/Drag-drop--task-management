import './App.css'
import ListItemCreate from './components/body/createListeItem'
import Dashboard from './components/body/dashBoard'
import LayoutPage from "./components/navbar/LayoutPage"
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <LayoutPage />
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/listItemCreate' element={<ListItemCreate />}></Route>
      </Routes>
    </>
  )
}

export default App
