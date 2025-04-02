import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, RefreshCw, Plus, Package, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Header from '../../components/sideBar';
import '../../styles/globalColors.css';

// Interface para os recursos
interface Recurso {
  id: number;
  nome: string;
  categoria: string;
  localizacao: string;
  status: 'disponivel' | 'em_uso' | 'manutencao';
  ultimoEmprestimo: string | null;
  proximaDisponibilidade: string | null;
  usuarioAtual: string | null;
  emprestimoId: number | null;
}

function RastreamentoRecursos() {
  const navigate = useNavigate();
  
  // Estados para filtros
  const [pesquisaRapida, setPesquisaRapida] = useState<string>('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');
  const [filtroStatus, setFiltroStatus] = useState<string>('');
  const [filtroLocalizacao, setFiltroLocalizacao] = useState<string>('');
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false);
  
  // Estados para dados e UI
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [itensPorPagina] = useState<number>(10);
  
  // Efeito para carregar dados (simulação)
  useEffect(() => {
    setCarregando(true);
    
    // Simulação de chamada à API
    const timeoutId = setTimeout(() => {
      // Dados mockados que seriam retornados pela API
      const dadosMock: Recurso[] = [
        {
          id: 1,
          nome: 'Projetor Laser',
          categoria: 'Equipamento',
          localizacao: 'Sala 101',
          status: 'em_uso',
          ultimoEmprestimo: '2024-05-10',
          proximaDisponibilidade: '2024-05-17',
          usuarioAtual: 'João Silva',
          emprestimoId: 1
        },
        {
          id: 2,
          nome: 'Auditório',
          categoria: 'Área',
          localizacao: 'Bloco B',
          status: 'em_uso',
          ultimoEmprestimo: '2024-05-15',
          proximaDisponibilidade: '2024-05-15',
          usuarioAtual: 'Maria Santos',
          emprestimoId: 2
        },
        {
          id: 3,
          nome: 'Cabo HDMI',
          categoria: 'Equipamento',
          localizacao: 'Almoxarifado',
          status: 'em_uso',
          ultimoEmprestimo: '2024-05-01',
          proximaDisponibilidade: '2024-05-08',
          usuarioAtual: 'Carlos Oliveira',
          emprestimoId: 3
        },
        {
          id: 4,
          nome: 'Notebook Dell',
          categoria: 'Equipamento',
          localizacao: 'Sala de TI',
          status: 'disponivel',
          ultimoEmprestimo: '2024-04-25',
          proximaDisponibilidade: null,
          usuarioAtual: null,
          emprestimoId: null
        },
        {
          id: 5,
          nome: 'Câmera',
          categoria: 'Equipamento',
          localizacao: 'Estúdio',
          status: 'manutencao',
          ultimoEmprestimo: '2024-05-05',
          proximaDisponibilidade: '2024-05-20',
          usuarioAtual: null,
          emprestimoId: null
        },
        {
          id: 6,
          nome: 'Sala de Reuniões',
          categoria: 'Área',
          localizacao: 'Bloco A',
          status: 'disponivel',
          ultimoEmprestimo: '2024-05-12',
          proximaDisponibilidade: null,
          usuarioAtual: null,
          emprestimoId: null
        },
        {
          id: 7,
          nome: 'Caixa de Som',
          categoria: 'Equipamento',
          localizacao: 'Almoxarifado',
          status: 'disponivel',
          ultimoEmprestimo: null,
          proximaDisponibilidade: null,
          usuarioAtual: null,
          emprestimoId: null
        }
      ];
      
      setRecursos(dadosMock);
      setCarregando(false);
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Função para filtrar recursos
  const filtrarRecursos = () => {
    return recursos.filter(recurso => {
      // Pesquisa rápida
      if (pesquisaRapida && !recurso.nome.toLowerCase().includes(pesquisaRapida.toLowerCase())) {
        return false;
      }
      
      // Filtro por categoria
      if (filtroCategoria && recurso.categoria !== filtroCategoria) {
        return false;
      }
      
      // Filtro por status
      if (filtroStatus && recurso.status !== filtroStatus) {
        return false;
      }
      
      // Filtro por localização
      if (filtroLocalizacao && !recurso.localizacao.toLowerCase().includes(filtroLocalizacao.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };
  
  // Função para renderizar o ícone de status
  const renderizarIconeStatus = (status: 'disponivel' | 'em_uso' | 'manutencao') => {
    switch (status) {
      case 'disponivel':
        return <CheckCircle size={18} className="text-success" />;
      case 'em_uso':
        return <Clock size={18} className="text-primary" />;
      case 'manutencao':
        return <AlertTriangle size={18} className="text-warning" />;
    }
  };
  
  // Função para renderizar o texto de status
  const renderizarTextoStatus = (status: 'disponivel' | 'em_uso' | 'manutencao') => {
    switch (status) {
      case 'disponivel':
        return 'Disponível';
      case 'em_uso':
        return 'Em Uso';
      case 'manutencao':
        return 'Em Manutenção';
    }
  };
  
  // Função para navegar para a página de registro de empréstimo
  const navegarParaRegistroEmprestimo = (recursoId?: number) => {
    if (recursoId) {
      navigate(`/registroEmprestimo?recursoId=${recursoId}`);
    } else {
      navigate('/registroEmprestimo');
    }
  };
  
  // Função para navegar para a página de registro de devolução
  const navegarParaRegistroDevolucao = (emprestimoId: number) => {
    navigate(`/registroDevolucao/${emprestimoId}`);
  };
  
  // Calcular recursos paginados
  const recursosFiltrados = filtrarRecursos();
  const totalPaginas = Math.ceil(recursosFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const recursosPaginados = recursosFiltrados.slice(indiceInicial, indiceInicial + itensPorPagina);
  
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
        <div className="card shadow">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h4 mb-0">RASTREAMENTO DE RECURSOS</h1>
              
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={() => navegarParaRegistroEmprestimo()}
                >
                  <Plus size={18} />
                  NOVO EMPRÉSTIMO
                </button>
                <button 
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                  onClick={() => {
                    setCarregando(true);
                    setTimeout(() => setCarregando(false), 500);
                  }}
                  disabled={carregando}
                >
                  <RefreshCw size={18} className={carregando ? "spin" : ""} />
                  ATUALIZAR
                </button>
              </div>
            </div>
            
            {/* Barra de pesquisa e filtros */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar por nome do recurso..."
                    value={pesquisaRapida}
                    onChange={(e) => setPesquisaRapida(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    <Search size={18} />
                  </button>
                </div>
              </div>
              
              <div className="col-md-6 d-flex justify-content-end">
                <button
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                >
                  <Filter size={18} />
                  FILTROS
                </button>
              </div>
            </div>
            
            {/* Painel de filtros */}
            {mostrarFiltros && (
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title h6 mb-3">Filtros</h5>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label small text-secondary">CATEGORIA</label>
                      <select
                        className="form-select"
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                      >
                        <option value="">Todas as categorias</option>
                        <option value="Equipamento">Equipamento</option>
                        <option value="Área">Área</option>
                        <option value="Material">Material</option>
                      </select>
                    </div>
                    
                    <div className="col-md-4">
                      <label className="form-label small text-secondary">STATUS</label>
                      <select
                        className="form-select"
                        value={filtroStatus}
                        onChange={(e) => setFiltroStatus(e.target.value)}
                      >
                        <option value="">Todos os status</option>
                        <option value="disponivel">Disponível</option>
                        <option value="em_uso">Em Uso</option>
                        <option value="manutencao">Em Manutenção</option>
                      </select>
                    </div>
                    
                    <div className="col-md-4">
                      <label className="form-label small text-secondary">LOCALIZAÇÃO</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Filtrar por localização"
                        value={filtroLocalizacao}
                        onChange={(e) => setFiltroLocalizacao(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setFiltroCategoria('');
                        setFiltroStatus('');
                        setFiltroLocalizacao('');
                      }}
                    >
                      LIMPAR
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => setMostrarFiltros(false)}
                    >
                      APLICAR FILTROS
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tabela de recursos */}
            {carregando ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mt-3">Carregando recursos...</p>
              </div>
            ) : recursosPaginados.length > 0 ? (
              <>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Localização</th>
                        <th scope="col">Status</th>
                        <th scope="col">Usuário Atual</th>
                        <th scope="col">Próxima Disponibilidade</th>
                        <th scope="col">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recursosPaginados.map(recurso => (
                        <tr key={recurso.id}>
                          <td>{recurso.id}</td>
                          <td>{recurso.nome}</td>
                          <td>{recurso.categoria}</td>
                          <td>{recurso.localizacao}</td>
                          <td>
                            <span className={`d-flex align-items-center gap-1 text-${
                              recurso.status === 'disponivel' ? 'success' : 
                              recurso.status === 'em_uso' ? 'primary' : 'warning'
                            }`}>
                              {renderizarIconeStatus(recurso.status)}
                              {renderizarTextoStatus(recurso.status)}
                            </span>
                          </td>
                          <td>{recurso.usuarioAtual || '-'}</td>
                          <td>{recurso.proximaDisponibilidade || 'Disponível agora'}</td>
                          <td>
                            {recurso.status === 'disponivel' ? (
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => navegarParaRegistroEmprestimo(recurso.id)}
                              >
                                Emprestar
                              </button>
                            ) : recurso.status === 'em_uso' && recurso.emprestimoId ? (
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => navegarParaRegistroDevolucao(recurso.emprestimoId!)}
                              >
                                Registrar Devolução
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                disabled
                              >
                                Indisponível
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Paginação */}
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <p className="text-muted mb-0">
                      Mostrando {indiceInicial + 1} a {Math.min(indiceInicial + itensPorPagina, recursosFiltrados.length)} de {recursosFiltrados.length} recursos
                    </p>
                  </div>
                  
                  <nav aria-label="Navegação de páginas">
                    <ul className="pagination mb-0">
                      <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setPaginaAtual(paginaAtual - 1)}
                          disabled={paginaAtual === 1}
                        >
                          Anterior
                        </button>
                      </li>
                      
                      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(pagina => (
                        <li key={pagina} className={`page-item ${pagina === paginaAtual ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setPaginaAtual(pagina)}
                          >
                            {pagina}
                          </button>
                        </li>
                      ))}
                      
                      <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setPaginaAtual(paginaAtual + 1)}
                          disabled={paginaAtual === totalPaginas}
                        >
                          Próximo
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            ) : (
              <div className="text-center py-5">
                <Package size={48} className="text-muted mb-3" />
                <p className="text-muted">Nenhum recurso encontrado com os filtros aplicados.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default RastreamentoRecursos;