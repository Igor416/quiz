import { useCallback, useEffect, useState } from 'react'
import { Quiz, Team } from '../JSONTypes'
import { getQuizes} from '../api'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleUp, faAngleDown, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import Centralizer from './Centralizer';
import { ColorPaletteProps } from '..';

export default function Home({colors}: ColorPaletteProps) {
  const dummy = {name: '', score: 0}
  const [quizes, setQuizes] = useState<Quiz[]>([])
  const [teams, setTeams] = useState<Team[]>([dummy, dummy, dummy, dummy])

  const addTeam = useCallback(() => {
    if (teams.length === 10) {
      return
    }
    const copy = [...teams]
    copy.push(dummy)
    setTeams(copy)
  }, [teams])

  const deleteTeam = useCallback(() => {
    if (teams.length === 2) {
      return
    }
    const copy = [...teams]
    copy.pop()
    setTeams(copy)
  }, [teams])

  const editTeamName = (name: string, i: number) => {
    const copy = [...teams]
    copy[i] = {name: name, score: 0}
    setTeams(copy)
  }

  useEffect(() => {
    getQuizes().then(setQuizes)
  }, [])

  return <div className='d-flex pt-2 h-100'>
    <Centralizer className='d-flex pt-5 mt-5'>
      <div className='col-5 d-flex flex-column'>
        <h3>Выберите игру</h3>
        <div className='d-flex flex-column my-2 mt-4 h5'>
          {quizes.map((quiz, i) => 
            <Link
              key={i}
              to={'quiz/' + quiz.id}
              className={'quiz d-flex justify-content-between align-items-center p-3 mb-2 transition no-link bg-' + colors[i % 4]}
            >
              <span>{i + 1}. {quiz.name}</span>
              <FontAwesomeIcon icon={faAngleRight} className='transition' />
            </Link>
          )}
        </div>
      </div>
      <div className='col-2'></div>
      <div className='col-5 d-flex flex-column'>
        <h3 className='mb-4'>Правила:</h3>
        <h4>Участники:</h4>
        <ul>
          <li>Ведущий (учитель)</li>
          <li>Команды учеников (&gt;2)</li>
        </ul>
        <h4 className='mt-4'>Цель Игры:</h4>
        <span>Набрать больше баллов чем соперники</span>
        <h4 className='mt-4'>Ход Игры:</h4>
        <p>Определившиеся команды учеников устанавливают между собой, или получают от учителя, очередь ответов на вопросы. Команда, чья очередь настала, выбирает категорию вопроса и цену вопроса, после чего учитель выбирает указанный вопрос, если он не был ранее выбран этой же командой или любой другой. Команда, выбравшая вопрос получает право ответить на вопрос первыми. В случае верного ответа, ведущий присуждает ответившей команде полагающиеся число баллов. Иначе, команда уступает свой ход следующей команде, которая уже выбирает из меньше кол-ва ответов. Вопрос нельзя пропустить, хотя бы одна команда должна получить надлежащие баллы. Данные правила не единственные и могут быть изменены по воле ведущего. Система штрафов предусмотрена ведущим.</p>
      </div>
    </Centralizer>
  </div>
}