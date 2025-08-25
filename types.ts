
export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  website: string;
  profilePhoto: File | null;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  dates: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  yearOfGraduation: string;
  gpa: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string;
  jobDescription: string;
}
