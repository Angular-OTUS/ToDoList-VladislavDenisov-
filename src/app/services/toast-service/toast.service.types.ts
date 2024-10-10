export interface ToastData {
    message: string;
    toastType: ToastType;
}

export type ToastType = 'positive' | 'negative' | 'info' | 'error';
