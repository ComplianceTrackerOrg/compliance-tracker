import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_ALL_REQUIREMENTS } from './requirements.graphql';

@Injectable({
  providedIn: 'root',
})
export class RequirementsService {
  //initiate the new Loading variable via BehaviorSubject and set it to "true" from the beginning.
  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(private apollo: Apollo) {}

  getAllRequirements(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_REQUIREMENTS,
      })
      .valueChanges.pipe(
        map((result) => {
          return (result?.data as any)?.compliance_resourceCollection?.edges;
        })
      );
  }
}
