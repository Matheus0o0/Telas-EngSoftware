import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faFileLines, faSwatchbook, faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

function RegistroUsuario() {
  // Form state
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [termos, setTermos] = useState(false);
  
  // Validation states
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [confirmarSenhaError, setConfirmarSenhaError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Departamentos disponíveis (simulação)
  const departamentos = [
    'Administração',
    'Recursos Humanos',
    'Tecnologia da Informação',
    'Marketing',
    'Financeiro',
    'Operações',
    'Vendas',
    'Suporte'
  ];

  // Validação de email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email é obrigatório');
      return false;
    } else if (!re.test(email)) {
      setEmailError('Email inválido');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  // Validação de senha
  const validateSenha = (senha: string) => {
    if (!senha) {
      setSenhaError('Senha é obrigatória');
      return false;
    } else if (senha.length < 8) {
      setSenhaError('A senha deve ter pelo menos 8 caracteres');
      return false;
    } else if (!/[A-Z]/.test(senha)) {
      setSenhaError('A senha deve conter pelo menos uma letra maiúscula');
      return false;
    } else if (!/[0-9]/.test(senha)) {
      setSenhaError('A senha deve conter pelo menos um número');
      return false;
    } else if (!/[!@#$%^&*]/.test(senha)) {
      setSenhaError('A senha deve conter pelo menos um caractere especial (!@#$%^&*)');
      return false;
    } else {
      setSenhaError('');
      return true;
    }
  };

  // Validação de confirmação de senha
  const validateConfirmarSenha = (confirmarSenha: string) => {
    if (!confirmarSenha) {
      setConfirmarSenhaError('Confirmação de senha é obrigatória');
      return false;
    } else if (confirmarSenha !== senha) {
      setConfirmarSenhaError('As senhas não coincidem');
      return false;
    } else {
      setConfirmarSenhaError('');
      return true;
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos os campos
    const isEmailValid = validateEmail(email);
    const isSenhaValid = validateSenha(senha);
    const isConfirmarSenhaValid = validateConfirmarSenha(confirmarSenha);
    
    if (isEmailValid && isSenhaValid && isConfirmarSenhaValid && termos) {
      setLoading(true);
      
      // Simulação de envio para o backend
      setTimeout(() => {
        setLoading(false);
        setFormSubmitted(true);
        
        // Dados que seriam enviados para o backend
        const userData = {
          nome,
          email,
          senha,
          telefone,
          departamento
        };
        
        console.log('Simulação: Dados enviados para o backend:', userData);
        
        // Limpar formulário após envio bem-sucedido
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
        setTelefone('');
        setDepartamento('');
        setTermos(false);
        
        // Após 3 segundos, esconder a mensagem de sucesso
        setTimeout(() => {
          setFormSubmitted(false);
        }, 3000);
      }, 1500); // Simula um delay de 1.5 segundos para o processamento
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Seção de Registro (sempre visível) */}
        <div className="col-12 col-md-6 bg-light d-flex align-items-center justify-content-center registro-form-container">
          <div className="w-100 registro-form">
            <h2 className="mb-2">CRIAR CONTA</h2>
            <p className="text-muted small mb-4">PREENCHA OS DADOS ABAIXO PARA CRIAR SUA CONTA</p>
            
            {/* Mensagem de sucesso */}
            {formSubmitted && (
              <div className="alert alert-success mb-3" role="alert">
                Conta criada com sucesso! Você já pode fazer login.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Nome completo */}
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="nome" 
                  placeholder="Digite seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className={`form-control ${emailError ? 'is-invalid' : ''}`}
                  id="email" 
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value) validateEmail(e.target.value);
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                  required
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              
              {/* Senha */}
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input 
                  type="password" 
                  className={`form-control ${senhaError ? 'is-invalid' : ''}`}
                  id="senha" 
                  placeholder="********"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    if (e.target.value) validateSenha(e.target.value);
                  }}
                  onBlur={(e) => validateSenha(e.target.value)}
                  required
                />
                {senhaError && <div className="invalid-feedback">{senhaError}</div>}
                <small className="form-text text-muted">
                  A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.
                </small>
              </div>
              
              {/* Confirmar Senha */}
              <div className="mb-3">
                <label htmlFor="confirmarSenha" className="form-label">Confirmar Senha</label>
                <input 
                  type="password" 
                  className={`form-control ${confirmarSenhaError ? 'is-invalid' : ''}`}
                  id="confirmarSenha" 
                  placeholder="********"
                  value={confirmarSenha}
                  onChange={(e) => {
                    setConfirmarSenha(e.target.value);
                    if (e.target.value) validateConfirmarSenha(e.target.value);
                  }}
                  onBlur={(e) => validateConfirmarSenha(e.target.value)}
                  required
                />
                {confirmarSenhaError && <div className="invalid-feedback">{confirmarSenhaError}</div>}
              </div>
              
              {/* Telefone */}
              <div className="mb-3">
                <label htmlFor="telefone" className="form-label">Telefone</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  id="telefone" 
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              
              {/* Departamento */}
              <div className="mb-3">
                <label htmlFor="departamento" className="form-label">Departamento</label>
                <select 
                  className="form-select" 
                  id="departamento"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  required
                >
                  <option value="">Selecione um departamento</option>
                  {departamentos.map((dep, index) => (
                    <option key={index} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>
              
              {/* Termos e Condições */}
              <div className="mb-3 form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="termos"
                  checked={termos}
                  onChange={(e) => setTermos(e.target.checked)}
                  required
                />
                <label className="form-check-label" htmlFor="termos">
                  Eu concordo com os <a href="#" className="text-primary">Termos de Uso</a> e <a href="#" className="text-primary">Política de Privacidade</a>
                </label>
              </div>
              
              {/* Botão de Cadastrar */}
              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    PROCESSANDO...
                  </>
                ) : 'CADASTRAR'}
              </button>
              
              {/* Link para Login */}
              <p className="text-center text-muted small">
                Já tem uma conta? <Link to="/LoginUsuario" className="text-primary text-decoration-none">Faça login</Link>
              </p>
            </form>
          </div>
        </div>
        
        {/* Seção de Imagem/Informações (visível apenas em telas médias e maiores) */}
        <div className="col-md-6 bg-primary text-white d-none d-md-flex flex-column justify-content-center registro-info-section">
          <div className="text-center mb-4">
            <img src="/rastro.png" alt="Rastro" className="img-fluid mb-3" style={{ maxWidth: '180px' }} />
            <h1 className="display-6 fw-bold mb-3">Bem-vindo ao Rastro</h1>
            <p className="lead mb-4">
              Sistema de gerenciamento e rastreamento de recursos para sua organização
            </p>
          </div>
          
          <div className="row g-3">
            <div className="col-6">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-white text-primary rounded-circle me-2">
                  <FontAwesomeIcon icon={faListCheck} size="lg" />
                </div>
                <h5 className="mb-0 fs-6">Controle de Recursos</h5>
              </div>
              <p className="text-white-50">Gerencie todos os recursos da sua organização em um só lugar.</p>
            </div>
            
            <div className="col-6">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-white text-primary rounded-circle me-2">
                  <FontAwesomeIcon icon={faFileLines} size="lg" />
                </div>
                <h5 className="mb-0 fs-6">Relatórios Detalhados</h5>
              </div>
              <p className="text-white-50">Acesse relatórios completos sobre o uso de recursos.</p>
            </div>
            
            <div className="col-6">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-white text-primary rounded-circle me-2">
                  <FontAwesomeIcon icon={faSwatchbook} size="lg" />
                </div>
                <h5 className="mb-0 fs-6">Categorização</h5>
              </div>
              <p className="text-white-50">Organize recursos por categorias para facilitar a gestão.</p>
            </div>
            
            <div className="col-6">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-white text-primary rounded-circle me-2">
                  <FontAwesomeIcon icon={faHouseLaptop} size="lg" />
                </div>
                <h5 className="mb-0 fs-6">Acesso Remoto</h5>
              </div>
              <p className="text-white-50">Acesse o sistema de qualquer lugar, a qualmomento.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroUsuario;