import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CircularProgressBarComponent } from '../circular-progress-bar/circular-progress-bar.component';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule, MatIconModule,CircularProgressBarComponent],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss'
})
export class FeaturedComponent {

}
