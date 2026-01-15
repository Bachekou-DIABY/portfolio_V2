import { Controller, Get, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Experience } from './experience.interface';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Get()
    findAll(): Experience[] {
        return this.projectsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Experience | undefined {
        return this.projectsService.findOne(id);
    }
}
