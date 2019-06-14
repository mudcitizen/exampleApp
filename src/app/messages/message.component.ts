
import { Component } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { Observable } from "rxjs"; 
import { filter} from "rxjs/operators";
import { Router, Event,NavigationEnd,NavigationCancel } from "@angular/router" ;

@Component({
    selector: "paMessages",
    templateUrl: "message.component.html",
})
export class MessageComponent {
    lastMessage: Message;
    constructor(messageService: MessageService, private router : Router) {
        let wtf:number = 0;
        let wtfs:string = "have a day";
        messageService.messages.subscribe(m => this.lastMessage = m);
        router.events
        .pipe(filter( 
            (e:Event, index:number) => {return e instanceof NavigationEnd || e instanceof NavigationCancel})
            )
        .subscribe( (e:Event) => {this.lastMessage = null;})
    }
}