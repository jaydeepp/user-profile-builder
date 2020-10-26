import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import {UserRoutingModule} from  './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from "@angular/material/table";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCard} from "@angular/material/card";
import {MatDatepickerModule} from '@angular/material/datepicker';



@NgModule({
  declarations: [UserCreateComponent, UserViewComponent, UserListComponent, UserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCard,
    MatDatepickerModule,
    UserRoutingModule
  ]
})
export class UserModule { }
