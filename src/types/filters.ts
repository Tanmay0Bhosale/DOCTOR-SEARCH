
export interface Filters {
  search: string;
  consultationType: "Video Consult" | "In Clinic" | "All";
  specialties: string[];
  sortBy: "fees" | "experience" | null;
}

export type SortOrder = "fees" | "experience";
