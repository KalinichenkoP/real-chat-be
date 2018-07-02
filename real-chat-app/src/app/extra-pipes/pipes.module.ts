// import { ConsideredResolutionPipe } from '../views/vacations/components/vacation-requests/vacation.pipes';
// import { StaffSearchPipe } from '../views/main-panel/components/staff/staff-search.pipe';
import { PrettyDatePipe } from './pretty-date.pipe';
import { NgModule } from '@angular/core';
import {TranslateProp} from './translate-prop.pipe';

/**
 * Module containing all pipes, used in application.
 * As it turned out, simply put it to app module is enough
 * only if there is only one pipe; if more - that leads to an error,
 * so separated module for pipes is required.
 */
@NgModule({
    imports: [],
    declarations: [
        PrettyDatePipe, TranslateProp
    ],
    exports: [
        PrettyDatePipe, TranslateProp
    ],
})
export class PipeModule {
    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}
