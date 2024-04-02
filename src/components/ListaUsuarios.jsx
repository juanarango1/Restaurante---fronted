import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ListaUsuarios.css';

function AdminProfile() {
    const [users, setUsers] = useState([]);
    const goTo = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Error al cargar la lista de usuarios');
            }
        } catch (error) {
            console.error('Error al cargar la lista de usuarios:', error);
        }
    };

    const handleEditUser = (username) => {
        goTo('/EditarUsuario');
        console.log('Editar usuario:', username);
    };

    const handleDeleteUser = async (username) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${username}`, {
                method: 'DELETE',
            });
            if (response.ok) {

                setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
                console.log('Usuario eliminado correctamente');

            } else {
                console.error('Error al eliminar usuario');
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    const handleVolver = () => {
        goTo('/administrador');
    };
    return (
        <div className="user-list">
            <button onClick={handleVolver}>Volver</button>
            <h2 className='titulo'>USUARIOS</h2>
            <ul>
                <li className="list-header">
                    <span>USUARIO</span>
                    <span>CONTRASEÑA</span>
                    <span>ROLE</span>
                    <span>ACCION</span>
                </li>
                {users.map(user => (
                    <li key={user.username}>
                        <span>{user.username}</span>
                        <span>{user.password}</span>
                        <span>{user.role}</span>
                        <span>
                            <button onClick={() => handleEditUser(user.username)}>Editar</button>
                            <button onClick={() => handleDeleteUser(user.username)}>Eliminar</button>

                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminProfile;
