import { FormControl, ValidationErrors } from '@angular/forms';

export const noWhitespaceValidator = (control: FormControl): ValidationErrors => {
    return (control.value || '').trim().length ? {} : { whitespace: true };
};

export const capitalize = (str: string): string => {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
};
