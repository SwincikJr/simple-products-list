import { Router } from "@angular/router";

export abstract class List {

    abstract readonly baseRoute: string;
    
    constructor(private _router: Router) {}
    
    abstract delete(item: any): void
    
    create(): void {
        this._router.navigateByUrl(`${this.baseRoute}/new`);
    }

    view(item: any): void {
        this._router.navigateByUrl(`${this.baseRoute}/${item.id}`);
    }
}