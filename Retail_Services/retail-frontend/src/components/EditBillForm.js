import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditBillForm({ billId, setEditingBillId, setActiveBillingPanel }) {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [billingDate, setBillingDate] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0.00);
    const [currency, setCurrency] = useState('USD');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchBill = async () => {
            try {
                const userEmail = localStorage.getItem('mailId');
                const userRole = localStorage.getItem('role');
                const response = await axios.get(`http://localhost:8080/api/billings/${billId}`, {
                    headers: {
                        'X-User-Email': userEmail || '',
                        'X-User-Role': userRole || ''
                    }
                });
                const bill = response.data;
                setCustomerName(bill.customerName);
                setCustomerEmail(bill.customerEmail || '');
                setBillingDate(bill.billingDate);
                setItemDescription(bill.itemDescription);
                setQuantity(bill.quantity);
                setUnitPrice(bill.unitPrice);
                setCurrency(bill.currency);
            } catch (error) {
                setMessage(`Error fetching bill for editing: ${error.response?.data?.message || error.message}`);
            }
        };

        if (billId) {
            fetchBill();
        }
    }, [billId]);

    const calculateTotalAmount = () => {
        return (quantity * unitPrice).toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalAmount = calculateTotalAmount();
        try {
            const userEmail = localStorage.getItem('mailId');
            const userRole = localStorage.getItem('role');
            const response = await axios.put(`http://localhost:8080/api/billings/${billId}`, {
                billingId: billId,
                customerName,
                customerEmail,
                billingDate,
                itemDescription,
                quantity,
                unitPrice,
                totalAmount: parseFloat(totalAmount),
                currency
            }, {
                headers: {
                    'X-User-Email': userEmail || '',
                    'X-User-Role': userRole || ''
                }
            });
            setMessage(`Bill ID ${response.data.billingId} updated successfully!`);
            // Optionally navigate back to view bills or clear form
            setEditingBillId(null);
            setActiveBillingPanel('viewBills');
        } catch (error) {
            setMessage(`Error updating bill: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-bill-form">
            <h3>Edit Billing Record (ID: {billId})</h3>
            <div>
                <label>Customer Name:</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Customer Email:</label>
                <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Billing Date:</label>
                <input
                    type="date"
                    value={billingDate}
                    onChange={(e) => setBillingDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Item Description:</label>
                <textarea
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min="1"
                    required
                />
            </div>
            <div>
                <label>Unit Price:</label>
                <input
                    type="number"
                    step="0.01"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                    min="0"
                    required
                />
            </div>
            <div>
                <label>Total Amount:</label>
                <input
                    type="text"
                    value={calculateTotalAmount()}
                    readOnly
                />
            </div>
            <div>
                <label>Currency:</label>
                <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    maxLength="3"
                    required
                />
            </div>
            <button type="submit">Update Bill</button>
            <button type="button" onClick={() => { setEditingBillId(null); setActiveBillingPanel('viewBills'); }}>Cancel</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default EditBillForm;
