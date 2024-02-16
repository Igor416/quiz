import { useState } from 'react';
import { Team } from '../JSONTypes';
import { ColorPaletteProps } from '..';

interface ChartProps extends ColorPaletteProps {
  teams: Team[]
}

export default function Chart({teams, colors}: ChartProps) {
  const [showen, show] = useState(true)

  return  <div className='d-flex flex-column flex-grow-1 justify-content-end col-12 h5'>
    {showen && <div className='d-flex flex-column flex-grow-1'>
      <div className='d-flex align-items-end flex-grow-1 justify-content-evenly border-bottom'>
        {teams.map((team, i) => 
          <div
            key={i}
            className={'d-flex flex-column justify-content-between h-100 transition px-5 pt-2 text-' + colors[i % 4]}
            style={{background: `linear-gradient(to top, var(--bs-${colors[i % 4]}) ${team.score / 75}%, white ${team.score / 75}%)`}}
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
    <button className='btn bg-primary mt-4 text-white' onClick={() => show(!showen)}>{showen ? 'Скрыть Счет' : 'Показать счет'}</button>
  </div>
}