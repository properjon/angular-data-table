(function(){
  'use strict';

  angular.module('pages').service('pageService', ['$q', PageService]);

  function PageService($q){
    var PAGE_GROUP = {
      BASIC: 'Basic',
      TEMPLATES: 'Templates',
      SELECTION: 'Selection',
      WIDTH_OPTIONS: 'Width Options',
      GROUPING: 'Grouping',
      PERFORMANCE: 'Performance'
    };

    var pages = [
      {
        name: 'Basic',
        codepen: 'QKoRpk',
        content: 'basic',
        group: PAGE_GROUP.BASIC
      },{
        name: 'Loading / Clearing Data',
        codepen: 'JRzqNG',
        content: 'loading-clearing-data',
        group: PAGE_GROUP.BASIC
      },{
        name: 'Slow AJAX',
        codepen: 'RGdmVg',
        content: 'slow-ajax',
        group: PAGE_GROUP.BASIC
      },{
        name: 'Sorting',
        codepen: 'wzObdj',
        content: 'sorting',
        group: PAGE_GROUP.BASIC
      },{
        name: 'Tall Rows',
        codepen: 'jrJomQ',
        content: 'tall-rows',
        group: PAGE_GROUP.BASIC
      },{
        name: 'Virtual Paging',
        codepen: 'kkqdyK',
        content: 'virtual-paging',
        group: PAGE_GROUP.BASIC
      },{
        name: 'Scrolling',
        codepen: 'xEBNAk',
        content: 'scrolling',
        group: PAGE_GROUP.BASIC
      },{
        name: 'Column / Header Templates',
        codepen: 'RGdmgk',
        content: 'column-header-templates',
        group: PAGE_GROUP.TEMPLATES
      },{
        name: 'Expressive Columns',
        codepen: 'QKoRgJ',
        content: 'expressive-columns',
        group: PAGE_GROUP.TEMPLATES
      },{
        name: 'Popover',
        codepen: 'qavZLW',
        content: 'popover',
        group: PAGE_GROUP.TEMPLATES
      },{
        name: 'Checkbox Selection',
        codepen: 'kkqdwK',
        content: 'checkbox-selection',
        group: PAGE_GROUP.SELECTION
      },{
        name: 'Click Selection',
        codepen: 'amrAyv',
        content: 'click-selection',
        group: PAGE_GROUP.SELECTION
      },{
        name: 'Greedy Column Widths',
        codepen: 'RGdmkk',
        content: 'greedy-column-widths',
        group: PAGE_GROUP.WIDTH_OPTIONS
      },{
        name: 'Force Fill Widths',
        codepen: 'GjZavO',
        content: 'force-fill-widths',
        group: PAGE_GROUP.WIDTH_OPTIONS
      },{
        name: 'Column Pinning',
        codepen: 'ORqYjv',
        content: 'column-pinning',
        group: PAGE_GROUP.GROUPING
      },{
        name: 'Tree',
        codepen: 'bwkyAj',
        content: 'tree',
        group: PAGE_GROUP.GROUPING
      },{
        name: 'Row Grouping',
        codepen: 'WGmBEa',
        content: 'row-grouping',
        group: PAGE_GROUP.GROUPING
      },{
        name: '100k Rows',
        codepen: 'pEYmAY',
        content: '100k-rows',
        group: PAGE_GROUP.PERFORMANCE
      },{
        name: '10 Grids on One Page',
        codepen: 'kkqdoK',
        content: '10-grids',
        group: PAGE_GROUP.PERFORMANCE
      },{
        name: 'All Options',
        codepen: 'RoOYpp',
        content: 'all-options',
        group: PAGE_GROUP.PERFORMANCE
      }
    ];

    // Promise-based API
    return {
      loadAllPages : function() {
        // Simulate async nature of real remote calls
        return $q.when(pages);
      }
    };
  }

})();
