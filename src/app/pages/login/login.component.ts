import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { DataService } from '../../services/data.service';
import { Ui } from '../../utils/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [Ui, DataService]
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public errors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ui: Ui,
    private ds: DataService,
    private router: Router) {

    this.form = this.fb.group({

      username: ['',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(160),
          Validators.required
        ])],

      password: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])]
    });

    var token = localStorage.getItem('mydb.token');

    if(token){
      
      var role = localStorage.getItem('mydb.role');
      if(role == '2')
      {
        this.router.navigateByUrl('/home');
      }
      else
      {
        this.router.navigateByUrl('/control');
      }
    }  

  }

  ngOnInit() {
  }

  checkEmail() {
    this.ui.lock('usernameControl');

    setTimeout(() => {
      this.ui.unlock('usernameControl');
    }, 3000);
  }

  showModal() {
    this.ui.setActive('modal');
  }

  hideModal() {
    this.ui.setInactive('modal');
  }

  submit() {
      this.ds
        .authenticate(this.form.value)
        .subscribe(result => {
            localStorage.setItem('mydb.token', result.token);
            localStorage.setItem('mydb.user', JSON.stringify(result.user));
            localStorage.setItem('mydb.role', JSON.stringify(result.user.profile));

            var role = localStorage.getItem('mydb.role'); 
            if(role == '2')
            {
              //this.router.navigate(['/home',id]);
              this.router.navigateByUrl('/home');
            }
            else
            {
              this.router.navigateByUrl('/control');
            }
          },
          error => {
            this.errors = JSON.parse(error._body).errors;
        });

  }
}
