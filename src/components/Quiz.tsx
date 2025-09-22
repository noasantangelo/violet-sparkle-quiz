import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quants tipus d'operacions pot realitzar bàsicament un ordinador?",
    options: ["2 tipus", "3 tipus", "4 tipus"],
    correct: 1,
    category: "Introducció"
  },
  {
    id: 2,
    question: "Quines són les 3 operacions bàsiques que pot fer un ordinador?",
    options: ["Aritmètiques, lògiques i emmagatzematge", "Càlcul, processament i visualització", "Entrada, sortida i processament"],
    correct: 0,
    category: "Introducció"
  },
  {
    id: 3,
    question: "Què és un programa?",
    options: ["Un conjunt de dades", "Un conjunt d'ordres per aconseguir un objectiu", "Un sistema operatiu"],
    correct: 1,
    category: "Programes i algorismes"
  },
  {
    id: 4,
    question: "Què és un algorisme?",
    options: ["Un programa compilat", "La descripció exacta de la seqüència de passos per resoldre un problema", "Un llenguatge de programació"],
    correct: 1,
    category: "Programes i algorismes"
  },
  {
    id: 5,
    question: "Quina és la diferència entre un algorisme i un programa?",
    options: ["No hi ha diferència", "Un programa és l'expressió d'un algorisme en un llenguatge de programació", "Un algorisme és més complex"],
    correct: 1,
    category: "Programes i algorismes"
  },
  {
    id: 6,
    question: "Quin tipus de llenguatge utilitzen els programadors actualment?",
    options: ["Llenguatges de baix nivell", "Llenguatges d'alt nivell", "Llenguatges de nivell intermig"],
    correct: 1,
    category: "Llenguatges de programació"
  },
  {
    id: 7,
    question: "Per què s'anomenen llenguatges d'alt nivell?",
    options: ["Perquè són més ràpids", "Perquè són entendibles pel programador", "Perquè ocupen menys memòria"],
    correct: 1,
    category: "Llenguatges de programació"
  },
  {
    id: 8,
    question: "Quins són els tres tipus de llenguatges de programació segons el nivell?",
    options: ["Alt, mig i baix nivell", "Ràpid, normal i lent", "Fàcil, intermig i difícil"],
    correct: 0,
    category: "Tipus de llenguatge"
  },
  {
    id: 9,
    question: "Què fa un assemblador?",
    options: ["Executa programes", "Tradueix codi assemblador a codi màquina", "Interpreta comandaments"],
    correct: 1,
    category: "Assembladors i intèrprets"
  },
  {
    id: 10,
    question: "Què fa un intèrpret?",
    options: ["Tradueix tot el programa abans d'executar-lo", "Executa el programa instrucció per instrucció", "Compila el codi font"],
    correct: 1,
    category: "Assembladors i intèrprets"
  },
  {
    id: 11,
    question: "Quina és la primera fase en el desenvolupament d'un programa?",
    options: ["Disseny", "Anàlisi", "Implementació"],
    correct: 1,
    category: "Fases de desenvolupament"
  },
  {
    id: 12,
    question: "Quantes fases té el desenvolupament d'un programa segons el document?",
    options: ["3 fases", "4 fases", "5 fases"],
    correct: 1,
    category: "Fases de desenvolupament"
  },
  {
    id: 13,
    question: "Què inclou la fase de documentació?",
    options: ["Només el manual d'usuari", "Documentació tècnica i manual d'usuari", "Només comentaris en el codi"],
    correct: 1,
    category: "Fases de desenvolupament"
  },
  {
    id: 14,
    question: "Què són les dades en programació?",
    options: ["Instruccions del programa", "Informació que el programa processa", "Errors del sistema"],
    correct: 1,
    category: "Dades i variables"
  },
  {
    id: 15,
    question: "Què és una variable?",
    options: ["Un valor constant", "Un espai de memòria que pot canviar de valor", "Una instrucció"],
    correct: 1,
    category: "Dades i variables"
  },
  {
    id: 16,
    question: "Què representen els símbols ovalats en un diagrama de flux?",
    options: ["Processos", "Decisions", "Inici i fi"],
    correct: 2,
    category: "Diagrames de flux"
  },
  {
    id: 17,
    question: "Quin símbol s'utilitza per representar un procés en un diagrama de flux?",
    options: ["Oval", "Rectangle", "Rombe"],
    correct: 1,
    category: "Diagrames de flux"
  },
  {
    id: 18,
    question: "Què representa el símbol de rombe en un diagrama de flux?",
    options: ["Un procés", "Una decisió", "Una entrada de dades"],
    correct: 1,
    category: "Diagrames de flux"
  },
  {
    id: 19,
    question: "Quin símbol s'usa per entrada i sortida de dades?",
    options: ["Rectangle", "Paral·lelogram", "Cercle"],
    correct: 1,
    category: "Diagrames de flux"
  },
  {
    id: 20,
    question: "Quin és l'objectiu principal dels diagrames de flux?",
    options: ["Decorar el codi", "Representar visualment la lògica d'un algorisme", "Substituir la programació"],
    correct: 1,
    category: "Diagrames de flux"
  }
];

export const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));

  const handleAnswerSelect = (answerIndex: number) => {
    if (!answeredQuestions[currentQuestion]) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null && !answeredQuestions[currentQuestion]) {
      const newAnsweredQuestions = [...answeredQuestions];
      newAnsweredQuestions[currentQuestion] = true;
      setAnsweredQuestions(newAnsweredQuestions);

      if (selectedAnswer === questions[currentQuestion].correct) {
        setCorrectAnswers(prev => prev + 1);
      } else {
        setIncorrectAnswers(prev => prev + 1);
      }

      setShowResult(true);

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setQuizFinished(true);
        }
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setShowResult(false);
    setQuizFinished(false);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  };

  const progress = ((currentQuestion + (answeredQuestions[currentQuestion] ? 1 : 0)) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (quizFinished) {
    const score = (correctAnswers / questions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-gradient-to-br from-card to-card/95 shadow-2xl border-2 border-accent/20">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-accent to-quiz-highlight">
                <Trophy className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Quiz Completat!
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Has finalitzat el test de Fonaments de Programació
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-quiz-correct/10 to-quiz-correct/5 border border-quiz-correct/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-6 h-6 text-quiz-correct" />
                  <span className="text-2xl font-bold text-quiz-correct">{correctAnswers}</span>
                </div>
                <p className="text-sm text-muted-foreground">Correctes</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-quiz-incorrect/10 to-quiz-incorrect/5 border border-quiz-incorrect/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <XCircle className="w-6 h-6 text-quiz-incorrect" />
                  <span className="text-2xl font-bold text-quiz-incorrect">{incorrectAnswers}</span>
                </div>
                <p className="text-sm text-muted-foreground">Incorrectes</p>
              </div>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">Puntuació Final</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {score.toFixed(1)}%
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-center text-muted-foreground">
                {score >= 80 ? "Excel·lent!" : score >= 60 ? "Molt bé!" : score >= 40 ? "Pots millorar" : "Necessites repassar"}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={resetQuiz} 
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Tornar a fer el quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with progress */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Test de Fonaments de Programació
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary" className="bg-quiz-correct/10 text-quiz-correct border-quiz-correct/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              Correctes: {correctAnswers}
            </Badge>
            <Badge variant="secondary" className="bg-quiz-incorrect/10 text-quiz-incorrect border-quiz-incorrect/20">
              <XCircle className="w-3 h-3 mr-1" />
              Incorrectes: {incorrectAnswers}
            </Badge>
            <Badge variant="outline">
              Pregunta {currentQuestion + 1} de {questions.length}
            </Badge>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-3 bg-secondary" />
            <p className="text-sm text-muted-foreground">Progrés: {Math.round(progress)}%</p>
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-xl border-2 border-accent/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border-accent/30">
                {currentQ.category}
              </Badge>
              <span className="text-sm text-muted-foreground">ID: {currentQ.id}</span>
            </div>
            <CardTitle className="text-xl font-semibold text-foreground leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQ.options.map((option, index) => {
              let buttonStyle = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md";
              
              if (showResult) {
                if (index === currentQ.correct) {
                  buttonStyle += " bg-gradient-to-r from-quiz-correct/20 to-quiz-correct/10 border-quiz-correct text-quiz-correct hover:from-quiz-correct/30 hover:to-quiz-correct/20";
                } else if (index === selectedAnswer) {
                  buttonStyle += " bg-gradient-to-r from-quiz-incorrect/20 to-quiz-incorrect/10 border-quiz-incorrect text-quiz-incorrect hover:from-quiz-incorrect/30 hover:to-quiz-incorrect/20";
                } else {
                  buttonStyle += " bg-muted/50 border-border text-muted-foreground";
                }
              } else if (selectedAnswer === index) {
                buttonStyle += " bg-gradient-to-r from-accent/20 to-quiz-highlight/20 border-accent text-accent-foreground hover:from-accent/30 hover:to-quiz-highlight/30 transform scale-[1.02]";
              } else {
                buttonStyle += " bg-card border-border hover:bg-accent/5 hover:border-accent/30 hover:transform hover:scale-[1.01]";
              }

              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={buttonStyle}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answeredQuestions[currentQuestion]}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{option}</span>
                    {showResult && index === currentQ.correct && (
                      <CheckCircle className="w-5 h-5 text-quiz-correct" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQ.correct && (
                      <XCircle className="w-5 h-5 text-quiz-incorrect" />
                    )}
                  </div>
                </Button>
              );
            })}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null || answeredQuestions[currentQuestion]}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {currentQuestion === questions.length - 1 ? 'Finalitzar Quiz' : 'Següent Pregunta'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};