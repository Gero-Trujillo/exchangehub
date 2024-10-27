export const unReadNotificationsFunction = (notifications) => {
    return notifications.filter((n) => n.isRead === false)
}