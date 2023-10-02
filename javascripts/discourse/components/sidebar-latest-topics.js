import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class LatestTopicsSidebar extends Component {
  @service router;
  @service store;
  @service siteSettings;
  @service currentUser;
  @tracked latestTopics = null;

  @action
  async getLatestTopics() {
    let topicList;

    let filter = "tag/noi-bat";

    topicList = await this.store.findFiltered("topicList", {
      filter,
    });

    this.latestTopics = topicList.topics
      .filter((topic) => !topic.closed)
      .slice(0, 10);
  }
}
