import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
interface Type {
  title: string;
  isMoney: boolean;
  link: string;
  icon: string;
  iconStyle: IconStyle;
}
interface IconStyle {
  color: string;
  backgroundColor: string;
}
@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss',
})
export class WidgetsComponent {
  data: Type | null = null;
  _type : string = "";
  get type() {
    return this._type;
  }
  @Input() set type(value: string) {
    this._type = value;
    switch (this.type) {
      case 'user':
        this.data = {
          title: 'USERS',
          isMoney: false,
          link: 'See all users',
          icon: 'person_outline',
          iconStyle: {
            color: 'crimson',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
          },
        };
        break;
      case 'order':
        this.data = {
          title: 'ORDERS',
          isMoney: false,
          link: 'View all orders',
          icon: 'shopping_cart',
          iconStyle: {
            backgroundColor: 'rgba(218, 165, 32, 0.2)',
            color: 'goldenrod',
          },
        };
        break;
      case 'earning':
        this.data = {
          title: 'EARNINGS',
          isMoney: true,
          link: 'View net earnings',
          icon: 'monetization_on',
          iconStyle: {
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            color: 'green',
          },
        };
        break;
      case 'balance':
        this.data = {
          title: 'BALANCE',
          isMoney: true,
          link: 'See details',
          icon: 'account_balance_wallet_outline',
          iconStyle: {
            backgroundColor: 'rgba(128, 0, 128, 0.2)',
            color: 'purple',
          },
        };
        break;
      default:
        break;
    }
  }
}
