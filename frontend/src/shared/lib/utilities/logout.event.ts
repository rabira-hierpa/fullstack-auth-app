export class LogoutEvent {
  private static LOGOUT_TOKEN = "2e1da95a-8266-4088-b2dd-1ee3200e7952";
  private static messageListener: any;

  public static requestLogout() {
    window.postMessage(this.LOGOUT_TOKEN, window.location.origin);
  }

  public static addLogoutRequestEventListener(logoutHandler: () => void) {
    this.messageListener = window.addEventListener("message", (event) => {
      if (event?.data === this.LOGOUT_TOKEN) {
        logoutHandler();
      }
    });
  }

  public static removeLogoutRequestEventListener() {
    window.removeEventListener("message", this.messageListener);
  }
}
