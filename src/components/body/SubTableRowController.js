export default class SubTableRowController {

  onSubTableToggled(evt) {
    evt.stopPropagation();
    this.onSubTableToggle({
      subTable: this.row,
    });
  }

  treeClass() {
    return {
      'dt-tree-toggle': true,
      'icon-right': !this.expanded,
      'icon-down': this.expanded,
    };
  }

}
