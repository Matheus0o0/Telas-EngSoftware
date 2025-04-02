import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, UserPlus, LogOut, Settings, History } from 'lucide-react';
import './styles.css';

const Header = () => {
  return (
    <>
      {/* Sidebar Navigation */}
      <header className="app-sidebar">
        <div className="sidebar-container">
          {/* Logo */}
          <div className="logo">
            <img src="/rastro-logo-white.png" alt="Rastro" className="logo-img" />
          </div>

          {/* Navigation Menu */}
          <nav className="sidebar-nav">
            <ul className="nav-list">
              <li>
                <Link to="/TelaPrincipal" className="nav-link">
                  <LayoutDashboard className="nav-icon" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/relatorio" className="nav-link">
                  <FileText className="nav-icon" />
                  <span>Relatórios</span>
                </Link>
              </li>
              <li>
                <Link to="/historico" className="nav-link">
                  <History className="nav-icon" />
                  <span>Histórico</span>
                </Link>
              </li>
              <li>
                <Link to="/CadastroUsuario" className="nav-link">
                  <UserPlus className="nav-icon" />
                  <span>Cadastro</span>
                </Link>
              </li>
              <li>
                <Link to="/configuracoes" className="nav-link">
                  <Settings className="nav-icon" />
                  <span>Configurações</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logout Button (Icon Only) */}
          <div className="logout-section">
            <Link to="/LoginUsuario">
              <button className="logout-button" title="Sair">
                <LogOut className="nav-icon" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Top Title Bar */}
      <div className="top-title-bar">
        <h2 className="page-title">Sistema de gerenciamento de insumos</h2>
      </div>
    </>
  );
};

export default Header;