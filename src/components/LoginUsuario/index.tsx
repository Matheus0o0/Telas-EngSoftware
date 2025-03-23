import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faFileLines, faSwatchbook, faHouseLaptop } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Seção de Login (sempre visível) */}
        <div className="col-12 col-md-6 bg-light d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h2 className="mb-2">LOGIN</h2>
            <p className="text-muted small mb-4">INFORME SEU E-MAIL E SENHA E ACESSE SUA CONTA</p>
            
            <form>
              {/* Campo de E-mail */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="Digite seu e-mail"
                />
              </div>
              
              {/* Campo de Senha */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="********"
                />
              </div>
              
              {/* Lembre-me e Esqueceu a Senha */}
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="remember" />
                  <label className="form-check-label" htmlFor="remember">Lembre-me</label>
                </div>
                <a href="#" className="text-primary text-decoration-none">Esqueceu a senha?</a>
              </div>
              
              {/* Botão de Entrar */}
              <button type="submit" className="btn btn-primary w-100 mb-3">ENTRAR</button>
              
              {/* Link para Cadastro */}
              <p className="text-center text-muted small">
                Não tem uma conta? <a href="#" className="text-primary text-decoration-none">Cadastre-se gratuitamente</a>
              </p>
            </form>
          </div>
        </div>
        
        {/* Seção de Benefícios (oculta em telas pequenas) */}
        <div className="col-md-6 bg-primary text-white d-none d-md-flex align-items-center">
          <div className="w-75 mx-auto">
            {/* Logo */}
            <img src="/rastro-logo-white.png" alt="Rastro" className="img-fluid mb-4" />
            
            {/* Título e Subtítulo */}
            <h3 className="mb-3 text-center">Benefícios de usar nosso sistema</h3>
            <p className="mb-4 text-center">Organize e mantenha-se perfeitamente no controle e histórico de rastreabilidade</p>
            
            {/* Lista de Benefícios */}
            <div className="row">
              {/* Benefício 1 */}
              <div className="col-md-6 mb-4 text-center">
                <div className="d-flex flex-column align-items-center">
                  <FontAwesomeIcon icon={faListCheck} size="3x" className="mb-3" />
                  <p className="mb-0">Controle completo de empréstimos e devoluções</p>
                </div>
              </div>
              
              {/* Benefício 2 */}
              <div className="col-md-6 mb-4 text-center">
                <div className="d-flex flex-column align-items-center">
                  <FontAwesomeIcon icon={faFileLines} size="3x" className="mb-3" />
                  <p className="mb-0">Rastreamento detalhado e histórico acessível</p>
                </div>
              </div>
              
              {/* Benefício 3 */}
              <div className="col-md-6 mb-4 text-center">
                <div className="d-flex flex-column align-items-center">
                  <FontAwesomeIcon icon={faSwatchbook} size="3x" className="mb-3" />
                  <p className="mb-0">Interface personalizável e fácil de usar</p>
                </div>
              </div>
              
              {/* Benefício 4 */}
              <div className="col-md-6 mb-4 text-center">
                <div className="d-flex flex-column align-items-center">
                  <FontAwesomeIcon icon={faHouseLaptop} size="3x" className="mb-3" />
                  <p className="mb-0">Acesso rápido de qualquer lugar, a qualquer hora</p>
                </div>
              </div>
            </div>
            
            {/* Rodapé da Seção de Benefícios */}
            <p className="mt-4 mb-0 text-center">Eficiência e praticidade na palma da sua mão!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;