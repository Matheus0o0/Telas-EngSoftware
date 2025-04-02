import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  User, 
  Package, 
  Tag,
  FileSpreadsheet,
  File,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Info,
  Plus,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/globalColors.css';
import Header from '../../components/sideBar';
import './styles.css';

// Interface para os registros de histórico
interface HistoricoRegistro {
  id: number;
  usuario: string;
  recurso: string;
  categoria: string;
  dataRetirada: string;
  horaRetirada: string;
  dataPrevista: string;
  dataDevolucao: string | null;
  status: 'em_uso' | 'devolvido' | 'atrasado';
}

function Historico() {
  const navigate = useNavigate();
  
  
  // Estados para filtros
  const [filtroUsuario, setFiltroUsuario] = useState<string>('');
  const [filtroRecurso, setFiltroRecurso] = useState<string>('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');
  const [filtroDataInicio, setFiltroDataInicio] = useState<string>('');
  const [filtroDataFim, setFiltroDataFim] = useState<string>('');
  const [filtroStatus, setFiltroStatus] = useState<string>('');
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false);
  const [pesquisaRapida, setPesquisaRapida] = useState<string>('');
  
  // Estado para paginação
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const itensPorPagina = 10;
  
  // Estado para indicar carregamento (simulação)
  const [carregando, setCarregando] = useState<boolean>(true);
  
  // Estado para mostrar mensagem de modo simulação
  const [mostrarInfoSimulacao, setMostrarInfoSimulacao] = useState<boolean>(true);
  
  // Dados de exemplo para o histórico (simulação de dados que viriam do backend)
  const [registros, setRegistros] = useState<HistoricoRegistro[]>([]);

  const navegarParaRegistroEmprestimo = () => {
    navigate('/registroEmprestimo');
  };
  
  // Função para navegar para a página de registro de devolução
  const navegarParaRegistroDevolucao = (id: number) => {
    navigate(`/registroDevolucao/${id}`);
  };
  // Simulação de chamada à API
  useEffect(() => {
    // Simulando um tempo de carregamento
    setCarregando(true);
    
    // Simulando uma chamada assíncrona para API
    const timeoutId = setTimeout(() => {
      // Dados mockados que seriam retornados pela API
      const dadosMock: HistoricoRegistro[] = [
        {
          id: 1,
          usuario: 'João Silva',
          recurso: 'Projetor Laser',
          categoria: 'Equipamento',
          dataRetirada: '2024-05-10',
          horaRetirada: '09:30',
          dataPrevista: '2024-05-17',
          dataDevolucao: '2024-05-12',
          status: 'devolvido'
        },
        {
          id: 2,
          usuario: 'Maria Santos',
          recurso: 'Auditório',
          categoria: 'Área',
          dataRetirada: '2024-05-15',
          horaRetirada: '14:00',
          dataPrevista: '2024-05-15',
          dataDevolucao: '2024-05-15',
          status: 'devolvido'
        },
        {
          id: 3,
          usuario: 'Carlos Oliveira',
          recurso: 'Cabo HDMI',
          categoria: 'Equipamento',
          dataRetirada: '2024-05-18',
          horaRetirada: '10:15',
          dataPrevista: '2024-05-25',
          dataDevolucao: null,
          status: 'em_uso'
        },
        {
          id: 4,
          usuario: 'Ana Pereira',
          recurso: 'Câmera',
          categoria: 'Equipamento',
          dataRetirada: '2024-05-05',
          horaRetirada: '08:45',
          dataPrevista: '2024-05-15',
          dataDevolucao: null,
          status: 'atrasado'
        },
        {
          id: 5,
          usuario: 'Roberto Almeida',
          recurso: 'Caixa de Som',
          categoria: 'Equipamento',
          dataRetirada: '2024-05-20',
          horaRetirada: '13:20',
          dataPrevista: '2024-05-27',
          dataDevolucao: null,
          status: 'em_uso'
        },
        {
          id: 6,
          usuario: 'Fernanda Lima',
          recurso: 'Notebook Dell',
          categoria: 'Equipamento',
          dataRetirada: '2024-04-25',
          horaRetirada: '09:00',
          dataPrevista: '2024-05-02',
          dataDevolucao: null,
          status: 'atrasado'
        },
        {
          id: 7,
          usuario: 'Pedro Costa',
          recurso: 'Sala de Reuniões',
          categoria: 'Área',
          dataRetirada: '2024-05-22',
          horaRetirada: '15:30',
          dataPrevista: '2024-05-22',
          dataDevolucao: '2024-05-22',
          status: 'devolvido'
        }
      ];
      
      setRegistros(dadosMock);
      setCarregando(false);
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Simulação de busca na API com os filtros aplicados
  const buscarDadosFiltrados = () => {
    setCarregando(true);
    
    // Simulando uma chamada assíncrona para API com os filtros
    setTimeout(() => {
      setCarregando(false);
      // Aqui seria feita uma chamada real para a API com os filtros
      // Por enquanto, apenas escondemos o painel de filtros
      setMostrarFiltros(false);
    }, 500);
  };

  // Lista de categorias disponíveis (simulação de dados que viriam do backend)
  const categorias = ['Equipamento', 'Material', 'Área', 'Outros'];
  
  // Lista de status disponíveis
  const statusOptions = [
    { value: 'em_uso', label: 'Em Uso' },
    { value: 'devolvido', label: 'Devolvido' },
    { value: 'atrasado', label: 'Atrasado' }
  ];

  // Função para filtrar os registros (simulação de filtro que seria feito no backend)
  const filtrarRegistros = () => {
    return registros.filter(registro => {
      // Filtro por usuário
      if (filtroUsuario && !registro.usuario.toLowerCase().includes(filtroUsuario.toLowerCase())) {
        return false;
      }
      
      // Filtro por recurso
      if (filtroRecurso && !registro.recurso.toLowerCase().includes(filtroRecurso.toLowerCase())) {
        return false;
      }
      
      // Filtro por categoria
      if (filtroCategoria && registro.categoria !== filtroCategoria) {
        return false;
      }
      
      // Filtro por data de início
      if (filtroDataInicio && new Date(registro.dataRetirada) < new Date(filtroDataInicio)) {
        return false;
      }
      
      // Filtro por data de fim
      if (filtroDataFim && new Date(registro.dataRetirada) > new Date(filtroDataFim)) {
        return false;
      }
      
      // Filtro por status
      if (filtroStatus && registro.status !== filtroStatus) {
        return false;
      }
      
      return true;
    });
  };

  // Registros filtrados
  const registrosFiltrados = filtrarRegistros();
  
  // Cálculo para paginação
  const totalPaginas = Math.ceil(registrosFiltrados.length / itensPorPagina);
  const registrosPaginados = registrosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  // Função para limpar todos os filtros
  const limparFiltros = () => {
    setFiltroUsuario('');
    setFiltroRecurso('');
    setFiltroCategoria('');
    setFiltroDataInicio('');
    setFiltroDataFim('');
    setFiltroStatus('');
  };

  // Função para exportar os dados (simulação)
  const exportarDados = (formato: 'csv' | 'pdf' | 'excel') => {
    // Simulação de exportação
    setCarregando(true);
    
    setTimeout(() => {
      setCarregando(false);
      console.log(`Simulação: Exportando dados em formato ${formato}`);
      alert(`Simulação: Os dados foram exportados em formato ${formato}. Em uma implementação real, isso seria processado pelo backend.`);
    }, 1000);
  };

  // Função para renderizar o ícone de status
  const renderizarIconeStatus = (status: 'em_uso' | 'devolvido' | 'atrasado') => {
    switch (status) {
      case 'em_uso':
        return <Clock size={18} className="text-primary" />;
      case 'devolvido':
        return <CheckCircle size={18} className="text-success" />;
      case 'atrasado':
        return <AlertTriangle size={18} className="text-danger" />;
    }
  };

  // Função para renderizar o texto de status
  const renderizarTextoStatus = (status: 'em_uso' | 'devolvido' | 'atrasado') => {
    switch (status) {
      case 'em_uso':
        return 'Em Uso';
      case 'devolvido':
        return 'Devolvido';
      case 'atrasado':
        return 'Atrasado';
    }
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
          {/* Alerta de modo simulação */}
          {mostrarInfoSimulacao && (
            <div className="alert alert-info alert-dismissible fade show mb-4 d-flex align-items-center" role="alert">
              <Info size={20} className="me-2" />
              <div>
                <strong>Modo de Simulação:</strong> Esta é uma versão de demonstração com dados fictícios. 
                Em produção, os dados serão carregados do backend.
              </div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setMostrarInfoSimulacao(false)}
                aria-label="Fechar"
              ></button>
            </div>
          )}
          
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h4 mb-0">HISTÓRICO DE RECURSOS</h1>
                
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-outline-primary d-flex align-items-center gap-2"
                    onClick={() => navigate('/RastreamentoRecursos')}
                  >
                    <RefreshCw size={18} />
                    RASTREAMENTO ATUAL
                  </button>
                  
                  <button 
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={navegarParaRegistroEmprestimo}
                  >
                    <Plus size={18} />
                    NOVO EMPRÉSTIMO
                  </button>
                </div>
              </div>
              
              <p className="text-muted mb-4">
                Visualize o histórico completo de todos os empréstimos de recursos. Para verificar apenas os recursos em uso atualmente, acesse a página de Rastreamento.
              </p>
              
              {/* Barra de pesquisa e botões */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2 flex-grow-1">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pesquisar por usuário, recurso ou usuário..."
                      value={filtroRecurso || filtroUsuario}
                      onChange={(e) => {
                        // Decide se é pesquisa por recurso ou usuário
                        if (e.target.value.includes('@')) {
                          setFiltroUsuario(e.target.value);
                          setFiltroRecurso('');
                        } else {
                          setFiltroRecurso(e.target.value);
                          setFiltroUsuario('');
                        }
                      }}
                    />
                  </div>
                  <button 
                    className="btn btn-outline-secondary d-flex align-items-center gap-1"
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  >
                    <Filter size={18} />
                    Filtros
                  </button>
                </div>
                
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-1" 
                    type="button" 
                    id="exportarDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <Download size={18} />
                    Exportar
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="exportarDropdown">
                    <li>
                      <button 
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={() => exportarDados('csv')}
                      >
                        <FileText size={16} />
                        CSV
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={() => exportarDados('pdf')}
                      >
                        <File size={16} />
                        PDF
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={() => exportarDados('excel')}
                      >
                        <FileSpreadsheet size={16} />
                        Excel
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Painel de filtros avançados */}
              {mostrarFiltros && (
                <div className="card mb-4 bg-light">
                  <div className="card-body">
                    <h6 className="card-title mb-3">Filtros Avançados</h6>
                    <div className="row g-3">
                      <div className="col-md-6 col-lg-3">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <User size={16} />
                          <label className="form-label small text-secondary mb-0">USUÁRIO</label>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Nome do usuário"
                          value={filtroUsuario}
                          onChange={(e) => setFiltroUsuario(e.target.value)}
                        />
                      </div>
                      
                      <div className="col-md-6 col-lg-3">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <Package size={16} />
                          <label className="form-label small text-secondary mb-0">RECURSO</label>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Nome do recurso"
                          value={filtroRecurso}
                          onChange={(e) => setFiltroRecurso(e.target.value)}
                        />
                      </div>
                      
                      <div className="col-md-6 col-lg-3">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <Tag size={16} />
                          <label className="form-label small text-secondary mb-0">CATEGORIA</label>
                        </div>
                        <select
                          className="form-select form-select-sm"
                          value={filtroCategoria}
                          onChange={(e) => setFiltroCategoria(e.target.value)}
                        >
                          <option value="">Todas as categorias</option>
                          {categorias.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-md-6 col-lg-3">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <Clock size={16} />
                          <label className="form-label small text-secondary mb-0">STATUS</label>
                        </div>
                        <select
                          className="form-select form-select-sm"
                          value={filtroStatus}
                          onChange={(e) => setFiltroStatus(e.target.value)}
                        >
                          <option value="">Todos os status</option>
                          {statusOptions.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <Calendar size={16} />
                          <label className="form-label small text-secondary mb-0">PERÍODO</label>
                        </div>
                        <div className="row g-2">
                          <div className="col-6">
                            <input
                              type="date"
                              className="form-control form-control-sm"
                              placeholder="Data inicial"
                              value={filtroDataInicio}
                              onChange={(e) => setFiltroDataInicio(e.target.value)}
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="date"
                              className="form-control form-control-sm"
                              placeholder="Data final"
                              value={filtroDataFim}
                              onChange={(e) => setFiltroDataFim(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 d-flex align-items-end">
                        <button 
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={limparFiltros}
                        >
                          Limpar Filtros
                        </button>
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={buscarDadosFiltrados}
                        >
                          Aplicar Filtros
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Indicador de carregamento */}
              {carregando ? (
                <div className="d-flex justify-content-center my-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  Nenhum registro encontrado com os filtros aplicados.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Historico;
