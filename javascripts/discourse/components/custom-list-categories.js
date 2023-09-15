import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class CustomListCategories extends Component {
  @service store;
  @tracked categories = null;

  @action
  async getCategories() {
    let categoryList;
    categoryList = await this.store.findFiltered("category");
    this.categories = categoryList?.site?.categories ?? [];
  }
}
