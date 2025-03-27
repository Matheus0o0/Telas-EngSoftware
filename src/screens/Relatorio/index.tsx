import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import axios from 'axios';
import '../../styles/globalColors.css';

// Definindo a interface para os dados do relatório
interface Relatorio {
  usuario: string;
  recurso: string;
  categoria: string;
  tipoAcao: string;
  data: string;
  horario: string;
  dataPrevista: string;
  dataDevolucao: string;
  tempoAtraso: string;
}

function App() {
  // Estados para cada campo
  const [usuario, setUsuario] = useState<string>('');
  const [recurso, setRecurso] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [tipoAcao, setTipoAcao] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [horario, setHorario] = useState<string>('');
  const [dataPrevista, setDataPrevista] = useState<string>('');
  const [dataDevolucao, setDataDevolucao] = useState<string>('');
  const [tempoAtraso, setTempoAtraso] = useState<string>('');

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Substitua pela URL da sua API
        const response = await axios.get<Relatorio>('http://localhost:5000/api/relatorio');
        const relatorio = response.data;

        // Preenche os campos com os dados da API
        setUsuario(relatorio.usuario || '');
        setRecurso(relatorio.recurso || '');
        setCategoria(relatorio.categoria || '');
        setTipoAcao(relatorio.tipoAcao || '');
        setData(relatorio.data || '');
        setHorario(relatorio.horario || '');
        setDataPrevista(relatorio.dataPrevista || '');
        setDataDevolucao(relatorio.dataDevolucao || '');
        setTempoAtraso(relatorio.tempoAtraso || '');
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao carregar os dados do relatório.');
      }
    };

    fetchData();
  }, []);

  // Função para validar a data
  const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Formato esperado: YYYY-MM-DD
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };

  // Função para imprimir o relatório
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card shadow">
              <div className="card-body">
                {/* Header */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <button className="btn btn-link p-0 text-dark">
                    <ArrowLeft size={24} />
                  </button>
                  <h1 className="h4 mb-0">RELATÓRIO</h1>
                </div>

                {/* Form */}
                <div className="row g-4">
                  {/* ID and Usuario */}
                  <div className="col-md-6">
                    <label className="form-label small text-secondary">ID</label>
                    <input
                      type="text"
                      placeholder="ID"
                      className="form-control bg-light"
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-secondary">Usuário</label>
                    <input
                      type="text"
                      placeholder="Digite o usuário"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      className="form-control bg-light"
                    />
                  </div>

                  {/* Recurso and Categoria */}
                  <div className="col-md-6">
                    <label className="form-label small text-secondary">RECURSO</label>
                    <input
                      type="text"
                      placeholder="Digite o recurso"
                      value={recurso}
                      onChange={(e) => setRecurso(e.target.value)}
                      className="form-control bg-light"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-secondary">CATEGORIA</label>
                    <select
                      className="form-select bg-light"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="EQUIPAMENTO">Equipamento</option>
                      <option value="MATERIAL">Material</option>
                      <option value="SALA">Sala</option>
                      <option value="OUTROS">Outros</option>
                    </select>
                  </div>

                  {/* Tipo de Acao */}
                  <div className="col-md-6">
                    <label className="form-label small text-secondary">TIPO DE AÇÃO</label>
                    <input
                      type="text"
                      placeholder="Digite o tipo de ação"
                      value={tipoAcao}
                      onChange={(e) => setTipoAcao(e.target.value)}
                      className="form-control bg-light"
                    />
                  </div>

                  {/* Data and Horario */}
                  <div className="col-md-6">
                    <div className="row g-3">
                      <div className="col-7">
                        <label className="form-label small text-secondary">DATA</label>
                        <input
                          type="date"
                          value={data}
                          onChange={(e) => {
                            const selectedDate = e.target.value;
                            if (isValidDate(selectedDate)) {
                              setData(selectedDate);
                            } else {
                              alert('Data inválida!');
                            }
                          }}
                          className="form-control bg-light"
                        />
                      </div>
                      <div className="col-5">
                        <label className="form-label small text-secondary">HORÁRIO</label>
                        <input
                          type="time"
                          value={horario}
                          onChange={(e) => setHorario(e.target.value)}
                          className="form-control bg-light"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Data Prevista and Data da Devolucao */}
                  <div className="col-md-6">
                    <label className="form-label small text-secondary">DATA PREVISTA DEVOLUÇÃO</label>
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
                      className="form-control bg-light"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-secondary">DATA DA DEVOLUÇÃO</label>
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
                      className="form-control bg-light"
                    />
                  </div>

                  {/* Tempo de Atraso */}
                  <div className="col-md-6">
                    <label className="form-label small text-secondary">TEMPO DE ATRASO</label>
                    <input
                      type="text"
                      placeholder="Tempo de atraso"
                      value={tempoAtraso}
                      onChange={(e) => setTempoAtraso(e.target.value)}
                      className="form-control bg-light"
                    />
                  </div>
                </div>

                {/* Print Button */}
                <div className="mt-4 d-flex justify-content-end">
                  <button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={handlePrint}
                  >
                    <Printer size={20} />
                    IMPRIMIR RELATÓRIO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;