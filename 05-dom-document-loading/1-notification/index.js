export default class NotificationMessage {
    static activeNotification = null;

    constructor(message = '', { duration = this.defaultDuration, type = '' } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        this.createElement();
    }

    createTemplate() {
        return `
            <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">${this.message}</div>
                </div>
            </div>
        `;
    }

    createElement() {
        const element = document.createElement('div');
        element.innerHTML = this.createTemplate();
        this.element = element.firstElementChild;
    }

    show(parent = document.body) {
        if (NotificationMessage.activeNotification) {
            NotificationMessage.activeNotification.destroy();
        }
        NotificationMessage.activeNotification = this;

        parent.appendChild(this.element);

        this.element.style.animationDelay = `${this.duration}ms`;

        // This mocks out any call to setTimeout, setInterval with dummy functions
        this.timer = setTimeout(() => {
            this.remove();
        }, this.duration);
    }

    remove() {
        if (this.element) {
            this.element.remove();
        }
            this.removeTimer();
    }

    removeTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        NotificationMessage.activeNotification = null;
    }
}