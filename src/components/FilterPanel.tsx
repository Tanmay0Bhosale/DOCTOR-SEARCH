
import { Doctor, getAllSpecialties } from "@/services/doctorService";
import { Filters, SortOrder } from "@/types/filters";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface FilterPanelProps {
  doctors: Doctor[];
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterPanel = ({ doctors, filters, onFilterChange }: FilterPanelProps) => {
  const allSpecialties = getAllSpecialties(doctors);

  const handleConsultationTypeChange = (type: "Video Consult" | "In Clinic" | "All") => {
    onFilterChange({ ...filters, consultationType: type });
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    let updatedSpecialties: string[];
    
    if (checked) {
      updatedSpecialties = [...filters.specialties, specialty];
    } else {
      updatedSpecialties = filters.specialties.filter(s => s !== specialty);
    }
    
    onFilterChange({ ...filters, specialties: updatedSpecialties });
  };

  const handleSortChange = (sortBy: SortOrder | null) => {
    onFilterChange({ ...filters, sortBy });
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
      
      <div className="space-y-6">
        {/* Mode of Consultation */}
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-3">Mode of Consultation</h3>
          <RadioGroup 
            defaultValue="all" 
            value={filters.consultationType} 
            onValueChange={(v: "Video Consult" | "In Clinic" | "All") => handleConsultationTypeChange(v)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="All" id="all-consult" />
              <Label htmlFor="all-consult">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Video Consult" id="video-consult" />
              <Label htmlFor="video-consult">Video Consult</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="In Clinic" id="in-clinic" />
              <Label htmlFor="in-clinic">In Clinic</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Speciality */}
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-3">Speciality</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allSpecialties.map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox
                  id={`specialty-${specialty}`}
                  checked={filters.specialties.includes(specialty)}
                  onCheckedChange={(checked) => handleSpecialtyChange(specialty, !!checked)}
                />
                <Label htmlFor={`specialty-${specialty}`} className="text-sm text-gray-600">
                  {specialty}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sort By */}
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-3">Sort By</h3>
          <RadioGroup 
            value={filters.sortBy || "default"} 
            onValueChange={(v: SortOrder) => handleSortChange(v)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fees" id="sort-fees" />
              <Label htmlFor="sort-fees">Price (Low to High)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="experience" id="sort-experience" />
              <Label htmlFor="sort-experience">Experience (High to Low)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
