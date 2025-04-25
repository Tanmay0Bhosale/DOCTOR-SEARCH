
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Doctor } from "@/services/doctorService";

interface DoctorSearchProps {
  doctors: Doctor[];
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

const DoctorSearch = ({ doctors, onSearch, searchTerm }: DoctorSearchProps) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const filtered = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 3);

    setSuggestions(filtered);
    setIsOpen(filtered.length > 0);
  }, [searchTerm, doctors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleSuggestionClick = (suggestion: Doctor) => {
    onSearch(suggestion.name);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          data-testid="autocomplete-input"
          className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-doctor-primary"
          placeholder="Search for doctors..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg z-20 border border-gray-200">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(doctor)}
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorSearch;
