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
  category?: string;
  institution?: string;
  abstract?: string;
  downloads?: number;
};

export type SportsCategory = {
  name: string;
  icon?: string;
};

export type College = {
  _id?: string;
  id?: string;
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
  description?: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
};

export type Review = {
  _id?: string;
  id?: string;
  collegeId: string;
  userId: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  rating: number; // 1-5
  comment: string;
  university?: string;
  createdAt: string;
  updatedAt?: string;
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
