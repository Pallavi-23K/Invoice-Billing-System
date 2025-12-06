import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DownloadInvoice({ currentUserEmail, currentUserRole }) {
  const [billings, setBillings] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBillings();
  }, []);

  const fetchBillings = async () => {
    try {
      const userEmail = currentUserEmail || localStorage.getItem('mailId');
      const userRole = currentUserRole || localStorage.getItem('role');
      const res = await axios.get('http://localhost:8080/api/billings', {
        headers: {
          'X-User-Email': userEmail || '',
          'X-User-Role': userRole || ''
        }
      });
      let items = res.data || [];
      // Show all bills to all users (both admin and regular users)
      setBillings(items);
      if (items && items.length) setSelectedId(items[0].billingId);
    } catch (err) {
      setMessage(`Error fetching bills: ${err.response?.data?.message || err.message}`);
    }
  };

  const openInvoice = (bill, autoPrint = false) => {
    const invoiceHtml = `
      <html>
        <head>
          <title>Invoice - ${bill.billingId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #111 }
            .invoice { max-width: 800px; margin: 0 auto; }
            .header { display:flex; justify-content: space-between; align-items:center; }
            .company { font-weight: bold; font-size: 18px }
            .meta { text-align: right }
            table { width:100%; border-collapse: collapse; margin-top: 20px }
            th, td { border: 1px solid #e0e0e0; padding: 8px; text-align:left }
            .total { text-align:right; font-weight: bold }
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="header">
              <div class="company">Retail Company</div>
              <div class="meta">
                <div>Invoice ID: ${bill.billingId}</div>
                <div>Date: ${bill.billingDate}</div>
                <div>Currency: ${bill.currency}</div>
              </div>
            </div>
            <hr />
            <h3>Customer</h3>
            <div>${bill.customerName || ''} &lt;${bill.customerEmail || ''}&gt;</div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${bill.itemDescription || ''}</td>
                  <td>${bill.quantity}</td>
                  <td>${Number(bill.unitPrice).toFixed(2)}</td>
                  <td>${Number(bill.totalAmount).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <p class="total">Grand Total: ${Number(bill.totalAmount).toFixed(2)} ${bill.currency}</p>

            <p>Thank you for your business.</p>
          </div>
          <script>
            function tryPrint(){
              setTimeout(()=>{ window.print(); }, 300);
            }
            tryPrint();
          </script>
        </body>
      </html>
    `;

    const w = window.open('', '_blank');
    if (!w) {
      setMessage('Unable to open new window. Check popup blocker.');
      return;
    }
    w.document.open();
    w.document.write(invoiceHtml);
    w.document.close();
    w.focus();
    if (autoPrint) {
      // call print after a short delay
      w.onload = () => {
        try { w.print(); } catch (e) { /* ignore */ }
      };
    }
  };

  const handleDownload = () => {
    setMessage('');
    const bill = billings.find(b => String(b.billingId) === String(selectedId));
    if (!bill) { setMessage('Please select a valid bill.'); return; }
    // open invoice and trigger print so user can save as PDF
    openInvoice(bill, true);
  };

  return (
    <div className="download-invoice">
      <h3>Download Invoice</h3>
      <p>Select a bill and open the invoice in a new tab (use browser Print → Save as PDF).</p>
      {message && <p style={{ color: 'crimson' }}>{message}</p>}
      <div style={{ marginBottom: 12 }}>
        <label>Bill:</label>
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          {billings.map(b => (
            <option key={b.billingId} value={b.billingId}>
              {b.billingId} — {b.customerName} — {b.billingDate}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleDownload}>Download Invoice (Save as PDF)</button>
      </div>
    </div>
  );
}

export default DownloadInvoice;
