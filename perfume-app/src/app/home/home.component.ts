import { Component, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { ScraperService } from '../scraper.service';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    NgIf,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  perfumes: any[] = [];

  searchTerm = new FormControl('');

  constructor(private scraperService: ScraperService) { }

  onSearch() {
    // null check before sending to service
    if (this.searchTerm.value !== null) {
      this.scraperService.searchPerfumes(this.searchTerm.value).subscribe({
        next: (data) => {
            this.perfumes = data;
        },
        error: (error) => {
            console.error('Error searching perfumes:', error);
        }
    });
    }

  }
}
