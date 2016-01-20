'use strict';

/* global require, document */

var $ = require('jquery');

var tables = require('../modules/tables');
var helpers = require('../modules/helpers');
var columns = require('../modules/columns');

var FilterPanel = require('fec-style/js/filter-panel').FilterPanel;

var expenditureTemplate = require('../../templates/independent-expenditures.hbs');

var columns = [
  {
    data: 'committee',
    orderable: false,
    className: 'min-desktop',
    render: function(data, type, row, meta) {
      if (data) {
        return tables.buildEntityLink(
          data.name,
          helpers.buildAppUrl(['committee', data.committee_id]),
          'committee'
        );
      } else {
        return '';
      }
    }
  },
  tables.currencyColumn({data: 'expenditure_amount', className: 'min-tablet'}),
  columns.supportOpposeColumn,
  {
    data: 'candidate_name',
    orderable: false,
    className: 'min-desktop hide-panel',
    render: function(data, type, row, meta) {
      return tables.buildEntityLink(
        data,
        helpers.buildAppUrl(['candidate', row.candidate_id], tables.getCycle(row, meta)),
        'candidate'
      );
    }
  },
  tables.dateColumn({data: 'expenditure_date', className: 'min-tablet hide-panel-tablet'}),
  tables.urlColumn('pdf_url', {data: 'expenditure_description', className: 'all hide-panel', orderable: false}),
  {
    className: 'all u-no-padding',
    width: '20px',
    orderable: false,
    render: function(data, type, row, meta) {
      return tables.MODAL_TRIGGER_HTML;
    }
  }
];

$(document).ready(function() {
  var $table = $('#results');
  var filterPanel = new FilterPanel('#category-filters');
  new tables.DataTable($table, {
    title: 'Independent expenditure',
    path: 'schedules/schedule_e',
    panel: filterPanel,
    columns: columns,
    paginator: tables.SeekPaginator,
    rowCallback: tables.modalRenderRow,
    useExport: true,
    order: [[4, 'desc']],
    useFilters: true,
    callbacks: {
      afterRender: tables.modalRenderFactory(expenditureTemplate)
    }
  });
});
