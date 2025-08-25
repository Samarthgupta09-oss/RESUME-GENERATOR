
import React, { useState } from 'react';
import type { PersonalInfo, WorkExperience, Education, ResumeData } from '../types';
import { UserIcon, BriefcaseIcon, AcademicCapIcon, SparklesIcon, DocumentTextIcon } from './Icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      id={id}
      {...props}
      className="w-full bg-slate-800/50 border border-slate-700 rounded-md shadow-sm px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <textarea
      id={id}
      {...props}
      className="w-full bg-slate-800/50 border border-slate-700 rounded-md shadow-sm px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    ></textarea>
  </div>
);

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => (
  <div className="pt-8">
    <div className="flex items-center mb-4">
      <div className="text-indigo-400">{icon}</div>
      <h2 className="text-xl font-semibold ml-3 text-white">{title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'John Doe',
    professionalTitle: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    linkedin: 'https://linkedin.com/in/johndoe',
    location: 'San Francisco, CA',
    website: 'https://your-portfolio.com',
    profilePhoto: null,
  });

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    {
      id: `work-${Date.now()}`,
      jobTitle: 'Software Engineer',
      company: 'Tech Inc.',
      dates: 'Jan 2022 - Present',
      description: 'Developed and maintained web applications using React and Node.js.',
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: `edu-${Date.now()}`,
      degree: 'B.S. in Computer Science',
      school: 'State University',
      yearOfGraduation: '2021',
      gpa: '3.8/4.0',
    },
  ]);

  const [skills, setSkills] = useState('JavaScript, TypeScript, React, Node.js, Python, SQL, Docker, AWS');
  const [jobDescription, setJobDescription] = useState('');

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPersonalInfo(prev => ({ ...prev, profilePhoto: e.target.files![0] }));
    }
  };

  const handleWorkExperienceChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWorkExperience((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [name]: value } : item))
    );
  };

  const addWorkExperience = () => {
    setWorkExperience((prev) => [
      ...prev,
      { id: `work-${Date.now()}`, jobTitle: '', company: '', dates: '', description: '' },
    ]);
  };
  
  const removeWorkExperience = (id: string) => {
    setWorkExperience(prev => prev.filter(item => item.id !== id));
  }

  const handleEducationChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation((prev) => prev.map((item) => (item.id === id ? { ...item, [name]: value } : item)));
  };

  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      { id: `edu-${Date.now()}`, degree: '', school: '', yearOfGraduation: '', gpa: '' },
    ]);
  };
  
  const removeEducation = (id: string) => {
    setEducation(prev => prev.filter(item => item.id !== id));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ personalInfo, workExperience, education, skills, jobDescription });
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md p-6 md:p-10 rounded-xl border border-slate-700/50 shadow-2xl">
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">🛠️</span>
        <h2 className="text-2xl font-bold text-white">Let's Get Started</h2>
      </div>
       <p className="text-gray-400 mb-8 -mt-4">Provide your details and the job description to begin the customization process.</p>

      {/* Personal Information */}
      <Section title="Personal Information" icon={<UserIcon />}>
          <Input label="Full Name" name="fullName" value={personalInfo.fullName} onChange={handlePersonalInfoChange} />
          <Input label="Professional Title" name="professionalTitle" value={personalInfo.professionalTitle} onChange={handlePersonalInfoChange} />
          <Input label="Email" name="email" type="email" value={personalInfo.email} onChange={handlePersonalInfoChange} />
          <Input label="Phone" name="phone" type="tel" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
          <Input label="LinkedIn URL" name="linkedin" value={personalInfo.linkedin} onChange={handlePersonalInfoChange} />
          <Input label="Location" name="location" value={personalInfo.location} onChange={handlePersonalInfoChange} />
          <Input label="Website/Portfolio" name="website" value={personalInfo.website} onChange={handlePersonalInfoChange} />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Profile Photo</label>
            <input type="file" name="profilePhoto" onChange={handleFileChange} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700" />
             <p className="text-xs text-gray-500 mt-1">Optional: Upload a professional headshot.</p>
          </div>
      </Section>
      
      {/* Work Experience */}
      <div className="pt-8">
        <div className="flex items-center mb-4">
            <div className="text-indigo-400"><BriefcaseIcon /></div>
            <h2 className="text-xl font-semibold ml-3 text-white">Work Experience</h2>
        </div>
        <div className="space-y-6">
            {workExperience.map((exp, index) => (
                <div key={exp.id} className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleWorkExperienceChange(exp.id, e)} />
                        <Input label="Company" name="company" value={exp.company} onChange={(e) => handleWorkExperienceChange(exp.id, e)} />
                        <div className="md:col-span-2"><Input label="Dates (e.g., Jan 2022 - Present)" name="dates" value={exp.dates} onChange={(e) => handleWorkExperienceChange(exp.id, e)} /></div>
                        <div className="md:col-span-2"><TextArea label="Description" name="description" value={exp.description} onChange={(e) => handleWorkExperienceChange(exp.id, e)} rows={4} placeholder="Describe your responsibilities and achievements..."/></div>
                    </div>
                     {workExperience.length > 1 && (
                      <div className="text-right mt-4">
                        <button type="button" onClick={() => removeWorkExperience(exp.id)} className="text-sm text-red-400 hover:text-red-500">Remove</button>
                      </div>
                    )}
                </div>
            ))}
            <button type="button" onClick={addWorkExperience} className="text-indigo-400 font-semibold hover:text-indigo-300 transition">+ Add Experience</button>
        </div>
      </div>

      {/* Education */}
      <div className="pt-8">
        <div className="flex items-center mb-4">
            <div className="text-indigo-400"><AcademicCapIcon /></div>
            <h2 className="text-xl font-semibold ml-3 text-white">Education</h2>
        </div>
         <div className="space-y-6">
            {education.map((edu, index) => (
                <div key={edu.id} className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Degree / Certificate" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, e)} />
                        <Input label="School / University" name="school" value={edu.school} onChange={(e) => handleEducationChange(edu.id, e)} />
                        <Input label="Year of Graduation" name="yearOfGraduation" value={edu.yearOfGraduation} onChange={(e) => handleEducationChange(edu.id, e)} />
                        <Input label="Percentage/GPA" name="gpa" value={edu.gpa} onChange={(e) => handleEducationChange(edu.id, e)} />
                    </div>
                    {education.length > 1 && (
                      <div className="text-right mt-4">
                        <button type="button" onClick={() => removeEducation(edu.id)} className="text-sm text-red-400 hover:text-red-500">Remove</button>
                      </div>
                    )}
                </div>
            ))}
            <button type="button" onClick={addEducation} className="text-indigo-400 font-semibold hover:text-indigo-300 transition">+ Add Education</button>
        </div>
      </div>

      {/* Skills */}
      <div className="pt-8">
        <div className="flex items-center mb-4">
            <div className="text-indigo-400"><SparklesIcon /></div>
            <h2 className="text-xl font-semibold ml-3 text-white">Skills</h2>
        </div>
        <TextArea 
          label="Skills"
          id="skills"
          value={skills}
          onChange={e => setSkills(e.target.value)}
          rows={4}
          placeholder="List your skills, separated by commas (e.g., JavaScript, React, Node.js...)"
        />
      </div>

      {/* Job Description */}
      <div className="pt-8">
        <div className="flex items-center mb-4">
            <div className="text-indigo-400"><DocumentTextIcon /></div>
            <h2 className="text-xl font-semibold ml-3 text-white">Job Description</h2>
        </div>
        <TextArea 
          label="Job Description"
          id="jobDescription"
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          rows={10}
          placeholder="Paste the job description here..."
          required
        />
      </div>

      <div className="mt-10 text-center">
        <button type="submit" className="w-full md:w-auto px-12 py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300">
          Craft My Resume
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;
