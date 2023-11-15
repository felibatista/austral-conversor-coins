import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConversionListComponent } from 'src/app/components/conversion-list/conversion-list.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ForeingService } from 'src/app/services/foreing/foreing.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ConversionListComponent,
    NavbarComponent,
    FooterComponent
  ],
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  totalConversions: number | null = null;
  conversionsThisMonth: number | null = null;
  conversionsLastMonth: number | null = null;
  conversionLimit: number | null = null;

  firstForeing: string | null = null
  secondForeing: string | null = null
  
  constructor(private userService: UserService, private foreingService: ForeingService) { 

  }

  ngOnInit(): void {
    this.userService.getConversions().then((conversions) => {      
      if (conversions){
        //timeout load
        setTimeout(() => {
        this.totalConversions = conversions.length;

        this.userService.getPlan().then((plan) => {
          if (plan) {
            this.conversionLimit = plan.limit
          }
        });

        this.conversionsThisMonth = conversions.filter((conversion) => {
          return conversion.date.getMonth() == new Date().getMonth();
        }).length;

        this.conversionsLastMonth = conversions.filter((conversion) => {
          return conversion.date.getMonth() == new Date().getMonth() - 1;
        }).length;

        //get most used foreings
        const foreings = conversions.map((conversion) => {
          return conversion.fromForeingId;
        });

        const firstForeingId = foreings.sort((a, b) =>
          foreings.filter((v) => v === a).length - foreings.filter((v) => v === b).length
        ).pop();

        if (!firstForeingId){
          return;
        }

        foreings.splice(foreings.indexOf(firstForeingId));

        const secondForeingId = foreings.sort((a, b) =>
          foreings.filter((v) => v === a).length - foreings.filter((v) => v === b).length
        ).pop();


        if (firstForeingId){
          this.foreingService.getForeing(firstForeingId).then((foreing) => {
            if (foreing) {
              this.firstForeing = foreing.code;
            }
          });
        }
        
        if (secondForeingId){
          if (secondForeingId == firstForeingId){
            this.secondForeing = "-";

            return;
          }

          this.foreingService.getForeing(secondForeingId).then((foreing) => {
            if (foreing) {
              this.secondForeing = foreing.code;
            }
          });
        }else{
          this.secondForeing = "-";
        }
      }, 1000);
      }
      
    });
  };
}
