class MessageView extends View {
    constructor (targetElement) {
        super(targetElement);
        this._element = targetElement;
    }

    template(text) {
        return `
        <p class="alert alert-info alert-dismissible fade show">${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </p>`
    }

    update(messageText) {
      typeof messageText === "string" ? this._element.innerHTML = this.template(messageText) : this._element.innerHTML =  "<p> </p>"
    }
}