
import { useQuery } from "@tanstack/react-query";

export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  image: string;
  experience: number;
  ratings: number;
  fee: number;
  type: "Video Consult" | "In Clinic" | "Both";
}

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }
  
  const rawData = await response.json();
  
  // Transform the API response to match our Doctor interface
  return rawData.map((item: any) => {
    // Extract specialties from the specialities array
    const specialty = item.specialities ? item.specialities.map((spec: any) => spec.name) : [];
    
    // Extract fee number from fee string (remove "₹ " prefix)
    const feeString = item.fees || "₹ 0";
    const fee = parseInt(feeString.replace("₹ ", ""), 10) || 0;
    
    // Extract experience number from experience string
    const expString = item.experience || "0 Years of experience";
    const experience = parseInt(expString.split(" ")[0], 10) || 0;
    
    // Determine consultation type
    let type: "Video Consult" | "In Clinic" | "Both" = "In Clinic";
    if (item.video_consult && item.in_clinic) {
      type = "Both";
    } else if (item.video_consult) {
      type = "Video Consult";
    }

    return {
      id: item.id || "",
      name: item.name || "",
      specialty: specialty,
      image: item.photo || "",
      experience: experience,
      ratings: 4.5, // Default rating if not available in API
      fee: fee,
      type: type
    };
  });
};

export const useDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });
};

export const getAllSpecialties = (doctors: Doctor[]): string[] => {
  if (!doctors || !Array.isArray(doctors)) {
    return [];
  }
  
  const specialtiesSet = new Set<string>();
  doctors.forEach(doctor => {
    if (doctor.specialty && Array.isArray(doctor.specialty)) {
      doctor.specialty.forEach(spec => {
        if (spec) specialtiesSet.add(spec);
      });
    }
  });
  return Array.from(specialtiesSet).sort();
};
