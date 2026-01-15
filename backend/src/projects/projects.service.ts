import { Injectable } from '@nestjs/common';
import { Experience } from './experience.interface';

@Injectable()
export class ProjectsService {
    private experiences: Experience[] = [
        {
            id: 'ankama',
            title: 'Fullstack Developer',
            company: 'Ankama',
            period: 'Feb 2025 - Aug 2025',
            description: 'Développement d\'infrastructures et d\'une expérience interactive complète pour les jeux Ankama.',
            impact: [
                { label: 'Interactions', value: '130M' },
                { label: 'Users', value: '250k' },
            ],
        },
        {
            id: 'urssaf',
            title: 'Symfony URSSAF API',
            company: 'Academic Project',
            period: '2024',
            description: 'Application interagissant avec l\'API publique "Mon entreprise" de l\'URSSAF.',
        },
        {
            id: 'chefcook',
            title: 'Flutter ChefCook App',
            company: 'Academic Project',
            period: '2024',
            description: 'Application mobile de recettes de cuisine faite maison.',
        },
        {
            id: 'v1',
            title: 'Angular Portfolio V1',
            company: 'Personal Project',
            period: '2024',
            description: 'Première version de mon portfolio personnel sous Angular 19.',
        },
        {
            id: 'energymix',
            title: 'NodeJs EnergyMix',
            company: 'Academic Project',
            period: '2020',
            description: 'Visualisation des données de consommation d\'énergie.',
        },
        {
            id: 'dicegame',
            title: 'Javascript Dice Game',
            company: 'Academic Project',
            period: '2020',
            description: 'Jeu de dés simple en Javascript pur.',
        }
    ];

    findAll(): Experience[] {
        return this.experiences;
    }

    findOne(id: string): Experience | undefined {
        return this.experiences.find(exp => exp.id === id);
    }
}
