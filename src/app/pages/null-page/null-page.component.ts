import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-null-page',
  templateUrl: './null-page.component.html'
  })
export class NullPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    this.router.navigateByUrl('/home');
  }

}
