import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestion: '',
    active: '',
    category: { cId: '' },
  };
  categories: any;
  constructor(
    private _activeRouter: ActivatedRoute,
    private _quizService: QuizService,
    private _cat: CategoryService,
    private _router:Router
  ) {}
  ngOnInit(): void {
    this.qId = this._activeRouter.snapshot.params['qId'];
    // alert(this.qId);
    this._quizService.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('error', 'Error loding in quiz', 'error');
      }
    );
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('error', 'Error loding Category', 'error');
      }
    );
  }

  onSelect(_t25: any, _t26: number) {
    this.quiz.category = this.categories[_t26];
  }
  updateQuiz() {
    this._quizService.updQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire('Sucess', 'Updated Sucessfuly', 'success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('error', 'Error Updateding', 'error');
      }
    );}
}
