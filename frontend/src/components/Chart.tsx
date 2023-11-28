import { useState } from 'react';
import { Team } from '../JSONTypes';

interface ChartProps {
  teams: Team[]
}

export default function Chart({teams}: ChartProps) {
  const [showen, show] = useState(true)

  return  <div className='d-flex flex-column flex-grow-1 justify-content-end col-12 h5'>
    {showen && <div className='d-flex flex-column flex-grow-1'>
      <div style={{borderColor: 'var(--bs-green)'}} className='d-flex align-items-end flex-grow-1 justify-content-evenly border-bottom'>
        {teams.map((team, i) => 
          <div
            key={i}
            className={'d-flex flex-column justify-content-between h-100 transition px-5 pt-2 text-green'}
            style={{background: `linear-gradient(to top, var(--bs-green) ${team.score / 150 * teams.length}%, white ${team.score / 150 * teams.length}%)`}}
          >
            <span>{team.score}</span>
          </div>
        )}
      </div>
      <div className='d-flex justify-content-evenly'>
        {teams.map((team, i) => 
          <span key={i} className='pt-2'>{team.name}</span>
        )}
      </div>
    </div>}
    <button className='btn bg-green mt-4 text-white' onClick={() => show(!showen)}>{showen ? 'Скрыть Счет' : 'Показать счет'}</button>
  </div>
}