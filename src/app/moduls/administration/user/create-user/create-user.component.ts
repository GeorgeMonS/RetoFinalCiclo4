import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validations from 'src/app/validations/validations';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  form: FormGroup = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    DocumentId: new FormControl(''),
    Cellphone: new FormControl(''),
    Address: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      LastName: ['', Validators.required],
      DocumentId: ['', Validators.required],
      Cellphone: ['', [Validators.required, Validators.minLength(7)]],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms:[false, Validators.requiredTrue]
    },
    {
      validators: [validations.match('Password', 'confirmPassword')]
    }
    );
  }

  get f():{[key:string]: AbstractControl}{
    return this.form.controls;
  }

  onSubmit(): void{
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset():void{
    this.submitted = false;
    this.form.reset();
  }

}
