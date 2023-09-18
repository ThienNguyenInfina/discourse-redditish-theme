import { withPluginApi } from "discourse/lib/plugin-api";
import { ajax } from "discourse/lib/ajax";

export default {
  name: "custom-initial-events",

  initialize() {
    withPluginApi("0.12.3", (api) => {
      api.onPageChange(async (url) => {
        if (url.includes("/t/")) {
          // Select the element with class "cooked"
          const cookedElement = document.querySelector(".cooked");

          if (cookedElement) {
            // Use a regular expression to replace the undesired part
            cookedElement.innerHTML = cookedElement.innerHTML.replace(
              /\s*\[question\] [^<]+/,
              ""
            );

            const match = url.match(/\/t\/([^\/]+)\/(\d+)/);
            const topicId = parseInt(match[2], 10);
            let image = null;

            if (topicId) {
              const topic = await ajax(`/t/${topicId}.json`);
              if (topic) {
                image = {
                  ...topic.thumbnails?.[0],
                  description: topic?.fancy_title ?? "",
                };
              }
            }

            if (image) {
              const imgElement = document.createElement("img");
              imgElement.src = image.url;
              imgElement.alt = image.description;
              imgElement.title = image.description;
              imgElement.style.width = "100%";
              cookedElement.prepend(imgElement);
            }
          }
        }
      });
    });
  },
};
