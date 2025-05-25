import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>CourseHub</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Catalog</Link>
        {user && <Link to="/dashboard" style={styles.link}>Dashboard</Link>}
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.link}>Logout</button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#222',
    color: '#fff',
  },
  title: {
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
  }
};

export default Navbar;
