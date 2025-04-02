import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, User, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/globalColors.css';
import Header from '../../components/sideBar';

// Interface para os recursos disponíveis
interface Recurso {
  id: number;
  nome: string;
  categoria: string;
  quantidadeTotal: number;
  quantidadeEmUso: number;
}

// Interface para os usuários
interface Usuario {
  id: number;
  nome: string;
  email: string;
  departamento: string;
}

function RegistroEmprestimo() {
  const navigate = useNavigate();
  
  // Estados para o formulário
  const [usuarioId, setUsuarioId] = useState<number | ''>('');
  const [recursoId, setRecursoId] = useState<number | ''>('');
  const [dataRetirada, setDataRetirada] = useState<string>(new Date().toISOString().split('T')[0]);
  const [horaRetirada, setHoraRetirada] = useState<string>(
    new Date().toTimeString().split(' ')[0].substring(0, 5)
  );
  const [dataPrevista, setDataPrevista] = useState<string>('');
  const [observacoes, setObservacoes] = useState<string>('');
  
  // Estados para dados carregados
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  
  // Efeito para carregar dados (simulação)
  useEffect(() => {
    // Simulando carregamento de dados
    setCarregando(true);
    
    // Simulação de chamada à API para buscar recursos
    setTimeout(() => {
      // Dados mockados que seriam retornados pela API
      const recursosMock: Recurso[] = [
        { id: 1, nome: 'Auditório', categoria: 'Área', quantidadeTotal: 1, quantidadeEmUso: 0 },
        { id: 2, nome: 'Projetor Laser', categoria: 'Equipamento', quantidadeTotal: 10, quantidadeEmUso: 2 },
        { id: 3, nome: 'Cabo HDMI', categoria: 'Equipamento', quantidadeTotal: 22, quantidadeEmUso: 3 },
        { id: 4, nome: 'Câmera', categoria: 'Equipamento', quantidadeTotal: 3, quantidadeEmUso: 0 },
        { id: 5, nome: 'Caixa de Som', categoria: 'Equipamento', quantidadeTotal: 6, quantidadeEmUso: 1 },
      ];
      
      const usuariosMock: Usuario[] = [
        { id: 1, nome: 'João Silva', email: 'joao.silva@email.com', departamento: 'TI' },
        { id: 2, nome: 'Maria Santos', email: 'maria.santos@email.com', departamento: 'Marketing' },
        { id: 3, nome: 'Carlos Oliveira', email: 'carlos.oliveira@email.com', departamento: 'Administração' },
        { id: 4, nome: 'Ana Pereira', email: 'ana.pereira@email.com', departamento: 'RH' },
        { id: 5, nome: 'Roberto Almeida', email: 'roberto.almeida@email.com', departamento: 'Financeiro' },
      ];
      
      setRecursos(recursosMock);
      setUsuarios(usuariosMock);
      setCarregando(false);
    }, 1000);
  }, []);
  
  // Função para validar a data
  const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Formato esperado: YYYY-MM-DD
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };
  
  // Função para calcular a data prevista padrão (7 dias após a retirada)
  const calcularDataPrevistaPadrao = () => {
    if (!dataRetirada) return '';
    
    const data = new Date(dataRetirada);
    data.setDate(data.getDate() + 7); // Adiciona 7 dias
    return data.toISOString().split('T')[0];
  };
  
  // Efeito para atualizar a data prevista quando a data de retirada mudar
  useEffect(() => {
    if (dataRetirada && !dataPrevista) {
      setDataPrevista(calcularDataPrevistaPadrao());
    }
  }, [dataRetirada]);
  
  // Função para registrar o empréstimo
  const registrarEmprestimo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usuarioId || !recursoId || !dataRetirada || !horaRetirada || !dataPrevista) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    
    // Dados do empréstimo que seriam enviados para a API
    const dadosEmprestimo = {
      usuarioId,
      recursoId,
      dataRetirada,
      horaRetirada,
      dataPrevista,
      observacoes,
      status: 'em_uso'
    };
    
    console.log('Registrando empréstimo:', dadosEmprestimo);
    
    // Simulação de envio para a API
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      alert('Empréstimo registrado com sucesso!');
      navigate('/historico');
    }, 1000);
  };
  
  // Função para voltar à página anterior
  const voltar = () => {
    navigate(-1);
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
        <div className="card shadow">
          <div className="card-body">
            {/* Cabeçalho com botão de voltar e título */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <button className="btn btn-link p-0 text-dark" onClick={voltar}>
                <ArrowLeft size={24} />
              </button>
              <h1 className="h4 mb-0">REGISTRO DE EMPRÉSTIMO</h1>
            </div>
            
            {carregando ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mt-3">Carregando dados...</p>
              </div>
            ) : (
              <form onSubmit={registrarEmprestimo}>
                <div className="row g-4">
                  {/* Usuário */}
                  <div className="col-md-6">
                    <label className="form-label small text-secondary d-flex align-items-center">
                      <User size={16} className="me-2" />
                      USUÁRIO
                    </label>
                    <select
                      className="form-select"
                      value={usuarioId}
                      onChange={(e) => setUsuarioId(e.target.value ? Number(e.target.value) : '')}
                      required
                    >
                      <option value="">Selecione um usuário</option>
                      {usuarios.map(usuario => (
                        <option key={usuario.id} value={usuario.id}>
                          {usuario.nome} ({usuario.departamento})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Recurso */}
                  <div className="col-md-6">
                    <label className="form-label small text-secondary d-flex align-items-center">
                      <Package size={16} className="me-2" />
                      RECURSO
                    </label>
                    <select
                      className="form-select"
                      value={recursoId}
                      onChange={(e) => setRecursoId(e.target.value ? Number(e.target.value) : '')}
                      required
                    >
                      <option value="">Selecione um recurso</option>
                      {recursos.map(recurso => (
                        <option 
                          key={recurso.id} 
                          value={recurso.id}
                          disabled={recurso.quantidadeEmUso >= recurso.quantidadeTotal}
                        >
                          {recurso.nome} ({recurso.categoria}) - 
                          {recurso.quantidadeEmUso >= recurso.quantidadeTotal 
                            ? 'Indisponível' 
                            : `${recurso.quantidadeTotal - recurso.quantidadeEmUso} disponíveis`}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Data e Hora de Retirada */}
                  <div className="col-md-6">
                    <div className="row g-3">
                      <div className="col-7">
                        <label className="form-label small text-secondary d-flex align-items-center">
                          <Calendar size={16} className="me-2" />
                          DATA DE RETIRADA
                        </label>
                        <input
                          type="date"
                          value={dataRetirada}
                          onChange={(e) => {
                            const selectedDate = e.target.value;
                            if (isValidDate(selectedDate)) {
                              setDataRetirada(selectedDate);
                            } else {
                              alert('Data inválida!');
                            }
                          }}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-5">
                        <label className="form-label small text-secondary d-flex align-items-center">
                          <Clock size={16} className="me-2" />
                          HORA
                        </label>
                        <input
                          type="time"
                          value={horaRetirada}
                          onChange={(e) => setHoraRetirada(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Data Prevista de Devolução */}
                  <div className="col-md-6">
                    <label className="form-label small text-secondary d-flex align-items-center">
                      <Calendar size={16} className="me-2" />
                      DATA PREVISTA DE DEVOLUÇÃO
                    </label>
                    <input
                      type="date"
                      value={dataPrevista}
                      onChange={(e) => {
                        const selectedDate = e.target.value;
                        if (isValidDate(selectedDate)) {
                          setDataPrevista(selectedDate);
                        } else {
                          alert('Data inválida!');
                        }
                      }}
                      className="form-control"
                      required
                    />
                  </div>
                  
                  {/* Observações */}
                  <div className="col-12">
                    <label className="form-label small text-secondary">OBSERVAÇÕES</label>
                    <textarea
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      className="form-control"
                      rows={3}
                      placeholder="Observações adicionais sobre o empréstimo..."
                    />
                  </div>
                  
                  {/* Botões */}
                  <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={voltar}
                    >
                      CANCELAR
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={carregando}
                    >
                      {carregando ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          PROCESSANDO...
                        </>
                      ) : 'REGISTRAR EMPRÉSTIMO'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistroEmprestimo;