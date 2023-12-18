import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "custom-initial-events",

  initialize() {
    withPluginApi("0.12.3", (api) => {
      api.onPageChange(async (url) => {
        if (url.includes("latest?order=created")) {
          // Select the element with class "cooked"
          const latestElement = document.querySelector(".nav-item_latest a");
          const orderedElement = document.querySelector(
            ".nav-item_created_newest a"
          );

          if (latestElement) {
            // Remove the 'active' class from latestElement
            latestElement.classList.remove("active");
          }

          if (orderedElement) {
            // Add the 'active' class to orderedElement
            orderedElement.classList.add("active");
          }
        }
      });
    });
  },
};
