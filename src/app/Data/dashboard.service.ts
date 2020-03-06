import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardModal } from './../Modal/dashboard.modal';
import { Restaurant } from './restaurant';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient) {
    }
    public restaurantDetails: Restaurant[];
    private restaurantDetails$: BehaviorSubject<Restaurant[]> = new BehaviorSubject<Restaurant[]>(null);

    async getRestaurantDetails(dashboardModal: DashboardModal) {
        const url = 'https://food-and-drinks.herokuapp.com:3000/response';
        let data: Restaurant[] = await this.http.get<Restaurant[]>(url).toPromise();
        data =  data.map(x => new Restaurant(x));
        this.setRestaurantDetails(data);
    }
    setRestaurantDetails(data: Restaurant[]) {
        this.restaurantDetails = data;
        this.restaurantDetails$.next(this.restaurantDetails);
    }
    onRestaurantData(): Observable<Restaurant[]> {
        return this.restaurantDetails$.asObservable();
    }
}
