import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { GET_ALL_TRAININGS, GET_MY_TRAININGS } from './trainings.graphql';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  //initiate the new Loading variable via BehaviorSubject and set it to "true" from the beginning.
  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(private apollo: Apollo) { }

  getAllTrainings(): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_ALL_TRAININGS
    })
      .valueChanges.pipe(map((result) => {
        console.log('result', result?.data)
        console.log('learning_resourceCollection', (result?.data as any)?.learning_resourceCollection?.edges)
        return (result?.data as any)?.learning_resourceCollection?.edges
      }))
  }

  getMyTrainings(userId: number): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_MY_TRAININGS,
      variables: { userId }
    })
      .valueChanges.pipe(map((result) => {
        return (result?.data as any)?.assigned_learning_resourceCollection?.edges
      }))
  }
}
