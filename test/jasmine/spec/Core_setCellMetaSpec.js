describe('Core_setCellMeta', function () {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $('<div id="' + id + '"></div>').appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  it('should set correct meta className for cell', function () {

    var className = "htCenter htMiddle";

    handsontable({
      afterCellMetaReset: function() {
        this.setCellMeta(0, 0, "className", className );
      }
    });

    var cellMeta = getCellMeta(0,0);

    expect(cellMeta.className).not.toBeUndefined();
    expect(cellMeta.className).toEqual(className);
  });

  it('should set correct meta classNames for cells using cellMeta in configuration', function () {
    var classNames = [
      'htCenter htTop',
      'htRight htBottom'
    ];

    handsontable({
      cellMeta: [
        {row: 0, col: 0, meta: { className: classNames[0] }},
        {row: 1, col: 1, meta: { className: classNames[1] }}
      ]
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)')[0].className).toEqual(classNames[0]);
    expect(this.$container.find('tbody tr:eq(1) td:eq(1)')[0].className).toEqual(classNames[1]);
  });

  it('should change cell meta data with updateSettings', function () {
    var classNames = [
      'htCenter htTop',
      'htRight htBottom'
    ];

    handsontable({
      cellMeta: [
        {row: 0, col: 0, meta: { className: classNames[0] }},
        {row: 1, col: 1, meta: { className: classNames[1] }}
      ]
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)')[0].className).toEqual(classNames[0]);
    expect(this.$container.find('tbody tr:eq(1) td:eq(1)')[0].className).toEqual(classNames[1]);

    updateSettings({
      cellMeta: []
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)')[0].className).toEqual('');
    expect(this.$container.find('tbody tr:eq(1) td:eq(1)')[0].className).toEqual('');

    updateSettings({
      cellMeta: [
        {row: 0, col: 0, meta: { className: classNames[1] }},
        {row: 1, col: 1, meta: { className: classNames[0] }}
      ]
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)')[0].className).toEqual(classNames[1]);
    expect(this.$container.find('tbody tr:eq(1) td:eq(1)')[0].className).toEqual(classNames[0]);
  });
});
