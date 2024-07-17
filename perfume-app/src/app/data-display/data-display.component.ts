import { Component, OnInit } from '@angular/core';
import { ScraperService } from '../scraper.service';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss'
})
export class DataDisplayComponent {
  data: any[] = [];

  constructor(private scraperService: ScraperService) { }

  ngOnInit(): void {
      this.scraperService.fetchData().subscribe({
          next: (data) => {
              this.data = data;
          },
          error: (error) => {
              console.error('Error fetching data:', error);
          }
      });
  }
}
