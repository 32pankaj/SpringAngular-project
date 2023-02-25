import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  categories = [
    {
      cId: '',
      title: '',
      description: '',
    }
  ];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active:'',
    category:null
  }
  constructor(private catService:CategoryService,private snack:MatSnackBar,private _quize:QuizService){}
  ngOnInit(): void {
    this.catService.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(data);

    },
    (error)=>{
      console.log(error);
      Swal.fire('error','Unable to load data','error');
    });
  }

  public addQuiz(){
    if (this.quizData.title.trim()==''||this.quizData.title==null) {

      this.snack.open("Title required",'',{duration:3000});
      return;
    }

    //send server to add
    this._quize.addQuiz(this.quizData).subscribe((data:any)=>{
      Swal.fire('Success','Quize is added sucessfully','success');
      this.quizData={
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestion:'',
        active:'',
        category:null
      }
    }
    ,
      (error)=>{
        Swal.fire('error','Error in adding wuiz','error');
        console.log(error);
      });

  }
}
