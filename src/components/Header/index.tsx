import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <img src="/rastro-logo-white.png" alt="Rastro" className="logo-img" />
        </div>
        <nav className="navbar">
          <ul className="nav-list">
            <li><Link to="/TelaPrincipal">Home</Link></li>
            <li><Link to="/relatorio">Relatórios</Link></li>
            <li><Link to="/CadastroUsuario">Cadastro</Link></li>
            <li><Link to="/LoginUsuario">Sair</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;