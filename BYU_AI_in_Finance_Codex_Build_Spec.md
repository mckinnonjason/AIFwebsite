# BYU AI in Finance — Website Build Specification

You are acting as a senior product designer, UX designer, and full-stack engineer.

Build a modern, polished website for a new BYU student organization called **BYU AI in Finance**.

BYU AI in Finance is a sub-association of **BYU AI in Business**. The goal of the website is to make the organization look established, useful, credible, and professional while providing students with a central place to find events, resources, recruiting opportunities, and information about the organization.

The website will eventually be deployed through GitHub/GitHub Pages or a similar Git-based hosting workflow. The owner of the site is not an experienced full-stack developer, so the architecture should be straightforward, well documented, and easy to maintain.

---

## 1. DESIGN DIRECTION

Use these websites as references:

- BYU Product Management Association: https://product.byu.edu/
- AI in Business Society: https://www.aiinbusinesssociety.org/

The BYU Product Management Association should be the **primary design inspiration**.

The AI in Business Society should primarily be used as inspiration for the types of functionality/content the organization might need.

### Important design distinction

Do NOT simply copy either website.

The site should feel like a polished, modern BYU student organization website.

Desired aesthetic:

- Clean
- Professional
- Modern
- Academic/business-oriented
- Slightly premium
- Minimal
- Easy to navigate
- Strong typography
- Plenty of whitespace
- Clear hierarchy
- Credible rather than flashy
- Human-designed rather than AI-generated

Avoid:

- Excessive gradients
- Glowing AI effects
- Futuristic robot imagery
- Excessive rounded cards
- Huge walls of text
- Excessive animations
- "AI-generated" marketing language
- Generic stock-photo people looking at laptops
- Overly complicated dashboards
- Questionnaire/onboarding gimmicks
- Gamification unless specifically requested later

The website should communicate:

> "This is a serious BYU student organization that happens to focus on the intersection of AI and finance."

Not:

> "This is an AI startup pretending to be a student club."

---

## 2. BRANDING

The organization does not have a finalized logo or complete brand identity yet.

For now, create a simple temporary logo/wordmark.

Use general BYU-inspired colors, but DO NOT attempt to perfectly reproduce official BYU branding or imply that this organization is an official university department.

Suggested temporary palette:

- BYU navy / deep blue as the primary color
- White
- Very light gray / cool gray backgrounds
- Dark charcoal for body text
- A restrained secondary blue

Keep the palette restrained.

The future logo and brand colors should be easy to replace without redesigning the entire site.

Create a reusable logo component so that the placeholder can later be swapped for an SVG/logo asset.

For now, the logo can be a simple typographic mark such as:

AI
IN
FINANCE

or a simple geometric placeholder paired with:

**BYU AI in Finance**

Do not spend excessive effort on the temporary logo.

---

## 3. OVERALL INFORMATION ARCHITECTURE

The initial website should have these primary sections/pages:

### Main navigation

1. Home
2. Events
3. Resources
4. Recruiting
5. About
6. Admin

The Admin link should NOT be prominently visible to normal users.

It can either:

- be hidden entirely from normal navigation, with `/admin` accessible directly, or
- appear subtly in a footer/developer area.

Primary CTA:

**Join the Club**

Secondary CTA:

**Upcoming Events**

Social links:

- LinkedIn
- Instagram
- Email

---

## 4. HOMEPAGE

The homepage should be the primary experience.

Structure it approximately as follows:

### Hero

Large, clean hero section.

Eyebrow:

BYU AI IN FINANCE

Headline:

**Where AI Meets Finance.**

Alternative supporting language:

**Learn the tools, skills, and ideas shaping the future of finance.**

Supporting paragraph:

BYU AI in Finance brings students together to explore how artificial intelligence is changing investing, banking, corporate finance, private equity, consulting, and the broader financial industry.

Primary CTA:

**Join the Club**

Secondary CTA:

**Explore Events**

The hero should NOT be overly large or take up the entire screen.

Include a tasteful visual element on the right side, potentially:

- abstract financial chart
- subtle geometric AI/finance graphic
- simple data visualization
- abstract network/grid

Do not use cheesy AI imagery.

---

## 5. HOMEPAGE — UPCOMING EVENTS

Immediately after the hero, show upcoming events.

Heading:

**Upcoming Events**

Supporting text:

Workshops, speakers, recruiting events, and conversations about AI and finance.

Display 2–4 upcoming events.

Each event should show:

- Date
- Event title
- Short description
- Location
- Time
- Event type/category
- CTA such as "View Event"

Example:

September 15  
AI in Investment Banking  
6:00 PM · TNRB  
Workshop

The event cards should be simple and editorial rather than giant colorful cards.

Include:

**View All Events →**

The homepage event list should eventually pull from the database.

For the first version, use realistic placeholder data.

---

## 6. HOMEPAGE — WHAT WE DO

Create a concise section explaining the organization.

Possible three pillars:

### Learn
Understand how AI is changing financial analysis, investing, banking, and corporate finance.

### Build
Develop practical skills with AI tools, data, automation, and financial workflows.

### Connect
Meet students, alumni, professionals, and recruiters working at the intersection of AI and finance.

Use three clean columns or a simple horizontal layout.

Keep this section visually restrained.

---

## 7. HOMEPAGE — RESOURCES

Introduce the resource library.

Heading:

**Resources for AI + Finance**

Show 3–4 categories:

- AI Tools
- Finance Resources
- Recruiting
- Meeting Notes & Recordings

Example resource cards:

**AI Tools for Finance Students**  
Practical tools for research, analysis, modeling, and productivity.

**Finance Recruiting Guide**  
Resources for internships, networking, interviews, and recruiting.

**Past Meeting Notes**  
Slides, recordings, and takeaways from previous events.

CTA:

**Explore Resources →**

---

## 8. HOMEPAGE — RECRUITING

Create a recruiting section.

Heading:

**Find Your Next Opportunity**

Explain that the organization will curate internships, jobs, recruiting events, and contacts related to finance and AI.

Show a few sample opportunities.

Potential categories:

- Investment Banking
- Private Equity
- Asset Management
- Consulting
- FinTech
- AI / Machine Learning
- Corporate Finance
- Quantitative Finance

CTA:

**Explore Recruiting →**

---

## 9. HOMEPAGE — ABOUT / COMMUNITY

Near the bottom of the homepage, create a concise section explaining the organization.

Example:

**Built for students at the intersection of finance and technology.**

BYU AI in Finance exists to help students understand how artificial intelligence is changing the financial industry—and prepare to participate in that change.

Keep this short.

---

## 10. HOMEPAGE — JOIN CTA

Near the bottom:

Large, simple CTA.

Heading:

**Stay in the loop.**

Text:

Get updates about meetings, recruiting opportunities, workshops, and resources.

Buttons:

**Join the Club**

**Follow on LinkedIn**

Potentially include:

Instagram

Do not build a custom email subscription backend yet.

The buttons should be configurable external links.

---

## 11. EVENTS PAGE

Create a dedicated `/events` page.

It should contain:

### Upcoming Events

A clean list/grid of upcoming events.

Each event should include:

- Date
- Title
- Category
- Time
- Location
- Description
- RSVP link if applicable
- Optional external calendar link

### Past Events

Show past meetings.

Past events should eventually connect to meeting resources.

For example:

**AI in Private Equity**  
October 8, 2026  
Guest Speaker · TNRB

[Meeting Notes] [Slides] [Recording]

---

## 12. EVENT DATA MODEL

Even if the first version uses local/mock data, architect the code around an Event object.

Suggested fields:

```text
id
title
description
date
startTime
endTime
location
category
speaker
speakerTitle
image
rsvpUrl
calendarUrl
notesUrl
slidesUrl
recordingUrl
isFeatured
createdAt
updatedAt
```

Do not hard-code event markup throughout the UI.

Create reusable components such as:

- EventCard
- EventList
- EventDetail
- UpcomingEvents
- PastEvents

This is important because events will eventually come from a database/admin dashboard.

---

## 13. RESOURCES PAGE

Create `/resources`.

Organize resources into categories.

### Categories

**AI**

- AI tools
- Prompting
- AI fundamentals
- AI applications in finance

**Finance**

- Financial modeling
- Valuation
- Markets
- Investing
- Accounting
- Industry research

**Recruiting**

- Resume resources
- Networking
- Interview preparation
- Technical interview preparation
- Recruiting timelines

**Club Materials**

- Meeting notes
- Slide decks
- Recordings
- Guest speaker materials

Resources should support:

- title
- description
- category
- type
- external URL
- optional downloadable file
- optional date
- optional tags

Do NOT build a complicated document management system yet.

The architecture should make it possible later.

---

## 14. RECRUITING PAGE

Create `/recruiting`.

This should feel like a useful student recruiting resource rather than a generic job board.

### Opportunities

Display internship/job listings.

Each listing:

- Company
- Position
- Location
- Type
- Deadline
- Category
- Description
- Link

Filters:

- Finance
- AI / Technology
- Consulting
- FinTech
- Other

Potentially:

- Internship
- Full-time
- Part-time

### Recruiting Resources

Create links/cards for:

- Finance recruiting
- AI/technical recruiting
- Networking
- Resume preparation
- Interview preparation
- Recruiting timelines

### Recruiting Contacts

Create a section that can eventually contain:

- Company
- Contact name
- Role
- LinkedIn
- Email
- Industry
- Notes

This should be presented carefully and professionally.

Do not expose personal contact information unless an administrator intentionally adds it.

---

## 15. ABOUT PAGE

Create `/about`.

Sections:

### Mission

Explain why BYU AI in Finance exists.

### What We Do

Short explanation of:

- Events
- Workshops
- Guest speakers
- Recruiting
- Resources
- Community

### Leadership

Create a presidency/leadership grid.

Each person should have:

- Photo
- Name
- Position
- Short description
- Email
- LinkedIn

Initial placeholder positions:

- President
- Vice President
- VP of Events
- VP of Recruiting
- VP of Education
- VP of Marketing

Use placeholder names/photos for now.

Make the data easy to replace.

---

## 16. ATTENDANCE TRACKING

Attendance is primarily an admin feature.

Students may eventually scan a QR code at events.

The QR code may eventually point to:

- Google Form
- Microsoft Form
- Custom attendance form
- BYU system

Do NOT over-engineer this now.

Instead, architect the site so an event can have an optional:

```text
attendanceUrl
```

Then the admin can attach a Google/Microsoft/custom form to an event.

On the event detail page, optionally show:

**Check In**

which points to that URL.

Later, we may build custom attendance directly into the site.

---

## 17. ADMIN SYSTEM — IMPORTANT ARCHITECTURAL REQUIREMENT

The website needs to eventually support an admin dashboard.

Create the frontend architecture for:

`/admin`

The admin dashboard should eventually allow authorized admins to:

### Events

- Create event
- Edit event
- Delete event
- Mark event as featured
- Add notes
- Add slides
- Add recording
- Add RSVP link
- Add attendance/check-in link

### Resources

- Add resource
- Edit resource
- Delete resource

### Recruiting

- Add job
- Edit job
- Delete job
- Archive job

### Leadership

- Add/edit presidency members

### Site settings

Eventually manage:

- Club name
- Social links
- Email signup URL
- Logo
- Basic homepage copy

---

## 18. DATABASE ARCHITECTURE

Do NOT implement an overly complicated backend right now.

However, the code should be structured so that the mock data layer can later be replaced with a real database.

Create a clear separation between:

### UI components

and

### Data/services

For example:

```text
/components
/data
/services
/types
/pages
```

or an equivalent clean architecture appropriate for the framework chosen.

Do not put database logic directly inside visual components.

Create interfaces/types for:

```text
Event
Resource
Job
Leader
SiteSettings
```

Initially, the application can use local mock data.

The eventual production architecture should be able to use a hosted database such as Supabase, Firebase, or another straightforward service.

Do NOT add a database merely for the sake of having one in version 1.

The goal is to make the transition easy.

---

## 19. ADMIN AUTHENTICATION

The eventual admin area must be protected.

Do NOT create a fake frontend-only password system.

If authentication is implemented now, use a legitimate authentication architecture.

Otherwise, create the `/admin` UI and clearly isolate it behind a placeholder auth layer so that real authentication can be added later.

The eventual system should support:

- Admin login
- Authorized admin users
- Session management
- Protected admin routes
- Logout

Prefer a simple managed authentication provider when we eventually implement this.

---

## 20. FUTURE DATABASE PLAN

Design the data model with these future tables/collections in mind:

### events

```text
id
title
description
date
start_time
end_time
location
category
speaker
speaker_title
rsvp_url
calendar_url
attendance_url
notes_url
slides_url
recording_url
image_url
featured
created_at
updated_at
```

### resources

```text
id
title
description
category
type
url
file_url
tags
created_at
updated_at
```

### jobs

```text
id
company
title
description
location
type
category
deadline
url
active
created_at
updated_at
```

### leaders

```text
id
name
position
bio
photo_url
email
linkedin_url
display_order
active
```

### site_settings

```text
id
club_name
description
email_signup_url
linkedin_url
instagram_url
contact_email
logo_url
```

Do not necessarily create these tables yet.

---

## 21. CALENDAR

The calendar should initially be a clean event listing.

Eventually we may integrate Google Calendar.

Design the event architecture so that a Google Calendar URL or calendar feed can be added later.

Do not make the calendar visually overwhelming.

Prioritize:

- What is happening
- When
- Where
- Why should I care

---

## 22. SOCIAL MEDIA

Use configurable external links.

Initial placeholders:

- LinkedIn
- Instagram
- Email

Do not hard-code these URLs into multiple components.

Create a single configuration object or site settings source.

---

## 23. RESPONSIVE DESIGN

The website must be fully responsive.

Desktop:

- polished navigation
- spacious layouts
- strong typography
- two-column hero

Tablet:

- compressed spacing
- responsive grids

Mobile:

- hamburger navigation
- single-column cards
- large but not excessive CTA buttons
- readable event listings
- no horizontal scrolling

Test common widths.

---

## 24. ACCESSIBILITY

Implement basic professional accessibility:

- semantic HTML
- proper heading hierarchy
- alt text
- keyboard navigation
- visible focus states
- sufficient contrast
- buttons that are actually buttons
- links that are actually links
- form labels
- responsive text

Do not sacrifice accessibility for visual effects.

---

## 25. ANIMATION

Use very subtle animation.

Examples:

- fade/slide-in on sections
- hover transitions
- subtle card movement
- navigation transitions

Avoid:

- excessive parallax
- bouncing elements
- flashy AI animations
- animated backgrounds
- unnecessary motion

The website should still feel good with animations disabled.

---

## 26. TYPOGRAPHY

Typography should be one of the strongest design elements.

Use a modern professional sans-serif.

Potential choices:

- Inter
- Geist
- IBM Plex Sans
- another similarly clean typeface

Use:

- strong large headlines
- medium-weight section headings
- restrained body text
- clear metadata

Avoid excessive font weights and styles.

---

## 27. COMPONENT SYSTEM

Build reusable components.

At minimum:

```text
Navbar
Footer
Logo
Button
SectionHeader
EventCard
EventList
ResourceCard
JobCard
LeaderCard
SocialLinks
CTASection
```

Do not duplicate markup unnecessarily.

Create consistent spacing and design tokens.

---

## 28. DESIGN TOKENS

Create centralized variables for:

- primary color
- secondary color
- text colors
- background colors
- border color
- spacing
- border radius
- shadows
- typography sizes

This is important because the club will receive an actual logo/brand identity later.

We should be able to change the visual identity from a relatively small number of places.

---

## 29. PLACEHOLDER CONTENT

Use realistic placeholder content.

Do NOT use:

- Lorem ipsum
- obviously fake corporate language
- meaningless AI-generated statistics

Use believable example events and resources, but make it obvious in the code that these are seed/demo records.

Example events:

**AI in Investment Banking**  
How analysts are using AI to accelerate research, modeling, and workflow automation.

**Building an AI-Powered Financial Model**  
Hands-on workshop exploring AI-assisted financial analysis.

**AI in Private Equity**  
How investors are using AI for sourcing, diligence, and portfolio management.

Example recruiting opportunities:

**Investment Banking Summer Analyst**  
Example Bank

**Private Equity Summer Analyst**  
Example Capital

**AI Finance Intern**  
Example FinTech

These are placeholder entries and should be easy to remove.

---

## 30. FOOTER

Footer should contain:

BYU AI in Finance

Short description.

Navigation:

- Events
- Resources
- Recruiting
- About

Social:

- LinkedIn
- Instagram

Contact:

Email

Include a small copyright line.

Do not make the footer enormous.

---

## 31. TECHNICAL REQUIREMENTS

Choose a modern, maintainable stack appropriate for a small organization website.

Prefer:

- React
- Next.js or another sensible modern React framework
- TypeScript
- modern CSS / Tailwind if appropriate

Use the simplest architecture that will support future growth.

Do NOT introduce unnecessary libraries.

Do NOT create a complicated microservice architecture.

Do NOT use a database just to demonstrate backend functionality.

The website should be easy for a beginner developer to understand.

---

## 32. GITHUB / DEPLOYMENT CONSIDERATIONS

The project will eventually be placed in GitHub.

Therefore:

- Include a clean README
- Include setup instructions
- Include environment variable documentation
- Do not commit secrets
- Include `.env.example`
- Make the app straightforward to run locally
- Use npm/pnpm consistently
- Include useful scripts

README should explain:

1. How to install
2. How to run locally
3. Project structure
4. Where to edit club information
5. Where mock data lives
6. How the eventual database should be connected
7. How admin authentication should eventually work
8. How to deploy

---

## 33. IMPORTANT — DO NOT PRETEND THE BACKEND EXISTS

For version 1, prioritize getting an excellent website working.

If the database/authentication infrastructure isn't necessary to make the frontend work, don't fake it.

Use mock/local data with a clean service layer.

However, explicitly structure the code so that we can later replace:

```text
mockEvents
```

with something like:

```text
eventService.getEvents()
```

and eventually:

```text
supabase.from("events")
```

without rewriting the UI.

---

## 34. ADMIN PAGE V1

Build a visual admin dashboard prototype even if the backend is not connected yet.

Route:

`/admin`

Include:

### Dashboard

Overview cards:

- Upcoming Events
- Past Events
- Resources
- Active Jobs

### Events

Table/list:

- Event
- Date
- Category
- Status
- Actions

Actions:

- Edit
- Delete
- View

Button:

**+ Add Event**

### Resources

Button:

**+ Add Resource**

### Recruiting

Button:

**+ Add Opportunity**

### Leadership

Button:

**+ Edit Leadership**

The admin UI should look like a clean internal business application.

Do NOT make it visually identical to the public website.

---

## 35. ADD EVENT FORM

Create the UI for an event form.

Fields:

- Event title
- Description
- Date
- Start time
- End time
- Location
- Category
- Speaker
- Speaker title
- RSVP URL
- Calendar URL
- Attendance/check-in URL
- Notes URL
- Slides URL
- Recording URL
- Featured toggle

Buttons:

**Save Event**

**Cancel**

For now, saving can update local/mock state if implementing local persistence.

Structure the form so it can eventually submit to an API/database.

---

## 36. PRODUCT PRINCIPLES

The site should optimize for the following questions.

When a student visits, they should immediately understand:

1. What is BYU AI in Finance?
2. Why should I care?
3. What is happening soon?
4. How do I join?
5. Where can I find useful resources?
6. How can this help my recruiting?
7. Who runs the organization?

Do not bury these answers under flashy design.

---

## 37. WHAT NOT TO BUILD YET

Do NOT build:

- complicated member profiles
- public leaderboards
- social feeds
- messaging
- chat
- custom attendance analytics
- complicated recommendation systems
- AI chatbot
- payment processing
- elaborate onboarding questionnaires
- gamification
- complex permissions systems
- complicated CMS
- unnecessary animations

Those can be considered later.

---

## 38. VISUAL REFERENCE SUMMARY

Think:

**BYU Product Management Association**
+
**professional finance club**
+
**modern editorial website**

Not:

**generic AI startup landing page**

The visual hierarchy should feel intentional.

Use generous whitespace.

Use strong section headings.

Use restrained cards.

Use subtle borders.

Use high-quality typography.

Use blue as an accent rather than painting the entire site blue.

The site should look credible enough that a student could visit it and immediately believe:

> "This is an established organization at BYU."

---

## 39. IMPLEMENTATION PROCESS

Before coding:

1. Inspect the existing project structure.
2. Determine whether a project already exists.
3. If it is empty, initialize the appropriate application.
4. Establish the design system.
5. Establish the data types.
6. Establish mock data.
7. Build the shared layout/components.
8. Build the homepage.
9. Build Events.
10. Build Resources.
11. Build Recruiting.
12. Build About.
13. Build Admin prototype.
14. Test responsiveness.
15. Fix visual inconsistencies.
16. Add README/setup documentation.

Do not stop after creating a rough homepage.

The result should be a cohesive multi-page application.

---

## 40. FINAL QUALITY BAR

Before considering the implementation complete, review it as if you are the product manager of a real BYU student organization.

Ask:

- Does it look professional?
- Does it look human-designed?
- Does it feel like BYU?
- Is it too flashy?
- Is the information hierarchy obvious?
- Can a student find an upcoming event within 5 seconds?
- Can a student understand what the club does within 10 seconds?
- Can a student find recruiting resources easily?
- Does the website feel useful rather than decorative?
- Can the visual identity easily change once we receive our actual logo?
- Can the mock data eventually be replaced by a database?
- Can an admin eventually manage events without modifying code?

Fix anything that doesn't meet that standard.

The most important objective is:

**Build a clean, professional foundation that looks excellent today while being architected intelligently for the database/admin functionality we will add later.**

---

## Additional Product Guidance

Do not start by actually connecting a database or building authentication unless it is necessary for the current implementation.

For the first version, use a structure like:

```text
Public website
       ↓
Components
       ↓
Data/service layer
       ↓
Mock data (right now)
       ↓
Database (later)
```

The eventual production architecture can use a service such as Supabase for the database and authentication.

The admin page should be part of the plan from day one, even if the backend is not connected yet. This prevents the site from becoming a static marketing website that later has to be substantially rewritten.

Keep branding neutral enough that the future official AI in Finance logo, colors, and visual identity can be swapped in through centralized design tokens/components.
