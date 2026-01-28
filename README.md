# Portfolio V2 - Bachekou DIABY

Bienvenue sur le dépôt de mon portfolio personnel (Version 2). Cette application est un showcase technique complet mettant en avant mes expériences, mes compétences et mes projets phares.

![Portfolio Preview](backend/public/images/ankama/Feed%20the%20beast%20Overview%202025.png)

## Caractéristiques

- **Design Premium** : UI/UX moderne avec animations fluides (`GSAP`-like feeling via CSS), typographie soignée (Inter & Outfit) et mode sombre optimisé.
- **Fullstack** : Architecture découplée avec un Frontend Angular performant et un Backend NestJS robuste.
- **Internationalisation (i18n)** : Support complet pour le Français et l'Anglais.
- **Déploiement Pro** : Containerisation complète via Docker et Docker Compose avec reverse proxy Nginx et HTTPS (Certbot).

## Tech Stack

### Frontend
- **Angular 19+** : Framework de base.
- **Tailwind CSS v4** : Styling utility-first pour une maintenance facile.
- **Angular Signals** : Gestion réactive de l'état.

### Backend
- **NestJS** : Framework Node.js pour des APIs scalables.
- **Swagger/OpenAPI** : Documentation interactive de l'API.
- **Jest/Supertest** : Suite de tests unitaires et E2E.

### DevOps
- **Docker & Docker Compose** : Containerisation pour un environnement reproductible.
- **AWS EC2** : Hébergement cloud.
- **Nginx** : Reverse Proxy et gestion SSL.

## Installation locale

### Pré-requis
- Node.js (v20+)
- Docker (Optionnel pour le local)

### Étapes
1. **Cloner le projet**
   ```bash
   git clone https://github.com/Bachekou-DIABY/portfolio_V2.git
   cd portfolio_V2
   ```

2. **Lancer le Backend**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. **Lancer le Frontend**
   ```bash
   cd frontend
   npm install
   npm run start
   ```

4. **Accéder à l'application**
   - Frontend : `http://localhost:4200`
   - API / Swagger : `http://localhost:3000/api`

## Déploiement Production

Le déploiement est automatisé via Docker Compose.

```bash
docker compose up -d --build
```

---

Réalisé  par **Bachekou DIABY**
