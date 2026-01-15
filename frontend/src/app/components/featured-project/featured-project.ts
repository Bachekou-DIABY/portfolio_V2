import { Component, inject, OnInit, signal } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ProjectService, Experience } from '../../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-project',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-zinc-950 text-white px-8">
      <div class="max-w-6xl mx-auto">
        <div class="inline-block px-4 py-1.5 mb-8 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-bold tracking-widest text-zinc-500 uppercase">
          {{ ls.t()('FEATURED.LABEL') }}
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-8">
            <h2 class="text-5xl font-black tracking-tight leading-tight">
              {{ ls.t()(project()?.title || 'FEATURED.TITLE') }}
            </h2>
            <p class="text-xl text-zinc-400 leading-relaxed">
              {{ ls.t()(project()?.description || 'FEATURED.DESCRIPTION') }}
            </p>
            <div class="flex gap-4" *ngIf="project()?.impact">
              <div *ngFor="let item of project()?.impact" class="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex-1">
                <p class="text-zinc-500 text-xs font-bold uppercase mb-2">{{ item.label }}</p>
                <p class="text-3xl font-mono font-bold">{{ item.value }}+</p>
              </div>
            </div>
          </div>
          
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div class="relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex items-center justify-center min-h-[400px]">
               <div *ngIf="project()?.images?.length" class="w-full h-full relative group/carousel">
                  <!-- Images -->
                  <div class="relative w-full h-full overflow-hidden">
                    <div class="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" 
                         [style.transform]="'translateX(-' + currentIndex() * 100 + '%)'">
                      <img *ngFor="let img of project()?.images" [src]="img" [alt]="project()?.title" class="w-full h-auto object-contain flex-shrink-0">
                    </div>
                  </div>

                  <!-- Navigation Arrows -->
                  <div class="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
                     <button (click)="prev()" class="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white backdrop-blur-md pointer-events-auto hover:bg-white/10 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                     </button>
                     <button (click)="next()" class="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white backdrop-blur-md pointer-events-auto hover:bg-white/10 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                     </button>
                  </div>

                  <!-- Dots -->
                  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    <button *ngFor="let img of project()?.images; let i = index" 
                            (click)="currentIndex.set(i)"
                            [class.bg-white]="currentIndex() === i"
                            [class.bg-white/20]="currentIndex() !== i"
                            class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                            [class.w-4]="currentIndex() === i">
                    </button>
                  </div>
               </div>

               <div *ngIf="!project()?.images?.length" class="w-full h-full bg-zinc-950 flex items-center justify-center min-h-[400px]">
                  <span class="text-zinc-800 font-black text-8xl italic uppercase">{{ project()?.company || 'Ankama' }}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class FeaturedProjectComponent implements OnInit {
  ls = inject(LanguageService);
  private projectService = inject(ProjectService);

  project = signal<Experience | null>(null);
  featuredId = 'ankama';
  currentIndex = signal(0);

  ngOnInit() {
    this.projectService.getProjectById(this.featuredId).subscribe(data => {
      this.project.set(data);
    });
  }

  next() {
    const images = this.project()?.images;
    if (images && images.length > 0) {
      this.currentIndex.set((this.currentIndex() + 1) % images.length);
    }
  }

  prev() {
    const images = this.project()?.images;
    if (images && images.length > 0) {
      this.currentIndex.set((this.currentIndex() - 1 + images.length) % images.length);
    }
  }
}
