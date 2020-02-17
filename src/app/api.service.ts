import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getRepos(date : string, page : number) {
  return this.httpClient.get(`https://api.github.com/search/repositories?q=created:>`+date+`&sort=stars&order=desc&page=${page}`);
  }
}
