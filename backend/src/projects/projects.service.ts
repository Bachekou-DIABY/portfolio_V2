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
            type: 'pro',
            featured: true,
            impact: [
                { label: 'Interactions', value: '130M' },
                { label: 'Users', value: '250k' }
            ],
            technologies: ['Angular', 'NestJS', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
            longDescription: 'PROJECTS.ANKAMA.LONG_DESC',
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
            id: 'linkpart',
            title: 'PROJECTS.LINKPART.TITLE',
            company: 'LinkPart',
            period: 'PROJECTS.LINKPART.PERIOD',
            description: 'PROJECTS.LINKPART.DESC',
            type: 'pro',
            featured: true,
            technologies: ['Symfony', 'PHP 8', 'AWS Lambda', 'MySQL', 'Node.js', 'GitHub Actions'],
            longDescription: 'PROJECTS.LINKPART.LONG_DESC',
            images: ['/images/linkpart/Hub3e login.png'],
        },
        {
            id: 'urssaf',
            title: 'PROJECTS.URSSAF.TITLE',
            company: 'Academic Project',
            period: '2024',
            description: 'PROJECTS.URSSAF.DESC',
            type: 'academic',
            images: ['/images/urssaf/urssaf_mockup.png'],
        },
        {
            id: 'chefcook',
            title: 'PROJECTS.CHEFCOOK.TITLE',
            company: 'Academic Project',
            period: '2024',
            description: 'PROJECTS.CHEFCOOK.DESC',
            type: 'academic',
            images: ['/images/chefcook/chefcook_mockup.png'],
        },
        {
            id: 'v1',
            title: 'PROJECTS.V1.TITLE',
            company: 'Personal Project',
            period: '2024',
            description: 'PROJECTS.V1.DESC',
            type: 'personal',
            images: ['/images/v1/v1_mockup.png'],
        },
        {
            id: 'energymix',
            title: 'PROJECTS.ENERGYMIX.TITLE',
            company: 'Academic Project',
            period: '2020',
            description: 'PROJECTS.ENERGYMIX.DESC',
            type: 'academic',
            images: ['/images/energymix/energymix_mockup.png'],
        },
        {
            id: 'dicegame',
            title: 'PROJECTS.DICEGAME.TITLE',
            company: 'Academic Project',
            period: '2020',
            description: 'PROJECTS.DICEGAME.DESC',
            type: 'academic',
            images: ['/images/dicegame/dicegame_mockup.png'],
        }
    ];

    findAll(): Experience[] {
        return this.experiences;
    }

    findOne(id: string): Experience | undefined {
        return this.experiences.find(exp => exp.id === id);
    }
}
