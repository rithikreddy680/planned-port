export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  techStack: string[];
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  mediaSrc: string;
  /** Optional for modal: code snippet or extra detail */
  detail?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

