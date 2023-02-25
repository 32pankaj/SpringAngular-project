import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qId='';
  quiz:any;
  constructor(private _activeRouter:ActivatedRoute,private _quizService:QuizService){

  }

  ngOnInit(): void {
    this.qId=this._activeRouter.snapshot.params['qId'];
    this.quiz=this._quizService.getQuiz(this.qId).subscribe((data)=>{
        this.quiz=data;
        console.log(this.quiz);
    },(error)=>{
      Swal.fire('error','Error in loding data','error');
    });

  }

}
