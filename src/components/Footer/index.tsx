import React from 'react';
import './styles.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; 2024 Rastro. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="#">Termos de Uso</a>
            <a href="#">Política de Privacidade</a>
            <a href="#">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;