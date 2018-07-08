import { Component, OnInit } from '@angular/core';
import {HttpClient} from '../extra-services/http-client.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(protected http: HttpClient) { }

  ngOnInit() {
    console.log('landing on init');
  }

  public async sendRequest() {
    console.log('send request');
    this.http.get("/users").subscribe((response => {
      console.log(response);
    }));
  }

}
