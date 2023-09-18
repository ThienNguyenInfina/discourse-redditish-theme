import { withPluginApi } from "discourse/lib/plugin-api";
import DownloadAppModal from "../components/modal/download-app-modal";

export default {
  name: "custom-button-handler",

  initialize(owner) {
    withPluginApi("0.8", (api) => {
      api.onPageChange((url) => {
        if (url.includes("/t/")) {
          // Select the element with class "cooked"
          const cookedElement = document.querySelector(".cooked");

          if (cookedElement) {
            // Use a regular expression to replace the undesired part
            cookedElement.innerHTML = cookedElement.innerHTML.replace(
              /\s*\[question\] [^<]+/,
              ""
            );
          }
        }

        const user = api.getCurrentUser();

        async function showModalDownload() {
          owner.lookup("service:modal").show(DownloadAppModal);
        }

        // If user is not logged in
        if (!user) {
          const replyButton = document.querySelector(
            "#topic-footer-buttons .btn-icon-text"
          );
          const likeButton = document.querySelector(
            ".actions .double-button .toggle-like"
          );

          if (replyButton) {
            replyButton.addEventListener(
              "click",
              function (event) {
                event.preventDefault();
                event.stopPropagation();
                showModalDownload();
              },
              true
            );
          }

          if (likeButton) {
            likeButton.addEventListener(
              "click",
              function (event) {
                event.preventDefault();
                event.stopPropagation();
                showModalDownload();
              },
              true
            );
          }
        }
      });
    });
  },
};
