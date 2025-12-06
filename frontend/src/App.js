import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import AddUserForm from './components/AddUserForm';
import ViewUsers from './components/ViewUsers';
import CreateBillingForm from './components/CreateBillingForm';
import ViewBills from './components/ViewBills';
import EditBillForm from './components/EditBillForm';
import LoginPage from './components/LoginPage';
import DownloadInvoice from './components/DownloadInvoice';

// Home Page Styles
const homePageStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '40px 20px',
};

const welcomeCardStyle = {
  maxWidth: '1000px',
  width: '100%',
  padding: '40px',
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
};

const welcomeTitleStyle = {
  margin: '0 0 10px 0',
  fontSize: '32px',
  fontWeight: '700',
  color: '#333',
  textAlign: 'center',
};

const welcomeSubtitleStyle = {
  margin: '0 0 30px 0',
  fontSize: '16px',
  color: '#666',
  textAlign: 'center',
};

const statsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
  margin: '30px 0',
};

const statCardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  padding: '20px',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
  borderRadius: '10px',
  border: '1px solid rgba(102, 126, 234, 0.2)',
  transition: 'all 0.3s ease',
};

const statIconStyle = {
  fontSize: '40px',
  minWidth: '50px',
};

const statTextStyle = {
  flex: 1,
};

const statTextStyle_h3 = {
  margin: '0 0 8px 0',
  fontSize: '16px',
  fontWeight: '600',
  color: '#333',
};

const statTextStyle_p = {
  margin: 0,
  fontSize: '14px',
  color: '#666',
};

const userGreetingStyle = {
  marginTop: '30px',
  padding: '20px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderRadius: '10px',
  textAlign: 'center',
  fontSize: '16px',
};

const panelButtonStyle = {
  padding: '12px 16px',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  borderLeft: '4px solid transparent',
};

const panelButtonActiveStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.35)',
  borderLeftColor: '#fbbf24',
};

const noSelectionStyle = {
  textAlign: 'center',
  color: '#999',
  fontSize: '16px',
  marginTop: '40px',
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeUserPanel, setActiveUserPanel] = useState('');
  const [activeBillingPanel, setActiveBillingPanel] = useState('');
  const [editingBillId, setEditingBillId] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null); // role from login
  const [currentUsername, setCurrentUsername] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const viewBillsRef = useRef(null);

  const handleBillCreated = () => {
    // Refresh the ViewBills component when a bill is created
    if (viewBillsRef.current) {
      viewBillsRef.current.refresh();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div style={homePageStyle}>
            <div style={welcomeCardStyle}>
              <h1 style={welcomeTitleStyle}>Welcome to Retail Management System</h1>
              <p style={welcomeSubtitleStyle}>Manage your business efficiently</p>
              
              <div style={statsContainerStyle}>
                <div style={statCardStyle}>
                  <div style={statIconStyle}>👤</div>
                  <div style={statTextStyle}>
                    <h3>User Management</h3>
                    <p>Create and manage user accounts with different roles</p>
                  </div>
                </div>
                
                <div style={statCardStyle}>
                  <div style={statIconStyle}>💰</div>
                  <div style={statTextStyle}>
                    <h3>Billing System</h3>
                    <p>Create, view, and manage billing records</p>
                  </div>
                </div>
                
                <div style={statCardStyle}>
                  <div style={statIconStyle}>📄</div>
                  <div style={statTextStyle}>
                    <h3>Invoice Management</h3>
                    <p>Download and manage invoices for your customers</p>
                  </div>
                </div>
              </div>
              
              <p style={userGreetingStyle}>
                Hello <strong>{currentUsername}</strong>! You are logged in as <strong>{currentUserRole}</strong>.
              </p>
            </div>
          </div>
        );
      case 'manageUsers':
        return (
          <div className="manage-users-container">
              <div className="left-panel">
                <button 
                  onClick={() => setActiveUserPanel('addUsers')}
                  style={{...panelButtonStyle, ...(activeUserPanel === 'addUsers' ? panelButtonActiveStyle : {})}}
                >
                  ➕ Add Users
                </button>
                <button 
                  onClick={() => setActiveUserPanel('viewUsers')}
                  style={{...panelButtonStyle, ...(activeUserPanel === 'viewUsers' ? panelButtonActiveStyle : {})}}
                >
                  👁️ View Users
                </button>
              </div>
            <div className="right-panel">
              {activeUserPanel === 'addUsers' && <AddUserForm />}
              {activeUserPanel === 'viewUsers' && <ViewUsers currentUserRole={currentUserRole} />}
              {!activeUserPanel && <h3 style={noSelectionStyle}>Select an option from the left panel</h3>}
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="billing-container">
            <div className="left-panel">
              {currentUserRole === 'admin' && (
                <button 
                  onClick={() => setActiveBillingPanel('createBill')}
                  style={{...panelButtonStyle, ...(activeBillingPanel === 'createBill' ? panelButtonActiveStyle : {})}}
                >
                  ➕ Create Bill
                </button>
              )}
              <button 
                onClick={() => setActiveBillingPanel('viewBills')}
                style={{...panelButtonStyle, ...(activeBillingPanel === 'viewBills' ? panelButtonActiveStyle : {})}}
              >
                👁️ View Bills
              </button>
              {currentUserRole === 'admin' && (
                <button 
                  onClick={() => setActiveBillingPanel('editBill')}
                  style={{...panelButtonStyle, ...(activeBillingPanel === 'editBill' ? panelButtonActiveStyle : {})}}
                >
                  ✏️ Edit Bill
                </button>
              )}
              <button 
                onClick={() => setActiveBillingPanel('downloadInvoice')}
                style={{...panelButtonStyle, ...(activeBillingPanel === 'downloadInvoice' ? panelButtonActiveStyle : {})}}
              >
                📥 Download Invoice
              </button>
            </div>
            <div className="right-panel">
              {activeBillingPanel === 'createBill' && <CreateBillingForm onBillCreated={handleBillCreated} />}
              {activeBillingPanel === 'viewBills' && <ViewBills ref={viewBillsRef} setEditingBillId={setEditingBillId} setActiveBillingPanel={setActiveBillingPanel} currentUserRole={currentUserRole} />}
              {activeBillingPanel === 'editBill' && editingBillId && currentUserRole === 'admin' && (
                <EditBillForm
                  billId={editingBillId}
                  setEditingBillId={setEditingBillId}
                  setActiveBillingPanel={setActiveBillingPanel}
                  currentUserRole={currentUserRole}
                />
              )}
              {activeBillingPanel === 'downloadInvoice' && (
                <DownloadInvoice currentUserEmail={currentUserEmail} currentUserRole={currentUserRole} />
              )}
              {!activeBillingPanel && <h3 style={noSelectionStyle}>Select an option from the left panel</h3>}
            </div>
          </div>
        );
      default:
        return <div><h2>Welcome Home!</h2></div>;
    }
  };
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedUser = localStorage.getItem('username');
    const storedMail = localStorage.getItem('mailId');
    if (storedRole) setCurrentUserRole(storedRole);
    if (storedUser) setCurrentUsername(storedUser);
    if (storedMail) setCurrentUserEmail(storedMail);
  }, []);

  const handleLogin = (username, role) => {
    setCurrentUsername(username);
    setCurrentUserRole(role);
  };

  const handleLoginWithEmail = (username, role, mailId) => {
    setCurrentUsername(username);
    setCurrentUserRole(role);
    setCurrentUserEmail(mailId || null);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('mailId');
    setCurrentUsername(null);
    setCurrentUserRole(null);
  };

  if (!currentUserRole) {
    return <LoginPage onLogin={handleLoginWithEmail} />;
  }

  return (
    <div className="App">
      <div className="header-controls">
        <span>Signed in: <strong>{currentUsername}</strong> (<strong>{currentUserRole}</strong>)</span>
        <button onClick={handleLogout}>Sign out</button>
      </div>
      <div className="tab-bar">
        <button
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        {currentUserRole === 'admin' && (
          <button
            className={activeTab === 'manageUsers' ? 'active' : ''}
            onClick={() => setActiveTab('manageUsers')}
          >
            Manage Users
          </button>
        )}
        <button
          className={activeTab === 'billing' ? 'active' : ''}
          onClick={() => setActiveTab('billing')}
        >
          Billing
        </button>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
