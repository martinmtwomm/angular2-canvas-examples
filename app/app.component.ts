import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
    selector: 'my-app',
    styles: [`
        piechart {
            display: block;
            clear: both;
            margin-top: 30px;
        }
        
        barchart {
            margin: 30px;
        }
        
        h3 {
            margin-top:20px;
            margin-bottom: 0;
        }
    `],
    template: `
  <h1>Charts of important things</h1>
  <h3>This barchart component uses an attribute directive on a canvas element. Meh.</h3>
  <barchart [data]="salesData" [width]="500" [height]="500" [colors]="['navy']" [title]="'Monthly Sales 2016'"></barchart>
`
})
export class AppComponent {
    salesData = [
        { label: 'JAN', value: this.getRandomInt() },
        { label: 'FEB', value: this.getRandomInt() },
        { label: 'MAR', value: this.getRandomInt() },
        { label: 'APR', value: this.getRandomInt() },
        { label: 'JUN', value: this.getRandomInt() },
        { label: 'JUL', value: this.getRandomInt() }
    ] ;

    consistencyData = [
        { label: 'JAN', value: 83 },
        { label: 'FEB', value: 41 },
        { label: 'MAR', value: 10 },
        { label: 'APR', value: 98 },
        { label: 'JUN', value: 50 },
        { label: 'JUL', value: 25 },
        { label: 'AUG', value: 122 },
        { label: 'SEP', value: 36 },
        { label: 'OCT', value: 100 },
    ] ;
    colors2 = [ '#5882FA', 'orange', '#0B3B2E', 'red','#689a68', '#FF00BF', '#008080', '#f16e23'  ];

    pizzaData = [
        { label: 'Pepperoni', value: this.getRandomInt() },
        { label: 'Sausage', value: this.getRandomInt() },
        { label: 'Onions', value:  this.getRandomInt() },
        { label: 'Olives', value:  this.getRandomInt() },
        { label: 'Pineapple', value:  this.getRandomInt() }
    ] ;

    getRandomInt(max = 100) {
        return Math.floor(Math.random()*max);
    }
    data: any = null;

    constructor(private _http: Http) {
        this.getMyBlog();
    }

    private getMyBlog() {
        return this._http.get('http://localhost:8080/invoice-manager-web/rest/hello')
            .map((res: Response) => res.text())
            .subscribe(data => {
                this.data = data;
                console.log(this.data);
            });
    }
}