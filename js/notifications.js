// =================================
// POCKETPAY NOTIFICATION SYSTEM
// =================================

// ================================
// Get Notifications
// ================================

function getNotifications() {

    return JSON.parse(
        localStorage.getItem("pocketpayNotifications")
    ) || [];

}


// ================================
// Save Notifications
// ================================

function saveNotifications(notifications) {

    localStorage.setItem(
        "pocketpayNotifications",
        JSON.stringify(notifications)
    );

}


// ================================
// Add Notification
// ================================

function addNotification(
    title,
    message,
    type = "info"
) {

    const notifications =
        getNotifications();

    const notification = {

        id: Date.now(),

        title: title,

        message: message,

        type: type,

        read: false,

        date: new Date().toISOString()

    };

    notifications.unshift(notification);

    saveNotifications(notifications);

    updateNotificationBadge();

}


// ================================
// Get Unread Count
// ================================

function getUnreadNotificationCount() {

    const notifications =
        getNotifications();

    return notifications.filter(
        notification =>
            !notification.read
    ).length;

}


// ================================
// Update Badge
// ================================

function updateNotificationBadge() {

    const badge =
        document.getElementById(
            "notificationBadge"
        );

    if (!badge) return;

    const unreadCount =
        getUnreadNotificationCount();


    if (unreadCount > 0) {

        badge.textContent =
            unreadCount > 99
                ? "99+"
                : unreadCount;

        badge.style.display =
            "flex";

    } else {

        badge.style.display =
            "none";

    }

}


// ================================
// Mark One As Read
// ================================

function markNotificationAsRead(id) {

    const notifications =
        getNotifications();

    const notification =
        notifications.find(
            item => item.id === id
        );


    if (notification) {

        notification.read = true;

    }


    saveNotifications(
        notifications
    );

    updateNotificationBadge();

    renderNotifications();

}


// ================================
// Mark All As Read
// ================================

function markAllNotificationsAsRead() {

    const notifications =
        getNotifications();

    notifications.forEach(
        notification => {

            notification.read = true;

        }
    );


    saveNotifications(
        notifications
    );

    updateNotificationBadge();

    renderNotifications();

}


// ================================
// Delete Notification
// ================================

function deleteNotification(id) {

    let notifications =
        getNotifications();

    notifications =
        notifications.filter(
            notification =>
                notification.id !== id
        );


    saveNotifications(
        notifications
    );

    updateNotificationBadge();

    renderNotifications();

}


// ================================
// Format Date
// ================================

function formatNotificationDate(date) {

    const notificationDate =
        new Date(date);

    return notificationDate.toLocaleString(
        undefined,
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


// ================================
// Notification Icons
// ================================

function getNotificationIcon(type) {

    if (type === "success") {

        return `
            <i class="fa-solid fa-circle-check"></i>
        `;

    }


    if (type === "money") {

        return `
            <i class="fa-solid fa-money-bill-transfer"></i>
        `;

    }


    if (type === "security") {

        return `
            <i class="fa-solid fa-shield-halved"></i>
        `;

    }


    if (type === "warning") {

        return `
            <i class="fa-solid fa-triangle-exclamation"></i>
        `;

    }


    return `
        <i class="fa-solid fa-circle-info"></i>
    `;

}


// ================================
// Render Notifications
// ================================

function renderNotifications() {

    const list =
        document.getElementById(
            "notificationList"
        );

    if (!list) return;


    const notifications =
        getNotifications();


    // Empty state
    if (notifications.length === 0) {

        list.innerHTML = `

            <div class="notification-empty">

                <i class="fa-regular fa-bell-slash"></i>

                <h3>No notifications</h3>

                <p>
                    You're all caught up.
                </p>

            </div>

        `;

        return;

    }


    list.innerHTML =
        notifications.map(
            notification => {

                return `

                    <div
                        class="
                            notification-item
                            ${
                                notification.read
                                    ? "read"
                                    : "unread"
                            }
                        "
                        data-id="${notification.id}"
                    >

                        <div
                            class="
                                notification-icon
                                ${notification.type}
                            "
                        >

                            ${getNotificationIcon(
                                notification.type
                            )}

                        </div>


                        <div
                            class="notification-content"
                            onclick="
                                markNotificationAsRead(
                                    ${notification.id}
                                )
                            "
                            style="cursor:pointer;"
                        >

                            <h4>
                                ${notification.title}
                            </h4>

                            <p>
                                ${notification.message}
                            </p>

                            <small>
                                ${formatNotificationDate(
                                    notification.date
                                )}
                            </small>

                        </div>


                        <button
                            class="notification-delete"
                            onclick="
                                deleteNotification(
                                    ${notification.id}
                                )
                            "
                            aria-label="Delete notification"
                        >

                            <i class="fa-solid fa-xmark"></i>

                        </button>

                    </div>

                `;

            }
        ).join("");

}


// ================================
// Open Notification Panel
// ================================

function openNotifications() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );

    const backdrop =
        document.getElementById(
            "notificationBackdrop"
        );

    if (!panel) return;

    panel.classList.add("show");

    if (backdrop) {
        backdrop.classList.add("show");
    }

    renderNotifications();
}


// ================================
// Close Notification Panel
// ================================

function closeNotifications() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );

    const backdrop =
        document.getElementById(
            "notificationBackdrop"
        );

    if (!panel) return;

    panel.classList.remove("show");

    if (backdrop) {
        backdrop.classList.remove("show");
    }
}


// ================================
// Initialize
// ================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateNotificationBadge();


        const bell =
            document.getElementById(
                "notificationBell"
            );


        const closeBtn =
            document.getElementById(
                "closeNotifications"
            );


        const markAllBtn =
            document.getElementById(
                "markAllNotifications"
            );
        const backdrop =
             document.getElementById(
                 "notificationBackdrop"
            );

            if (backdrop) {

    backdrop.addEventListener(
        "click",
        function () {

            closeNotifications();

        }
    );

}

            document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeNotifications();

        }

    }
);

        // Bell
        if (bell) {

            bell.addEventListener(
                "click",
                function () {

                    openNotifications();

                }
            );

        }


        // Close
        if (closeBtn) {

            closeBtn.addEventListener(
                "click",
                function () {

                    closeNotifications();

                }
            );

        }


        // Mark all
        if (markAllBtn) {

            markAllBtn.addEventListener(
                "click",
                function () {

                    markAllNotificationsAsRead();

                }
            );

        }

    }
);