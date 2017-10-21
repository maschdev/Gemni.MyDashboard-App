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

  public form: FormGroup;
  public emptyfields: boolean = false;

  constructor(
    private ui: Ui,
    private ds: DataService,
    private fb: FormBuilder,
    private router: Router) {

      var user = JSON.parse(localStorage.getItem('mydb.user'));
      var role = JSON.parse(localStorage.getItem('mydb.role'));

          if(user && role != 1){
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

      client: ['', Validators.compose([
        Validators.minLength(3)
      ])]

    });
  }

  ngOnInit() {

    this.clientlist = [{
      Id: 1,
      Name: "Caio",
      Document: "391.533.788-90",
      Report: "Movimento"
    },
    {
      Id: 2,
      Name: "Rapha",
      Document: "421.533.788-90",
      Report: "Estoque"
    }];
  }

  search() {
    if ((this.form.value.id == "" || this.form.value.id == null) && this.form.value.client == "" && this.form.value.report == "" && this.form.value.document == "") {
      this.emptyfields = true;
      return false;
    }
    else {

      this.emptyfields = false;

      //alert('buscar relatório');

      //this.ds.getClients(this.id, this.client, this.document, this.report)

      // this.ds
      // .getDashboards().subscribe(result => {
      //   console.log(result);
      // }
      // , error => {
      //   console.log(error);
      // });

    }

  }
  
  register(){
    this.router.navigate(['/register']);
    }

  resetError() {
    this.emptyfields = false;
  }

}
