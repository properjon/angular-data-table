import TranslateXY from '../../utils/translate';

export default class DataTableHeaderController {
  /**
   * Returns the styles for the header directive.
   * @param  {object} scope
   * @return {object} styles
   */
  styles() {
    return {
      width: `${this.options.internal.innerWidth}px`,
      height: `${this.options.headerHeight}px`,
    };
  }

  /**
   * Returns the inner styles for the header directive
   * @param  {object} scope
   * @return {object} styles
   */
  innerStyles() {
    return {
      width: `${this.columnWidths.total}px`,
    };
  }

  /**
   * Invoked when a column sort direction has changed
   * @param  {object} sortedColumn
   * @param  {object} modifierPressed
   */
  onSorted(sortedColumn, modifierPressed) {
    // if sort type is single, then only one column can be sorted at once,
    // so we set the sort to undefined for the other columns
    function unsortColumn(column) {
      if (column !== sortedColumn) {
        column.sort = undefined;
      }
    }

    if ((this.options.sortType === 'single' && !(this.options.modifierActive && modifierPressed)) ||
        (this.options.sortType === 'multiple' && this.options.modifierActive && modifierPressed)) {
      this.columns.left.forEach(unsortColumn);
      this.columns.center.forEach(unsortColumn);
      this.columns.right.forEach(unsortColumn);
    }

    this.onSort({
      column: sortedColumn,
    });
  }

  /**
   * Returns the styles by group for the headers.
   * @param  {scope}
   * @param  {group}
   * @return {styles object}
   */
  stylesByGroup(group) {
    const styles = {
      width: `${this.columnWidths[group]}px`,
    };

    if (group === 'center') {
      TranslateXY(styles, this.options.internal.offsetX * -1, 0);
    } else if (group === 'right') {
      const offset = (this.columnWidths.total - this.options.internal.innerWidth) * -1;
      TranslateXY(styles, offset, 0);
    }

    return styles;
  }

  /**
   * Occurs when a header cell directive triggered a resize
   * @param  {object} scope
   * @param  {object} column
   * @param  {int} width
   */
  onResized(column, width) {
    this.onResize({
      column,
      width,
    });
  }
}
