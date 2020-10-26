import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  users: User[];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getUsers();
  }

  getUsers() {
    this.userService.list()
      .subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreateUser() {
    this.router.navigate(['create'], { relativeTo: this.route })
  }

  onEditUser(user: User) {
    this.router.navigate([user.id, 'edit'], { relativeTo: this.route })
  }

  onDeleteUser(user: User) {
    this.userService.delete(user.id)
      .subscribe(res => {
        this.getUsers();
        this.snackBar.open("User created successfully", "", {
          duration: 3000,
          verticalPosition: 'top'
        })
      }, () => {
        this.snackBar.open("Error while deleting the user", "", {
          duration: 3000,
          verticalPosition: 'top'
        })
      })
  }
}
