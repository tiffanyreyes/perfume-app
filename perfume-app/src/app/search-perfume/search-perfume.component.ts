import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-perfume',
  standalone: true,
  imports: [],
  templateUrl: './search-perfume.component.html',
  styleUrl: './search-perfume.component.scss'
})
export class SearchPerfumeComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  onSearch() {
      this.search.emit(this.searchTerm);
  }
}
