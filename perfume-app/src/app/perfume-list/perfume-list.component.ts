import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-perfume-list',
  standalone: true,
  imports: [],
  templateUrl: './perfume-list.component.html',
  styleUrl: './perfume-list.component.scss'
})
export class PerfumeListComponent {
  @Input() perfumes: any[] = [];
}
