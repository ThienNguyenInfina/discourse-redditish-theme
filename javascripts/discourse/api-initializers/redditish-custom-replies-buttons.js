import { withPluginApi } from "discourse/lib/plugin-api";
import DownloadAppModal from "../components/modal/download-app-modal";

export default {
  name: "redditish-custom-replies-buttons",

  initialize(owner) {
    withPluginApi("0.8", (api) => {
      api.modifyClass("component:topic-footer-buttons", {
        pluginId: "redditish-theme",

        click(event) {
          let target = event.target;
          if (!target) {
            return this._super(event);
          }

          if (target.closest(".d-icon-reply")) {
            owner.lookup("service:modal").show(DownloadAppModal);
            return true;
          }

          return this.navigateToTopic(this.topic, this.topic.lastUnreadUrl);
        },
      });
    });
  },
};
