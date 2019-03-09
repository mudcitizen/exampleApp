import {Injectable} from "@angular/core";
export enum MODES {
    CREATE, EDIT
}
@Injectable()
export class SharedState {
    mode: MODES = MODES.EDIT;
    id: number;
}