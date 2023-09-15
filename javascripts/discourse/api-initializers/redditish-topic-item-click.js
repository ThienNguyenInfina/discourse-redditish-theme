import { withPluginApi } from "discourse/lib/plugin-api";
import { wantsNewWindow } from "discourse/lib/intercept-click";
import ShareTopicModal from "discourse/components/modal/share-topic";

export default {
  name: "redditish-customize-topic-list-item",

  initialize(owner) {
    withPluginApi("0.8", (api) => {
      api.modifyClass("component:topic-list-item", {
        pluginId: "redditish-theme",

        click(event) {
          let target = event.target;
          if (!target) {
            return this._super(event);
          }

          if (
            (target.nodeName === "A" && !target.closest(".raw-link")) ||
            target.closest(".badge-wrapper")
          ) {
            return !!wantsNewWindow(event);
          }

          if (target.classList.contains("custom-topic-layout")) {
            if (wantsNewWindow(event)) {
              window.open(this.topic.lastUnreadUrl, "_blank");
              return false;
            }
            return this.navigateToTopic(this.topic, this.topic.lastUnreadUrl);
          }

          if (target.closest(".share-toggle")) {
            owner.lookup("service:modal").show(ShareTopicModal, {
              model: {
                category: this.topic.category,
                topic: this.topic,
              },
            });
            return true;
          }

          return this.navigateToTopic(this.topic, this.topic.lastUnreadUrl);
        },
      });
    });
  },
};
