
import { GoogleGenAI } from "@google/genai";
import type { ResumeData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function buildPrompt(data: ResumeData): string {
  const workExperienceString = data.workExperience
    .map(
      (exp) => `
- Job Title: ${exp.jobTitle}
  Company: ${exp.company}
  Dates: ${exp.dates}
  Responsibilities/Achievements: ${exp.description}
`
    )
    .join('');

  const educationString = data.education
    .map(
      (edu) => `
- Degree: ${edu.degree}
  School/University: ${edu.school}
  Year of Graduation: ${edu.yearOfGraduation}
  GPA/Percentage: ${edu.gpa}
`
    )
    .join('');

  return `
You are an expert resume writer and career coach. Your task is to create a professional, compelling, and modern resume based on the user's information and tailored specifically to the provided job description.

**User Information:**
- Full Name: ${data.personalInfo.fullName}
- Professional Title: ${data.personalInfo.professionalTitle}
- Contact: Email: ${data.personalInfo.email}, Phone: ${data.personalInfo.phone}
- Links: LinkedIn: ${data.personalInfo.linkedin}, Website: ${data.personalInfo.website}
- Location: ${data.personalInfo.location}

**Work Experience:**
${workExperienceString}

**Education:**
${educationString}

**Skills:**
${data.skills}

---

**Target Job Description:**
${data.jobDescription}

---

**Instructions:**
1.  **Analyze the Job Description:** Identify the key skills, qualifications, and responsibilities the employer is looking for.
2.  **Professional Summary:** Start with a compelling 2-3 sentence professional summary that immediately highlights the candidate's value proposition in relation to the target job.
3.  **Tailor the Resume:** Rephrase and highlight the user's experience and skills to match the job description. Use strong action verbs (e.g., "Orchestrated", "Engineered", "Accelerated") and quantify achievements with metrics where possible (e.g., "Increased efficiency by 15%"). For the responsibilities/achievements under each job, rewrite them to be more impactful and relevant.
4.  **Format:** Generate the output in clean Markdown format. Structure it logically with sections for Contact Information, Summary, Skills, Work Experience, and Education. Use bullet points for lists.
5.  **Tone:** Maintain a professional and confident tone throughout.
6.  **Output:** Provide ONLY the Markdown for the resume. Do not include any additional commentary, introductory phrases like "Here is the resume:", or explanations.
`;
}

export async function generateResume(data: ResumeData): Promise<string> {
  const prompt = buildPrompt(data);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate resume from AI. Please check the console for more details.");
  }
}
