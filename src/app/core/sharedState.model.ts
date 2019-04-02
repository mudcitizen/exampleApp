import {Injectable} from "@angular/core";
import {InjectionToken } from "@angular/core";

export enum MODES {
    CREATE, EDIT
}
@Injectable()
export class SharedState {
    constructor(public mode: MODES, public id?: number) { 
        console.log('ShareState.constructor()',this.toString());
    }
    toString() : string {
        return JSON.stringify(this);
    }
}

export const SHARED_STATE = new InjectionToken("shared_state"); 
