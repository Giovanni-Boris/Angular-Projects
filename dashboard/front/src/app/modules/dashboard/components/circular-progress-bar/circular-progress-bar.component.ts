import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-circular-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circular-progress-bar.component.html',
  styleUrl: './circular-progress-bar.component.scss'
})
export class CircularProgressBarComponent {
  @Input() percentage: number = 0;

  calculateRotation(): string {
    const rotation = (this.percentage / 100) * 360;
    return `${rotation}deg`;
  }
}
