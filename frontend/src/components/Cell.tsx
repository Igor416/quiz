interface CellProps {
  text?: any,
  onClick?: () => void
}

export default function Cell({text, onClick}: CellProps) {
  return <div onClick={onClick} className='m-2 text-center p-2 bg-green onshadow'>{text}</div>
}