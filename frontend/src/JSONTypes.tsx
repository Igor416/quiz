export interface Question {
  id: string,
  value: number,
  label: string,
  answers: string[],
  answered: boolean,
  correct: number,
  category: string
}

export interface Category {
  id: string,
  name: string,
  questions: Question[]
}

export interface Quiz {
  id: string,
  name: string,
  categories: Category[]
}

export interface Team {
  name: string,
  score: number
}