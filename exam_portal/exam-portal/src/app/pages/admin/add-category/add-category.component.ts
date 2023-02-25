import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {

  constructor(private _category:CategoryService,private snak:MatSnackBar){}
  category =
    {
      cId: '',
      title: '',
      description: '',
    }
   ;

   formSubmit(){
    if (this.category.title.trim()==''||this.category.title==null) {
      this.snak.open("Title required",'',{duration:3000})
      return;
    }
    this._category.addCategory(this.category).subscribe((data)=>{
      Swal.fire('Sucess','category is added Successsfully','success');

    },(error)=>{
       console.log(error);
      Swal.fire('Failed','Something went wrong','error');
    });
   }

}
