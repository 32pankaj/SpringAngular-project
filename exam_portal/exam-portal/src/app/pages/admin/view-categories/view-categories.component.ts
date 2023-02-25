import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories = [
    {
      cId: '',
      title: '',
      description: '',
    },
  ];
  index:number=0;
  constructor(
    private _category: CategoryService,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in loding data error', 'error');
      }
    );
  }

  delMr(val: any) {
    this.remObj(val);
  }
  remObj(key: any) {

    this.index = this.categories.indexOf(key);
    this.confirmBox(this.categories[this.index].cId,this.categories[this.index].title,this.categories[this.index].description);
    // this.categories.forEach((value, index) => {
    //   if (value.cId == key) {
    //     this.categories.splice(index, 1);
    //     Swal.fire('clicked me ', ' its of', 'success');
    //   }
    // });
  }



  confirmBox(cId:any,title:any,desc:any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      html:'<p align="left"> <b>Id:</b>'+ `${cId}`+'</p> <p align="left"><b>Title:</b> '+ `${title}`+'</p><p align="left"> <b>Description:</b>'+ `${desc}`+'</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.categories.splice(this.index, 1);
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}





