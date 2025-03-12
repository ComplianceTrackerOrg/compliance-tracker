import { ResourceData } from './globals.model';

export type RequirementData = {
  id: number;
  requirementName: string;
  requirementDesc: string;
  dueDate: string;
  requirementUrl: string;
  status?: string;
};

export type RequirementResourceData = {
  node: ResourceData;
};
