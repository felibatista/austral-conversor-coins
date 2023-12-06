import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../lib/types';
import { UserService } from '../../services/user.service';
import { fromNumberToPlanName } from '../../lib/util';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [CommonModule, EditUserComponent],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css',
})
export class TableUsersComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() input: string = '';

  page: number = 1;
  maxPages: number = 0;

  loaded: boolean = false;

  userToEdit: User = {
    id: 0,
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    subscriptionId: 0,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    //max pages
    setTimeout(() => {
      this.userService
        .getUsersCount()
        .then((count) => {
          if (count) {
            this.maxPages = Math.ceil(count / 10);
          }
        })
        .finally(() => {
          this.loaded = true;
        });
    }, 1000);
  }

  planToText(plan: number): string {
    return fromNumberToPlanName(plan);
  }

  editUser(user: User) {
    this.userToEdit = user;
  }

  previous() {
    if (this.page > 1) {
      this.page--;
      this.userService.getUsersPage(this.page).then((users) => {
        if (users) {
          this.users = users;
        }
      });
    }
  }

  next() {
    if (this.page < this.maxPages) {
      this.page++;
      this.userService.getUsersPage(this.page).then((users) => {
        if (users) {
          this.users = users;
        }
      });
    }
  }
}
