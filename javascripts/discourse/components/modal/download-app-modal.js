import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class DownloadAppModal extends Component {
  @service routes;

  @action
  openDownloadLink() {
    window.open("https://onelink.to/seohomepageinfina", "_blank");
  }
}
