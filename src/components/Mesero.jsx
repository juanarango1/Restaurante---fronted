import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Mesero.css';

const Mesero = () => {
  const [mesa, setMesa] = useState('');
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [estadoPedido, setEstadoPedido] = useState('procesando');
  const [mesero, setMesero] = useState('');
  const [products, setProducts] = useState([]);
  const goTo = useNavigate();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Error al obtener los productos:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAgregarProducto = () => {
    const nuevoProducto = {
      nombre: '',
      cantidad: 0,
      precioUnitario: 0
    };
    setProductos([...productos, nuevoProducto]);
  };

  const handleCambiarProducto = (index, e) => {
    const { name, value } = e.target;
    const nuevosProductos = [...productos];
    const selectedProduct = products.find(product => product.name === value);
    if (name === 'nombre') {
      nuevosProductos[index][name] = value;
      nuevosProductos[index]['precioUnitario'] = selectedProduct ? selectedProduct.price : 0;
    } else {
      nuevosProductos[index][name] = value;
    }
    setProductos(nuevosProductos);
  };



  const handleEliminarProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);
  };

  const handleCalcularTotal = () => {
    let totalCalculado = 0;
    productos.forEach(producto => {
      totalCalculado += producto.cantidad * producto.precioUnitario;
    });
    setTotal(totalCalculado);
  };

  const handleRealizarPedido = async () => {
    try {
      const pedido = {
        mesa,
        mesero,
        productos,
        total,
        estadoPedido
      };

      const response = await fetch('http://localhost:5000/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
       
      });

      if (!response.ok) {
        throw new Error(`Error al realizar el pedido: ${response.statusText}`);
      }

       alert('PEDIDO REALIZADO CON EXITO');

      setMesa('');
      setProductos([]);
      setTotal(0);
      setEstadoPedido('procesando');
      setMesero('');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
    }
  };
  const handleLogout = () => {
    goTo('/');
  }


  return (
    <div className="mesero-container">
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <br></br>
      <h2>REALIZAR PEDIDO</h2>
      <form className="mesero-form">
        <div>
          <label htmlFor="mesa">Mesa:</label>
          <input type="text" id="mesa" name="mesa" value={mesa} onChange={(e) => setMesa(e.target.value)} />
        </div>
        <div>
          <label htmlFor="mesero">Mesero:</label>
          <input type="text" id="mesero" name="mesero" value={mesero} onChange={(e) => setMesero(e.target.value)} />
        </div>
        {productos.map((producto, index) => (
          <div className="index" key={index}>
            <label htmlFor={`producto${index}`}>Producto:</label>
            <select id={`producto${index}`} name="nombre" value={producto.nombre} onChange={(e) => handleCambiarProducto(index, e)}>
              <option value="">Seleccione un producto</option>
              {products.map((product) => (
                <option key={product.name} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
            <label htmlFor={`cantidad${index}`}>Cantidad:</label>
            <input type="number" id={`cantidad${index}`} name="cantidad" onChange={(e) => handleCambiarProducto(index, e)} />
            <label htmlFor={`precio${index}`}>Precio Unitario:</label>
            <input type="number" id={`precio${index}`} name="precioUnitario" value={producto.precioUnitario} onChange={(e) => handleCambiarProducto(index, e)} />
            <button type="button" onClick={() => handleEliminarProducto(index)}>Eliminar</button>
          </div>
        ))}
        <button type="button" onClick={handleAgregarProducto}>Agregar Producto</button>
        <button type="button" onClick={handleCalcularTotal}>Calcular Total</button>
        <button type="button" onClick={handleRealizarPedido}>Realizar Pedido</button>
        <div className='total'>Total: {total}</div>
        <br></br>
        <div className='estado'>
          <label htmlFor="estadoPedido">Estado del Pedido:</label>
          <select id="estadoPedido" value={estadoPedido} onChange={(e) => setEstadoPedido(e.target.value)}>
            <option value="procesando">Procesando</option>
            <option value="listo">Listo</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Mesero;
