import ShareTopicModal from "discourse/components/modal/share-topic";
import { withPluginApi } from "discourse/lib/plugin-api";

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

          if (target.closest(".share-toggle")) {
            owner.lookup("service:modal").show(ShareTopicModal, {
              model: {
                category: this.topic.category,
                topic: this.topic,
              },
            });
            return true;
          }
        },
      });
    });
  },
};
