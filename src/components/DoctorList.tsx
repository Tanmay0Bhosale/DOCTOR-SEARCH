
import { Doctor } from "@/services/doctorService";
import DoctorCard from "./DoctorCard";
import { Filters, SortOrder } from "@/types/filters";

interface DoctorListProps {
  doctors: Doctor[];
  filters: Filters;
}

const DoctorList = ({ doctors, filters }: DoctorListProps) => {
  // Apply filters and sorting
  const filteredDoctors = doctors.filter((doctor) => {
    // Filter by search term
    const matchesSearch = 
      filters.search === "" || 
      doctor.name.toLowerCase().includes(filters.search.toLowerCase());
    
    // Filter by consultation type
    const matchesConsultationType = 
      filters.consultationType === "All" || 
      doctor.type === filters.consultationType || 
      doctor.type === "Both";
    
    // Filter by specialties
    const matchesSpecialties = 
      filters.specialties.length === 0 || 
      filters.specialties.some(specialty => doctor.specialty.includes(specialty));
    
    return matchesSearch && matchesConsultationType && matchesSpecialties;
  });

  // Sort doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (filters.sortBy === "fees") {
      return a.fee - b.fee; // Low to high
    }
    if (filters.sortBy === "experience") {
      return b.experience - a.experience; // High to low
    }
    return 0;
  });

  return (
    <div>
      {sortedDoctors.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-md shadow border border-gray-200">
          <p className="text-lg text-gray-600">No doctors found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
