export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export const enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export const enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

export interface Ticket {
  id?: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  createdAt?: string;
  updatedAt?: string;
}

export interface TicketFilter {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: Status;
  priority?: Priority;
  sortOrder?: SortOrder;
}