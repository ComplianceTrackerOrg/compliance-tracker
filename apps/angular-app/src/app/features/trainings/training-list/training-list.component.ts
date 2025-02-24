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
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { ButtonComponent } from '~shared/components/ui/button/button.component';

import { TrainingsService } from '../trainings.service';

import { AddTrainingFormComponent } from '../actions/add-training-form/add-training-form.component';
import { EditTrainingFormComponent } from '../actions/edit-training-form/edit-training-form.component';
import {
  LearningResource,
  LearningResourceType,
  TrainingData,
} from '../trainings.model';

@Component({
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
  templateUrl: './training-list.component.html',
})
export class TrainingListComponent implements OnInit {
  trainingsData: TrainingData[] = [];
  loading: boolean = true;

  constructor(
    private trainingsService: TrainingsService,
    private modalService: HlmDialogService
  ) {}

  ngOnInit(): void {
    this.trainingsService.getAllTrainings().subscribe({
      next: (data) => {
        this.trainingsData =
          data &&
          data.map(
            (item: {
              node: LearningResource & {
                learning_resource_type: LearningResourceType;
              };
            }) => {
              const { node } = item;
              const { name, description, is_mandatory, deadline_at, url } =
                node;
              return {
                trainingName: name,
                trainingDesc: description,
                isMandatory: is_mandatory,
                dueDate: deadline_at,
                trainingUrl: url,
              };
            }
          );
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching trainings data', err);
        this.loading = false;
      },
    });
  }

  // open modal for AddTrainingFormComponent
  onOpenAddTraining() {
    this.modalService.open(AddTrainingFormComponent, {
      closeOnBackdropClick: false,
      contentClass: 'custom-modal-width',
    });
  }

  // open modal for EditTrainingFormComponent
  onOpenEditTraining(training: TrainingData) {
    this.modalService.open(EditTrainingFormComponent, {
      context: training,
      closeOnBackdropClick: false,
      contentClass: 'custom-modal-width',
    });
  }
}
