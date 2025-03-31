import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Download, Trash, ArrowLeft } from 'lucide-react';
import '../../styles/globalColors.css';
import './style.css';
import Header from '../../components/Header';



function CatalogoRecursos() {
  // Estado para a lista de recursos
  const [recursos, setRecursos] = useState([
    { id: 1, nome: 'Auditório', categoria: 'Área', quantidadeTotal: 1, quantidadeEmUso: 1 },
    { id: 2, nome: 'Projetor Laser', categoria: 'Equipamento', quantidadeTotal: 10, quantidadeEmUso: 2 },
    { id: 3, nome: 'Cabo HDMI', categoria: 'Equipamento', quantidadeTotal: 22, quantidadeEmUso: 3 },
    { id: 4, nome: 'Câmera', categoria: 'Equipamento', quantidadeTotal: 3, quantidadeEmUso: 0 },
    { id: 5, nome: 'Caixa de Som', categoria: 'Equipamento', quantidadeTotal: 6, quantidadeEmUso: 1 },
  ]);

  // Estado para controlar a visibilidade do overlay de cadastro
  const [mostrarOverlay, setMostrarOverlay] = useState(false);

  // Estados para o formulário de cadastro de recurso
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [tipoUso, setTipoUso] = useState<string>('');
  const [reutilizavel, setReutilizavel] = useState<boolean>(false);
  const [imagens, setImagens] = useState<File[]>([]);
  const [categoria, setCategoria] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(0);

  // Lista de opções para Tipo de Uso e Categoria
  const tiposUso = ['Uso Interno', 'Uso Externo', 'Uso Geral'];
  const categorias = ['Equipamento', 'Material', 'Sala', 'Outros'];

  // Função para abrir o overlay de cadastro
  const abrirOverlay = () => {
    setMostrarOverlay(true);
  };

  // Função para fechar o overlay de cadastro
  const fecharOverlay = () => {
    setMostrarOverlay(false);
    resetarFormulario();
  };

  // Função para resetar o formulário
  const resetarFormulario = () => {
    setNome('');
    setDescricao('');
    setTipoUso('');
    setReutilizavel(false);
    setImagens([]);
    setCategoria('');
    setQuantidade(0);
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

    const novoId = recursos.length > 0 ? recursos[recursos.length - 1].id + 1 : 1;
    const novoRecurso = {
      id: novoId,
      nome,
      categoria,
      quantidadeTotal: quantidade,
      quantidadeEmUso: 0, // Inicialmente, nenhum recurso está em uso
    };

    setRecursos([...recursos, novoRecurso]);
    fecharOverlay();
  };

  // Função para remover um recurso
  const removerRecurso = (id: number) => {
    setRecursos(recursos.filter((recurso) => recurso.id !== id));
  };

  // Função para lidar com o upload de imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImagens(files);
    }
  };

  // Efeito para manipular o comportamento do overlay
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        fecharOverlay();
      }
    };

    if (mostrarOverlay) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [mostrarOverlay]);

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
        <div className="bg-light p-4 rounded shadow-sm">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="card shadow">
                  <div className="card-body">
                    {/* Título */}
                    <h1 className="h4 mb-4">CATÁLOGO DE RECURSOS</h1>

                    {/* Barra de Pesquisa */}
                    <div className="mb-4">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Procure por..."
                        />
                        <button className="btn btn-primary" type="button">
                          <Search size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Lista de Recursos */}
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>NOME</th>
                            <th>CATEGORIA</th>
                            <th>QUANTIDADE TOTAL</th>
                            <th>QUANTIDADE EM USO</th>
                            <th>AÇÕES</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recursos.map((recurso) => (
                            <tr key={recurso.id}>
                              <td>{recurso.nome}</td>
                              <td>{recurso.categoria}</td>
                              <td>{recurso.quantidadeTotal}</td>
                              <td>
                                {recurso.quantidadeEmUso}/{recurso.quantidadeTotal}
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => removerRecurso(recurso.id)}
                                >
                                  <Trash size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Botões e Links */}
                    <div className="mt-4 d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-primary d-flex align-items-center gap-2"
                        onClick={abrirOverlay}
                      >
                        <Plus size={18} />
                        ADICIONAR RECURSO
                      </button>

                      <a href="#" className="text-primary text-decoration-none">
                        <Eye size={18} className="me-2" />
                        VISUALIZAR MAIS REGISTROS
                      </a>

                      <button className="btn btn-outline-primary d-flex align-items-center gap-2">
                        <Download size={18} />
                        EXPORTAR RELATÓRIO DE RECURSOS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay de Cadastro de Recurso */}
          {mostrarOverlay && (
            <div className="overlay">
              <div className="overlay-content">
                <div className="card shadow">
                  <div className="card-body">
                    {/* Header */}
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <button
                        className="btn btn-link p-0 text-dark"
                        onClick={fecharOverlay}
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <h1 className="h4 mb-0">CADASTRO DE RECURSO</h1>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={adicionarRecurso}>
                      {/* Nome */}
                      <div className="mb-3">
                        <label className="form-label small text-secondary">NOME</label>
                        <input
                          type="text"
                          placeholder="Digite o nome do recurso"
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
                          placeholder="Digite a descrição do recurso"
                          value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}
                          className="form-control"
                          rows={3}
                        />
                      </div>

                      {/* Tipo de Uso */}
                      <div className="mb-3">
                        <label className="form-label small text-secondary">TIPO DE USO</label>
                        <select
                          className="form-select"
                          value={tipoUso}
                          onChange={(e) => setTipoUso(e.target.value)}
                          required
                        >
                          <option value="">Selecione um tipo de uso</option>
                          {tiposUso.map((tipo, index) => (
                            <option key={index} value={tipo}>
                              {tipo}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Reutilizável */}
                      <div className="mb-3">
                        <label className="form-label small text-secondary">REUTILIZÁVEL</label>
                        <div>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="reutilizavelSim"
                              value="true"
                              checked={reutilizavel}
                              onChange={() => setReutilizavel(true)}
                            />
                            <label className="form-check-label" htmlFor="reutilizavelSim">Sim</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="reutilizavelNao"
                              value="false"
                              checked={!reutilizavel}
                              onChange={() => setReutilizavel(false)}
                            />
                            <label className="form-check-label" htmlFor="reutilizavelNao">Não</label>
                          </div>
                        </div>
                      </div>

                      {/* Adicionar Imagens */}
                      <div className="mb-3">
                        <label className="form-label small text-secondary">ADICIONAR IMAGENS</label>
                        <input
                          type="file"
                          className="form-control"
                          multiple
                          onChange={handleImageUpload}
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
                          {categorias.map((cat, index) => (
                            <option key={index} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quantidade */}
                      <div className="mb-3">
                        <label className="form-label small text-secondary">QUANTIDADE</label>
                        <input
                          type="number"
                          placeholder="Digite a quantidade"
                          value={quantidade}
                          onChange={(e) => setQuantidade(Number(e.target.value))}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Botões */}
                      <div className="mt-4 d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={fecharOverlay}
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
          )}
        </div>
      </main>
    </div>
  );
}

export default CatalogoRecursos;