import { withPluginApi } from "discourse/lib/plugin-api";
import DownloadAppModal from "../components/modal/download-app-modal";

export default {
  name: "redditish-custom-replies-buttons",

  initialize(owner) {
    withPluginApi("0.11.4", (api) => {
      api.modifyClass("template:topic", {
        pluginId: "redditish-theme",

        click(event) {
          let target = event.target;
          if (!target) {
            return this._super(event);
          }

          if (target.closest(".toggle-like")) {
            owner.lookup("service:modal").show(DownloadAppModal);
            return true;
          }

          return this.navigateToTopic(this.topic, this.topic.lastUnreadUrl);
        },
      });
    });
  },
};
