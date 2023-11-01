import { withPluginApi } from "discourse/lib/plugin-api";
import DownloadAppModal from "../components/modal/download-app-modal";

export default {
  name: "custom-button-handler",

  initialize(owner) {
    withPluginApi("0.8", (api) => {
      api.onPageChange(() => {
        const user = api.getCurrentUser();

        async function showModalDownload() {
          owner.lookup("service:modal").show(DownloadAppModal);
        }

        function toggleXButton() {
          const div = document.querySelector("#download-app-button-mobile");
          const a = document.querySelector(".close-download-button");
          if (div.style.display === "none") {
            div.style.display = "block";
          } else {
            div.style.display = "none";
          }

          if (a.style.display === "none") {
            a.style.display = "block";
          } else {
            a.style.display = "none";
          }
        }

        const closeDownLoadButton = document.querySelector(
          ".close-download-button"
        );

        if (closeDownLoadButton) {
          closeDownLoadButton.addEventListener("click", function () {
            toggleXButton();
          });
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
