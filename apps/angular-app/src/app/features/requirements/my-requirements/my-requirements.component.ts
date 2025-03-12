import { Component } from '@angular/core';
import { RequirementsService } from '../requirements.service';
import { CommonModule } from '@angular/common';
import { RequirementData } from '@/app/shared/components/models/requirements.model';
import { AssignedComplianceResourceData } from '@/app/shared/components/models/trainings.model';
import { HlmSpinnerComponent } from '@/libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';
import { HlmTableComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-table.component';
import { HlmTrowComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-trow.component';
import { HlmThComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-th.component';
import { HlmTdComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-td.component';
import {
  BrnProgressComponent,
  BrnProgressIndicatorComponent,
} from '@spartan-ng/brain/progress';
import { HlmProgressIndicatorDirective } from '@spartan-ng/ui-progress-helm';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@/libs/ui/ui-select-helm/src';

@Component({
  selector: 'app-my-requirements',
  imports: [
    CommonModule,
    HlmSpinnerComponent,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    BrnProgressComponent,
    BrnProgressIndicatorComponent,
    HlmProgressIndicatorDirective,
    BrnSelectImports,
    HlmSelectImports,
  ],
  templateUrl: './my-requirements.component.html',
})
export class MyRequirementsComponent {
  myRequirementsData: RequirementData[] = [];
  requirementsTotal = 0;
  requirementsCompleted = 0;
  loading = true;
  constructor(private requirementsService: RequirementsService) {}

  get progress() {
    if (this.requirementsTotal === 0) return 0;
    return (this.requirementsCompleted / this.requirementsTotal) * 100;
  }

  ngOnInit(): void {
    const userId = 1;
    // TODO: Make dynamic id that will be passed to fetch data
    this.requirementsService.getMyRequirements(userId).subscribe({
      next: (data: AssignedComplianceResourceData[]) => {
        this.myRequirementsData =
          data &&
          data.map((item) => {
            this.requirementsTotal += 1;
            const { node } = item;
            const { id, compliance_resource, resource_status } = node;

            if (resource_status.name.toLowerCase() === 'completed') {
              this.requirementsCompleted += 1;
            }

            return {
              id,
              requirementName: compliance_resource.name,
              requirementDesc: compliance_resource.description,
              requirementUrl: compliance_resource.url,
              dueDate: compliance_resource.deadline_at,
              status: resource_status.name,
            };
          });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching requirements data', err);
        this.loading = false;
      },
    });
  }
}
