import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "custom-initial-events",

  initialize() {
    withPluginApi("0.8", (api) => {
      api.onPageChange((url) => {
        mgallery();

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
      });

      function mgallery() {
        const $mgallery = $(".cooked>div:not('[class]'):not('[id]')").has(
          ".lightbox-wrapper+.lightbox-wrapper"
        );

        $mgallery.addClass("mgallery");
        $mgallery.css("visibility", "hidden");

        $mgallery.imagesLoaded(function () {
          $mgallery
            .masonry({
              itemSelector: ".lightbox-wrapper",
            })
            .css("visibility", "visible");
        });
      }
    });
  },
};
