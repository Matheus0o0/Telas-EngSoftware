import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Filter, Calendar, Package, User, FileText, ChevronDown, ChevronUp, Search, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/globalColors.css';
import Header from '../../components/sideBar';
import './styles.css';

// Definindo a interface para os dados do relatório
interface Relatorio {
  id: number;
  usuario: string;
  recurso: string;
  categoria: string;
  tipoAcao: string;
  data: string;
  horario: string;
  dataPrevista: string;
  dataDevolucao: string;
  tempoAtraso: string;
  status: 'em_uso' | 'devolvido' | 'atrasado';
}

function App() {
  const navigate = useNavigate();
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [filteredRelatorios, setFilteredRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  
  const [usuario, setUsuario] = useState<string>('');
  const [recurso, setRecurso] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [tipoAcao, setTipoAcao] = useState<string>('');
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

 
  useEffect(() => {
    
    setLoading(true);
    
    setTimeout(() => {
      const dadosSimulados: Relatorio[] = [
        {
          id: 1,
          usuario: 'João Silva',
          recurso: 'Projetor Laser',
          categoria: 'EQUIPAMENTO',
          tipoAcao: 'Empréstimo',
          data: '2024-05-10',
          horario: '09:30',
          dataPrevista: '2024-05-17',
          dataDevolucao: '2024-05-15',
          tempoAtraso: '0 dias',
          status: 'devolvido'
        },
        {
          id: 2,
          usuario: 'Maria Santos',
          recurso: 'Auditório',
          categoria: 'SALA',
          tipoAcao: 'Reserva',
          data: '2024-05-15',
          horario: '14:00',
          dataPrevista: '2024-05-15',
          dataDevolucao: '2024-05-15',
          tempoAtraso: '0 dias',
          status: 'devolvido'
        },
        {
          id: 3,
          usuario: 'Carlos Oliveira',
          recurso: 'Notebook Dell',
          categoria: 'EQUIPAMENTO',
          tipoAcao: 'Empréstimo',
          data: '2024-05-01',
          horario: '10:15',
          dataPrevista: '2024-05-08',
          dataDevolucao: '',
          tempoAtraso: '7 dias',
          status: 'atrasado'
        },
        {
          id: 4,
          usuario: 'Ana Pereira',
          recurso: 'Sala de Reuniões 101',
          categoria: 'SALA',
          tipoAcao: 'Reserva',
          data: '2024-05-20',
          horario: '13:00',
          dataPrevista: '2024-05-20',
          dataDevolucao: '',
          tempoAtraso: '0 dias',
          status: 'em_uso'
        },
        {
          id: 5,
          usuario: 'Roberto Almeida',
          recurso: 'Câmera DSLR',
          categoria: 'EQUIPAMENTO',
          tipoAcao: 'Empréstimo',
          data: '2024-05-12',
          horario: '11:30',
          dataPrevista: '2024-05-19',
          dataDevolucao: '',
          tempoAtraso: '0 dias',
          status: 'em_uso'
        }
      ];
      
      setRelatorios(dadosSimulados);
      setFilteredRelatorios(dadosSimulados);
      setLoading(false);
    }, 1000);
  }, []);

  

  // Função para limpar filtros
  const limparFiltros = () => {
    setUsuario('');
    setRecurso('');
    setCategoria('');
    setTipoAcao('');
    setDataInicio('');
    setDataFim('');
    setStatus('');
    setFilteredRelatorios(relatorios);
  };

  // Função para pesquisa rápida
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      aplicarFiltros();
      return;
    }
    
    const searchResults = relatorios.filter(item => 
      item.usuario.toLowerCase().includes(query.toLowerCase()) ||
      item.recurso.toLowerCase().includes(query.toLowerCase()) ||
      item.categoria.toLowerCase().includes(query.toLowerCase()) ||
      item.tipoAcao.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredRelatorios(searchResults);
  };

  // Função para validar a data
  const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };

  // Função para imprimir o relatório
  const handlePrint = () => {
    window.print();
  };

  // Função para renderizar o status com ícone
  const renderStatus = (status: 'em_uso' | 'devolvido' | 'atrasado') => {
    switch (status) {
      case 'devolvido':
        return <span className="badge bg-success">Devolvido</span>;
      case 'em_uso':
        return <span className="badge bg-primary">Em Uso</span>;
      case 'atrasado':
        return <span className="badge bg-danger">Atrasado</span>;
      default:
        return null;
    }
  };

  // Função para voltar à página anterior
  const handleVoltar = () => {
    navigate(-1);
  };

  // Calcular estatísticas para o resumo
  const emUsoCount = filteredRelatorios.filter(item => item.status === 'em_uso').length;
  const devolvidosCount = filteredRelatorios.filter(item => item.status === 'devolvido').length;
  const atrasadosCount = filteredRelatorios.filter(item => item.status === 'atrasado').length;
  const totalCount = filteredRelatorios.length;

  // Calcular porcentagens para o gráfico visual
  const emUsoPct = totalCount > 0 ? (emUsoCount / totalCount) * 100 : 0;
  const devolvidosPct = totalCount > 0 ? (devolvidosCount / totalCount) * 100 : 0;
  const atrasadosPct = totalCount > 0 ? (atrasadosCount / totalCount) * 100 : 0;

  return (
    <div className="app-container">
      <Header />
      <main
        className="app-content"
        style={{
          marginLeft: '250px',
          marginTop: '60px',
          minHeight: 'calc(100vh - 60px)',
          padding: '2rem',
          position: 'relative',
          flex: 1,
          paddingBottom: '80px'
        }}
      >
        <div className="card shadow">
          <div className="card-body">
            {/* Cabeçalho com botão de voltar e título */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center gap-3">
                <button className="btn btn-link p-0 text-dark" onClick={handleVoltar}>
                  <ArrowLeft size={24} />
                </button>
                <h1 className="h4 mb-0">RELATÓRIO DE RECURSOS</h1>
              </div>
              <button
                className="btn btn-primary d-flex align-items-center gap-2"
                onClick={handlePrint}
              >
                <Printer size={18} />
                Imprimir
              </button>
            </div>

            {/* Barra de pesquisa e filtros */}
            <div className="mb-4">
              <div className="d-flex gap-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar por usuário, recurso, categoria..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <button
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} />
                  Filtros
                  {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Filtros avançados - mantido igual */}
              {showFilters && (
                <div className="card mb-3">
                  {/* Conteúdo dos filtros permanece igual */}
                </div>
              )}
            </div>

            {/* Resumo do relatório - MELHORADO */}
            {!loading && filteredRelatorios.length > 0 && (
              <div className="report-summary mb-4">
                <div className="summary-header">
                  <h5 className="mb-0 d-flex align-items-center">
                    <BarChart size={20} className="me-2" />
                    Resumo do Relatório
                  </h5>
                  <span className="total-count">{totalCount} registros encontrados</span>
                </div>
                
                <div className="summary-content">
                  <div className="summary-stats">
                    <div className="stat-item">
                      <div className="stat-value">{emUsoCount}</div>
                      <div className="stat-label">Em Uso</div>
                      <div className="stat-percent">{emUsoPct.toFixed(1)}%</div>
                    </div>
                    
                    <div className="stat-item">
                      <div className="stat-value">{devolvidosCount}</div>
                      <div className="stat-label">Devolvidos</div>
                      <div className="stat-percent">{devolvidosPct.toFixed(1)}%</div>
                    </div>
                    
                    <div className="stat-item">
                      <div className="stat-value">{atrasadosCount}</div>
                      <div className="stat-label">Atrasados</div>
                      <div className="stat-percent">{atrasadosPct.toFixed(1)}%</div>
                    </div>
                  </div>
                  
                  <div className="summary-chart">
                    <div className="chart-bar">
                      {emUsoPct > 0 && (
                        <div 
                          className="chart-segment chart-em-uso" 
                          style={{width: `${emUsoPct}%`}}
                          title={`Em Uso: ${emUsoCount} (${emUsoPct.toFixed(1)}%)`}
                        ></div>
                      )}
                      {devolvidosPct > 0 && (
                        <div 
                          className="chart-segment chart-devolvido" 
                          style={{width: `${devolvidosPct}%`}}
                          title={`Devolvidos: ${devolvidosCount} (${devolvidosPct.toFixed(1)}%)`}
                        ></div>
                      )}
                      {atrasadosPct > 0 && (
                        <div 
                          className="chart-segment chart-atrasado" 
                          style={{width: `${atrasadosPct}%`}}
                          title={`Atrasados: ${atrasadosCount} (${atrasadosPct.toFixed(1)}%)`}
                        ></div>
                      )}
                    </div>
                    <div className="chart-legend">
                      <div className="legend-item">
                        <span className="legend-color legend-em-uso"></span>
                        <span className="legend-text">Em Uso</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color legend-devolvido"></span>
                        <span className="legend-text">Devolvidos</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color legend-atrasado"></span>
                        <span className="legend-text">Atrasados</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabela de resultados */}
            <div className="table-responsive">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                  <p className="mt-2">Carregando dados do relatório...</p>
                </div>
              ) : filteredRelatorios.length === 0 ? (
                <div className="text-center py-5">
                  <FileText size={48} className="text-muted mb-3" />
                  <h5>Nenhum resultado encontrado</h5>
                  <p className="text-muted">
                    Tente ajustar os filtros ou realizar uma nova pesquisa.
                  </p>
                </div>
              ) : (
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Usuário</th>
                      <th>Recurso</th>
                      <th>Categoria</th>
                      <th>Tipo</th>
                      <th>Data</th>
                      <th>Horário</th>
                      <th>Data Prevista</th>
                      <th>Data Devolução</th>
                      <th>Atraso</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRelatorios.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.usuario}</td>
                        <td>{item.recurso}</td>
                        <td>{item.categoria}</td>
                        <td>{item.tipoAcao}</td>
                        <td>{item.data}</td>
                        <td>{item.horario}</td>
                        <td>{item.dataPrevista}</td>
                        <td>{item.dataDevolucao || '-'}</td>
                        <td>{item.tempoAtraso}</td>
                        <td>{renderStatus(item.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
