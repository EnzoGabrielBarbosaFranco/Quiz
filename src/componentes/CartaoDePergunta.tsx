import React from "react";

type Props = {
    pergunta: string;
    respostas: string[];
    repetirChamada: any;
    respostaDoUsuario: any;
    numeroDaPergunta: number;
    perguntasTotais: number;
}

const CartaoDePergunta: React.FC<Props> = ({
    pergunta,
    respostas,
    repetirChamada,
    respostaDoUsuario,
    numeroDaPergunta,
    perguntasTotais,
}) => (
    <div>
        <p className="numero">
            Pergunta: {numeroDaPergunta} / {perguntasTotais}
        </p>
        <p dangerouslySetInnerHTML={{ __html: pergunta }} />
        <div>
            {respostas.map((resposta) => (
                <div key={resposta}>
                    <button disabled={respostaDoUsuario} value={resposta} onClick={repetirChamada}>
                        <span dangerouslySetInnerHTML={{ __html: resposta }} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default CartaoDePergunta;