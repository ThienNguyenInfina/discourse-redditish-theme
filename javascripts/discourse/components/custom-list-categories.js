import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { defaultHomepage } from "discourse/lib/utilities";

export default class CustomListCategories extends Component {
  @service store;
  @service router;
  @tracked categories = null;

  get isHomepage() {
    const { currentRouteName } = this.router;
    return currentRouteName === `discovery.${defaultHomepage()}`;
  }

  @action
  async getCategories() {
    let categoryList;
    categoryList = await this.store.findFiltered("category");
    this.categories = categoryList?.site?.categories ?? [];
  }
}
