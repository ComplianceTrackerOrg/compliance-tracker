import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { HlmSpinnerModule, HlmSpinnerComponent } from "@spartan-ng/ui-spinner-helm";
import { ButtonComponent } from '~shared/components/ui/button/button.component';

import { TrainingsService } from '../trainings.service';

@Component({
  imports: [
    CommonModule,
    HlmTableComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmTrowComponent,
    ButtonComponent,
    HlmSpinnerModule,
    HlmSpinnerComponent
  ],
  templateUrl: './training-list.component.html',
})
export class TrainingListComponent implements OnInit {
  // TODO: type any
  trainingsData: any[] = []
  loading: boolean = true

  constructor(private trainingsService: TrainingsService) { }

  ngOnInit(): void {
    this.trainingsService.getAllTrainings().subscribe({
      next: (data) => {
        this.trainingsData = data
        this.loading = false
      },
      error: (err) => {
        console.error('Error fetching trainings data', err)
        this.loading = false
      }
    })
  }
}
