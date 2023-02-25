import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  qId: any;
  title: any;
  questions = [
    {
      quesId: '',
      content: '',
      image: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      quiz: {
        qId: '',
        title: '',

        // "description": null,
        // "maxMarks": null,
        // "numberOfQuestion": null,
        // "active": false,
        // "category": null
      },
    },
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _quesService: QuestionService,
    private _snak:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qId = this._activatedRoute.snapshot.params['qId'];
    this.title = this._activatedRoute.snapshot.params['title'];
    this._quesService.getQuestions(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in loding Question', 'error');
      }
    );
  }

  public delQues(quesId:any){

    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this question'
    }).then((result)=>{
      if (result.isConfirmed) {
        this._quesService.deleteQyestion(quesId).subscribe(
          (data: any) => {

            this._snak.open('Question Deleted','',{
              duration:3000
            });
            this.questions=this.questions.filter((q)=>q.quesId!=quesId);
            console.log(data);
          },
          (error: any) => {
            console.log(error);
            this._snak.open('Error in deleting Question','',{
              duration:3000
            });
          }
        );
      }
    });

  }
}
