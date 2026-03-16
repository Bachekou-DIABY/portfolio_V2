import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ProjectsService],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all projects from the service', () => {
      const projects = controller.findAll();
      expect(projects).toEqual(service.findAll());
    });
  });

  describe('findOne', () => {
    it('should return a project if it exists', () => {
      const firstProject = service.findAll()[0];
      expect(controller.findOne(firstProject.id)).toEqual(firstProject);
    });

    it('should return undefined if project does not exist', () => {
      expect(controller.findOne('unknown')).toBeUndefined();
    });
  });
});
