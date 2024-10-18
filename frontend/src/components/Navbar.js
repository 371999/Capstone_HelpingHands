import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #007bff;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MenuButton = styled.button`
  display: none;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.open ? 'block' : 'none')};
    width: 100%;
  }
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavbarContainer>
      <h1 style={{ color: 'white' }}>App Name</h1>
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </MenuButton>
      <NavList open={menuOpen}>
        <NavItem><Link to="/" style={{ color: 'white' }}>Home</Link></NavItem>
        <NavItem><Link to="/donations" style={{ color: 'white' }}>Donations</Link></NavItem>
        <NavItem><Link to="/admin" style={{ color: 'white' }}>Admin</Link></NavItem>
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;