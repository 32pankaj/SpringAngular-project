import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categories: any;
  constructor(
    private _catService: CategoryService,
    private _snak: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categories = this._catService.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        this._snak.open('Error in loading file ', '', { duration: 3000 });
      }
    );
  }
}
