module.exports = {
  get_page_obj: function($) {
	
  var courses = [];
	$(".col-md-12").find(".panel-primary").each(function(index) {
		data_tab    = $(this).children();
		link        = data_tab.find('a').attr('href');
		nameCourse  = data_tab.find('a').text();
		codeCourse  = data_tab.find('small').text().split(' ');
		data_table  = $(this).find('table').children();
		department  = data_table.find('.fa-home').parent().siblings().text();
		levelDegree = data_table.find(".fa-graduation-cap").parent().siblings().text();
		kindDegree  = data_table.find(".fa-star").parent().siblings().eq(0).text();
		year        = data_table.find(".fa-star").parent().siblings().eq(1).text();
    		
		var course = {};
		course['nameCourse']=nameCourse;
		course['codeCourse']=codeCourse[1];
		course['linkCourse']=link;
		course['department']=department;
		course['levelDegree']=levelDegree;
		course['kindDegree']=kindDegree;
		course['year']=year;
		courses[index]=course;
	});
  
  
  	var image = $("#rescue-structure-img").attr("data-original");
	  image = image.replace("./uploads/rescue/foto/","https://docenti.unisa.it/uploads/rescue/foto/");
    
    var nome_cognome = $(".navbar-collapse .btn-primary").text().split(" ");
	  var nome= nome_cognome[0];
	  var cognome= nome_cognome[1];
    var page_obj = {};

    page_obj['nome']=nome;
    page_obj['cognome']=cognome;
    page_obj['image']=image;
    page_obj['courses']=courses;
    return page_obj;
  }
}
