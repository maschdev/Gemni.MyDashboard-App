import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { DataService } from '../../services/data.service'
import { Ui } from '../../utils/ui';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [Ui, DataService]

})
export class SignUpPageComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ui: Ui,
    private ds: DataService
  ) {

    // this.form = this.fb.group({

    //         email: ['',
    //           Validators.compose([
    //             Validators.minLength(5),
    //             Validators.maxLength(160),
    //             Validators.required,
    //             CustomValidator.EmailValidator
    //           ])],

    //         password: ['', Validators.compose([
    //           Validators.minLength(5),
    //           Validators.maxLength(160),
    //           Validators.required
    //         ])]
    //       });
  }

  ngOnInit() {
  }

}
