import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ListaUsuarios.css';

function ListaProductos() {
    const [products, setProducts] = useState([]);
    const goTo = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Error al cargar la lista de productos');
            }
        } catch (error) {
            console.error('Error al cargar la lista de productos:', error);
        }
    };


    const handleEditProduct = (name) => {
        goTo('/editarproducto');
        console.log('Editar producto:', name);
    };


    const handleDeleteProduct = async (name) => {
        try {
            const response = await fetch(`http://localhost:5000/products/${name}`, {
                method: 'DELETE',
            });
            if (response.ok) {

                setProducts(prevProducts => prevProducts.filter(product => product.name !== name));
                console.log('Producto eliminado correctamente');

            } else {
                console.error('Error al eliminar Producto');
            }
        } catch (error) {
            console.error('Error al eliminar Producto:', error);
        }
    };

    const handleVolver = () => {
        goTo('/administrador');
    };

    return (
        <div className="user-list">
            <button onClick={handleVolver}>Volver</button>
            <h2 className='titulo'>PRODUCTOS</h2>

            <ul>
                <li className="list-header">
                    <span>PRODUCTO</span>
                    <span>PRECIO</span>
                    <span>ACCION</span>
                </li>
                {products.map(product => (
                    <li key={product.id}>
                        <span>{product.name}</span>
                        <span>{product.price}</span>
                        <span>
                            <button onClick={() => handleEditProduct(product.name)}>Editar</button>
                            <button onClick={() => handleDeleteProduct(product.name)}>Eliminar</button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaProductos;
