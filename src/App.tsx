import { useEffect, useMemo, useState } from "react";
import type { Event, Job, Leader, Resource } from "./types";
import { eventService, jobService, leaderService, resourceService, siteService } from "./services/contentService";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Events", path: "/events" },
  { label: "Resources", path: "/resources" },
  { label: "Internships", path: "/internships" },
  { label: "About", path: "/about" },
];

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const formatDate = (date: string, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: options?.year,
    ...options,
  }).format(new Date(`${date}T12:00:00`));

const formatTime = (time: string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(`2026-01-01T${time}:00`));

function navigate(path: string) {
  const nextPath = path === "/" ? `${basePath || "/"}` : `${basePath}${path}`;
  window.history.pushState({}, "", nextPath);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function usePath() {
  const normalizePath = () => {
    const pathname = window.location.pathname;
    const withoutBase = basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname;
    return withoutBase || "/";
  };
  const [path, setPath] = useState(normalizePath);

  useEffect(() => {
    const onPop = () => setPath(normalizePath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return path;
}

function LinkButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <button className={`button ${variant}`} type="button" onClick={() => navigate(href)}>
        {children}
      </button>
    );
  }

  return (
    <a className={`button ${variant}`} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Logo() {
  return (
    <button className="logo" type="button" onClick={() => navigate("/")} aria-label="BYU AI in Finance home">
      <img src={assetPath("brand/ai-finance-logo-mark-cropped.png")} alt="" aria-hidden="true" />
      <span>
        <strong>BYU AI</strong>
        <small>in Finance</small>
      </span>
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePath();
  const settings = siteService.getSettings();

  useEffect(() => setOpen(false), [path]);

  return (
    <header className="siteHeader">
      <nav className="navShell" aria-label="Main navigation">
        <Logo />
        <button
          className="menuButton"
          type="button"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`navLinks ${open ? "open" : ""}`} id="main-menu">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={path === item.path ? "active" : ""}
              type="button"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
          <LinkButton href={settings.emailSignupUrl}>Join the Club</LinkButton>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  const settings = siteService.getSettings();

  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div>
          <Logo />
          <p>{settings.description}</p>
        </div>
        <div>
          <h2>Explore</h2>
          {navItems.slice(1).map((item) => (
            <button type="button" key={item.path} onClick={() => navigate(item.path)}>
              {item.label}
            </button>
          ))}
        </div>
        <div>
          <h2>Connect</h2>
          <a href={settings.linkedinUrl}>LinkedIn</a>
          <a href={settings.instagramUrl}>Instagram</a>
          <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
          <button type="button" className="quietAdmin" onClick={() => navigate("/admin")}>
            Admin
          </button>
        </div>
      </div>
      <div className="container copyright">Copyright 2026 BYU AI in Finance. Student organization website.</div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="sectionHeader">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function EventCard({ event, compact = false }: { event: Event; compact?: boolean }) {
  return (
    <article className={`eventCard ${compact ? "compact" : ""}`}>
      <time dateTime={event.date}>
        <span>{formatDate(event.date, { month: "short" }).split(" ")[0]}</span>
        <strong>{formatDate(event.date, { month: "short" }).split(" ")[1]?.replace(",", "")}</strong>
      </time>
      <div>
        <div className="metaRow">
          <span>{event.category}</span>
          <span>{formatTime(event.startTime)}</span>
          <span>{event.location}</span>
        </div>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div className="cardActions">
          {event.rsvpUrl ? <a href={event.rsvpUrl}>RSVP</a> : null}
          {event.attendanceUrl ? <a href={event.attendanceUrl}>Check In</a> : null}
          <button type="button" onClick={() => navigate("/events")}>
            View Event
          </button>
        </div>
      </div>
    </article>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="simpleCard">
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
    </article>
  );
}

function ResourceCategoryCard({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: { label: string; path: string };
}) {
  return (
    <article className="resourceCategoryCard">
      <h3>{title}</h3>
      <p>{text}</p>
      {action ? (
        <button type="button" onClick={() => navigate(action.path)}>
          {action.label}
        </button>
      ) : null}
    </article>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <article className="jobCard">
      <div>
        <span className="badge">{job.category}</span>
        <h3>{job.title}</h3>
        <p className="company">{job.company}</p>
      </div>
      <p>{job.description}</p>
      <div className="jobMeta">
        <span>{job.location}</span>
        <span>{job.type}</span>
        <span>Due {formatDate(job.deadline)}</span>
      </div>
      <a href={job.url}>View Posting</a>
    </article>
  );
}

function LeaderCard({ leader }: { leader: Leader }) {
  const initials = leader.position
    .split(" ")
    .filter((word) => word !== "of")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="leaderCard">
      {leader.photoUrl ? (
        <img className="leaderPhoto" src={leader.photoUrl} alt={`${leader.name} headshot`} />
      ) : (
        <div className="avatar" aria-hidden="true">
          {initials}
        </div>
      )}
      <h3>{leader.name}</h3>
      <p className="position">{leader.position}</p>
      <p>{leader.bio}</p>
      <div className="cardActions">
        {leader.email ? <a href={`mailto:${leader.email}`}>Email</a> : null}
        {leader.linkedinUrl ? <a href={leader.linkedinUrl}>LinkedIn</a> : null}
      </div>
    </article>
  );
}

function CTASection() {
  const settings = siteService.getSettings();

  return (
    <section className="ctaBand">
      <div className="container ctaInner">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2>Get updates about meetings, workshops, and internship opportunities.</h2>
        </div>
        <div className="ctaActions">
          <LinkButton href={settings.emailSignupUrl}>Join the Club</LinkButton>
          <LinkButton href={settings.linkedinUrl} variant="secondary">
            Follow on LinkedIn
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const settings = siteService.getSettings();
  const featuredEvents = eventService.getFeaturedEvents().slice(0, 3);
  const resources = resourceService.getResources().slice(0, 4);
  const nextEvent = featuredEvents[0];
  const jobs = jobService.getActiveJobs().slice(0, 2);

  return (
    <>
      <section className="hero">
        <div className="container heroGrid textHeroGrid">
          <div className="heroCopy">
            <p className="eyebrow">BYU AI in Finance</p>
            <img className="heroBrandMark" src={assetPath("brand/ai-finance-logo-mark-cropped.png")} alt="" aria-hidden="true" />
            <h1>Where AI Meets Finance.</h1>
            <p>
              BYU AI in Finance brings students together to explore how artificial intelligence is
              changing investing, banking, corporate finance, private equity, consulting, and the
              broader financial industry.
            </p>
            <div className="heroActions">
              <LinkButton href={settings.emailSignupUrl}>Join the Club</LinkButton>
              <LinkButton href="/events" variant="secondary">
                Explore Events
              </LinkButton>
            </div>
          </div>
          <div className="heroInfoPanel" aria-label="Club snapshot">
            <p className="eyebrow">Next Up</p>
            {nextEvent ? (
              <>
                <h2>{nextEvent.title}</h2>
                <p>{nextEvent.description}</p>
                <dl>
                  <div>
                    <dt>Date</dt>
                    <dd>{formatDate(nextEvent.date)}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{formatTime(nextEvent.startTime)}</dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>{nextEvent.location}</dd>
                  </div>
                </dl>
                <button type="button" onClick={() => navigate("/events")}>
                  See Events
                </button>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            title="Upcoming Events"
            text="Workshops, speakers, internship events, and conversations about AI and finance."
          />
          <div className="eventList">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="sectionLink">
            <button type="button" onClick={() => navigate("/events")}>
              View All Events
            </button>
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container threeGrid">
          {[
            ["Learn", "Understand how AI is changing financial analysis, investing, banking, and corporate finance."],
            ["Build", "Develop practical skills with AI tools, data, automation, and financial workflows."],
            ["Connect", "Meet students, alumni, professionals, and recruiters working at the intersection of AI and finance."],
          ].map(([title, text]) => (
            <article className="pillar" key={title}>
              <span>{title.slice(0, 1)}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Resource Library" title="Resources for AI + Finance" />
          <div className="cardGrid">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          <div className="sectionLink">
            <button type="button" onClick={() => navigate("/resources")}>
              Explore Resources
            </button>
          </div>
        </div>
      </section>

      <section className="section splitSection">
        <div className="container splitGrid">
          <div>
            <p className="eyebrow">Internships</p>
            <h2>Find Your Next Opportunity</h2>
            <p>
              The club highlights internship opportunities and application timelines related to
              finance, technology, fintech, and AI-enabled investing.
            </p>
            <LinkButton href="/internships" variant="secondary">
              Explore Internships
            </LinkButton>
          </div>
          <div className="jobStack">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container compactCopy">
          <h2>Built for students at the intersection of finance and technology.</h2>
          <p>
            BYU AI in Finance exists to help students understand how artificial intelligence is
            changing the financial industry and prepare to participate in that change.
          </p>
        </div>
      </section>
      <CTASection />
    </>
  );
}

function EventsPage() {
  const upcoming = eventService.getUpcomingEvents();
  const past = eventService.getPastEvents();

  return (
    <main className="page">
      <div className="container">
        <SectionHeader
          eyebrow="Calendar"
          title="Events"
          text="Find workshops, speakers, internship nights, and past meeting materials."
        />
        <div className="eventList">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <SectionHeader title="Past Events" />
        <div className="eventList">
          {past.map((event) => (
            <EventCard key={event.id} event={event} compact />
          ))}
        </div>
      </div>
    </main>
  );
}

function ResourcesPage() {
  const resources = resourceService.getResources();
  const categories = [
    {
      title: "Club Materials",
      text: "Meeting notes, workshop takeaways, slides, recordings, and AI tools shared by the club.",
    },
    {
      title: "Recruiting",
      text: "Resume prep, networking guidance, interview practice, and recruiting timelines in one place.",
      action: { label: "View Internships", path: "/internships" },
    },
    {
      title: "BYU Finance",
      text: "Finance primers, valuation refreshers, market context, and student-facing BYU finance resources.",
    },
  ];

  return (
    <main className="page">
      <div className="container">
        <SectionHeader
          eyebrow="Library"
          title="Resources"
          text="A simple home for the materials students are most likely to come back to."
        />
        <div className="resourceCategoryGrid">
          {categories.map((category) => (
            <ResourceCategoryCard key={category.title} {...category} />
          ))}
        </div>
        <section className="resourceGroup">
          <h2>Suggested Resources</h2>
          <div className="cardGrid">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function RecruitingPage() {
  const [category, setCategory] = useState("All");
  const jobs = jobService.getActiveJobs();
  const categories = ["All", "Finance", "AI / Technology", "Consulting", "FinTech", "Other"];
  const filtered = category === "All" ? jobs : jobs.filter((job) => job.category === category);

  return (
    <main className="page">
      <div className="container">
        <SectionHeader
          eyebrow="Opportunities"
          title="Internships"
          text="A practical student hub for internship opportunities and early application timelines."
        />
        <div className="filterRow" role="tablist" aria-label="Opportunity filters">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={item === category ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="cardGrid">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <section className="notePanel internshipNote">
          <h2>Recruiting Prep</h2>
          <p>
            Resume guidance, networking notes, interview prep, and recruiting timelines live in the
            Resources tab under Recruiting.
          </p>
          <button type="button" onClick={() => navigate("/resources")}>
            Go to Resources
          </button>
        </section>
      </div>
    </main>
  );
}

function AboutPage() {
  const leaders = leaderService.getLeaders();

  return (
    <main className="page">
      <div className="container">
        <SectionHeader
          eyebrow="About"
          title="Mission"
          text="Help BYU students build credible finance careers in a market where AI fluency is becoming part of the work."
        />
        <div className="twoColumnText">
          <div>
            <h2>What We Do</h2>
            <p>
              The club hosts workshops, guest speakers, recruiting events, and student-led sessions
              focused on practical AI applications in finance.
            </p>
          </div>
          <div>
            <h2>Community</h2>
            <p>
              Members connect with students, alumni, professionals, and recruiters who care about
              thoughtful technology use in financial decision-making.
            </p>
          </div>
        </div>
        <SectionHeader title="Leadership" />
        <div className="leaderGrid">
          {leaders.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </main>
  );
}

function AdminPage() {
  const events = eventService.getEvents();
  const resources = resourceService.getResources();
  const jobs = jobService.getActiveJobs();
  const [formOpen, setFormOpen] = useState(true);
  const stats = useMemo(
    () => [
      ["Upcoming Events", eventService.getUpcomingEvents().length],
      ["Past Events", eventService.getPastEvents().length],
      ["Resources", resources.length],
      ["Active Internships", jobs.length],
    ],
    [jobs.length, resources.length],
  );

  return (
    <main className="adminPage">
      <div className="adminShell">
        <aside className="adminAside">
          <Logo />
          <button type="button">Dashboard</button>
          <button type="button">Events</button>
          <button type="button">Resources</button>
          <button type="button">Internships</button>
          <button type="button">Leadership</button>
          <button type="button">Site Settings</button>
          <button type="button" onClick={() => navigate("/")}>
            Public Site
          </button>
        </aside>
        <section className="adminMain">
          <div className="adminHeader">
            <div>
              <p className="eyebrow">Admin Prototype</p>
              <h1>Content Dashboard</h1>
            </div>
            <p>Authentication and database writes are intentionally deferred.</p>
          </div>
          <div className="statGrid">
            {stats.map(([label, value]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
          <div className="adminToolbar">
            <h2>Events</h2>
            <button type="button" onClick={() => setFormOpen((value) => !value)}>
              + Add Event
            </button>
          </div>
          <div className="adminTable" role="table" aria-label="Events">
            <div role="row" className="tableHead">
              <span>Event</span>
              <span>Date</span>
              <span>Category</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {events.map((event) => (
              <div role="row" key={event.id}>
                <span>{event.title}</span>
                <span>{formatDate(event.date)}</span>
                <span>{event.category}</span>
                <span>{event.date >= "2026-09-03" ? "Upcoming" : "Past"}</span>
                <span className="tableActions">
                  <button type="button">Edit</button>
                  <button type="button">Delete</button>
                  <button type="button">View</button>
                </span>
              </div>
            ))}
          </div>
          {formOpen ? <EventForm /> : null}
          <div className="adminActionGrid">
            <button type="button">+ Add Resource</button>
            <button type="button">+ Add Opportunity</button>
            <button type="button">+ Edit Leadership</button>
          </div>
        </section>
      </div>
    </main>
  );
}

function EventForm() {
  const fields = [
    ["Event title", "text"],
    ["Date", "date"],
    ["Start time", "time"],
    ["End time", "time"],
    ["Location", "text"],
    ["Category", "text"],
    ["Speaker", "text"],
    ["Speaker title", "text"],
    ["RSVP URL", "url"],
    ["Calendar URL", "url"],
    ["Attendance/check-in URL", "url"],
    ["Notes URL", "url"],
    ["Slides URL", "url"],
    ["Recording URL", "url"],
  ];

  return (
    <form className="eventForm" onSubmit={(event) => event.preventDefault()}>
      <h2>Add Event</h2>
      <label className="full">
        Description
        <textarea rows={4} placeholder="Short event description" />
      </label>
      {fields.map(([label, type]) => (
        <label key={label}>
          {label}
          <input type={type} placeholder={label} />
        </label>
      ))}
      <label className="toggleField">
        <input type="checkbox" />
        Featured event
      </label>
      <div className="formActions">
        <button type="submit">Save Event</button>
        <button type="button">Cancel</button>
      </div>
    </form>
  );
}

function NotFoundPage() {
  return (
    <main className="page">
      <div className="container compactCopy">
        <h1>Page not found</h1>
        <p>The page you requested is not part of this first site version.</p>
        <LinkButton href="/">Back Home</LinkButton>
      </div>
    </main>
  );
}

function Routes() {
  const path = usePath();

  if (path === "/") return <HomePage />;
  if (path === "/events") return <EventsPage />;
  if (path === "/resources") return <ResourcesPage />;
  if (path === "/internships" || path === "/recruiting") return <RecruitingPage />;
  if (path === "/about") return <AboutPage />;
  if (path === "/admin") return <AdminPage />;
  return <NotFoundPage />;
}

export function App() {
  const path = usePath();
  const isAdmin = path === "/admin";

  return (
    <>
      {isAdmin ? null : <Navbar />}
      <Routes />
      {isAdmin ? null : <Footer />}
    </>
  );
}
