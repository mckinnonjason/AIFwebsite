import { mockEvents, mockJobs, mockLeaders, mockResources, siteSettings } from "../data/site";

const sortByDateAsc = <T extends { date: string }>(items: T[]) =>
  [...items].sort((a, b) => a.date.localeCompare(b.date));

const nowDate = "2026-09-03";

export const siteService = {
  getSettings: () => siteSettings,
};

export const eventService = {
  getEvents: () => sortByDateAsc(mockEvents),
  getUpcomingEvents: () => sortByDateAsc(mockEvents.filter((event) => event.date >= nowDate)),
  getPastEvents: () => sortByDateAsc(mockEvents.filter((event) => event.date < nowDate)).reverse(),
  getFeaturedEvents: () =>
    sortByDateAsc(mockEvents.filter((event) => event.date >= nowDate && event.isFeatured)),
};

export const resourceService = {
  getResources: () => mockResources,
};

export const jobService = {
  getJobs: () => mockJobs,
  getActiveJobs: () => mockJobs.filter((job) => job.active),
};

export const leaderService = {
  getLeaders: () =>
    [...mockLeaders].filter((leader) => leader.active).sort((a, b) => a.displayOrder - b.displayOrder),
};
