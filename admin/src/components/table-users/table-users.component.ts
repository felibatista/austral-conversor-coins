import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../lib/types';
import { UserService } from '../../services/user.service';
import { fromNumberToPlanName } from '../../lib/util';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css',
})
export class TableUsersComponent implements OnInit {
  users: User[] = [];

  page: number = 1;
  maxPages: number = 0;

  loaded: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    //max pages
    this.userService
      .getUsersCount()
      .then((count) => {
        if (count) {
          this.maxPages = Math.ceil(count / 10);
        }
      })
      .then(() => {
        //users page 1 
        this.userService.getUsersPage(1).then((users) => {
          if (users) {
            this.users = users;
          }
        });
      })
      .finally(() => {
       this.loaded = true;
      });
  }

  planToText(plan: number): string {
    return fromNumberToPlanName(plan);
  }

  previous(){
    if (this.page > 1) {
      this.page--;
      this.userService.getUsersPage(this.page).then((users) => {
        if (users) {
          this.users = users;
        }
      });
    }
  }

  next(){
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
