import React, { useState } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/sideBar';
import './styles.css';

function CadastroCategorias() {
  const navigate = useNavigate();

  // Estados para o formulário de cadastro de categoria
  const [nome, setNome] = useState<string>('');

  // Função para resetar o formulário
  const resetarFormulario = () => {
    setNome('');
  };

  // Função para adicionar um novo recurso
  const adicionarCategoria = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      nome.trim() === ''
    ) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    // Aqui você adicionaria a lógica para salvar a categoria no backend
    console.log('Categoria cadastrada:', {
      nome
    });

    alert('Categoria cadastrada com sucesso!');
    resetarFormulario();
  };

  const voltarParaHome = () => {
    navigate('/TelaPrincipal');
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
                  {/* Cabeçalho com botão de voltar e título */}
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <button 
                      className="btn btn-link p-0 text-dark"
                      onClick={voltarParaHome}
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <h1 className="h4 mb-0">CADASTRO DE CATEGORIA</h1>
                  </div>

                  {/* Formulário de Cadastro */}
                  <form onSubmit={adicionarCategoria}>
                    <div className="row g-3">
                      {/* Nome da categoria */}
                      <div className="col-md-6">
                        <label className="form-label small text-secondary">NOME DA CATEGORIA</label>
                        <input
                          type="text"
                          placeholder="Digite o nome da categoria"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="mt-4 d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={resetarFormulario}
                      >
                        LIMPAR
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={voltarParaHome}
                      >
                        CANCELAR
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary d-flex align-items-center gap-2"
                      >
                        <Save size={18} />
                        SALVAR
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

export default CadastroCategorias;