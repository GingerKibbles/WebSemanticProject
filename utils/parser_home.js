module.exports = {
    get_page_obj: function($) {
		var image = $("#rescue-structure-img").attr("data-original");
		image = image.replace("./uploads/rescue/foto/", "https://docenti.unisa.it/uploads/rescue/foto/");

		// Inizio tabella 1 **********
		var nome_cognome = $(".navbar-collapse .btn-primary").text().split(" ");
		var nome         = nome_cognome[0];
		var cognome      = nome_cognome[1];

		var table_1            = $(".col-md-12 table").first();
		var ruolo              = $(table_1).find(".glyphicon-user").parent().siblings().text();
		var dipartimento_full  = $(table_1).find(".glyphicon-home").parent().siblings().text().split("/");
		var dipartimento       = dipartimento_full[0];
		var dipartimento_sigla = dipartimento_full[1];

		var email = $(table_1).find(".hidden-xs .glyphicon-envelope").parent().siblings().text();

		var pos_ufficio = {};
		if($(".glyphicon-map-marker").length > 0) {
			var pos_ufficio_full = $(table_1).find(".glyphicon-map-marker").parent().siblings().text().split(", ");
			var pos_ufficio_lat  = $(table_1).find(".glyphicon-map-marker").parent().siblings().find("a").attr("data-lat");
			var pos_ufficio_lon  = $(table_1).find(".glyphicon-map-marker").parent().siblings().find("a").attr("data-lon");
			pos_ufficio['campus'] = pos_ufficio_full[0];
			pos_ufficio['edificio'] = pos_ufficio_full[1];
			pos_ufficio['piano'] = pos_ufficio_full[2];
			pos_ufficio['stanza'] = pos_ufficio_full[3];
			pos_ufficio['latitudine'] = pos_ufficio_lat;
			pos_ufficio['longitudine'] = pos_ufficio_lon;
		}
		console.log(pos_ufficio);
	
		var telephone=[];
		$(table_1).find(".hidden-xs .glyphicon-earphone").each(function(index) {
			telephone[index] = $(this).parent().siblings().text();
		});
		var fax=[];
		$(table_1).find(".glyphicon-print").each(function(index) {
			fax[index] = $(this).parent().siblings().text();
		});
		// Fine tabella 1 **********


		// Orario di ricevimento **********
		var office_hours=[];
		$(".col-md-12").find(".fa-calendar").each(function(index) {
			data_tab = $(this).parent().siblings();
			var day      = data_tab.eq(0).text();
			var hours    = data_tab.eq(1).text().split('-');
			var location = data_tab.eq(2).text();
			var office_hour = {};
			office_hour['day']        = day;
			office_hour['start_hour'] = hours[0].slice(0,-1);
			office_hour['end_hour']   = hours[1].slice(1,hours[1].length);
			office_hour['location']   = location;
			office_hours[index] = office_hour;
		});
		console.log("Orari di ricevimento: " + office_hours);
		var office_hours_alert = $(".col-md-12").find(".alert-success .fa-exclamation-circle").parent().siblings().eq(0).text();

		// Cose presenti raramente
		var link = "";
		$(".col-md-12").find(".fa-link").each(function(index) {
			link = $(this).parent().siblings().eq(0).children().attr('href');
			console.log("Homepage: " + link)
		});
		var orcid = {};
		$(".col-md-12").find(".fa-barcode").each(function(index) {
			orcid['title'] = $(this).parent().siblings().eq(0).children().attr('title');
			orcid['link'] = $(this).parent().siblings().eq(0).children().attr('href');
			orcid['codice'] = $(this).parent().siblings().eq(0).find(".pull-right").text();
		});
		console.log(orcid);
		var announcements = [];
		$(".col-md-12").find(".alert-info .fa-exclamation-circle").each(function(index) {
			var link = 'https://docenti.unisa.it'+$(this).parent().siblings().eq(0).find('a').attr('href');
			var title = $(this).parent().siblings().eq(0).find('a').attr('title');
			var pubication_date = $(this).parent().siblings().eq(0).find('.muted').text();
			var announcement = {};
			announcement['link']  = link;
			announcement['title'] = title;
			announcement['publication_date'] = pubication_date;
			announcements[index]  = announcement;
		});
		//console.log(announcements);

		// Object da restituire
		return page_obj = {
			nome: nome,
			cognome: cognome,
			ruolo: ruolo,
			dipartimento: dipartimento,
			dipartimento_sigla: dipartimento_sigla,
			email: email,
			pos_ufficio: pos_ufficio,
			telephone: telephone,
			office_hours: office_hours,
			office_hours_alert: office_hours_alert,
			link: link,
			orcid: orcid,
			image: image,
			fax: fax,
			announcements: announcements
		}
    }
};








