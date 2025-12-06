import React, { useState } from 'react';
import axios from 'axios';

function CreateBillingForm({ onBillCreated }) {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [billingDate, setBillingDate] = useState(new Date().toISOString().slice(0, 10));
    const [itemDescription, setItemDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0.00);
    const [currency, setCurrency] = useState('USD');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const calculateTotalAmount = () => {
        return (quantity * unitPrice).toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalAmount = calculateTotalAmount();
        try {
            const response = await axios.post('http://localhost:8080/api/billings', {
                customerName,
                customerEmail,
                billingDate,
                itemDescription,
                quantity,
                unitPrice,
                totalAmount: parseFloat(totalAmount),
                currency
            });
            setMessageType('success');
            setMessage(`Billing record created successfully: ID ${response.data.billingId}`);
            setCustomerName('');
            setCustomerEmail('');
            setBillingDate(new Date().toISOString().slice(0, 10));
            setItemDescription('');
            setQuantity(1);
            setUnitPrice(0.00);
            setCurrency('USD');
            // Call the callback to refresh bills in parent component
            if (onBillCreated) {
                onBillCreated();
            }
        } catch (error) {
            setMessageType('error');
            setMessage(`Error creating billing record: ${error.response?.data?.message || error.message}`);
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

    const textareaStyle = {
        ...inputStyle,
        resize: 'vertical',
        minHeight: '100px',
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

    const totalAmountStyle = {
        ...inputStyle,
        backgroundColor: '#f3f4f6',
        fontWeight: '600',
        color: '#667eea',
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle} className="create-billing-form">
            <h3 style={titleStyle}>Create New Billing Record</h3>
            <div style={fieldStyle}>
                <label style={labelStyle}>Customer Name</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    style={inputStyle}
                    placeholder="Enter customer name"
                />
            </div>
            <div style={fieldStyle}>
                <label style={labelStyle}>Customer Email</label>
                <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    style={inputStyle}
                    placeholder="Enter customer email"
                />
            </div>
            <div style={fieldStyle}>
                <label style={labelStyle}>Billing Date</label>
                <input
                    type="date"
                    value={billingDate}
                    onChange={(e) => setBillingDate(e.target.value)}
                    required
                    style={inputStyle}
                />
            </div>
            <div style={fieldStyle}>
                <label style={labelStyle}>Item Description</label>
                <textarea
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    required
                    style={textareaStyle}
                    placeholder="Describe the item or service"
                />
            </div>
            <div style={fieldStyle}>
                <label style={labelStyle}>Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min="1"
                    required
                    style={inputStyle}
                />
            </div>
            <div style={fieldStyle}>
                <label style={labelStyle}>Unit Price</label>
                <input
                    type="number"
                    step="0.01"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                    min="0"
                    required
                    style={inputStyle}
                    placeholder="0.00"
                />
            </div>
            <div style={fieldStyle}>
                <label style={labelStyle}>Total Amount</label>
                <input
                    type="text"
                    value={calculateTotalAmount()}
                    readOnly
                    style={totalAmountStyle}
                />
            </div>
            <div style={fieldStyle}>
                <label style={labelStyle}>Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} required style={inputStyle}>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="JPY">JPY - Japanese Yen</option>
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
                Create Billing
            </button>
            {message && <p style={messageType === 'success' ? successStyle : errorStyle}>{message}</p>}
        </form>
    );
}

export default CreateBillingForm;
