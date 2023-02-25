import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  cId: any;
  Quizzes:any=[];

  // constructor
  constructor(private _route: ActivatedRoute,private _quizService:QuizService) {}

  // Ng On intit
  ngOnInit(): void {
    this.cId=this._route.snapshot.params['cId'];
    console.log("cid"+this.cId);


this._route.params.subscribe((params)=>{
  this.cId=params['cId'];
  if (this.cId==0) {
    // load all quiz
    console.log("Load all quiz");
    this._quizService.getActiveQuizzes().subscribe((data)=>{
      this.Quizzes=data;
      console.log(this.Quizzes);

    },(error)=>{
      Swal.fire('Error','Unable to load quiz','error');
    });
  } else {
    // Load quid by Id
    this._quizService.getActiveQuizzesOfCategory(this.cId).subscribe((data)=>{
      this.Quizzes=data;
      console.log(this.Quizzes);

    },(error)=>{
      Swal.fire('Error','Unable to load quiz','error');
    });
  }

});


  }
}
