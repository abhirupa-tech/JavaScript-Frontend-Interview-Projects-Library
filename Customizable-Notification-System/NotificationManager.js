import { NotificationType, Notification } from "./NotificationFactory.js";

const notificationForm = document.getElementById('notification-form');
const notificationArea = document.getElementById('notification-area');
const notificationClass = document.getElementById('notification-class');
const notificationMessage = document.getElementById('notification-message');
const progressBar = document.getElementById('notification-progress-bar');


let isShowingNotifications = false;
const notifications = [];


const addNotification = (event) => {
    event.preventDefault();
    const content = document.getElementById('content').value;
    const time = parseInt(document.getElementById('time').value, 10);
    const type = document.getElementById('type').value;

    if (content && time && type) {
        const notification = Notification.createNotification(content, type, time);
        notifications.push(notification);
        console.log("Pushing New Notification in the array!")
    }

    if(notifications.length === 1 && !isShowingNotifications) {
        isShowingNotifications = true;
        showNotifications().then(() => {
            isShowingNotifications = false;
        }) ;
    }
    console.log("Notification Submitted");
    notificationForm.reset();
};

const showCurrentNotification = (notificationObj) => {
    notificationClass.textContent = getNotificationType(notificationObj.type);
    notificationMessage.textContent = notificationObj.text;
    notificationArea.classList.remove('hidden');

    const progressValue = (notificationObj.duration * 1000)/100;
    const progressColor = getProgressColor(notificationObj.type);

    let progress = 0;

    return new Promise ((resolve) => {
        setTimeout(() =>{
            notificationArea.classList.add('hidden');
            resolve();
        }, (notificationObj.duration * 1000));
        const interval = setInterval(() => {
            progress += 1;
            progressBar.classList.add(progressColor);
            progressBar.style.width = `${progress}%` ;
            if (progress >= 100) {
                clearInterval(interval);
                progressBar.classList.remove(progressColor);
            }
        }, progressValue);

    });
};

const getNotificationType = (type) => {    
    switch(type){
        case NotificationType.SUCCESS: return 'SUCCESS!';
        case NotificationType.WARNING: return 'WARNING!';
        case NotificationType.ERROR: return 'ERROR!';
    }
}

const getProgressColor = (type) => {
    switch(type){
        case NotificationType.SUCCESS: return 'bg-blue-500';
        case NotificationType.WARNING: return 'bg-yellow-500';
        case NotificationType.ERROR: return 'bg-red-500';
    }
};


const showNotifications =  () => {
    return new Promise(async (resolve) => {
        while(notifications.length > 0 ){
            const current = notifications.shift();
            await showCurrentNotification(current);
        }
        resolve();
    });
}


notificationForm.addEventListener('submit', addNotification);
