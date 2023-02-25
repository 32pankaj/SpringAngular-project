import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [
    {
      qId: 23,
      title: 'Basic Java',
      description: ' related Java',
      maxMarks: '50',
      noOfQuestions: '20',
      active: '',
      category: {
        title: ' java round',
      },
    },
    {
      qId: 23,
      title: 'Basic Java',
      description: ' related Java',
      maxMarks: '50',
      numberOfQuestion: '20',
      active: '',
      category: {
        title: ' java round',
      },
    },
  ];
  constructor(private quizService: QuizService) {}
  ngOnInit(): void {
    this.quizService.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loding data', 'error');
      }
    );
  }
  delQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are  your sure want to delete',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(qId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((data) => data.qId != qId);
            Swal.fire('Success', 'Quize is deleted sucessfully', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error!', 'Error in loding data', 'error');
          }
        );
      }
    });
  }

  public updStatus(quizData:any){
    this.quizService.updQuiz(quizData).subscribe(
      (data: any) => {
        Swal.fire('Sucess', 'Updated Sucessfuly', 'success');
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('error', 'Error Updateding', 'error');
      }
    );
  }
}
