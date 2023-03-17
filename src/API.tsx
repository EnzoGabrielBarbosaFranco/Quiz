import { shuffleArray } from "./utils";

export type Pergunta = {
    categoria: string;
    resposta_correta: string;
    dificuldade: string;
    resposta_errada: string[];
    pergunta: string;
    tipo: string;
};

export type EstadoPergunta = Pergunta & { respostas: string[]};

export enum Dificuldade {
    FACIL = "facil",
    MEDIO = "medio",
    DIFICIL = "dificil",
};

export const buscarPerguntasDoQuestionario = async (
    amount: number, 
    dificuldade: Dificuldade): Promise<EstadoPergunta[]> => {
    const pontoFinal = `https://opentdb.com/api.php?amount=${amount}&difficulty=${dificuldade}&type=multiple`;
    const data = await (await fetch(pontoFinal)).json();
    return data.results.map((pergunta: Pergunta) => (
        {
            ...pergunta,
            respostas: shuffleArray([
                ...pergunta.resposta_errada, 
                pergunta.resposta_correta,
            ]),
        }
    ))
};