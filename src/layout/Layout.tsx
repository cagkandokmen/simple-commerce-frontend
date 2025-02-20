// src/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { User as UserProfile } from 'lucide-react';
import { useProfile } from '../context/ProfileContext.tsx';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useProfile();
  return (
    <>
      <Navbar bg="light" variant="light" className="justify-content-between px-4">
        <Nav>
          <Nav.Link onClick={() => navigate('/main/products')}>Products</Nav.Link>
          <Nav.Link onClick={() => navigate('/main/basket')}>Basket</Nav.Link>
        </Nav>
        <Nav className="align-items-center">
          <span className="me-2">{user?.username}</span>
          <UserProfile size={20} />
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
