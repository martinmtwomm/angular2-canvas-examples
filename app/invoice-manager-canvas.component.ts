import {Component, Directive, ElementRef, HostListener, Input, Renderer} from '@angular/core';
import {Rect} from "./app.component";

import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";

@Directive({
    selector: '[barchart-data]'
})
export class BarchartDataDirective {
    private canvas: any;
    private ctx: any;
    @Input('barchart-data') data: number[];
    @Input('width') width: number;
    @Input('height') height: number;
    @Input('colors') colors: string[];
    @Input('Rect') rectangles: Rect[];

    private rectangle: Rect[];

    constructor(private _http: Http, private el: ElementRef, private renderer: Renderer) {
        this.canvas = el.nativeElement;
        /* this.canvas.renderOnAddRemove = false;*/
        console.log("BarchartDataDirective constructor: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors);
        let rects: Rect[];
        this.getMyBlog(rects);
        const c = this.ctx;


        /*console.log(percentWidth);*/

    }

    private getMyBlog(rectangle: Rect[]) {
        this._http.get('http://localhost:8080/invoice-manager-web/rest/hello')
            .map(res => (res.json()as Rect[]))
            .subscribe(data => {
                this.rectangle = data;

                console.log("adsdddd ", this.rectangle);
                const c = this.ctx;
                c.fillStyle = "rgba(255, 0, 0, 0.0)"
                c.fillRect(0, 0, this.width, this.height);

                c.translate(0.6, 0.6);

                c.strokeStyle = "#ff0000";
                c.lineWidth = 1;

                c.strokeStyle = "#ff0000";

                var imgWidth :number;
                imgWidth= 1654;
                var imgHeight:number;
                imgHeight = 792;
                let percentWidth = (1024/imgWidth )* 100;
                for (var i = 0; i < this.rectangle.length; i++) {

                    var r = this.rectangle[i];
                    c.rect(r.x/100*percentWidth, r.y/100*percentWidth, r.width/100*percentWidth, r.height/100*percentWidth);
                }


                c.stroke()

            });
    }

    ngOnInit() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
    }


}

@Component({
    selector: 'barchart',
    styles: [`
        h1.title {
            text-align: center;
            margin: 0;
            font-size: 1.6em;
        }
    `],
    template: `
        <div [style.width]="width" style="'position:relative;'">

            <img [src]="'/assets/img/134.png'" alt="image" style="position: absolute;z-index: 1" [width]="width">
            <canvas [barchart-data]="data" [width]="width" [height]="height" [colors]="colors"
                    style="position:relative;z-index:10"></canvas>
            <h1 class="title">{{title}}</h1>
        </div>
    `
})
export class BarchartComponent {
    @Input() data: number[];
    @Input() width: number;
    @Input() height: number;
    @Input() colors: string[];
    @Input() title: string;

    constructor() {
        console.log("BarchartComponent constructor: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors);
    }

    ngOnInit() {
        console.log("BarchartComponent ngOnInit: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors);
    }
}