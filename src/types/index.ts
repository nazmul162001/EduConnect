export type EventInfo = {
  id: string;
  title: string;
  date: string;
  description: string;
};

export type ResearchPaper = {
  id: string;
  title: string;
  url: string;
  authors: string[];
  year: number;
};

export type SportsCategory = {
  name: string;
  icon?: string;
};

export type College = {
  id: string;
  name: string;
  image: string;
  rating: number;
  admissionStart: string;
  admissionEnd: string;
  events: EventInfo[];
  researchHistory: string;
  researchPapers: ResearchPaper[];
  sports: SportsCategory[];
  graduatesGallery: string[];
};

export type Review = {
  id: string;
  collegeId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  university?: string;
  address?: string;
  avatarUrl?: string;
};

export type AdmissionForm = {
  candidateName: string;
  subject: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  imageUrl: string;
  collegeId: string;
};
