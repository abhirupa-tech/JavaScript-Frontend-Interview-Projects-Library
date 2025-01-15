# Custom Notification App

A simple and elegant custom notification app built with Vanilla JavaScript. This project is designed to be completed in approximately 2 hours.

## Features

- **Customizable Notifications**: Create notifications with custom messages, icons, and colors.
- **Auto-Dismiss**: Notifications automatically disappear after a set duration.
- **Manual Dismiss**: Users can manually dismiss notifications by clicking on them.
- **Progress Bar**: To show when Notifications will disappear
- **Notification Queue**: Handle multiple notifications in a queue.

## Example

```javascript
// Create a success notification
createNotification('Operation successful!', 'success');

// Create an error notification with custom duration and icon
createNotification('Something went wrong!', 'error', 5000, 'error-icon.png');
