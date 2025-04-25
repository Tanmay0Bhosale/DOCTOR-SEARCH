
import { Filters, SortOrder } from "@/types/filters";

export const getFiltersFromUrl = (): Filters => {
  if (typeof window === 'undefined') {
    return {
      search: "",
      consultationType: "All",
      specialties: [],
      sortBy: null
    };
  }

  const params = new URLSearchParams(window.location.search);
  
  const search = params.get("search") || "";
  
  const consultationType = params.get("type") as "Video Consult" | "In Clinic" | "All" || "All";
  
  const specialties = params.getAll("specialty");
  
  const sortBy = params.get("sort") as SortOrder | null;
  
  return {
    search,
    consultationType,
    specialties,
    sortBy
  };
};

export const setFiltersInUrl = (filters: Filters): void => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams();
  
  if (filters.search) {
    params.set("search", filters.search);
  }
  
  if (filters.consultationType !== "All") {
    params.set("type", filters.consultationType);
  }
  
  if (filters.specialties.length > 0) {
    filters.specialties.forEach(specialty => {
      params.append("specialty", specialty);
    });
  }
  
  if (filters.sortBy) {
    params.set("sort", filters.sortBy);
  }
  
  const newUrl = 
    window.location.protocol + "//" + 
    window.location.host + 
    window.location.pathname + 
    (params.toString() ? `?${params.toString()}` : "");
  
  window.history.pushState({ path: newUrl }, "", newUrl);
};
