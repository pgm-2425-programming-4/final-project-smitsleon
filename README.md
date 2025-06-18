# Jammin - Task Management Application


## Live Demo

**[View Live Application](https://bejewelled-taffy-0f2bcb.netlify.app/)**

## Project Overzicht

Jammin is een moderne task management applicatie die teams helpt bij het organiseren en beheren van hun projecten. De applicatie biedt zowel een Kanban board voor visueel projectbeheer als een georganiseerde backlog view voor gedetailleerde taakplanning.

## Hoofdfuncties

- **Kanban Board**: Visueel beheer van taken met drag-and-drop functionaliteit
- **Backlog Management**: Georganiseerde lijst van taken met paginatie
- **Project Management**: Creëer en beheer meerdere projecten
- **Task Filtering**: Filter taken op labels en zoek op titel/beschrijving
- **Labels & Status**: Organiseer taken met aangepaste labels en statussen
- **Due Dates**: Stel deadlines in voor taken

## Technische Stack

### Frontend
- **React 19** - UI framework
- **TanStack Router** - Client-side routing
- **TanStack Query** - Server state management
- **Vite** - Build tool en development server

### Backend
- **Strapi 5** - Headless CMS en API
- **PostgreSQL** - Database
- **Better-SQLite3** - Development database

## Project Structuur

```
├── client/          # React frontend applicatie
│   ├── src/
│   │   ├── components/  # Herbruikbare UI componenten
│   │   ├── routes/      # Pagina componenten
│   │   ├── queries/     # API calls en data fetching
│   │   └── constants/   # Applicatie constanten
│   └── public/          # Statische assets en CSS
└── server/          # Strapi backend
    ├── src/api/         # API endpoints en controllers
    ├── config/          # Strapi configuratie
    └── database/        # Database migraties
```

## Gebruik

1. **Projecten**: Maak nieuwe projecten aan of selecteer bestaande projecten
2. **Taken beheren**: Voeg taken toe, bewerk details, en verwijder oude taken
3. **Kanban View**: Bekijk taken visueel georganiseerd per status
4. **Backlog View**: Bekijk alle backlog taken in een gepagineerde lijst
5. **Filtering**: Gebruik de zoekfunctie en label filters om specifieke taken te vinden

## 🚀 Development Setup

### Client (Frontend)
```bash
cd client
npm install
npm run dev
```

### Server (Backend)
```bash
cd server
npm install
npm run develop
```
