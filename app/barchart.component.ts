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
        console.log("BarchartDataDirective constructor: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors);
        let rects: Rect[];
        this.getMyBlog(rects);

    }

    private getMyBlog(rectangle: Rect[]) {
        this._http.get('http://localhost:8080/invoice-manager-web/rest/hello')
            .map(res => (res.json()as Rect[]))
            .subscribe(data => {
                this.rectangle = data;

                console.log("adsdddd ",this.rectangle);
                const c = this.ctx;
                c.fillStyle = "#ff0000";
              /*  for (let i = 0; i < 10; i++) {
                    let x = 1;
                    c.fillRect(x * (i * 30), 0, 20, 100);

                }*/


              /*  c.fillRect(this.rectangle[0].x, this.rectangle[0].y, this.rectangle[0].width, this.rectangle[0].height);*/
                /*for (let r in this.rectangle) {
                    c.fillRect(r., this.rectangle[0].y, this.rectangle[0].width, this.rectangle[0].height);
                }*/
                for (var i = 0; i < this.rectangle.length; i++) {

                    var r = this.rectangle[i];
                    c.fillRect(r.x, r.y, r.width, r.height);
                }
            });


        /*.subscribe(data => {
            this.data = data;

            console.log(this.data);
        });*/
    }

    ngOnInit() {
        console.log("BarchartDataDirective ngOnInit: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors);
        console.log("rectangles....123123", this.rectangles)
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');

        this.draw();
    }

    draw() {
        const c = this.ctx;

        //fill in the background
        c.fillStyle = "#fefefe";
        c.fillRect(0, 0, this.width, this.height);

        const xOffset = 25;

        //draw data bars
        let values = this.data.map((dp) => {
            return dp['value'];
        });

        /* for (let i = 0, l = values.length, j = this.colors.length; i < l; i++) {
             c.fillStyle = this.colors[i % j];
             let dp = values[i];
             c.fillRect(xOffset + i * (this.width) / l + 10, this.height - 40 - dp * 5, 50, dp * 5);
         }
 */
       /* c.fillStyle = "#ff0000";
        for (let i = 0; i < 10; i++) {
            let x = 1;
            c.fillRect(x * (i * 30), 0, 20, 100);

        }*/


        /*       //draw axis lines
               c.fillStyle = 'black';
               c.lineWidth = 2.0;
               c.beginPath();
               c.moveTo(xOffset+5, 20);
               c.lineTo(xOffset+5, this.height - 40);
               c.lineTo(this.width, this.height - 40);
               c.stroke();*/

        //draw text and vertical lines (value label and tick mark down left side
        /*        c.fillStyle = 'black';
                let limit = this.height / 100 + 1;
                for(let i = 0; i < limit; i++) {
                    let yTickOffset = (this.height-40) - i*100;
                    c.fillText(i*20 + "", 4, yTickOffset);
                    c.beginPath();
                    c.moveTo(xOffset, yTickOffset);
                    c.lineTo(xOffset+5, yTickOffset);
                    c.stroke();
                }*/

        /*        //finally, add labels for the x-axis
                const labels = this.data.map( (dp) => {
                    return dp['label'];
                });
                //draw horiz text
                for(let i = 0, l = labels.length; i < l; i++) {
                    c.fillText(labels[i], 50 + i*this.width/l, this.height - 25);
                }*/
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
        <div [style.width]="width">
            <canvas [barchart-data]="data" [width]="width" [height]="height" [colors]="colors"></canvas>
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