import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, FileText, Users, Settings, Plus } from 'lucide-react';
import Header from '../../components/sideBar';
import './style.css';

function Home() {
  const navigate = useNavigate();

  // Função para navegar para outras telas
  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="app-container">
      <Header />
      <main className="app-content" style={{ 
        marginLeft: '250px',
        marginTop: '60px', 
        minHeight: 'calc(100vh - 60px)',
        padding: '2rem',
        position: 'relative'
      }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h1 className="h3 mb-3">Bem-vindo ao Sistema de Gerenciamento de Recursos</h1>
              <p className="text-muted">
                Gerencie todos os recursos da sua organização em um só lugar. Acesse as principais funcionalidades abaixo.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {/* Card para Recursos */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm hover-card">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper bg-primary-light rounded-circle p-3 me-3">
                      <Package className="text-primary" size={24} />
                    </div>
                    <h5 className="card-title mb-0">Recursos</h5>
                  </div>
                  <p className="card-text text-muted flex-grow-1">
                    Visualize, cadastre e gerencie todos os recursos disponíveis.
                  </p>
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => navigateTo('/rastreamentoRecursos')}
                    >
                      Visualizar
                    </button>
                    <button 
                      className="btn btn-primary btn-sm d-flex align-items-center"
                      onClick={() => navigateTo('/cadastroRecursos')}
                    >
                      <Plus size={16} className="me-1" />
                      Cadastrar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card para Relatórios */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm hover-card">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper bg-success-light rounded-circle p-3 me-3">
                      <FileText className="text-success" size={24} />
                    </div>
                    <h5 className="card-title mb-0">Relatórios</h5>
                  </div>
                  <p className="card-text text-muted flex-grow-1">
                    Acesse relatórios detalhados sobre o uso de recursos.
                  </p>
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-outline-success btn-sm"
                      onClick={() => navigateTo('/relatorio')}
                    >
                      Acessar Relatórios
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card para Usuários */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm hover-card">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper bg-info-light rounded-circle p-3 me-3">
                      <Users className="text-info" size={24} />
                    </div>
                    <h5 className="card-title mb-0">Usuários</h5>
                  </div>
                  <p className="card-text text-muted flex-grow-1">
                    Gerencie usuários e suas permissões no sistema.
                  </p>
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-outline-info btn-sm"
                      onClick={() => navigateTo('/CadastroUsuario')}
                    >
                      Gerenciar Usuários
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card para Configurações */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm hover-card">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper bg-warning-light rounded-circle p-3 me-3">
                      <Settings className="text-warning" size={24} />
                    </div>
                    <h5 className="card-title mb-0">Configurações</h5>
                  </div>
                  <p className="card-text text-muted flex-grow-1">
                    Personalize as configurações do sistema.
                  </p>
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => navigateTo('/configuracoes')}
                    >
                      Ajustar Configurações
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Atividades Recentes */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Atividades Recentes</h5>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Projetor Laser emprestado</h6>
                        <p className="text-muted small mb-0">João Silva - Departamento de Marketing</p>
                      </div>
                      <span className="badge bg-primary rounded-pill">Hoje</span>
                    </div>
                    <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Auditório reservado</h6>
                        <p className="text-muted small mb-0">Maria Santos - Departamento de RH</p>
                      </div>
                      <span className="badge bg-primary rounded-pill">Hoje</span>
                    </div>
                    <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Cabo HDMI devolvido</h6>
                        <p className="text-muted small mb-0">Carlos Oliveira - Departamento de TI</p>
                      </div>
                      <span className="badge bg-secondary rounded-pill">Ontem</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;