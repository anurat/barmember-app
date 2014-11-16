$(document).bind("mobileinit", function() {
			$.support.cors = true;
			$.mobile.allowCrossDomainPages = true;
		});
		$(document).ready(function(){
		
		$('#searchData').keyup(function() {
            var searchVal = $(this).val();
            if(searchVal !== '') {
				$.ajax({
					type: "GET",
					url: "http://192.168.1.111/memberws/restaurant2/search_customers/11/"+searchVal,
					cache: false,
					dataType: "json",
					success: function(data){
						$('#CustomerTable tbody').empty();
							if(data['code'] == 2){
				
					
							}else{
								var obj = JSON.parse(JSON.stringify(data));
								drawTable_search(obj);
							}
					}
				});
			    
            } else {
               
            }
        });

		});
		 
		 
		
		$.ajax({
			type: "GET",
			url: "http://192.168.1.111/memberws/restaurant2/customers/11/1",
			cache: false,
			dataType: "json",
			success: function(data){
				$('#CustomerTable tbody').empty();
				if(data['code'] == 2){
				
				
				}else{
					var obj = JSON.parse(JSON.stringify(data));
					drawTable(obj);
				
				}
			}
			
		});
		

		function drawTable_search(data) {
		 //$("#CustomerTable").append("<tbody>");
			for (var i = 0; i < data.length; i++) {
				drawRow_search(data[i]);
			}
		 //$("#CustomerTable").append("</tbody>");
		}

		function drawRow_search(rowData) {
			var temp_string = '';
			var row = $("<tr />");
			$("#CustomerTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
			row.append($("<td>" + rowData.user_id + "</td>"));
			row.append($("<td class='td-name'>" + rowData.customer_name + "</td>"));
			row.append($("<td>" + rowData.packages + "</td>"));
			row.append($("<td>" + rowData.customer_phone + "</td>"));
		}
		
		function drawTable(data) {
		 //$("#CustomerTable").append("<tbody>");
			for (var i = 0; i < data.length; i++) {
				drawRow(data[i]);
			}
		 //$("#CustomerTable").append("</tbody>");
		}

		function drawRow(rowData) {
			var temp_string = '';
			var row = $("<tr />");
			$("#CustomerTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
			row.append($("<td>" + rowData.user_id + "</td>"));
			row.append($("<td class='td-name'>" + rowData.customer_name + "</td>"));

				 if( 0 < rowData.packages.length ){
					for(var j = 0 ; j < rowData.packages.length ; j++){
						temp_string +=rowData.packages[j].package_name+" ";
					}
				}else {
					temp_string = "-";	
				}
			row.append($("<td>" + temp_string + "</td>"));
			row.append($("<td>" + rowData.customer_phone + "</td>"));
		}
		
		