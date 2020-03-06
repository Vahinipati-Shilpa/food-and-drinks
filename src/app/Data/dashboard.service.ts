import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardModal } from './../Modal/dashboard.modal';
import { Details } from './details';
import { Restaurant } from './restaurant';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient) {
    }
    public restaurantDetails: Restaurant[];
    private restaurantDetails$: BehaviorSubject<Restaurant[]> = new BehaviorSubject<Restaurant[]>(null);

    async getRestaurantDetails(dashboardModal: DashboardModal) {
        const url = 'http://starlord.hackerearth.com/TopRamen';
        let data = [];
        await this.http.get<Restaurant[]>(url).toPromise().then((res: any) => {
            data = res;
        }, err => {
            data = Details.data;
        });
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
