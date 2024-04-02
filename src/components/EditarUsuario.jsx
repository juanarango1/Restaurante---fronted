import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/EditarUsuario.css';

function EditUserForm({ username }) {
    const [editedUser, setEditedUser] = useState({ username });
    const goTo = useNavigate();

    useEffect(() => {
        setEditedUser({ username });
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/users/${editedUser.username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUser),
            });

            if (response.ok) {
                const data = await response.json();
                setEditedUser(data);
                alert('Usuario actualizado con éxito');
            } else {
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleVolver = () => {
        goTo('/listausuarios');
    };

    return (
        <div className="edit-user-form">
            <button onClick={handleVolver}>Volver</button>
            <br></br>
            <h2>EDITAR USUARIO</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={setEditedUser.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={editedUser.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Rol:</label>
                    <select
                        name="role"
                        value={editedUser.role}
                        onChange={handleChange}
                    >
                        <option value="admin">Admin</option>
                        <option value="mesero">Mesero</option>
                        <option value="cocina">Cocina</option>
                    </select>
                </div>
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
}

export default EditUserForm;
