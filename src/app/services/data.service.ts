import { Injectable } from "@angular/core";
import { Http, Response, Headers, ResponseOptions, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  //private serviceUrl: string = 'http://localhost:52216/';      // Dev
   private serviceUrl: string = 'http://api.gemni.com.br:8080/'; // Prod
  
  constructor(private http: Http) { }

  getOptions() {
    var token = localStorage.getItem('mydb.token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${token}`);
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  /************************************************** Account **************************************************/

  authenticate(command: any) {
    return this.http
      .post(this.serviceUrl + 'v1/authenticate', command).map((res: Response) => res.json());
  }


  /*************************************************************************************************************/
  

  /************************************************** Dashboard **************************************************/

  createDashboards(command: any[]) {
    
    let options = this.getOptions();
    return this.http
      .post(this.serviceUrl + 'v1/dashboard', command, options)
      .map((res: Response) => res.json());
  }

  getDashboard(id: any) {

    let options = this.getOptions();
    return this.http
      .get(this.serviceUrl + 'v1/dashboard/' + id, options)
      .map((res: Response) => res.json());
  }

  getDashboardByClient(clientid: any) {

    let options = this.getOptions();
    return this.http
      .get(this.serviceUrl + 'v1/dashboardclient/' + clientid, options)
      .map((res: Response) => res.json());
  }

  getDashboardByUser(userid: any) {
    
        let options = this.getOptions();
        return this.http
          .get(this.serviceUrl + 'v1/dashboarduser/' + userid, options)
          .map((res: Response) => res.json());
      }
    
  getDashboardByIdAndUser(id: string, userid: string) {

    let options = this.getOptions();
    return this.http
      .get(this.serviceUrl + 'v1/dashboard/' + id + '/' + userid, options)
      .map((res: Response) => res.json());
  }
  /***************************************************************************************************************/
 

  /************************************************** Customer **************************************************/
  createCustomer(command: any) {

    let options = this.getOptions();
    return this.http
      .post(this.serviceUrl + 'v1/customer', command, options)
      .map((res: Response) => res.json());
  }

  updateCustomer(command: any) {

    let options = this.getOptions();
    return this.http
      .put(this.serviceUrl + 'v1/customer', command, options)
      .map((res: Response) => res.json());
  }

  deleteCustomer(id: string) {

      let options = this.getOptions();
      return this.http
        .delete(this.serviceUrl + 'v1/customer?id=' + id, options)
        .map((res: Response) => res.json());
  }

  getCustomer(id: string) {

    let options = this.getOptions();
    return this.http
      .get(this.serviceUrl + 'v1/customer/' + id, options)
      .map((res: Response) => res.json());
  }

  /**********************************************************************************************************/
 

  /************************************************** User **************************************************/

  getUserByFilter(document: any, dashboardname: any, username: any, company: any) {

    let options = this.getOptions();
    return this.http
      .get(this.serviceUrl + 'v1/user/' + document + '/' + dashboardname + '/' + username +'/'+ company, options)
      .map((res: Response) => res.json());
  }

  getUser(id: string) {

    let options = this.getOptions();
    return this.http
      .get(this.serviceUrl + 'v1/user/' + id, options)
      .map((res: Response) => res.json());
  }

  getUserDashboardInfo(id: string) {
    
        let options = this.getOptions();
        return this.http
          .get(this.serviceUrl + 'v1/userdbinfo/' + id, options)
          .map((res: Response) => res.json());
      }

  resetEmail(email: any) {
      let options = this.getOptions();
      return this.http
        .get(this.serviceUrl + 'v1/useremail/' + email , options)
        .map((res: Response) => res.json());
      }

  /*********************************************************************************************************/
}

