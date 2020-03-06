export class Restaurant extends Array<Restaurant> {
    Brand: string;
    Variety: string;
    Style: string;
    Country: string;
    Stars: string;
    // tslint:disable-next-line:variable-name
    Top_Ten: string;
    year: number;
    rank: number;

    constructor(res: Restaurant) {
        super();
        this.Brand = res.Brand;
        this.Variety = res.Variety;
        this.Style = res.Style;
        this.Country = res.Country;
        this.Stars = res.Stars === 'NaN' ? 'No Info' : res.Stars;
        this.Top_Ten = res['Top Ten'] === 'NaN' ? 'No Info' : res['Top Ten'];
        if (this.Top_Ten !== 'No Info') {
            this.year = parseInt(this.Top_Ten.split(' ')[0].trim(), 10);
            this.rank = parseInt(this.Top_Ten.split('#')[1].trim(), 10);
        }
    }
}
