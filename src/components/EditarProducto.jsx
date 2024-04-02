import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/EditarUsuario.css';

function EditProductForm({ name }) {
    const [editedProduct, setEditedProduct] = useState({ name });
    const goTo = useNavigate();

    useEffect(() => {
        setEditedProduct({ name });
    }, [name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/products/${editedProduct.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProduct),
            });

            if (response.ok) {
                const data = await response.json();
                setEditedProduct(data);
                alert('Producto actualizado con éxito');
            } else {
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleVolver = () => {
        goTo('/listaproductos');
    };

    return (
        <div className="edit-user-form">
            <button onClick={handleVolver}>Volver</button>
            <br></br>
            <h2>EDITAR PRODUCTO</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de producto:</label>
                    <input
                        type="text"
                        name="name"
                        value={editedProduct.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="text"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
}

export default EditProductForm;
