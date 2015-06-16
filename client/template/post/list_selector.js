listSelector = function () {
  $(document).keydown( function (event) {
    // console.log('cycling throught items');

    var keyCode = event.keyCode || event.which,
        $list      = $('.posts-list'),
        $listItems = $('.posts-list li'),
        $listItemFirst = $('.posts-list li:first-child'),
        $listItemLast = $('.posts-list li:last-child'),
        $selected  = $('.posts-list li.is-selected'),
        select = 'is-selected';

    //Keydown J
    if (keyCode == 74) {
      // Do Nothing when Input of Textarea
      if ($('input').is(":focus") || $('textarea').is(":focus")) {
        return;
      } else {
        // list Selecting from here

        // If nothing is selected
        if (! $listItems.hasClass(select)) {
          $listItemFirst.addClass(select);
        } else
        // If first Item is selected, choose last Item
        if ($listItemFirst.hasClass(select)) {
          $listItems.removeClass(select);
          $listItemLast.addClass(select);
        }
        // If above all else, select Previous item
        else {
          $selected.removeClass(select).prev().addClass(select);
        }
      }
    }

    //Keydown K
    if (keyCode == 75) {
      // Do Nothing when Input of Textarea
      if ($('input').is(":focus") || $('textarea').is(":focus")) {
        return;
      } else {
        // list Selecting from here

        // If nothing is selected
        if (! $listItems.hasClass(select)) {
          $listItemFirst.addClass(select);
        } else
        // If first Item is selected, choose last Item
        if ($listItemLast.hasClass(select)) {
          $listItems.removeClass(select);
          $listItemFirst.addClass(select);
        }
        // If above all else, select Previous item
        else {
          $selected.removeClass(select).next().addClass(select);
        }
      }
    }

  });
}