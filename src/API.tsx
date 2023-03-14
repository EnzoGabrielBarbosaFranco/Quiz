import { shuffleArray } from "./utils";

export type Pergunta = {
    categoria: string;
    resposta_certa: string;
    dificuldade: string;
    respostas_errada: string[];
    pergunta: string;
    type: string;
};

export type EstadoPergunta = Pergunta & { respostas: string[]};

export enum Dificuldade {
    FACIL = "facil",
    MEDIO = "medio",
    DIFICIL = "dificil",
};

export const buscarPerguntasDoQuestionario = async (
    amount: number, 
    difficulty: Dificuldade) => {
    const pontoFinal = 'https://opentdb.com/api.php?amount=${amount}&difficulty=${dificuldade}&type=multiple';
    const data = await (await fetch(pontoFinal)).json();
    return data.results.map((pergunta: Pergunta) => (
        {
            ...pergunta,
            respostas: shuffleArray([
                ...pergunta.respostas_errada, 
                pergunta.resposta_certa,
            ]),
        }
    ))
};