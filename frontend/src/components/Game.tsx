import { useCallback, useEffect, useState } from 'react'
import { Question, Quiz, Category, Team } from '../JSONTypes'
import { answerQuestion, getQuiz, getTeams, updateTeam } from '../api'
import { useParams } from 'react-router-dom'
import Cell from './Cell'
import QuestionView from './QuestionView'
import Chart from './Chart'
import Centralizer from './Centralizer'
import { ColorPaletteProps } from '..'

export default function Game({colors}: ColorPaletteProps) {
  const params = useParams()
  const k = 200
  const [quiz, setQuiz] = useState<Quiz>()
  const [question, setQuestion] = useState<Question>()
  const [teams, setTeams] = useState<Team[]>([])
  const [list, setList] = useState<Array<Question | undefined>>([])

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
    getQuiz(params.id as string).then(resp => {
      setQuiz(resp)
      const l = [];
      for (let category of resp.categories) {
        l.push(undefined)
        for (let question of category.questions) {
          l.push(question)
        }
      }
      setList(l);
    })
    getTeams(params.id as string).then(setTeams)
  }, [])

  return <div className='d-flex flex-grow-1 pt-2 h-100'>
    <Centralizer className='d-flex flex-column h-100 py-2 justify-content-between'>
      <div style={{gridTemplateColumns: 'auto '.repeat(6)}} className='d-grid my-5 h4'>
        <div></div>
        {[1, 2, 3, 4, 5].map(i => <Cell key={i} text={i * k} />)}
        {quiz && list.map((question, i) => {
          if (question) {
            if (question.answered) {
              return <div></div>
            }
            return <Cell onClick={() => setQuestion(question)} key={i} />
          }
          return <Cell key={i} text={quiz.categories[Math.floor(i / 6)].name} />
        })}
      </div>
      <Chart teams={teams} colors={colors} />
      <QuestionView question={question} teams={teams} pick={pickTeam} />
    </Centralizer>
  </div>
}