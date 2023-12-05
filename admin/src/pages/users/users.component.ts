import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableUsersComponent } from '../../components/table-users/table-users.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableUsersComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
