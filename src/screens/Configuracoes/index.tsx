import React, { useState } from 'react';
import { Save, AlertTriangle, Lock, Clock, Mail, Bell } from 'lucide-react';
import '../../styles/globalColors.css';
import Header from '../../components/sideBar';
import './styles.css';

function Configuracoes() {
  // Estados para os campos de configuração
  const [prazoDevolucao, setPrazoDevolucao] = useState<number>(7);
  const [alertaEmail, setAlertaEmail] = useState<boolean>(true);
  const [alertaNotificacao, setAlertaNotificacao] = useState<boolean>(true);
  const [diasAlertaAntecipado, setDiasAlertaAntecipado] = useState<number>(1);
  
  // Configurações de segurança
  const [tamanhoMinSenha, setTamanhoMinSenha] = useState<number>(8);
  const [exigirCaracteresEspeciais, setExigirCaracteresEspeciais] = useState<boolean>(true);
  const [exigirNumeros, setExigirNumeros] = useState<boolean>(true);
  const [exigirMaiusculas, setExigirMaiusculas] = useState<boolean>(true);
  const [tempoSessaoAtiva, setTempoSessaoAtiva] = useState<number>(30);

  // Função para salvar as configurações
  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Configurações salvas:', {
      prazoDevolucao,
      alertaEmail,
      alertaNotificacao,
      diasAlertaAntecipado,
      tamanhoMinSenha,
      exigirCaracteresEspeciais,
      exigirNumeros,
      exigirMaiusculas,
      tempoSessaoAtiva
    });
    alert('Configurações salvas com sucesso!');
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
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="h4 mb-4">CONFIGURAÇÕES DO SISTEMA</h1>
                  
                  <form onSubmit={handleSalvar}>
                    {/* Seção de Prazos e Alertas */}
                    <div className="config-section">
                      <h2 className="h5 mb-3 d-flex align-items-center">
                        <Clock size={20} className="me-2 text-primary" />
                        Prazos e Alertas
                      </h2>
                      
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <label className="form-label small text-secondary">PRAZO PADRÃO PARA DEVOLUÇÃO (DIAS)</label>
                          <input
                            type="number"
                            min="1"
                            value={prazoDevolucao}
                            onChange={(e) => setPrazoDevolucao(parseInt(e.target.value))}
                            className="form-control"
                            required
                          />
                          <small className="text-muted">Prazo padrão em dias para devolução de recursos</small>
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label small text-secondary">ALERTA ANTECIPADO (DIAS)</label>
                          <input
                            type="number"
                            min="0"
                            value={diasAlertaAntecipado}
                            onChange={(e) => setDiasAlertaAntecipado(parseInt(e.target.value))}
                            className="form-control"
                            required
                          />
                          <small className="text-muted">Quantos dias antes do prazo enviar alertas</small>
                        </div>
                      </div>
                    </div>
                    
                    {/* Seção de Notificações */}
                    <div className="config-section">
                      <h2 className="h5 mb-3 d-flex align-items-center">
                        <Bell size={20} className="me-2 text-primary" />
                        Notificações
                      </h2>
                      
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="alertaEmail"
                              checked={alertaEmail}
                              onChange={(e) => setAlertaEmail(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="alertaEmail">
                              <Mail size={16} className="me-2" />
                              Enviar alertas por e-mail
                            </label>
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="alertaNotificacao"
                              checked={alertaNotificacao}
                              onChange={(e) => setAlertaNotificacao(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="alertaNotificacao">
                              <AlertTriangle size={16} className="me-2" />
                              Mostrar notificações no sistema
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Seção de Segurança */}
                    <div className="config-section">
                      <h2 className="h5 mb-3 d-flex align-items-center">
                        <Lock size={20} className="me-2 text-primary" />
                        Segurança
                      </h2>
                      
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label small text-secondary">TAMANHO MÍNIMO DE SENHA</label>
                          <input
                            type="number"
                            min="6"
                            max="20"
                            value={tamanhoMinSenha}
                            onChange={(e) => setTamanhoMinSenha(parseInt(e.target.value))}
                            className="form-control"
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label small text-secondary">TEMPO DE SESSÃO ATIVA (MINUTOS)</label>
                          <input
                            type="number"
                            min="5"
                            value={tempoSessaoAtiva}
                            onChange={(e) => setTempoSessaoAtiva(parseInt(e.target.value))}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="row mb-4">
                        <div className="col-md-4">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="exigirCaracteresEspeciais"
                              checked={exigirCaracteresEspeciais}
                              onChange={(e) => setExigirCaracteresEspeciais(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="exigirCaracteresEspeciais">
                              Exigir caracteres especiais
                            </label>
                          </div>
                        </div>
                        
                        <div className="col-md-4">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="exigirNumeros"
                              checked={exigirNumeros}
                              onChange={(e) => setExigirNumeros(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="exigirNumeros">
                              Exigir números
                            </label>
                          </div>
                        </div>
                        
                        <div className="col-md-4">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="exigirMaiusculas"
                              checked={exigirMaiusculas}
                              onChange={(e) => setExigirMaiusculas(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="exigirMaiusculas">
                              Exigir letras maiúsculas
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botão de Salvar */}
                    <div className="mt-4 d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-primary d-flex align-items-center gap-2"
                      >
                        <Save size={20} />
                        SALVAR CONFIGURAÇÕES
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Configuracoes;