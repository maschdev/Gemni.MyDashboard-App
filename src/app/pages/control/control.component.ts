import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { Ui } from '../../utils/ui';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  providers: [Ui, DataService]
})
export class ControlComponent implements OnInit {

  public clientlist: any[];

  public id: string;
  public report: string;
  public client: string;
  public document: string;
  public company: string;

  public form: FormGroup;
  public emptyfields: boolean = false;

  constructor(
    private ui: Ui,
    private ds: DataService,
    private fb: FormBuilder,
    private router: Router) {

    this.clientlist = [];

    var user = JSON.parse(localStorage.getItem('mydb.user'));
    var role = JSON.parse(localStorage.getItem('mydb.role'));

    if (user && role != 1) {
      this.router.navigateByUrl('/logon');
      localStorage.clear();
    }

    this.form = this.fb.group({

      id: ['', Validators.compose([
        Validators.minLength(1)
      ])],

      report: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160)
      ])],

      document: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(18),
      ])],

      company: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(160)
      ])],

      client: ['', Validators.compose([
        Validators.minLength(3)
      ])]

    });
  }

  ngOnInit() { }

  search() {
    
    if ((this.form.value.id == "" || this.form.value.id == null) && 
        this.form.value.client == "" && 
        this.form.value.report == "" && 
        this.form.value.document == "" &&  
        this.form.value.company == "" ) {
      
          this.emptyfields = true;
      return false;
    }
    else {
      
      this.emptyfields = false;
      var _document = this.form.value.document == '' ? null : this.form.value.document;
      var _report = this.form.value.report == '' ? null : this.form.value.report;
      var _client = this.form.value.client == '' ? null : this.form.value.client;
      var _company = this.form.value.company == '' ? null : this.form.value.company;

      this.ds.getUserByFilter(_document, _report, _client, _company)
        .subscribe(result => {

          if (result.data.users.length >= 1) {

            if(this.clientlist.length > 0)
            {
              this.clientlist.pop();
            }

            result.data.users.forEach(user => {
              
              this.clientlist.push({
                Id: user.id,
                Name: user.name,
                Document: user.document
              });

            });
          }

        });

    }

  }

  register() {
    localStorage.removeItem("mydb.id");
    this.router.navigate(['/register']);
  }

  resetError() {
    this.emptyfields = false;
  }

}
