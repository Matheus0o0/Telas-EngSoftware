import React, { useState } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/sideBar';
import './styles.css';

function CadastroRecursos() {
  const navigate = useNavigate();

  // Estados para o formulário de cadastro de recurso
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [tipoUso, setTipoUso] = useState<string>('');
  const [reutilizavel, setReutilizavel] = useState<boolean>(false);
  const [imagens, setImagens] = useState<File[]>([]);
  const [categoria, setCategoria] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(1);
  const [localizacao, setLocalizacao] = useState<string>('');

  // Lista de opções para Tipo de Uso e Categoria
  const tiposUso = ['Uso Interno', 'Uso Externo', 'Uso Geral'];
  const categorias = ['Equipamento', 'Material', 'Sala', 'Outros'];

  // Função para lidar com o upload de imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImagens(files);
    }
  };

  // Função para resetar o formulário
  const resetarFormulario = () => {
    setNome('');
    setDescricao('');
    setTipoUso('');
    setReutilizavel(false);
    setImagens([]);
    setCategoria('');
    setQuantidade(1);
    setLocalizacao('');
  };

  // Função para adicionar um novo recurso
  const adicionarRecurso = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      nome.trim() === '' ||
      categoria.trim() === '' ||
      quantidade <= 0
    ) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    // Aqui você adicionaria a lógica para salvar o recurso no backend
    console.log('Recurso cadastrado:', {
      nome,
      descricao,
      tipoUso,
      reutilizavel,
      categoria,
      quantidade,
      localizacao,
      imagens: imagens.map(img => img.name)
    });

    alert('Recurso cadastrado com sucesso!');
    resetarFormulario();
  };

  // Função para voltar à tela anterior
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
                    <h1 className="h4 mb-0">CADASTRO DE RECURSO</h1>
                  </div>

                  {/* Formulário de Cadastro */}
                  <form onSubmit={adicionarRecurso}>
                    <div className="row g-3">
                      {/* Nome do Recurso */}
                      <div className="col-md-6">
                        <label className="form-label small text-secondary">NOME DO RECURSO</label>
                        <input
                          type="text"
                          placeholder="Digite o nome do recurso"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Categoria */}
                      <div className="col-md-6">
                        <label className="form-label small text-secondary">CATEGORIA</label>
                        <select
                          className="form-select"
                          value={categoria}
                          onChange={(e) => setCategoria(e.target.value)}
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          {categorias.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Descrição */}
                      <div className="col-12">
                        <label className="form-label small text-secondary">DESCRIÇÃO</label>
                        <textarea
                          placeholder="Digite uma descrição detalhada do recurso"
                          value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}
                          className="form-control"
                          rows={3}
                        />
                      </div>

                      {/* Tipo de Uso */}
                      <div className="col-md-6">
                        <label className="form-label small text-secondary">TIPO DE USO</label>
                        <select
                          className="form-select"
                          value={tipoUso}
                          onChange={(e) => setTipoUso(e.target.value)}
                        >
                          <option value="">Selecione o tipo de uso</option>
                          {tiposUso.map((tipo, index) => (
                            <option key={index} value={tipo}>{tipo}</option>
                          ))}
                        </select>
                      </div>

                      {/* Quantidade */}
                      <div className="col-md-6">
                        <label className="form-label small text-secondary">QUANTIDADE</label>
                        <input
                          type="number"
                          min="1"
                          value={quantidade}
                          onChange={(e) => setQuantidade(parseInt(e.target.value))}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Localização */}
                      <div className="col-md-6">
                        <label className="form-label small text-secondary">LOCALIZAÇÃO</label>
                        <input
                          type="text"
                          placeholder="Digite a localização do recurso"
                          value={localizacao}
                          onChange={(e) => setLocalizacao(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      {/* Reutilizável */}
                      <div className="col-md-6">
                        <div className="form-check form-switch mt-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="reutilizavel"
                            checked={reutilizavel}
                            onChange={(e) => setReutilizavel(e.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="reutilizavel">
                            Recurso Reutilizável
                          </label>
                        </div>
                      </div>

                      {/* Upload de Imagens */}
                      <div className="col-12">
                        <label className="form-label small text-secondary">IMAGENS DO RECURSO</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                        />
                        <small className="text-muted">
                          Você pode selecionar múltiplas imagens (opcional)
                        </small>
                      </div>

                      {/* Prévia das Imagens */}
                      {imagens.length > 0 && (
                        <div className="col-12 mt-3">
                          <label className="form-label small text-secondary">IMAGENS SELECIONADAS</label>
                          <div className="d-flex flex-wrap gap-2">
                            {imagens.map((img, index) => (
                              <div key={index} className="position-relative">
                                <img
                                  src={URL.createObjectURL(img)}
                                  alt={`Preview ${index}`}
                                  className="img-thumbnail"
                                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                  onClick={() => {
                                    const newImagens = [...imagens];
                                    newImagens.splice(index, 1);
                                    setImagens(newImagens);
                                  }}
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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

export default CadastroRecursos;