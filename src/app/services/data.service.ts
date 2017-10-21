import { Injectable } from "@angular/core";
import { Http, Response, Headers, ResponseOptions, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

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

  constructor(
    private http: Http
     
    // private requestOptions : RequestOptions ) 
  )
  {
      
  }
  
  getCourses() {
    return this.http.get('https://abt-api.azurewebsites.net/api/courses')
      .map((res: Response) => res.json());
  }

  getClients(id: string, name: string, document: string, report: string): any[] {
    
     this.result = this.clientlist;
 
     return this.clientlist;
   };

/************************************************** Account **************************************************/ 

authenticate(command: any) {
  // var dt = "grant_type=password&username=" + command.username + "$password=" + command.password;
  // let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded' });
  // let options = new RequestOptions({headers:headers});
  // return this.http.post(this.serviceUrl + 'v1/authenticate', dt, options).map((res: Response) => res.json());


  return this.http.post(this.serviceUrl + 'v1/authenticate', command).map((res: Response) => res.json());

}

/*************************************************************************************************************/ 
/*
 * 
 * 
*/
/************************************************** Dashboard **************************************************/ 

createDashboards(command: any) {
  this.http.post('http://localhost:52216/v1/dashboard', command,);
}

  getDashboard(id: string) {
    return this.http.get('http://localhost:52216/v1/dashboard/'+ id)
      .map((res: Response) => res.json());
  }

  getDashboardByUser(userid: string) {
    return this.http.get('http://localhost:52216/v1/dashboarduser/'+ userid)
      .map((res: Response) => res.json());
  }

  getDashboardByIdAndUser(id: string, userid: string) {
    return this.http.get('http://localhost:52216/v1/dashboard/'+ id +'/' +userid)
      .map((res: Response) => res.json());
  }
/***************************************************************************************************************/ 
 /*
 * 
 * 
*/
/************************************************** Customer **************************************************/ 
createUser(data: any) {
  console.log(data);
}

createCustomer(command: any) {
  return this.http
    .post(this.serviceUrl + 'v1/customer', command)
    .map((res: Response) =>   
      res.json());
        //  .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"));
}

updateCustomer(command: any) {
  return this.http
    .put(this.serviceUrl + 'v1/customer', command)
    .map((res: Response) => res.json());
}

deleteCustomer(id: string) {
  console.log(id);
  //this.http.delete('http://localhost:52216/v1/customer',);
}

getCustomer(id: string) {
  return this.http.get('http://localhost:52216/v1/customer/'+ id)
    .map((res: Response) => res.json());
}

/**************************************************************************************************************/ 
/*
 * 
 * 
*/
/************************************************** User **************************************************/ 

getUserByFilter(id: string, document: string, dashboardname: string, username: string) {
  return this.http.get('http://localhost:52216/v1/user/'+ id + '/' + document + '/' + dashboardname + '/' + username)
    .map((res: Response) => res.json());
}

  getUser(id: string) {
    return this.http.get('http://localhost:52216/v1/user/'+ id)
      .map((res: Response) => res.json());
  }

/*********************************************************************************************************/ 


}

