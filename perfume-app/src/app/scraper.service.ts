// scraper.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ScraperService {

    private baseUrl = 'http://localhost:3000'; // Your Playwright server URL

    constructor(private http: HttpClient) { }

    fetchData() {
        return this.http.get<any[]>(`${this.baseUrl}/data`);
    }
    searchPerfumes(searchTerm: string) {
      return this.http.get<any[]>(`${this.baseUrl}/search?term=${searchTerm}`);
    }
}
