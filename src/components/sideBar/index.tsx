import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, UserPlus, LogOut, Settings, History, Package, PlusCircle } from 'lucide-react';
import './styles.css';

const Header = () => {
  return (
    <>
      {/* Sidebar Navigation */}
      <header className="app-sidebar">
        <div className="sidebar-container">
          {/* Logo */}
          <div className="logo">
            <img src="/rastro.png" alt="Rastro" className="logo-img" />
          </div>

          {/* Navigation Menu */}
          <nav className="sidebar-nav">
            <ul className="nav-list">
              <li>
                <Link to="/TelaPrincipal" className="nav-link">
                  <Home className="nav-icon" />
                  <span>Tela Inicial</span>
                </Link>
              </li>
              <li>
                <Link to="/cadastroRecursos" className="nav-link">
                  <PlusCircle className="nav-icon" />
                  <span>Cadastrar Recursos</span>
                </Link>
              </li>
              <li>
                <Link to="/rastreamentoRecursos" className="nav-link">
                  <Package className="nav-icon" />
                  <span>Recursos</span>
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
                  <span>Cadastro Usuário</span>
                </Link>
              </li>
              <li>
                <Link to="/CadastroCategorias" className="nav-link">
                  <UserPlus className="nav-icon" />
                  <span>Cadastro Categoria</span>
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

          {/* Logout Button */}
          <div className="logout-section">
            <Link to="/" className="logout-button">
              <LogOut className="nav-icon" />
              <span>Sair</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Top Title Bar - Removido o título fixo */}
      <div className="top-title-bar">
        {/* Barra superior sem título fixo */}
      </div>
    </>
  );
};

export default Header;