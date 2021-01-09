var MENU = <Menu/>;

ReactDOM.render(MENU, document.getElementById("menu_container"));
$('#menu_button').click((event)=>{
    console.log("button is clicked")
    $("#menu_container").slideToggle();
})