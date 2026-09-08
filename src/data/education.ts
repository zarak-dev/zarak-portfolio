export interface EducationRecord {
  degree: string;
  field: string;
  institution: string;
  period: string;
  startYear: string;
  endYear: string;
  location: string;
  description: string;
  capstoneHighlight: string;
  coursework: string[];
}

export const EDUCATION_DATA: EducationRecord = {
  degree: 'Bachelor of Science',
  field: 'Software Engineering',
  institution: 'Sarhad University of Science & Information Technology',
  period: '2021 –  2025',
  startYear: '2021',
  endYear: '2025',
  location: 'Pakistan',
  description:
    'Comprehensive software engineering curriculum combining rigorous theoretical computer science, computational mathematics, and hands-on software development methodologies.',
  capstoneHighlight:
    'Capstone Project: FYP Connect (Smart Sugar Management System) — Awarded Grade A+ for excellence in frontend architecture, Gemini AI integration, and healthcare utility.',
  coursework: [
    'Advanced Data Structures',
    'Software Design & Architecture',
    'Probability & Statistics',
    'Differential Equations',
    'Automata Theory',
    'Database Management Systems',
    'Web Engineering',
    'Object-Oriented Analysis & Design',
  ],
};
