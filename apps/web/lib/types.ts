export interface Project {
  id: string;
  title: string;
  subtitle: string;
  techStack: string[];
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  mediaSrc: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

