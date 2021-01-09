var MENU = /*#__PURE__*/React.createElement(Menu, null);
ReactDOM.render(MENU, document.getElementById("menu_container"));
$('#menu_button').on('click', event => {
  $('#menu_container').css('left', 0);
});