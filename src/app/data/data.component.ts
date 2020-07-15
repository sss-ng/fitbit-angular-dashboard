import { Component, OnInit } from '@angular/core';
import { Router, DefaultUrlSerializer, UrlTree } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  accessToken: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    let url = this.router.url.replace('#', '?'); // so that it can be parsed
    let urlSerializer = new DefaultUrlSerializer();
    let urlTree: UrlTree = urlSerializer.parse(url);
    let queryParams = urlTree.queryParams;

    let access_token = queryParams['access_token'];
    this.accessToken = access_token;
    let user_id = queryParams['user_id'];
    let date_created = Date.now();
    console.log('data is', access_token, user_id, date_created);

    this.getData();
  }

  getData() {
    let api_url = `https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec.json`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.accessToken,
      }),
    };
    this.http.get(api_url, httpOptions).subscribe((data) => {
      console.log(data);
    });
  }
}
