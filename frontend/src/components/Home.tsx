import { useCallback, useEffect, useState } from 'react'
import { Quiz, Team } from '../JSONTypes'
import { getQuizes, getTeams, sendTeams } from '../api'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const dummy = {name: '', score: 0}
  const [quizes, setQuizes] = useState<Quiz[]>([])
  const [teams, setTeams] = useState<Team[]>([dummy, dummy])

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
    console.log(i)
    const copy = [...teams]
    copy[i] = {name: name, score: 0}
    setTeams(copy)
  }

  useEffect(() => {
    getQuizes().then(setQuizes)
    getTeams().then(setTeams)
  }, [])

  return <div className='d-flex'>
    <div className='col-5 d-flex flex-column'>
      <h4>Выберите игру</h4>
      <div className='d-flex flex-column m-2 mt-4 h5'>
        {quizes.map((quiz, i) => 
          <Link
            key={i}
            to={'quiz/' + quiz.id}
            className='quiz d-flex justify-content-between align-items-center p-3 mb-2 transition bg-green no-link'
          >
            <span>{i + 1}. {quiz.name}</span>
            <FontAwesomeIcon icon={faAngleRight} className='transition' />
          </Link>
        )}
      </div>
    </div>
    <div className='col-2'></div>
    <div className='col-5 d-flex flex-column'>
      <div className='d-flex'>
        <h4>Количество команд {teams.length}</h4>
        <div className='d-flex flex-column ms-2'>
          <FontAwesomeIcon icon={faAngleUp} onClick={addTeam} />
          <FontAwesomeIcon icon={faAngleDown} onClick={deleteTeam} />
        </div>
      </div>
      <div className='d-flex flex-column m-2 mt-4 h5'>
        {teams.map((team, i) => 
          <div key={i} className='onshadow d-flex p-3 mb-2 bg-green'>
            <span>{i + 1}. </span>
            <input
              className='ms-2 border-0 border-bottom outline-0 text-white bg-green flex-grow-1'
              value={team.name}
              onChange={(e) => editTeamName(e.target.value, i)}
            />
          </div>
        )}
      </div>
      <div className='d-flex justify-content-end'>
        <button className='btn bg-green' onClick={() => sendTeams(teams)}>Сохранить команды</button>
      </div>
    </div>
  </div>
}