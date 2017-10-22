import { Injectable } from "@angular/core";
import { Http, Response, Headers, ResponseOptions, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  private serviceUrl: string = 'http://localhost:52216/';
  
  public clientlist: [{
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

  public result: any[];

  constructor(private http: Http){ }
  
  getCourses() {
    return this.http.get('https://abt-api.azurewebsites.net/api/courses')
      .map((res: Response) => res.json());
  }

  getClients(id: string, name: string, document: string, report: string): any[] {
    
     this.result = this.clientlist;
 
     return this.clientlist;
   };


   getOptions(){
    var token = localStorage.getItem('mydb.token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${token}`);
    let options = new RequestOptions({ headers: headers });
    return options;
   }

/************************************************** Account **************************************************/ 

authenticate(command: any) {
  // var dt = "grant_type=password&username=" + command.username + "$password=" + command.password;
  // let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded' });
  // let options = new RequestOptions({headers:headers});
  // return this.http.post(this.serviceUrl + 'v1/authenticate', dt, options).map((res: Response) => res.json());

  return this.http.post(this.serviceUrl + 'v1/authenticate', command).map((res: Response) => res.json());
}

// validateToken(token: string){

//   if(token || token != ''){
//     return true;
//   }
//   return false;

// }

/*************************************************************************************************************/ 
/*
 * 
 * 
*/
/************************************************** Dashboard **************************************************/ 

createDashboards(command: any) {
    
  let options = this.getOptions();  
  this.http.post(this.serviceUrl + 'v1/dashboard', command);
}

  getDashboard(id: string) {
    
    let options = this.getOptions();    
    return this.http.get(this.serviceUrl + 'v1/dashboard/'+ id, options)
      .map((res: Response) => res.json());
  }

  getDashboardByUser(userid: string) {

    let options = this.getOptions();    
    return this.http.get(this.serviceUrl + 'v1/dashboarduser/'+ userid, options)
      .map((res: Response) => res.json());
  }

  getDashboardByIdAndUser(id: string, userid: string) {

    let options = this.getOptions();
    return this.http.get(this.serviceUrl + 'v1/dashboard/'+ id +'/' + userid, options)
      .map((res: Response) => res.json());
  }
/***************************************************************************************************************/ 
 /*
 * 
 * 
*/
/************************************************** Customer **************************************************/ 
// createUser(data: any) {
//   console.log(data);
// }

createCustomer(command: any) {
  
let options = this.getOptions();
  return this.http
    .post(this.serviceUrl + 'v1/customer', command, options)
    .map((res: Response) =>   
      res.json());
}

updateCustomer(command: any) {

  let options = this.getOptions();
  return this.http
    .put(this.serviceUrl + 'v1/customer', command, options)
    .map((res: Response) => res.json());
}

deleteCustomer(id: string) {

  let options = this.getOptions();
  this.http.delete(this.serviceUrl + 'v1/customer/'+ id, options)
  .map((res: Response) => res.json());
}

getCustomer(id: string) {

  let options = this.getOptions();
  return this.http.get(this.serviceUrl + 'v1/customer/'+ id, options)
    .map((res: Response) => res.json());
}

/**************************************************************************************************************/ 
/*
 * 
 * 
*/
/************************************************** User **************************************************/ 

getUserByFilter(id: string, document: string, dashboardname: string, username: string) {

  let options = this.getOptions();
  return this.http.get(this.serviceUrl + 'v1/user/'+ id + '/' + document + '/' + dashboardname + '/' + username, options)
    .map((res: Response) => res.json());
}

  getUser(id: string) {

    let options = this.getOptions();
    return this.http.get(this.serviceUrl + 'v1/user/'+ id, options)
      .map((res: Response) => res.json());
  }

/*********************************************************************************************************/ 


}

