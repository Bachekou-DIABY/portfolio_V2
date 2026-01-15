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
            technologies: ['Node.js', 'HTML/CSS', 'MongoDB', 'Redis', 'Cloudflare', 'AWS'],
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
            technologies: ['Angular', 'TypeScript', 'Symfony', 'PHP', 'Node.js', 'AWS Lambda', 'MySQL'],
            longDescription: 'PROJECTS.LINKPART.LONG_DESC',
            images: ['/images/linkpart/Hub3e login.png'],
        },
        {
            id: 'urssaf',
            title: 'PROJECTS.URSSAF.TITLE',
            company: 'SKILLS.TYPE.ACADEMIC',
            period: '2024',
            description: 'PROJECTS.URSSAF.DESC',
            type: 'academic',
            technologies: ['Symfony', 'PHP'],
            images: ['/images/urssaf/symfonyAPIProject.png'],
        },
        {
            id: 'chefcook',
            title: 'PROJECTS.CHEFCOOK.TITLE',
            company: 'SKILLS.TYPE.ACADEMIC',
            period: '2024',
            description: 'PROJECTS.CHEFCOOK.DESC',
            type: 'academic',
            technologies: ['Flutter'],
            images: [
                '/images/chefCook/chefCook1.png',
                '/images/chefCook/chefCook2.png',
                '/images/chefCook/chefCook3.png'
            ],
        },
        {
            id: 'v1',
            title: 'PROJECTS.V1.TITLE',
            company: 'SKILLS.TYPE.PERSONAL',
            period: '2024',
            description: 'PROJECTS.V1.DESC',
            type: 'personal',
            technologies: ['Angular', 'TypeScript'],
            images: ['/images/portfolioV1/image.png'],
        },
        {
            id: 'energymix',
            title: 'PROJECTS.ENERGYMIX.TITLE',
            company: 'SKILLS.TYPE.ACADEMIC',
            period: '2020',
            description: 'PROJECTS.ENERGYMIX.DESC',
            type: 'academic',
            technologies: ['Node.js', 'JavaScript'],
            images: [
                '/images/energyMix/energyMixProject1.png',
                '/images/energyMix/energyMixProject2.png',
                '/images/energyMix/energyMixProject3.png'
            ],
        },
        {
            id: 'dicegame',
            title: 'PROJECTS.DICEGAME.TITLE',
            company: 'SKILLS.TYPE.ACADEMIC',
            period: '2020',
            description: 'PROJECTS.DICEGAME.DESC',
            type: 'academic',
            technologies: ['JavaScript'],
            images: ['/images/diceGame/jsGameProject.png'],
        }
    ];

    findAll(): Experience[] {
        return this.experiences;
    }

    findOne(id: string): Experience | undefined {
        return this.experiences.find(exp => exp.id === id);
    }
}
