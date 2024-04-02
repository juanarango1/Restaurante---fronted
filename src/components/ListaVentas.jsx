import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/Admin.css';

function VentasProfile() {
    const [ventas, setVentas] = useState([]);
    const goTo = useNavigate();


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/ventas');
            if (response.ok) {
                const data = await response.json();
                setVentas(data);
            } else {
                console.error('Error al cargar la lista de usuarios');
            }
        } catch (error) {
            console.error('Error al cargar la lista de usuarios:', error);
        }
    };

    const handleVolver = () => {
        goTo('/administrador');
    };


    return (
        <div className="user-list">
            <button onClick={handleVolver}>Volver</button>
            <h2 className='titulo'>VENTAS</h2>
            <ul>
                <li className="list-header">
                    <span>MESERO</span>
                    <span>PRODUCTOS</span>
                    <span>TOTAL</span>
                </li>
                {ventas.map((venta, index) => (
                    <li key={index}>
                        <span>{venta.mesero}</span>
                        <span>{venta.productos ? venta.productos.map((producto) => producto.nombre).join(', ') : 'N/A'}</span>
                        <span>${venta.total}</span>
                    </li>
                ))}

            </ul>
        </div>
    );
}
export default VentasProfile;
