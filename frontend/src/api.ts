import { Question, Quiz, Team } from "./JSONTypes"
import Cookies from 'js-cookie';

export function getAuthStatus(): Promise<boolean> {
	return sendGetRequest<boolean>('logged_in');
}

export function getQuizes(): Promise<Quiz[]> {
	return sendGetRequest<Quiz[]>('quizes')
}

export function getQuiz(id: string): Promise<Quiz> {
	return sendGetRequest<Quiz>('quiz/' + id)
}

export function answerQuestion(id: string) {
	sendGetRequest<Question>('answer_question/' + id)
}

export function getTeams(): Promise<Team[]> {
	return sendGetRequest<Team[]>('teams')
}

export function sendTeams(teams: Team[]) {
	console.log(teams)
	for (let team of teams) {
		sendPostRequest<Team>('teams', team)
	}
}

export function updateTeam(team: Team) {
	sendPostRequest<Team>('team/' + team.name, team, 'PATCH')
}

async function sendPostRequest<T, R = T>(url: string, body: T, method = 'POST'): Promise<R> {
	const options = {
		method: method,
		headers: {
			'X-CSRFToken': Cookies.get('csrftoken') as string,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}
	const response = await fetch('api/' + url + '/', options);
	const data = await response.json();
	return data;
}

async function sendGetRequest<T>(url: string): Promise<T> {
	const response = await fetch('api/' + url + '/');
	const data = await response.json();
	return data;
}
