import { ToastOptions } from 'ng2-toastr'

export class ToastrCustomOptions extends ToastOptions {
    dismiss: string = 'click';
    toastLife: number = 1000;
    showCloseButton: boolean = true;    
}