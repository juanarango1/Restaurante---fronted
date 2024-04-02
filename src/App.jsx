import Form from './components/Form';
import Cocina from './components/Cocina';
import Admin from './components/Admin';
import Mesero from './components/Mesero'
import ListaUsuarios from './components/ListaUsuarios';
import ListaVentas from './components/ListaVentas';
import EditarUsuario from './components/EditarUsuario';
import ListaProductos from './components/ListaProductos';
import EditarProducto from './components/EditarProducto';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Form callback={setUser} />}></Route>
        <Route path='/cocina' element={<Cocina user={user} />}></Route>
        <Route path='/administrador' element={<Admin user={user} />}></Route>
        <Route path='/mesero' element={<Mesero user={user} />}></Route>
        <Route path='/listausuarios' element={<ListaUsuarios user={user} />}></Route>
        <Route path='/listaproductos' element={<ListaProductos user={user} />}></Route>
        <Route path='/listaventas' element={<ListaVentas user={user} />}></Route>
        <Route path='/editarusuario' element={<EditarUsuario user={user} />}></Route>
        <Route path='/editarproducto' element={<EditarProducto user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
