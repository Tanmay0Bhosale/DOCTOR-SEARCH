
import { Doctor } from "@/services/doctorService";
import { Button } from "./ui/button";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div 
      data-testid="doctor-card"
      className="flex items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex-shrink-0 mr-6">
        <img 
          src={doctor.image || "/placeholder.svg"} 
          alt={doctor.name} 
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 
              data-testid="doctor-name" 
              className="text-lg font-semibold text-gray-800 mb-1"
            >
              {doctor.name}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              {doctor.specialty.join(", ")}
            </p>
          </div>
          <p 
            data-testid="doctor-fee" 
            className="text-blue-600 font-semibold"
          >
            ₹{doctor.fee}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {doctor.experience} {doctor.experience === 1 ? 'year' : 'years'} exp
            </span>
            <span className="text-sm text-gray-500 px-2 py-1 bg-blue-50 rounded-full">
              {doctor.type}
            </span>
          </div>
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
