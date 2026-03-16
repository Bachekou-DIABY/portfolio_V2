import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of experiences', () => {
      const results = service.findAll();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveProperty('id');
      expect(results[0]).toHaveProperty('title');
    });
  });

  describe('findOne', () => {
    it('should return a single experience if ID exists', () => {
      const allProjects = service.findAll();
      const firstId = allProjects[0].id;
      const result = service.findOne(firstId);
      expect(result).toBeDefined();
      expect(result?.id).toBe(firstId);
    });

    it('should return undefined if ID does not exist', () => {
      const result = service.findOne('non-existent-id');
      expect(result).toBeUndefined();
    });

    it('should find the "ankama" project specifically', () => {
      const result = service.findOne('ankama');
      expect(result).toBeDefined();
      expect(result?.company).toBe('Ankama');
    });
  });
});
