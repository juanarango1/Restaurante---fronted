import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Cocina.css';

function Cocina() {
  const [pedidos, setPedidos] = useState([]);
  const goTo = useNavigate();

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const response = await fetch('http://localhost:5000/modificar');
        if (response.ok) {
          const data = await response.json();
          setPedidos(data);
        } else {
          console.error('Error al cargar los pedidos');
        }
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    }

    fetchPedidos();
  }, []);

  const handlePedidoListo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/modificar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estadoPedido: 'LISTO' }),
      });

      if (response.ok) {

        const updatedPedidos = pedidos.map(pedido => {
          if (pedido.id === id) {
            return { ...pedido, estadoPedido: 'LISTO' };
          }
          return pedido;
        });
        setPedidos(updatedPedidos);
      } else {
        console.error('Error al marcar el pedido como listo');
      }
    } catch (error) {
      console.error('Error al marcar el pedido como listo:', error);
    }
  };

  const handleLogout = () => {
    goTo('/');
  }

  return (
    <div className="cocina-container">
      
      <h2 className='titulo-cocina'><img src='logo.png' alt="Descripción de la imagen" className="icono" />
        LISTA DE PEDIDOS EN COCINA</h2>
      <div className="pedidos-list">
        <li className="list-header">
          <span>MESA</span>
          <span>MESERO</span>
          <span>PRODUCTOS</span>
          <span>ESTADO</span>
          <span>PREPARADO</span>
        </li>
        {pedidos.map(pedido => (
          <li key={pedido.id} className="pedido-item">
            <span>{pedido.mesa}</span>
            <span>{pedido.mesero}</span>
            <ul className='product'>
              {pedido.productos.map((producto, index) => (
                <li className='list' key={index}>{producto.nombre}</li>
              ))}
            </ul>
            <p>{pedido.estadoPedido}</p>
            <span>
              <button onClick={() => handlePedidoListo(pedido.id)}>Marcar como listo</button>
            </span>
          </li>
        ))}
        <button className='logout' onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      
    </div>
    
  );
  
}

export default Cocina;
