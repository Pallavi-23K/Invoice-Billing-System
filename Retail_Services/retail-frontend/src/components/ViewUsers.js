import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewUsers({ currentUserRole }) {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userRole = localStorage.getItem('role');
            const userEmail = localStorage.getItem('mailId');
            const response = await axios.get('/api/users', {
                headers: {
                    'X-User-Email': userEmail || '',
                    'X-User-Role': userRole || ''
                }
            });
            setUsers(response.data);
            setMessage('');
        } catch (error) {
            setMessage(`Error fetching users: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm(`Delete user ID ${userId}? This cannot be undone.`)) return;
        try {
            const userRole = localStorage.getItem('role');
            const userEmail = localStorage.getItem('mailId');
            await axios.delete(`/api/users/${userId}`, {
                headers: {
                    'X-User-Email': userEmail || '',
                    'X-User-Role': userRole || ''
                }
            });
            setMessage(`User ${userId} deleted`);
            fetchUsers();
        } catch (err) {
            setMessage(`Error deleting user: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="view-users-container">
            <h3>View All Users</h3>
            <button onClick={fetchUsers}>Refresh Users</button>
            {message && <p>{message}</p>}
            {users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Mail ID</th>
                            <th>Role</th>
                            {currentUserRole === 'admin' && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.username}</td>
                                <td>{user.mailId}</td>
                                <td>{user.role}</td>
                                {currentUserRole === 'admin' && (
                                    <td>
                                        <button onClick={() => handleDelete(user.userId)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found. Add some users first!</p>
            )}
        </div>
    );
}

export default ViewUsers;
