import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
//import { Ui } from '../../utils/ui';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [DataService]
})

export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public id: any;
  public name: string;
  public document: string;
  public phone: string;
  public email: string;
  public errors: any[] = [];
  private client: any;

  //private sub: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ds: DataService) {

    var user = JSON.parse(localStorage.getItem('mydb.user'));
    var role = JSON.parse(localStorage.getItem('mydb.role'));

    if (localStorage['mydb.user'] == undefined) {
      this.router.navigateByUrl('/logon');
    }

    if (role != 1) {
      this.router.navigateByUrl('/logon');
      localStorage.clear();
    }

    this.id = localStorage.getItem('mydb.id');
    localStorage.removeItem('mydb.id');
    this.id = !this.id ? 0 : this.id;

    this.form = this.fb.group({

      id: [this.id],

      email: ['',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(160),
          Validators.required,
          CustomValidator.EmailValidator
        ])],

      firstname: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required
        ])],

      lastname: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required
        ])],


      document: ['',
        Validators.compose([
          Validators.minLength(11), // Sem pontos e traço
          Validators.maxLength(18), // Com pontos, traço e barra
          Validators.required
        ])],

      phone: ['',
        Validators.compose([
          Validators.minLength(9), // Sem DDD
          Validators.maxLength(12), // Com DDD
          Validators.required
        ])]
    });
  }

  ngOnInit() {

    if (this.id != 0) {

      this.ds.getCustomer(this.id)
        .subscribe(result => {

          this.form.controls["id"].setValue(result.data.id);
          this.form.controls["firstname"].setValue(result.data.firstName);
          this.form.controls["lastname"].setValue(result.data.lastName);
          this.form.controls["document"].setValue(result.data.document);
          this.form.controls["email"].setValue(result.data.email);
          this.form.controls["phone"].setValue(result.data.phone);

        });
    }
  }

  submit() {

    if (this.form.controls["id"].value == 0) {
      this.ds.createCustomer(this.form.value)
        .subscribe(result => {
          alert('Mensagem sucesso');
        },
        error => {
          this.errors = JSON.parse(error._body).errors;
        });
    }
    else {
      this.ds.updateCustomer(this.form.value)
        .subscribe(result => {
          alert('Mensagem sucesso');
        },
        error => {
          this.errors = JSON.parse(error._body).errors;
        });
    }
  }

  reset() {
    localStorage.removeItem("mydb.id");
  }

}
