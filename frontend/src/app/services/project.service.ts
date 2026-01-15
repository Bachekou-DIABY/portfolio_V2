import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    impact?: {
        label: string;
        value: string;
    }[];
    technologies?: string[];
    longDescription?: string;
    images?: string[];
    type?: 'pro' | 'academic' | 'personal';
    featured?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/projects';
    private serverUrl = 'http://localhost:3000';

    getProjects(): Observable<Experience[]> {
        return this.http.get<Experience[]>(this.apiUrl);
    }

    getProjectById(id: string): Observable<Experience> {
        return this.http.get<Experience>(`${this.apiUrl}/${id}`);
    }

    getImageUrl(path: string): string {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `${this.serverUrl}${path}`;
    }
}
