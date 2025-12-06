import React, { useState } from 'react';
import axios from 'axios';

function AddUserForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mailId, setMailId] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users', {
                username,
                password,
                mailId,
                role
            });
            setMessageType('success');
            setMessage(`User created successfully: ${response.data.username}`);
            setUsername('');
            setPassword('');
            setMailId('');
            setRole('');
        } catch (error) {
            setMessageType('error');
            setMessage(`Error creating user: ${error.response?.data?.message || error.message}`);
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        maxWidth: '550px',
        margin: '0 auto',
        padding: '30px',
        borderRadius: '12px',
        background: 'white',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    };

    const titleStyle = {
        margin: '0 0 20px 0',
        fontSize: '24px',
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
    };

    const fieldStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    };

    const labelStyle = {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
    };

    const inputStyle = {
        padding: '12px 14px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '15px',
        fontFamily: 'inherit',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginTop: '10px',
        transition: 'all 0.3s ease',
    };

    const messageStyle = {
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        marginTop: '10px',
        textAlign: 'center',
        border: 'none',
    };

    const successStyle = {
        ...messageStyle,
        color: '#065f46',
        background: '#ecfdf5',
        borderLeft: '4px solid #10b981',
    };

    const errorStyle = {
        ...messageStyle,
        color: '#7f1d1d',
        background: '#fee2e2',
        borderLeft: '4px solid #dc2626',
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle} className="add-user-form">
            <h3 style={titleStyle}>Add New User</h3>
            <div style={fieldStyle}>
                <label style={labelStyle}>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={inputStyle}
                    placeholder="Enter username"
                />
            </div>
            <div style={fieldStyle}>
                <label style={labelStyle}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                    placeholder="Enter password"
                />
            </div>
            <div style={fieldStyle}>
                <label style={labelStyle}>Email Address</label>
                <input
                    type="email"
                    value={mailId}
                    onChange={(e) => setMailId(e.target.value)}
                    required
                    style={inputStyle}
                    placeholder="Enter email"
                />
            </div>
            <div style={fieldStyle}>
                <label style={labelStyle}>Role</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    style={inputStyle}
                >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>
            <button 
                type="submit" 
                style={buttonStyle}
                onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.4)';
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                }}
            >
                Add User
            </button>
            {message && <p style={messageType === 'success' ? successStyle : errorStyle}>{message}</p>}
        </form>
    );
}

export default AddUserForm;
