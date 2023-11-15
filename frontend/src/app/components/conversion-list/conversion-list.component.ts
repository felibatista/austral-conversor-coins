import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { ForeingService } from 'src/app/services/foreing/foreing.service';
import { UserService } from 'src/app/services/user/user.service';
import { Foreing } from 'src/app/types/foreing';
import { formatDate } from 'src/app/utils/date-formatting';

@Component({
  selector: 'app-conversion-list',
  templateUrl: './conversion-list.component.html',
  standalone: true,
  styleUrls: ['./conversion-list.component.css'],
  imports: [CommonModule],
})
export class ConversionListComponent {
  conversions = computed(() => {
    return this.userService.conversions();
  });

  constructor(
    private userService: UserService,
    private foreingService: ForeingService
  ) {
    this.userService.getConversions().then((conversions) => {
      if (conversions) {
        this.userService.conversions.set(conversions);

        //sort
        this.userService.conversions().sort((a, b) => {
          return b.date.getTime() - a.date.getTime();
        })

        this.conversions = computed(() => {
          return this.userService.conversions().reverse();
        })
      }
    });

    this.foreingService.getForeings().then((foreings) => {
      if (foreings) {
        this.foreingService.foreings.set(foreings);
      }
    });
  }

  getForeing(id: number): Foreing | undefined {
    return this.foreingService.foreings().find((foreing) => foreing.id == id);
  }

  getDateFormatted(date: Date): string {
    return formatDate(date);
  }
}
