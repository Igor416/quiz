import { useCallback, useEffect, useState } from 'react'
import { Question, Team } from '../JSONTypes'

declare var bootstrap: any;

interface QuestionViewProps {
  question?: Question,
  teams: Team[],
  pick: (i: number) => void
}

export default function QuestionView({question, teams, pick}: QuestionViewProps) {
  const [audio, setAudio] = useState<HTMLAudioElement>(document.getElementById('audio1') as HTMLAudioElement)
  const [trackId, setTrackId] = useState(1)

  useEffect(() => {
    if (!audio) {
      return 
    }
    if (question) {
      audio.play();
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    setTrackId(trackId === 3 ? 1 : trackId + 1)
  }, [question])

  useEffect(() => {
    setAudio(document.getElementById('audio' + trackId) as HTMLAudioElement)
  }, [trackId]) 

  const validate = useCallback((i: number) => {
    const correct = question?.correct === i + 1
    let isRed = false;
    const answer = document.getElementsByClassName('answer')[i] as HTMLDivElement;
    const interval = setInterval(() => {
      answer.style.backgroundColor = `var(--light-${isRed ? 'red' : 'green'})`
      isRed = !isRed
    }, 100)
    setTimeout(() => {
      clearInterval(interval)
      answer.style.backgroundColor = `var(--bs-${correct ? 'green' : 'red'})`
      if (correct) {
        let toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('toast'))
        toast.show()
      }
      setTimeout(() => {
        answer.style.backgroundColor = 'transparent'
      }, 2000)
    }, 2000)
  }, [question])

  return <div
    style={{
      zIndex: 1200,
      width: '100vw',
      height: '100vh',
      padding: '5rem 20vw',
      transform: `translateY(${question ? '0' : '-100'}vh)`,
      background: 'linear-gradient(135deg, var(--light-green), var(--bs-green) 74%)'
    }}
    className='position-absolute d-flex flex-column align-items-center transition start-0 top-0'
  >
    <div style={{overflowX: 'auto', height: 'calc(50vh - 5rem)'}} className='w-100 text-center my-5 p-5 border rounded-pill'>
      <h1>{question?.label}</h1>
    </div>
    <div style={{gridTemplateColumns: 'auto auto', height: 'calc(50vh - 5rem)'}} className='w-100 mt-5 d-grid'>
      {question?.answers.map((answer, i) => 
      <div onClick={() => validate(i)} key={i} className='answer onshadow text-center m-3 p-5 border rounded-pill'>
        <h1>{answer}</h1>
      </div>
      )}
    </div>
    <div
      id='toast'
      data-bs-autohide='false'
      style={{width: '60vw'}}
      className='toast position-fixed bottom-0 mb-5 transition hide p-3 rounded-pill bg-red'
    >
      <div className='btn-group d-flex'>
        {teams.map((team, i) => 
          <button key={i} data-bs-dismiss='toast' onClick={() => pick(i)} className='btn flex-grow-1 btn-lg bg-red text-white'>{team.name}</button>
        )}
      </div>
    </div>
    {[1, 2, 3].map(id => <audio id={`audio${id}`} src={`/static/assets/music${id}.mp3`} loop />)}
  </div>
}