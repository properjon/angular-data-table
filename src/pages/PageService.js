(function(){
  'use strict';

  angular.module('pages')
         .service('pageService', ['$q', PageService]);

  function PageService($q){
    var pages = [
      {
        name: 'Basic',
        codepen: 'QKoRpk',
        content: 'basic',
        group: 'Basic'
      },{
        name: 'Loading / Clearing Data',
        codepen: 'JRzqNG',
        content: 'loading-clearing-data',
        group: 'Basic'
      },{
        name: 'Slow AJAX',
        codepen: 'RGdmVg',
        content: 'slow-ajax',
        group: 'Basic'
      },{
        name: 'Sorting',
        codepen: 'wzObdj',
        content: 'sorting',
        group: 'Basic'
      },{
        name: 'Tall Rows',
        codepen: 'jrJomQ',
        content: 'tall-rows',
        group: 'Basic'
      },{
        name: 'Virtual Paging',
        codepen: 'kkqdyK',
        content: 'virtual-paging',
        group: 'Basic'
      },{
        name: 'Scrolling',
        codepen: 'xEBNAk',
        content: 'scrolling',
        group: 'Basic'
      },{
        name: 'Column / Header Templates',
        codepen: 'RGdmgk',
        content: 'column-header-templates',
        group: 'Templates'
      },{
        name: 'Expressive Columns',
        codepen: 'QKoRgJ',
        content: 'expressive-columns',
        group: 'Templates'
      },{
        name: 'Popover',
        codepen: 'qavZLW',
        content: 'popover',
        group: 'Template'
      },{
        name: 'Checkbox Selection',
        codepen: 'kkqdwK',
        content: 'checkbox-selection',
        group: 'Selection'
      },{
        name: 'Click Selection',
        codepen: 'amrAyv',
        content: 'click-selection',
        group: 'Selection'
      },{
        name: 'Greedy Column Widths',
        codepen: 'RGdmkk',
        content: 'greedy-column-widths',
        group: 'Width Options'
      },{
        name: 'Force Fill Widths',
        codepen: 'GjZavO',
        content: 'force-fill-widths',
        group: 'Width Options'
      },{
        name: 'Column Pinning',
        codepen: 'ORqYjv',
        content: 'column-pinning',
        group: 'Grouping'
      },{
        name: 'Tree',
        codepen: 'bwkyAj',
        content: 'tree',
        group: 'Grouping'
      },{
        name: 'Row Grouping',
        codepen: 'WGmBEa',
        content: 'row-grouping',
        group: 'Grouping'
      },{
        name: '100k Rows',
        codepen: 'pEYmAY',
        content: '100k-rows',
        group: 'Performance'
      },{
        name: '10 Grids on One Page',
        codepen: 'kkqdoK',
        content: '10-grids',
        group: 'Performance'
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
