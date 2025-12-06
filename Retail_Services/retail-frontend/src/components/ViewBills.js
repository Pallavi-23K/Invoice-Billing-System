import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const ViewBills = forwardRef(({ setEditingBillId, setActiveBillingPanel, currentUserRole }, ref) => {
    const [billings, setBillings] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBillings();
    }, []);

    const fetchBillings = async () => {
        try {
            const userEmail = localStorage.getItem('mailId');
            const userRole = localStorage.getItem('role');
            const response = await axios.get('http://localhost:8080/api/billings', {
                headers: {
                    'X-User-Email': userEmail || '',
                    'X-User-Role': userRole || ''
                }
            });
            setBillings(response.data);
            setMessage('');
        } catch (error) {
            setMessage(`Error fetching bills: ${error.response?.data?.message || error.message}`);
        }
    };

    // Expose the fetchBillings method through ref
    useImperativeHandle(ref, () => ({
        refresh: fetchBillings
    }));

    const handleEditClick = (billId) => {
        setEditingBillId(billId);
        setActiveBillingPanel('editBill');
    };

    return (
        <div className="view-bills-container">
            <h3>View All Bills</h3>
            <button onClick={fetchBillings}>Refresh Bills</button>
            {message && <p>{message}</p>}
            {billings.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                            <th>Currency</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billings.map(bill => (
                            <tr key={bill.billingId}>
                                <td>{bill.billingId}</td>
                                <td>{bill.customerName}</td>
                                <td>{bill.customerEmail}</td>
                                <td>{bill.billingDate}</td>
                                <td>{bill.itemDescription}</td>
                                <td>{bill.quantity}</td>
                                <td>{bill.unitPrice}</td>
                                <td>{bill.totalAmount}</td>
                                <td>{bill.currency}</td>
                                <td>
                                    {currentUserRole === 'admin' ? (
                                        <button onClick={() => handleEditClick(bill.billingId)}>Edit</button>
                                    ) : (
                                        <button disabled title="Contact Admin to edit">Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bills found. Create some bills first!</p>
            )}
        </div>
    );
});

ViewBills.displayName = 'ViewBills';
export default ViewBills;
