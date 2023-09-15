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

    topicList = await this.store.findFiltered("topicList", {
      filter: "top",
      params: {
        period: "daily",
      },
    });

    this.latestTopics = topicList.topics
      .filter((topic) => !topic.closed)
      .slice(0, 10);
  }
}
