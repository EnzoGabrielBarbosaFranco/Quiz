import { shuffleArray } from "./utils";

export type Pergunta = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
};

export type EstadoPergunta = Pergunta & { respostas: string[]};

export enum Dificuldade {
    FACIL = "easy",
    MEDIO = "medium",
    DIFICIL = "hard",
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
                ...pergunta.incorrect_answers, 
                pergunta.correct_answer,
            ]),
        }
    ))
};