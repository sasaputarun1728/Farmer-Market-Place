import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Ensure this file is correctly imported

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container6">
        <div className="logo">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <svg className="bi" width="30" height="24">
              <use href="#bootstrap"></use>
            </svg>
          </Link>
          <span className="text-muted">© 2024 Farmer Market Place. All rights reserved. Freshness delivered, always</span>
        </div>

        <ul className="nav">
          {/* Add navigation links here if needed */}
        </ul>
      </div>
    </footer>
  );
}
