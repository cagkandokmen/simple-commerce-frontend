import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { User as UserProfile } from 'lucide-react';
import { useProfile } from '../context/ProfileContext.tsx';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useProfile();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); 
    navigate('/'); 
  };

  return (
    <>
      <Navbar bg="light" variant="light" className="justify-content-between px-4">
        <Nav>
          <Nav.Link onClick={() => navigate('/main/products')}>Products</Nav.Link>
          <Nav.Link onClick={() => navigate('/main/basket')}>Basket</Nav.Link>
        </Nav>
        <Nav className="align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle as="span" className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
              <span className="me-2">{user?.username}</span>
              <UserProfile size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>

      {/* This renders the child routes (e.g., Products, Basket) */}
      <div className="content" style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
