import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule, TooltipComponent } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { links } from "../../data/dummy";
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, RouterModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeMenu = true;
  links = links;
  
  handleCloseSideBar(){
    
  }
}
