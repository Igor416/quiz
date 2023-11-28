interface CentralizerProps {
  className: string,
  children: React.ReactNode[]
}

export default function Centralizer({className, children}: CentralizerProps) {
  return <>
    <div className='col-1'></div>
    <div className={'col-10 ' + className}>
      {children}
    </div>
    <div className='col-1'></div>
  </>
}