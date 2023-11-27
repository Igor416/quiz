import { useCallback, useEffect, useState } from 'react'
import { Question, Quiz, Team } from '../JSONTypes'
import { answerQuestion, getQuiz, getTeams, updateTeam } from '../api'
import { useParams } from 'react-router-dom'
import Cell from './Cell'
import QuestionView from './QuestionView'
import Chart from './Chart'

export default function Game() {
  const params = useParams()
  const k = 200
  const [quiz, setQuiz] = useState<Quiz>()
  const [question, setQuestion] = useState<Question>()
  const [teams, setTeams] = useState<Team[]>([])

  const pickTeam = useCallback((i: number) => {
    if (quiz && question) {
      const teamsCopy = [...teams];
      teamsCopy[i] = {name: teamsCopy[i].name, score: teamsCopy[i].score + question.value * k}
      updateTeam(teamsCopy[i])
      setTeams(teamsCopy)

      const copyQuiz = {...quiz}
      const categoryId = quiz.categories.findIndex(c => c.id === question.category)
      const copyCategory = {...copyQuiz.categories[categoryId]}
      const questionId = quiz.categories[categoryId].questions.findIndex(q => q.id === question.id)
      copyCategory.questions[questionId] = Object.assign({...question}, {answered: true});
      copyQuiz.categories[categoryId] = copyCategory;
      setQuiz(copyQuiz)
      answerQuestion(question.id)
      setQuestion(undefined)
    }
  }, [quiz, question, teams])

  useEffect(() => {
    getQuiz(params.id as string).then(setQuiz)
    getTeams().then(setTeams)
  }, [])

  return <div className='d-flex flex-column pb-2 h-100 justify-content-between'>
    <div style={{gridTemplateColumns: 'auto '.repeat(6)}} className='d-grid mb-5 h4'>
      <div></div>
      {[1, 2, 3, 4, 5].map(i => <Cell key={i} text={i * k} />)}
      {quiz && quiz.categories.map((category, i) => 
        <>
          <Cell key={i} text={category.name} />
          {category.questions.map((question, j) => {
            if (question.answered) {
              return <div></div>
            }
            return <Cell onClick={() => setQuestion(question)} key={i * 10 + j} />
          }
          )}
        </>
      )}
    </div>
    <Chart teams={teams} />
    <QuestionView question={question} teams={teams} pick={pickTeam} />
  </div>
}