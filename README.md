# Remember Us - Creative Project Showcase

The website for the 4th year exhibition: a virtual magazine showcasing projects across
**AI + IM**, **Animations**, **Games**, and **Narrative & Visual Design**.

## Structure

- `web/` - the public website (React + Vite, JavaScript)
- `studio/` - the Sanity Studio (the CMS the team uses to add projects and people)
- `docs/` - vision, design documentation, contributing rules

## Getting started

1. Clone the repo and install everything:
   ```bash
   npm run install:all
   ```
2. Set up Sanity (one person, once):
   ```bash
   cd studio
   npx sanity login
   npx sanity init --env    # or create a project at sanity.io/manage and note the project ID
   ```
3. Copy the env file and fill in the project ID:
   ```bash
   cp web/.env.example web/.env
   ```
4. Run the site and the studio (two terminals):
   ```bash
   npm run dev:web      # http://localhost:5173
   npm run dev:studio   # http://localhost:3333
   ```

## Content model (Sanity)

- **Site Settings** - countdown date/time and location
- **Category** - the four categories and their sub-types
- **Project** - overview, images, category, team members
- **Person** - bio, photo, LinkedIn, social links

## Workflow

See [docs/contributing.md](docs/contributing.md). Short version: branch off `main`,
open a pull request, get one review, then merge. Never push straight to `main`.
