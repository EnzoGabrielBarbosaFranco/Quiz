import React, { useState } from 'react';
import { buscarPerguntasDoQuestionario } from './API'
import CartaoDePergunta from './componentes/CartaoDePergunta';
import { EstadoPergunta, Dificuldade } from './API';

export type ObjetoDeResposta = {
  pergunta: string;
  resposta: string;
  correto: boolean;
  respostaCerta: string;
}

const PERGUNTAS_TOTAIS = 10;

const App = () => {
  const [carregar, setCarregar] = useState(false);
  const [perguntas, setPerguntas] = useState<EstadoPergunta[]>([]);
  const [numero, setNumero] = useState(0);
  const [respostasDoUsuario, setRespostasDoUsuario] = useState<ObjetoDeResposta[]>([]);
  const [pontos, setPontos] = useState(0);
  const [fimDeJogo, setFimDeJogo] = useState(true);

  const comecaQuiz = async () => {
    setCarregar(true);
    setFimDeJogo(false);

    const novasPerguntas = await buscarPerguntasDoQuestionario(
      PERGUNTAS_TOTAIS,
      Dificuldade.FACIL
    );

    setPerguntas(novasPerguntas);
    setPontos(0);
    setRespostasDoUsuario([]);
    setNumero(0);
    setCarregar(false);

  };

  const checaResposta = (e: any) => {
    if (!fimDeJogo) {

      const resposta = e.currentTarget.value;

      const correto = perguntas[numero].correct_answer === resposta;

      if (correto) setPontos((prev) => prev + 1);

      const ObjetoDeResposta = {
        pergunta: perguntas[numero].question,
        resposta,
        correto,
        respostaCerta: perguntas[numero].correct_answer,
      };
      setRespostasDoUsuario((prev) => [...prev, ObjetoDeResposta]);
    }
  };

  const proximaPergunta = () => {
    const proximaPergunta = numero + 1;

    if (proximaPergunta === PERGUNTAS_TOTAIS) {
      setFimDeJogo(true);
    } else {
      setNumero(proximaPergunta);
    }
  };

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {fimDeJogo || respostasDoUsuario.length === PERGUNTAS_TOTAIS ? (
        <button className='comecar' onClick={comecaQuiz}>
          Começar
        </button>
      ) : null}
      {!fimDeJogo ? <p className='pontos'> Pontos: </p> : null}
      {carregar && <p>Carregando Perguntas... </p>}
      {!carregar && !fimDeJogo && (
        <CartaoDePergunta
          numeroDaPergunta={numero + 1}
          perguntasTotais={PERGUNTAS_TOTAIS}
          pergunta={perguntas[numero].question}
          respostas={perguntas[numero].respostas}
          respostaDoUsuario={respostasDoUsuario ? respostasDoUsuario[numero] : undefined}
          repetirChamada={checaResposta}
        />
      )}
      <button className='proximo' onClick={proximaPergunta}>
        Próxima Pergunta
      </button>

    </div>
  );

};
export default App;