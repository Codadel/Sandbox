import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assistance } from './assistance.model';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {

  private resourceUrl = 'https://mocki.io/v1/d7b5277d-ceb7-485e-86c7-2a3d9863c175';

  constructor(
    private httpClient: HttpClient
  ) { }

  findAll$(): Observable<Assistance[]> {
    return this.httpClient.get<Assistance[]>(this.resourceUrl);
  }

}
