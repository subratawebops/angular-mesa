angular.module('apMesa.templates', ['src/templates/apMesa.tpl.html', 'src/templates/apMesaDummyRows.tpl.html', 'src/templates/apMesaPaginationCtrls.tpl.html', 'src/templates/apMesaRows.tpl.html']);

angular.module("src/templates/apMesa.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/templates/apMesa.tpl.html",
    "<div class=\"ap-mesa-wrapper\">\n" +
    "  <table ng-class=\"classes\" class=\"ap-mesa mesa-header-table\">\n" +
    "    <thead>\n" +
    "      <tr ui-sortable=\"sortableOptions\" ng-model=\"columns\">\n" +
    "        <th\n" +
    "          scope=\"col\"\n" +
    "          ng-repeat=\"column in columns\"\n" +
    "          ng-click=\"toggleSort($event,column)\"\n" +
    "          ng-class=\"{'sortable-column' : column.sort, 'select-column': column.selector, 'is-sorting': sortDirection[column.id] }\"\n" +
    "          ng-attr-title=\"{{ column.title || '' }}\"\n" +
    "          ng-style=\"{ width: column.width, 'min-width': column.width, 'max-width': column.width }\"\n" +
    "        >\n" +
    "          <span class=\"column-text\">\n" +
    "            <input ng-if=\"column.selector\" type=\"checkbox\" ng-checked=\"isSelectedAll()\" ng-click=\"toggleSelectAll($event)\" />\n" +
    "            <span\n" +
    "              ng-if=\"column.sort\"\n" +
    "              title=\"This column is sortable. Click to toggle sort order. Hold shift while clicking multiple columns to stack sorting.\"\n" +
    "              class=\"sorting-icon {{ getSortClass( sortDirection[column.id] ) }}\"\n" +
    "            ></span>\n" +
    "            {{column.hasOwnProperty('label') ? column.label : column.id }}\n" +
    "          </span>\n" +
    "          <span\n" +
    "            ng-if=\"!column.lockWidth\"\n" +
    "            ng-class=\"{'discreet-width': !!column.width, 'column-resizer': true}\"\n" +
    "            title=\"Click and drag to set discreet width. Click once to clear discreet width.\"\n" +
    "            ng-mousedown=\"startColumnResize($event, column)\"\n" +
    "          >\n" +
    "            &nbsp;\n" +
    "          </span>\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      <tr ng-if=\"hasFilterFields()\" class=\"ap-mesa-filter-row\">\n" +
    "        <td ng-repeat=\"column in columns\" ng-class=\"'column-' + column.id\">\n" +
    "          <input\n" +
    "            type=\"text\"\n" +
    "            ng-if=\"(column.filter)\"\n" +
    "            ng-model=\"persistentState.searchTerms[column.id]\"\n" +
    "            ng-attr-placeholder=\"{{ column.filter && column.filter.placeholder }}\"\n" +
    "            ng-attr-title=\"{{ column.filter && column.filter.title }}\"\n" +
    "            ng-class=\"{'active': persistentState.searchTerms[column.id] }\"\n" +
    "          >\n" +
    "          <button\n" +
    "            ng-if=\"(column.filter)\"\n" +
    "            ng-show=\"persistentState.searchTerms[column.id]\"\n" +
    "            class=\"clear-search-btn\"\n" +
    "            role=\"button\"\n" +
    "            type=\"button\"\n" +
    "            ng-click=\"clearAndFocusSearch(column.id)\"\n" +
    "          >\n" +
    "            &times;\n" +
    "          </button>\n" +
    "\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "  </table>\n" +
    "  <div class=\"mesa-rows-table-wrapper\" ng-style=\"tbodyNgStyle\">\n" +
    "    <table ng-class=\"classes\" class=\"ap-mesa mesa-rows-table\">\n" +
    "      <thead>\n" +
    "        <th\n" +
    "            scope=\"col\"\n" +
    "            ng-repeat=\"column in columns\"\n" +
    "            ng-style=\"{ width: column.width, 'min-width': column.width, 'max-width': column.width }\"\n" +
    "          ></th>\n" +
    "        </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "        <tr ng-if=\"visible_rows.length === 0 || options.loading\">\n" +
    "          <td ng-attr-colspan=\"{{columns.length}}\" class=\"space-holder-row-cell\">\n" +
    "            <div ng-if=\"options.loadingError\">\n" +
    "              <div ng-if=\"!options.loading && options.loadingErrorTemplateUrl\" ng-include=\"options.loadingErrorTemplateUrl\"></div>\n" +
    "              <div ng-if=\"!options.loading && !options.loadingErrorTemplateUrl\">{{ options.loadingErrorText }}</div>\n" +
    "            </div>\n" +
    "            <div ng-if=\"!options.loadingError\">\n" +
    "              <div ng-if=\"options.loading && options.loadingTemplateUrl\" ng-include=\"options.loadingTemplateUrl\"></div>\n" +
    "              <div ng-if=\"options.loading && !options.loadingTemplateUrl\">{{ options.loadingText }}</div>\n" +
    "              <div ng-if=\"!options.loading && options.noRowsTemplateUrl\" ng-include=\"options.noRowsTemplateUrl\"></div>\n" +
    "              <div ng-if=\"!options.loading && !options.noRowsTemplateUrl\">{{ options.noRowsText }}</div>\n" +
    "            </div>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "      <tbody ng-if=\"options.pagingStrategy === 'SCROLL'\" ng-show=\"!options.loading\" ap-mesa-dummy-rows=\"[0,transientState.rowOffset]\" columns=\"columns\" cell-content=\"...\"></tbody>\n" +
    "      <tbody ng-show=\"!options.loading\" ap-mesa-rows class=\"ap-mesa-rendered-rows\"></tbody>\n" +
    "      <tbody ng-if=\"options.pagingStrategy === 'SCROLL'\" ng-show=\"!options.loading\" ap-mesa-dummy-rows=\"[transientState.rowOffset + visible_rows.length, transientState.filterCount]\" columns=\"columns\" cell-content=\"...\"></tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div class=\"ap-mesa-pagination\" ng-if=\"options.pagingStrategy === 'PAGINATE'\" ap-mesa-pagination-ctrls></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/templates/apMesaDummyRows.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/templates/apMesaDummyRows.tpl.html",
    "");
}]);

angular.module("src/templates/apMesaPaginationCtrls.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/templates/apMesaPaginationCtrls.tpl.html",
    "<ul class=\"pagination\" ng-if=\"lastPage > 0\">\n" +
    "  <li ng-class=\"{ 'disabled': transientState.pageOffset === 0 }\">\n" +
    "    <a ng-click=\"goBack()\" >&laquo;</a>\n" +
    "  </li>\n" +
    "  <li ng-repeat=\"link in pageLinks\" ng-class=\"{ 'active': link.current, 'disabled': link.gap }\">\n" +
    "    <a ng-if=\"!link.gap\" ng-click=\"transientState.pageOffset = link.page\">{{ link.page + 1 }}</a>\n" +
    "    <a ng-if=\"link.gap\" href=\"\">&hellip;</a>\n" +
    "  </li>\n" +
    "  <li ng-class=\"{ 'disabled': transientState.pageOffset === lastPage }\">\n" +
    "    <a ng-click=\"goForward()\" >&raquo;</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "<span class=\"rows-per-page-ctrl\">\n" +
    "  <span class=\"rows-per-page-msg\">{{ options.rowsPerPageMessage }}</span>\n" +
    "  <ul class=\"pagination\" ng-if=\"options.showRowsPerPageCtrls\">\n" +
    "    <li ng-repeat=\"limit in options.rowsPerPageChoices\" ng-class=\"{'active': options.rowsPerPage === limit}\">\n" +
    "      <a ng-click=\"options.rowsPerPage = limit\">{{ limit }}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</span>\n" +
    "");
}]);

angular.module("src/templates/apMesaRows.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/templates/apMesaRows.tpl.html",
    "<tr ng-repeat-start=\"row in visible_rows\" ng-attr-class=\"{{ (transientState.rowOffset + $index) % 2 ? 'odd' : 'even' }}\" ap-mesa-row></tr>\n" +
    "<tr ng-repeat-end ng-if=\"rowIsExpanded\" class=\"ap-mesa-expand-panel\">\n" +
    "  <td ap-mesa-expandable ng-attr-colspan=\"{{ columns.length }}\"></td>\n" +
    "</tr>\n" +
    "");
}]);
