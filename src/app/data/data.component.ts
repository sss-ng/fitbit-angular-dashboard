import { Component, OnInit } from '@angular/core';
import { Router, DefaultUrlSerializer, UrlTree } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  access_token: string;
  date_created: number;
  user_id: string;
  scope: any

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    let url = this.router.url.replace('#', '?'); // so that it can be parsed
    let urlSerializer = new DefaultUrlSerializer();
    let urlTree: UrlTree = urlSerializer.parse(url);
    let queryParams = urlTree.queryParams;

    this.access_token = queryParams['access_token'];
    this.user_id = queryParams['user_id'];
    this.date_created = Date.now();
    this.scope = queryParams['scope']
    console.log('data is', this.access_token, this.user_id, this.date_created, this.scope);

    this.getData();
  }

  getData() {
    const api_url = `https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec.json`;
    const url =
      'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec.json';
      //'https://api.fitbit.com/1/user/-/activities/heart/date/[date]/[end-date]/[detail-level].json';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.access_token,
      }),
    };
    this.http.get(api_url, httpOptions).subscribe((data) => {
      console.log(data); // it worked
    });
  }
}
