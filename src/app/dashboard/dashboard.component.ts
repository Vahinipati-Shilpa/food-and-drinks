import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { isNullOrUndefined } from 'util';
import { DashboardModal } from '../Modal/dashboard.modal';
import { DashboardService } from './../Data/dashboard.service';
import { Restaurant } from './../Data/restaurant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private searchTerm: any = {};
  public countryList = [];
  private starArray = [];
  private showTopRestaurant = false;
  dashboardModal: DashboardModal = new DashboardModal();
  constructor(public dashboardService: DashboardService) { }
  private readonly max = 11;
  private readonly min = 1;
  ngOnInit(): void {
    this.subsCribeToData();
  }
  subsCribeToData() {
    this.dashboardService.onRestaurantData().subscribe(data => {
      if (data != null) {
        this.dashboardModal.restaurantDetails = data;
        this.countryList = _.uniqBy(data.map(x => x.Country));
      } else {
        this.dashboardService.getRestaurantDetails(this.dashboardModal);
      }
    });
  }
  getSearchTerm() {
    return this.searchTerm;
  }

  getTopResturant() {
    const resMap = new Map<number, Restaurant>();
    this.dashboardModal.restaurantDetails.forEach(element => {
      const res: Restaurant = resMap.get(element.year);
      if (!isNullOrUndefined(res) && !isNullOrUndefined(element.rank)) {
        if (res.rank > element.rank) {
          resMap.set(element.year, element);
        }
      } else if (!isNullOrUndefined(element.rank)) {
        resMap.set(element.year, element);
      }
    });
    return Array.from(resMap.values());
  }

  public getRestaurants() {
    return this.showTopRestaurant ? this.getTopResturant() : this.dashboardModal.restaurantDetails;
  }

  public randomIntFromInterval() {
    return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
  }
  public topRestaurants(event) {
      this.showTopRestaurant = event.target.checked;
  }
  public filterByStar(star: string, event) {
    if (event.target.checked) {
        this.starArray.push(star);
    } else {
      this.starArray.splice(this.starArray.indexOf(star), 1);
    }
    this.searchTerm.Stars = this.starArray.length === 0 ? '' : { $or: this.starArray };
  }
}
