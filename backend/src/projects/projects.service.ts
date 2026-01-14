import { Injectable } from '@nestjs/common';
import { Experience } from './experience.interface';

@Injectable()
export class ProjectsService {
    private experiences: Experience[] = [
        {
            id: '1',
            title: 'Fullstack Developer',
            company: 'Ankama',
            period: '2022 - Present',
            description: 'Développement d\'outils et d\'infrastructures pour les jeux Ankama.',
            stats: [
                { label: 'Interactions', value: '130M' },
                { label: 'Users', value: '250k' },
            ],
        },
        {
            id: '2',
            title: 'Freelance Developer',
            company: 'Portfolio_V2',
            period: '2021',
            description: 'Conception et réalisation de solutions web modernes.',
        },
    ];

    findAll(): Experience[] {
        return this.experiences;
    }
}
