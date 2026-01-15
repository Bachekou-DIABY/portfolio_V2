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

    getProjects(): Observable<Experience[]> {
        return this.http.get<Experience[]>(this.apiUrl);
    }

    getProjectById(id: string): Observable<Experience> {
        return this.http.get<Experience>(`${this.apiUrl}/${id}`);
    }
}
