import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Projects (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/projects (GET)', () => {
        it('should return 200 and an array of projects', () => {
            return request(app.getHttpServer())
                .get('/projects')
                .expect(200)
                .then((response) => {
                    expect(Array.isArray(response.body)).toBe(true);
                    expect(response.body.length).toBeGreaterThan(0);
                });
        });
    });

    describe('/projects/:id (GET)', () => {
        it('should return 200 and the project object if it exists', () => {
            return request(app.getHttpServer())
                .get('/projects/ankama')
                .expect(200)
                .then((response) => {
                    expect(response.body.id).toBe('ankama');
                    expect(response.body.company).toBe('Ankama');
                });
        });

        it('should return 200 and empty body (or undefined) if project not found', () => {
            // Note: your current controller returns undefined which express converts to 200 with empty body
            return request(app.getHttpServer())
                .get('/projects/non-existent')
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual({});
                });
        });
    });
});
