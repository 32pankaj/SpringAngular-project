import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}
  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quizData: any) {
    return this._http.post(`${baseUrl}/quiz/`, quizData);
  }
  public deleteQuiz(qId: any) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }
  public getQuiz(qId: any) {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }
  public updQuiz(quizData: any) {
    return this._http.put(`${baseUrl}/quiz/`, quizData);
  }
  // get quizzes of category
  public getQuizzesOfCategory(cId: any) {
    return this._http.get(`${baseUrl}/quiz/category/${cId}`);
  }
  // Get active quizzes
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active/`);
  }
   // Get active quizzes of category
   public getActiveQuizzesOfCategory(cId:any){
    return this._http.get(`${baseUrl}/quiz/category/active/${cId}`);
  }
}
