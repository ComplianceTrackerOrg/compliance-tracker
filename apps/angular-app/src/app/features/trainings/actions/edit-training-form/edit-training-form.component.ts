import {
  FormBuilderComponent,
  FormField,
} from '@/app/shared/components/ui/form-builder/form-builder.component';
import { Component, Inject, Input } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { TrainingData } from '../../trainings.model';

@Component({
  selector: 'app-edit-training-form',
  imports: [FormBuilderComponent],
  templateUrl: './edit-training-form.component.html',
})
export class EditTrainingFormComponent {
  private context = injectBrnDialogContext<TrainingData>();
  constructor(private dialogRef: BrnDialogRef<EditTrainingFormComponent>) {}
  @Input() trainingData?: TrainingData = this.context;
  loading: boolean = false;

  formFields: FormField[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      validations: { required: true, minLength: 3 },
      placeholder: 'Enter name',
      value: this.trainingData?.trainingName,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      value: this.trainingData?.trainingDesc,
    },
    {
      // TODO: Bind current training value for training type
      name: 'trainingType',
      type: 'select',
      label: 'Training type',
      placeholder: 'Select training type...',
      options: [
        { value: '1', label: 'Digital learning' },
        { value: '2', label: 'Classroom' },
        { value: '3', label: 'Virtual classroom' },
      ],
    },
    {
      name: 'trainingUrl',
      type: 'url',
      label: 'URL',
      validations: { required: true, url: true },
      value: this.trainingData?.trainingUrl,
    },
    {
      name: 'dueDate',
      type: 'date',
      label: 'Due date',
      validations: { required: true },
      value: this.trainingData?.dueDate?.split('T')[0],
    },
    {
      name: 'isMandatory',
      type: 'checkbox',
      label: 'Is mandatory?',
      value: this.trainingData?.isMandatory,
    },
  ];

  handleFormSubmit(formData: any) {
    this.loading = true;
    this.dialogRef.close();
  }
}
