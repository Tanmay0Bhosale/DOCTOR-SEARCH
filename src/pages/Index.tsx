import { useState, useEffect } from "react";
import DoctorSearch from "@/components/DoctorSearch";
import FilterPanel from "@/components/FilterPanel";
import DoctorList from "@/components/DoctorList";
import { useDoctors } from "@/services/doctorService";
import { Filters } from "@/types/filters";
import { getFiltersFromUrl, setFiltersInUrl } from "@/utils/queryParams";

const Index = () => {
  const { data: doctors = [], isLoading, error } = useDoctors();
  const [filters, setFilters] = useState<Filters>({
    search: "",
    consultationType: "All",
    specialties: [],
    sortBy: null
  });

  useEffect(() => {
    const urlFilters = getFiltersFromUrl();
    setFilters(urlFilters);
  }, []);

  useEffect(() => {
    setFiltersInUrl(filters);
  }, [filters]);

  useEffect(() => {
    const handlePopState = () => {
      const urlFilters = getFiltersFromUrl();
      setFilters(urlFilters);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <DoctorSearch 
          doctors={doctors} 
          onSearch={handleSearch} 
          searchTerm={filters.search} 
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-white rounded-lg shadow-sm border border-red-200">
            <p className="text-lg text-red-600">Error loading doctors. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <FilterPanel 
                doctors={doctors} 
                filters={filters} 
                onFilterChange={handleFilterChange} 
              />
            </div>
            <div className="lg:col-span-3">
              <DoctorList doctors={doctors} filters={filters} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
