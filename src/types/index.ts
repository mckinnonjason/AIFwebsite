export type EventCategory =
  | "Workshop"
  | "Speaker"
  | "Recruiting"
  | "Social"
  | "Panel";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  category: EventCategory;
  speaker?: string;
  speakerTitle?: string;
  image?: string;
  rsvpUrl?: string;
  calendarUrl?: string;
  attendanceUrl?: string;
  notesUrl?: string;
  slidesUrl?: string;
  recordingUrl?: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: "AI" | "Finance" | "Recruiting" | "Club Materials";
  type: "Guide" | "Tool" | "Slides" | "Recording" | "Article" | "Template";
  url?: string;
  fileUrl?: string;
  date?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  company: string;
  title: string;
  description: string;
  location: string;
  type: "Internship" | "Full-time" | "Part-time";
  category: "Finance" | "AI / Technology" | "Consulting" | "FinTech" | "Other";
  deadline: string;
  url: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Leader {
  id: string;
  name: string;
  position: string;
  bio: string;
  photoUrl?: string;
  email?: string;
  linkedinUrl?: string;
  displayOrder: number;
  active: boolean;
}

export interface SiteSettings {
  clubName: string;
  description: string;
  emailSignupUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  contactEmail: string;
  logoUrl?: string;
}
