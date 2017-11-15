import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {BarchartComponent, BarchartDataDirective} from "./invoice-manager-canvas.component";
import {SmileyDirective} from "./smiley.component";
import {PiechartComponent} from "./piechart.component";
import {Barchart2Component} from "./barchart2.component";
import {HttpModule} from "@angular/http";

@NgModule({

    imports: [  HttpModule,BrowserModule ],
    declarations: [
        AppComponent,
        BarchartComponent,
        BarchartDataDirective,
        Barchart2Component,
        PiechartComponent,
        SmileyDirective
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }