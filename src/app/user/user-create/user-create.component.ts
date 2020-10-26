import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup;
  userId: number;
  editMode: boolean;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      dob: ['', [Validators.required]],
      gender: [null, [Validators.required]],
      photo: [null, [Validators.required]]
    })

    if (this.route.snapshot.params.id) {
      this.userId = this.route.snapshot.params.id;
      this.setFormData();
    }
  }


  setFormData(): void {
    this.userService.read(this.userId)
      .subscribe(user => {
        this.userForm.setValue({
          firstname: user.firstname,
          lastname: user.lastname,
          dob: user.dob,
          gender: user.gender,
          photo: user.photo
        })
      }, err => {
        this.snackBar.open("Error while loading user details", "", {
          duration: 3000,
          verticalPosition: 'top'
        })
      })
  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.get('photo').setValue(file);
    }
  }

  onSubmit() {

    const formData = new FormData();
    const age = Math.floor((Math.abs(Date.now() - this.userForm.get('dob').value.getTime()) / (1000 * 3600 * 24)) / 365.25);
    formData.append('file', this.userForm.get('photo').value);
    formData.append('dob', this.userForm.get('dob').value);
    formData.append('age', "" + age);
    formData.append('gender', this.userForm.get('gender').value);
    formData.append('firstname', this.userForm.get('firstname').value);
    formData.append('lastname', this.userForm.get('lastname').value);
    this.userService.create(formData)
      .subscribe(() => {
        this.userForm.reset();
        this.snackBar.open("User created successfully", "", {
          duration: 3000,
          verticalPosition: 'top'
        })
        this.router.navigate(['/users'])
      }, err => {
        this.snackBar.open("Error while creating user", "", {
          duration: 3000,
          verticalPosition: 'top'
        })
      })
  }

  onCancel() {
    this.router.navigate(['/users'])
  }


}
