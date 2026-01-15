import { Injectable, signal } from '@angular/core';
import { Experience } from './project.service';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private activeProjectSignal = signal<Experience | null>(null);
    private isOpenSignal = signal(false);

    activeProject = this.activeProjectSignal.asReadonly();
    isOpen = this.isOpenSignal.asReadonly();

    open(project: Experience) {
        this.activeProjectSignal.set(project);
        this.isOpenSignal.set(true);
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    close() {
        this.isOpenSignal.set(false);
        setTimeout(() => {
            this.activeProjectSignal.set(null);
        }, 300); // Wait for animation
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}
