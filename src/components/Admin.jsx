import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Admin.css';

function AdminProfile() {
  const [userData, setUserData] = useState({ username: '', password: '', role: 'admin' });
  const [productData, setProductData] = useState({ name: '', price: '' });
  const [activeTab, setActiveTab] = useState('user');
  const goTo = useNavigate();

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/crear-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('USUARIO CREADO CON EXITO');
        setUserData({ username: '', password: '', role: 'admin' });
      } else {

        alert('USUARIO REPETIDO, PORFAVOR ELIJA OTRO');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/crear-producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Producto Creado Con Exito');
        setProductData({ name: '', price: '' });
      } else {
        alert('Precio Actualizado');
        setProductData({ name: '', price: '' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleLogout = () => {
    goTo('/');
  }
  const ListaProductos = () => {
    goTo('/listaproductos');
  }
  const ListaUsuario = () => {
    goTo('/listausuarios');

  }
  const ListaVentas = () => {
    goTo('/listaventas');

  }
  return (
    <div className="container">
      <div className="tabs">
        <button className={activeTab === 'user' ? 'active' : ''} onClick={() => setActiveTab('user')}>
          Crear usuario
        </button>
        <button className={activeTab === 'product' ? 'active' : ''} onClick={() => setActiveTab('product')}>
          Crear producto
        </button>

        <button onClick={ListaVentas}>Tabla de Ventas </button>
        <button onClick={ListaProductos}>Lista Productos</button>
        <button onClick={ListaUsuario}>Lista Usuarios</button>
      </div>

      <div className="form-container">
        {activeTab === 'user' && (
          <form onSubmit={handleUserSubmit}>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            <select value={userData.role} onChange={(e) => setUserData({ ...userData, role: e.target.value })}>
              <option value="admin">Admin</option>
              <option value="mesero">Mesero</option>
              <option value="cocina">Cocina</option>
            </select>
            <button type="submit">Guardar</button>
          </form>
        )}
        {activeTab === 'product' && (
          <form onSubmit={handleProductSubmit}>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Precio"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
            />
            <button type="submit">Guardar</button>
          </form>
        )}
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>

  );
}
export default AdminProfile;
