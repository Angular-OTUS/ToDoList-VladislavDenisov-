import { NgModule } from '@angular/core';
import { CustomTooltipDirective } from '../../directives/custom-tooltip.directive';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@NgModule({
    imports: [LoadingSpinnerComponent],
    declarations: [CustomTooltipDirective],
    exports: [CustomTooltipDirective, LoadingSpinnerComponent],
})
export class SharedModule {}
