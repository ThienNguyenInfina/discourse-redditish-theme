import { withPluginApi } from "discourse/lib/plugin-api";

function hideToggleOutlet(user) {
  if (!user?.admin) {
    const outletButton = document.querySelector("#toggle-plugin-outlets");
    if (outletButton) {
      outletButton.style.display = "none";
    }
  }
}

function modifyLoginButton() {
  const loginButton = document.querySelector(".login-button");
  const spanLabel = loginButton.querySelector(".d-button-label");

  if (spanLabel) {
    spanLabel.textContent = "Tải ứng dụng";
  }

  loginButton.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      event.stopPropagation();
      window.open("https://onelink.to/seohomepageinfina", "_blank");
    },
    true
  );
}

export default {
  name: "login-button-handle",

  initialize() {
    withPluginApi("0.8", (api) => {
      api.onPageChange(() => {
        const user = api.getCurrentUser();

        if (user) {
          return;
        }

        modifyLoginButton();
        hideToggleOutlet(user);
      });
    });
  },
};
