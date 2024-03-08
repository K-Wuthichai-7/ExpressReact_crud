import { BrowserRouter,Route,Routes } from "react-router-dom";
import Users from "./components/Users";
import { Createuser } from "./components/Createuser";
import { Updateuser } from "./components/Updateuser";
import Container from '@mui/material/Container';
import './App.css'

function App() {
 
  return (
    <Container className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users/>} />
        <Route path="create" element={<Createuser/>} />
        <Route path="update/:id" element={<Updateuser/>} />
      </Routes>
    </BrowserRouter>
    </Container>
  )
}

export default App
