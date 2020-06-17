export class Toast {
    content !: string
    color: string = ''
}

export enum ToastColor {
    PRIMARY   = 'primary',
    SECONDARY = 'secondary',
    SUCCESS   = 'success',
    DANGER    = 'danger',
    WARNING   = 'warning',
    INFO      = 'info',
    LIGHT     = 'light',
    DARK      = 'dark'
}