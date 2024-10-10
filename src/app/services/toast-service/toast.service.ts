import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastType } from './toast.service.types';
import { ToastComponent } from '../../components';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private _toast = inject(MatSnackBar);

    public addToast({ message, toastType }: { message: string; toastType: ToastType }) {
        const customClass = `snackbar__${toastType}`;

        this._toast.openFromComponent(ToastComponent, {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
            data: {
                message,
                toastType,
            },
            panelClass: [customClass],
        });
    }
}
