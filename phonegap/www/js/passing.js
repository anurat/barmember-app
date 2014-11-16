$(function () {
    $.mobile.paramsHandler.addPage(
        "page_update_package",                      // jquery mobile page id which will accept parameters
        ["id"],       // required parameters for that page
        [],                          // optional parameters for that page,
        function (urlVars) {
            Global_id = urlVars.id;
          //  $("#param2display").html(urlVars.param2);
        }
    );
	
	 $.mobile.paramsHandler.addPage(
        "page_edit_deposite_page",                      // jquery mobile page id which will accept parameters
        ["id"],       // required parameters for that page
        [],                          // optional parameters for that page,
        function (urlVars) {
            customer_deposite_id = urlVars.id;
          //  $("#param2display").html(urlVars.param2);
        }
    );
    $.mobile.paramsHandler.init();
});