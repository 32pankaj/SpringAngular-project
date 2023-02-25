import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId: any;
  title: any;
  question = {
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
  };

  constructor(
    private _activeRoute: ActivatedRoute,
    private _quesService: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this._activeRoute.snapshot.params['qId'];
    this.title = this._activeRoute.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId;
  }
  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }
    this._quesService.addQuestion(this.question).subscribe(
      (data) => {
        Swal.fire('Success', 'Sucessfully added', 'success');
      },
      (error) => {
        Swal.fire('error', 'Error in adding question', 'error');
      }
    );
  }
}
