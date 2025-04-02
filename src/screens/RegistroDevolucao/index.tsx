import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/globalColors.css';
import Header from '../../components/sideBar';

// Interface para os empréstimos
interface Emprestimo {
  id: number;
  usuario: string;
  usuarioId: number;
  recurso: string;
  recursoId: number;
  categoria: string;
  dataRetirada: string;
  horaRetirada: string;
  dataPrevista: string;
  status: 'em_uso' | 'devolvido' | 'atrasado';
}

function RegistroDevolucao() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const emprestimoId = id ? parseInt(id) : 0;
  
  // Estados para o formulário
  const [dataDevolucao, setDataDevolucao] = useState<string>(new Date().toISOString().split('T')[0]);
  const [horaDevolucao, setHoraDevolucao] = useState<string>(
    new Date().toTimeString().split(' ')[0].substring(0, 5)
  );
  const [observacoes, setObservacoes] = useState<string>('');
  const [condicao, setCondicao] = useState<string>('bom');
  
  // Estado para o empréstimo atual
  const [emprestimo, setEmprestimo] = useState<Emprestimo | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [estaAtrasado, setEstaAtrasado] = useState<boolean>(false);
  
  // Efeito para carregar dados do empréstimo (simulação)
  useEffect(() => {
    if (!emprestimoId) {
      // Instead of immediately navigating away, show a message or a selection interface
      setCarregando(false);
      return;
    }
    
    setCarregando(true);
    
    // Simulação de chamada à API para buscar o empréstimo pelo ID
    setTimeout(() => {
      // Dados mockados que seriam retornados pela API
      const emprestimosSimulados: Emprestimo[] = [
        {
          id: 1,
          usuario: 'João Silva',
          usuarioId: 1,
          recurso: 'Projetor Laser',
          recursoId: 2,
          categoria: 'Equipamento',
          dataRetirada: '2024-05-10',
          horaRetirada: '09:30',
          dataPrevista: '2024-05-17',
          status: 'em_uso'
        },
        {
          id: 2,
          usuario: 'Maria Santos',
          usuarioId: 2,
          recurso: 'Auditório',
          recursoId: 1,
          categoria: 'Área',
          dataRetirada: '2024-05-15',
          horaRetirada: '14:00',
          dataPrevista: '2024-05-15',
          status: 'em_uso'
        },
        {
          id: 3,
          usuario: 'Carlos Oliveira',
          usuarioId: 3,
          recurso: 'Cabo HDMI',
          recursoId: 3,
          categoria: 'Equipamento',
          dataRetirada: '2024-05-01',
          horaRetirada: '10:15',
          dataPrevista: '2024-05-08',
          status: 'atrasado'
        }
      ];
      
      const emprestimoEncontrado = emprestimosSimulados.find(e => e.id === emprestimoId);
      
      if (emprestimoEncontrado) {
        setEmprestimo(emprestimoEncontrado);
        
        // Verificar se está atrasado
        const hoje = new Date();
        const dataPrevista = new Date(emprestimoEncontrado.dataPrevista);
        setEstaAtrasado(hoje > dataPrevista);
      } else {
        alert('Empréstimo não encontrado!');
        navigate('/historico');
      }
      
      setCarregando(false);
    }, 1000);
  }, [emprestimoId, navigate]);
  
  // Função para validar a data
  const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Formato esperado: YYYY-MM-DD
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };
  
  // Função para registrar a devolução
  const registrarDevolucao = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dataDevolucao || !horaDevolucao || !condicao) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    
    // Dados da devolução que seriam enviados para a API
    const dadosDevolucao = {
      emprestimoId,
      dataDevolucao,
      horaDevolucao,
      condicao,
      observacoes,
      status: estaAtrasado ? 'atrasado' : 'devolvido'
    };
    
    console.log('Registrando devolução:', dadosDevolucao);
    
    // Simulação de envio para a API
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      alert('Devolução registrada com sucesso!');
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
              <h1 className="h4 mb-0">REGISTRO DE DEVOLUÇÃO</h1>
            </div>
            
            {carregando ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mt-3">Carregando dados...</p>
              </div>
            ) : !emprestimoId ? (
              <div className="text-center py-5">
                <div className="alert alert-warning">
                  <h5>ID do empréstimo não fornecido</h5>
                  <p>Para registrar uma devolução, selecione um empréstimo na página de histórico.</p>
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/historico')}
                  >
                    Ir para Histórico
                  </button>
                </div>
              </div>
            ) : emprestimo ? (
              <>
                {/* Informações do empréstimo */}
                <div className="bg-light p-3 rounded mb-4">
                  <h5 className="mb-3">Informações do Empréstimo</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Usuário:</strong> {emprestimo.usuario}</p>
                      <p className="mb-1"><strong>Recurso:</strong> {emprestimo.recurso}</p>
                      <p className="mb-1"><strong>Categoria:</strong> {emprestimo.categoria}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Data de Retirada:</strong> {emprestimo.dataRetirada}</p>
                      <p className="mb-1"><strong>Hora de Retirada:</strong> {emprestimo.horaRetirada}</p>
                      <p className="mb-1">
                        <strong>Data Prevista:</strong> {emprestimo.dataPrevista}
                        {estaAtrasado && (
                          <span className="badge bg-danger ms-2">Atrasado</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={registrarDevolucao}>
                  <div className="row g-4">
                    {/* Data e Hora de Devolução */}
                    <div className="col-md-6">
                      <div className="row g-3">
                        <div className="col-7">
                          <label className="form-label small text-secondary d-flex align-items-center">
                            <Calendar size={16} className="me-2" />
                            DATA DE DEVOLUÇÃO
                          </label>
                          <input
                            type="date"
                            value={dataDevolucao}
                            onChange={(e) => {
                              const selectedDate = e.target.value;
                              if (isValidDate(selectedDate)) {
                                setDataDevolucao(selectedDate);
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
                            value={horaDevolucao}
                            onChange={(e) => setHoraDevolucao(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Condição do Recurso */}
                    <div className="col-md-6">
                      <label className="form-label small text-secondary">CONDIÇÃO DO RECURSO</label>
                      <select
                        className="form-select"
                        value={condicao}
                        onChange={(e) => setCondicao(e.target.value)}
                        required
                      >
                        <option value="bom">Bom estado</option>
                        <option value="regular">Estado regular</option>
                        <option value="danificado">Danificado</option>
                      </select>
                    </div>
                    
                    {/* Observações */}
                    <div className="col-12">
                      <label className="form-label small text-secondary">OBSERVAÇÕES</label>
                      <textarea
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        className="form-control"
                        rows={3}
                        placeholder="Observações adicionais sobre a devolução..."
                      />
                    </div>
                    
                    {/* Alerta de atraso */}
                    {estaAtrasado && (
                      <div className="col-12">
                        <div className="alert alert-warning d-flex align-items-center" role="alert">
                          <AlertTriangle size={20} className="me-2" />
                          <div>
                            Este recurso está sendo devolvido com atraso. Verifique as políticas de uso para possíveis penalidades.
                          </div>
                        </div>
                      </div>
                    )}
                    
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
                        ) : (
                          <>
                            <CheckCircle size={18} className="me-2" />
                            REGISTRAR DEVOLUÇÃO
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div className="alert alert-danger">
                Empréstimo não encontrado!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistroDevolucao;