import React, { useState } from 'react';
import '../../../styles/globalColors.css';
import Header from '../../../components/Header';
// Remove Footer import

function CadastroUsuario() {
  // Estados para cada campo do formulário
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', { nome, descricao, telefone, email, categoria });
    alert('Cadastro salvo com sucesso!');
  };

  // Função para resetar o formulário
  const handleCancel = () => {
    setNome('');
    setDescricao('');
    setTelefone('');
    setEmail('');
    setCategoria('');
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
        <div className="min-vh-100 bg-light p-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-8">
                <div className="card shadow">
                  <div className="card-body">
                    {/* Título */}
                    <h1 className="h4 mb-4">CADASTRO DE USUÁRIO</h1>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit}>
                      {/* Nome */}
                      <div className="mb-3">
                        <label className="form-label small text-secondary">NOME</label>
                        <input
                          type="text"
                          placeholder="Digite o nome"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Descrição */}
                      <div className="mb-3">
                        <label className="form-label small text-secondary">DESCRIÇÃO</label>
                        <textarea
                          placeholder="Digite a descrição"
                          value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}
                          className="form-control"
                          rows={3}
                          required
                        />
                      </div>

                      {/* Telefone */}
                      <div className="mb-3">
                        <label className="form-label small text-secondary">TELEFONE</label>
                        <input
                          type="tel"
                          placeholder="Digite o telefone"
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* E-mail */}
                      <div className="mb-3">
                        <label className="form-label small text-secondary">E-MAIL</label>
                        <input
                          type="email"
                          placeholder="Digite o e-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Categoria */}
                      <div className="mb-3">
                        <label className="form-label small text-secondary">CATEGORIA</label>
                        <select
                          className="form-select"
                          value={categoria}
                          onChange={(e) => setCategoria(e.target.value)}
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="ADMIN">Admin</option>
                          <option value="USUARIO">Usuário</option>
                          <option value="VISITANTE">Visitante</option>
                        </select>
                      </div>

                      {/* Botões */}
                      <div className="mt-4 d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleCancel}
                        >
                          CANCELAR
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          SALVAR
                        </button>
                      </div>
                    </form>
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

export default CadastroUsuario;