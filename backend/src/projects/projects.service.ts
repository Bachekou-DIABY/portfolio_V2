import { Injectable } from '@nestjs/common';
import { Experience } from './experience.interface';

@Injectable()
export class ProjectsService {
    private experiences: Experience[] = [
        {
            id: 'ankama',
            title: 'PROJECTS.ANKAMA.TITLE',
            company: 'Ankama',
            period: 'PROJECTS.ANKAMA.PERIOD',
            description: 'PROJECTS.ANKAMA.DESC',
            impact: [
                { label: 'Interactions', value: '130M' },
                { label: 'Users', value: '250k' },
            ],
            images: [
                'http://localhost:3000/images/ankama/Feed the beast Overview 2025.png',
                'http://localhost:3000/images/ankama/Feed the beast Concept 2025.png',
                'http://localhost:3000/images/ankama/Feed the beast Mechanics & Interactions 2025.png',
                'http://localhost:3000/images/ankama/Feed the beast Engagement Stats 2025.png',
                'http://localhost:3000/images/ankama/Feed the beast Metrics 2025.png',
                'http://localhost:3000/images/ankama/Feed the beast Community Activation 2025.png',
            ],
        },
        {
            id: 'urssaf',
            title: 'PROJECTS.URSSAF.TITLE',
            company: 'Academic Project',
            period: '2024',
            description: 'PROJECTS.URSSAF.DESC',
            images: ['https://placehold.co/600x400/09090b/white?text=URSSAF'],
        },
        {
            id: 'chefcook',
            title: 'PROJECTS.CHEFCOOK.TITLE',
            company: 'Academic Project',
            period: '2024',
            description: 'PROJECTS.CHEFCOOK.DESC',
            images: ['https://placehold.co/600x400/09090b/white?text=ChefCook'],
        },
        {
            id: 'v1',
            title: 'PROJECTS.V1.TITLE',
            company: 'Personal Project',
            period: '2024',
            description: 'PROJECTS.V1.DESC',
            images: ['https://placehold.co/600x400/09090b/white?text=Portfolio+V1'],
        },
        {
            id: 'energymix',
            title: 'PROJECTS.ENERGYMIX.TITLE',
            company: 'Academic Project',
            period: '2020',
            description: 'PROJECTS.ENERGYMIX.DESC',
            images: ['https://placehold.co/600x400/09090b/white?text=EnergyMix'],
        },
        {
            id: 'dicegame',
            title: 'PROJECTS.DICEGAME.TITLE',
            company: 'Academic Project',
            period: '2020',
            description: 'PROJECTS.DICEGAME.DESC',
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
