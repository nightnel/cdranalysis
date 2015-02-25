/**
 * CDRAPP
 * 
 */

$(document).ready(
		function() {

			$('#demo').BootSideMenu({
				side : "right", // left or right
				autoClose : true
			// auto close when page loads
			});

			$('#formDATA').multiselect({
			// includeSelectAllOption : true
			});

			$('#formMODULE').multiselect({
				includeSelectAllOption : true
			});

			/* Search button ajax query */
			$('#mfSearch').click(
					function() {

						var formData = '';
						var formModul = '';
						var formCPA = '';
						var formCPB = '';
						var formNrFizA = '';
						var formNrFizB = '';
						var formKatalogowy = '';
						var formLimit;
						var countModul = 0;
						var countData = 0;
						var cdrQuery = '';
						var select = '';

						// Selected Modules
						$('#formMODULE > option:selected').each(
								function() {
									formModul = formModul + '(MODUL = "'
											+ $(this).val() + '") OR ';
									countModul++;
								});

						formModul = "("
								+ formModul.substring(0, formModul.length - 4)
								+ ")";

						if (countModul < 8 && formModul.length > 2) cdrQuery += formModul;

						// CPA
						formCPA = $('#formNRWIRTUALNYA').val();
						if (formCPA.length > 0) cdrQuery += " and NRWIRTUALNYA LIKE \"" + formCPA.trim() + "\"";

						// CPB
						formCPB = $('#formINFWYBIERCZA').val();
						if (formCPB.length > 0) cdrQuery += " and INFWYBIERCZA LIKE \"" + formCPB.trim() + "\"";
						
						// NrFizA
						formNrFizA = $('#formNrFizA').val();
						if (formNrFizA.length > 0) cdrQuery += " and NRFIZYCZNYA LIKE \"" + formNrFizA.trim() + "\"";
						
						// NrFizB
						formNrFizB = $('#formNrFizB').val();
						if (formNrFizB.length > 0) cdrQuery += " and NRFIZYCZNYB LIKE \"" + formNrFizB.trim() + "\"";
						
						// Katalogowy
						formKatalogowy = $('#formKATALOGOWY').val();
						if (formKatalogowy.length > 0) cdrQuery += " and NRKATALOGOWYA LIKE \"" + formKatalogowy.trim() + "\"";
						
						if(cdrQuery.trim().substring(0,3) == "and") cdrQuery = cdrQuery.trim().substring(3,cdrQuery.trim().length);
						
						// Glue all select statement
						select = 'select date(DATA) as DATA, CZAS, NRFIZYCZNYA, NRFIZYCZNYB, NRKATALOGOWYA, NRWIRTUALNYA, INFWYBIERCZA, CZASTRWANIA, CZASZESTAWIANIA, IMPULSY, concat("m", MODUL) as MODUL, TYP, PODTYP ';
						select += 'from trf2_12_2014 ';
						
						if(cdrQuery.trim().length > 0) select += 'where ' + cdrQuery;
						
						select += ' order by date(DATA) desc, CZAS desc ';
						
						// Limit
						formLimit=$('input[name=optionsRadios]:checked', '#formCDR').val();
						if (formLimit != "unlimited") select += "limit " + formLimit;

						
						// Selected Dates
						$('#formDATA > option:selected').each(function() {
							formData = formData + $(this).val() + ' ';
							if(countData>0)	{
								
								select += ' union (select date(DATA) as DATA, CZAS, NRFIZYCZNYA, NRFIZYCZNYB, NRKATALOGOWYA, NRWIRTUALNYA, INFWYBIERCZA, CZASTRWANIA, CZASZESTAWIANIA, IMPULSY, concat("m", MODUL) as MODUL, TYP, PODTYP ';
								select += 'from ' + $(this).val() + ' ';
								
								if(cdrQuery.trim().length > 0) select += 'where ' + cdrQuery;
								
								select += ' order by date(DATA) desc, CZAS desc ';	
								if (formLimit != "unlimited") select += "limit " + formLimit;
								select += ' )';

							}
							else	{
								select = '(select date(DATA) as DATA, CZAS, NRFIZYCZNYA, NRFIZYCZNYB, NRKATALOGOWYA, NRWIRTUALNYA, INFWYBIERCZA, CZASTRWANIA, CZASZESTAWIANIA, IMPULSY, concat("m", MODUL) as MODUL, TYP, PODTYP ';
								select += 'from ' + $(this).val() + ' ';
								
								if(cdrQuery.trim().length > 0) select += 'where ' + cdrQuery;
								
								select += ' order by date(DATA) desc, CZAS desc ';	
								if (formLimit != "unlimited") select += "limit " + formLimit;
								select += ' )';

							}
							
							countData++;
						});

						//alert(select);

						
						// Ajax query against mysql database
						$.ajax({
							  url: "json/pdo.php",
							  type: "get",
							  dataType: "json",
							  data:{'select':select},
							  success: function(response) {
								  //alert(JSON.stringify(response));
								  //alert('dupa');
								  
								  $('#mfCDR').bootstrapTable('destroy').bootstrapTable({
									  'data': response,
									  pageSize: 200,
						              pageList: [25, 50, 100, 200, 500]
								  });
							  },
							  error: function(xhr) {
								  //alert(xhr.responseJSON)
							  }
							});
						
					});

		});
