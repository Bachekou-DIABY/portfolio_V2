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
            images: [
                '/images/ankama/Feed the beast Overview 2025.png',
                '/images/ankama/Feed the beast Concept 2025.png',
                '/images/ankama/Feed the beast Mechanics & Interactions 2025.png',
                '/images/ankama/Feed the beast Engagement Stats 2025.png',
                '/images/ankama/Feed the beast Metrics 2025.png',
                '/images/ankama/Feed the beast Community Activation 2025.png',
            ],
        },
        {
            id: 'urssaf',
            title: 'Symfony URSSAF API',
            company: 'Academic Project',
            period: '2024',
            description: 'Application interagissant avec l\'API publique "Mon entreprise" de l\'URSSAF.',
            images: ['https://placehold.co/600x400/09090b/white?text=URSSAF'],
        },
        {
            id: 'chefcook',
            title: 'Flutter ChefCook App',
            company: 'Academic Project',
            period: '2024',
            description: 'Application mobile de recettes de cuisine faite maison.',
            images: ['https://placehold.co/600x400/09090b/white?text=ChefCook'],
        },
        {
            id: 'v1',
            title: 'Angular Portfolio V1',
            company: 'Personal Project',
            period: '2024',
            description: 'Première version de mon portfolio personnel sous Angular 19.',
            images: ['https://placehold.co/600x400/09090b/white?text=Portfolio+V1'],
        },
        {
            id: 'energymix',
            title: 'NodeJs EnergyMix',
            company: 'Academic Project',
            period: '2020',
            description: 'Visualisation des données de consommation d\'énergie.',
            images: ['https://placehold.co/600x400/09090b/white?text=EnergyMix'],
        },
        {
            id: 'dicegame',
            title: 'Javascript Dice Game',
            company: 'Academic Project',
            period: '2020',
            description: 'Jeu de dés simple en Javascript pur.',
            images: ['https://placehold.co/600x400/09090b/white?text=DiceGame'],
        }
    ];

    findAll(): Experience[] {
        return this.experiences;
    }

    findOne(id: string): Experience | undefined {
        return this.experiences.find(exp => exp.id === id);
    }
}
