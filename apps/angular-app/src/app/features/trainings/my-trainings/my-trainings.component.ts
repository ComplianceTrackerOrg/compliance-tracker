import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import {
  HlmSpinnerModule,
  HlmSpinnerComponent,
} from '@spartan-ng/ui-spinner-helm';
import { ButtonComponent } from '~shared/components/ui/button/button.component';

import { TrainingsService } from '../trainings.service';
import {
  AssignedLearningResourceData,
  TrainingData,
} from '../../../shared/components/models/trainings.model';
import {
  AssignedLearningResource,
  LearningResource,
  ResourceStatus,
} from '@/app/shared/components/models/globals.model';

@Component({
  selector: 'app-my-trainings',
  imports: [
    CommonModule,
    HlmTableComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmTrowComponent,
    ButtonComponent,
    HlmSpinnerModule,
    HlmSpinnerComponent,
  ],
  templateUrl: './my-trainings.component.html',
})
export class MyTrainingsComponent implements OnInit {
  myTrainingsData: TrainingData[] = [];
  loading: boolean = true;

  constructor(private trainingsService: TrainingsService) {}

  ngOnInit(): void {
    // TODO: make passed id dynamic
    const userId = 1;
    if (userId) {
      this.trainingsService.getMyTrainings(userId).subscribe({
        next: (data: AssignedLearningResourceData[]) => {
          this.myTrainingsData =
            data &&
            data.map((item) => {
              const { node } = item;
              const {
                learning_resource: resource,
                resource_status: status,
                id,
              } = node;

              return {
                id,
                status: status.name,
                trainingName: resource.name,
                trainingDesc: resource.description,
                dueDate: resource.deadline_at,
                trainingUrl: resource.url,
              };
            });
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching trainings data', err);
          this.loading = false;
        },
      });
    }
  }
}
