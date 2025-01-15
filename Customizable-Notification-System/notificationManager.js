import { NotificationType, Notification } from "./notificationFactory";

const notificationForm = document.getElementById('notification-form');
const notificationArea = document.getElementById('notification-area');
const notificationCard = document.getElementById('notification-card');
const notificationClass = document.getElementById('notification-class');
const notificationMessage = document.getElementById('notification-message');

const addNotification = (event) => {
    event.preventDefault();
    const content = document.getElementById('content').value;
    const time = parseInt(document.getElementById('time').value, 10);
    const type = document.getElementById('type').value;

    if (content && time && type) {
        const notification = Notification.createNotification(content, type, time);
        notifications.push(notification);
    }

    if(notifications.length === 1) showNotifications();
    console.log("Notification Submitted");
};

const showNotification = (notificationObj) => {
    notificationClass.textContent = getNotificationType(notificationObj.type);
    notificationMessage.textContent = notificationObj.text;
    notificationArea.classList.remove('hidden');
    return new Promise ((resolve) => {
        setTimeout(() =>{
            notificationArea.classList.add('hidden');
            resolve();
        }, 5000);
    });
};

const getNotificationType = (type) => {    
    switch(type){
        case NotificationType.SUCCESS: return 'SUCCESS!';
        case NotificationType.WARNING: return 'WARNING!';
        case NotificationType.ERROR: return 'ERROR!';
    }
}

const showNotifications = async() => {
    while(notifications.length > 0 ){
        const current = notifications.shift();
        await showNotification(current);
    }
};

notificationForm.addEventListener('submit', addNotification);
