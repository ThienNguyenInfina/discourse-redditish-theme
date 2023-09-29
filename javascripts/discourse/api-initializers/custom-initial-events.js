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
          const img = document.querySelector(".cooked img"); // This will select the first <img> element on the page
          img.classList.add("display-none");
          const existingAnchor = document.querySelector("a span");
          const content = existingAnchor
            ? existingAnchor.textContent || existingAnchor.innerText
            : null;

          if (content && content.trim() === "08 9990 9928") {
            const newAnchor = document.createElement("a");
            newAnchor.href = "tel://08 9990 9928";

            const newSpan = document.createElement("span");
            newSpan.textContent = "08 9990 9928";

            newAnchor.appendChild(newSpan);

            existingAnchor.parentElement.replaceChild(
              newAnchor,
              existingAnchor
            );
          }

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

            if (image.url) {
              const imgElement = document.createElement("img");
              imgElement.classList.add("topic-review-image");
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
