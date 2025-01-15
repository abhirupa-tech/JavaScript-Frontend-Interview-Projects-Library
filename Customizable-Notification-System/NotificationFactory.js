export const NotificationType = Object.freeze = ({
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
})

export class Notification{
    constructor(text, type, duration){
        this.text = text;
        this.type = type;
        this.duration = duration;
        this.timeout = null;
    }

    //Factory Pattern
    static createNotification(text, type, duration){
        return new Notification(text, type, duration);
    }
}