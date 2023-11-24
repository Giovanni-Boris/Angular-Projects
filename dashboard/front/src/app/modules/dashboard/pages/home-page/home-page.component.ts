import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from '../../components/widgets/widgets.component';
import { FeaturedComponent } from '../../components/featured/featured.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, WidgetsComponent, FeaturedComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
