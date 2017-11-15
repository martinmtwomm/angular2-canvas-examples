import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import {rect} from "./interfaces";

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
  <barchart [data]="salesData" [width]="1024" [height]="1000" [colors]="['navy']" [title]="'Monthly Sales 2016'"></barchart>
`
})
export class AppComponent {
    data: any = null;

    constructor(private _http: Http) {
        this.getMyBlog();

    }


    private getMyBlog() {
        return this._http.get('http://localhost:8080/invoice-manager-web/rest/hello')
            .map((res: Response) => res.json() as Rect)
            .subscribe(data => {
                this.data = data;

                console.log(this.data);
            });
    }
}
export interface Rect {
    x:number;
    y:number;
    width:number;
    height:number;
}