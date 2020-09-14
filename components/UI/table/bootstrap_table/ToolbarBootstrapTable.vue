<template>
  <div class="fixed-table-toolbar">
    <div class="bars pull-left">
      <div class="toolbar">
        <!--        Here you can write extra buttons/actions for the toolbar              -->
      </div>
    </div>
    <div class="columns columns-right pull-right">
      <button class="btn btn-outline" type="button" name="refresh" title="Refresh">
        <i class="glyphicon fa fa-refresh"></i>
      </button>
      <button class="btn btn-outline" type="button" name="toggle" title="Toggle">
        <i class="glyphicon fa fa-th-list"></i>
      </button>
      <div class="keep-open btn-group" title="Columns">
        <button
          type="button"
          class="btn btn-outline dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="glyphicon fa fa-columns"></i>
          <span class="caret"></span>
        </button>
        <ul
          class="dropdown-menu"
          role="menu"
          x-placement="bottom-start"
          style="position: absolute; transform: translate3d(-48px, 38px, 0px); top: 0px; left: 0px; will-change: transform;"
        >
          <li>
            <label>
              <input type="checkbox" data-field="id" value="1" checked="checked" /> ID
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" data-field="name" value="2" checked="checked" /> Name
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" data-field="salary" value="3" checked="checked" /> Salary
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" data-field="country" value="4" checked="checked" /> Country
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" data-field="city" value="5" checked="checked" /> City
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" data-field="actions" value="6" checked="checked" /> Actions
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="pull-left search">
      <input class="form-control" type="text" placeholder="Search" />
    </div>
  </div>
</template>
