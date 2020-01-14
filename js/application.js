/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 31-8-2017
Cliente: Cambridge Para Ti
***********************/


/**********************
VARIABLES
**********************/
var resources, filterValues;
var n_load=1;
var n_elems=12;


//Eventos para dispositivos móviles
var ua = navigator.userAgent,
event = (ua.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) ? "touchstart" : "click";
var device='none';
if(ua.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)){
	device='yes';
	//Event change orientation device
	window.addEventListener('orientationchange', doOnOrientationChange);
}

jQuery.noConflict();

jQuery(window).load(function(){

});

jQuery(document).ready(function(){

	//Obtenemos altura y anchura del navegador
	h_win=jQuery(window).height();
	w_win=jQuery(window).width();
	
	
	//Volver el scroll a top
	/*jQuery('body').scrollTo( "0px", 0,function(){
		//Pillar anclas de la url si las hay
		var hash = window.location.hash.substring(1);
		if(hash!=""){
			//alert(hash);
			if(hash.indexOf('segment') > -1){
				if (jQuery('#all-catalogo').is(":visible") ) {
					//Mirar si estamos en catalogo y es un filtro
					var array_hash=hash.split("-");
					filter_segmento=array_hash[1];
					//Filtramos
					filter_catalogo(filter_segmento,filter_type1,filter_type2);
					//Marcamos opcion en el filtro de primer nivel
					jQuery('.filter_cat a[data-filter-segment='+filter_segmento+']').addClass('active');
					jQuery('.tipo_cat a').removeClass('active');
					hash_active=1;
					//Activamos Lazyload para las imágenes
					//jQuery("img.lazy").lazyload({skip_invisible : false});
				}
			}else{
				jQuery('body').stop().clearQueue().scrollTo(jQuery('#'+hash),800,{axis:'y',easing:'easeInOutExpo'});
			}
		}
	});*/
	
	//Miramos si la cookie de aceptación está creada
	__cmp('getGooglePersonalization', function(consent, isSuccess) {
	
	// do we have a cookie? 
	if(!isSuccess) 
	 return;
	
	// check for given consent
	if(consent.googlePersonalizationData.consentValue) {
	  //
	  // You have consent from the user: 
	  // add your code here to call google’s admanager or adsense
	  //
	  loadAnalytics();
	} else {
	  // 
	  // No consent for personalized ads from the user:
	  // either no call to google’s admanger / adsense or
	  // call admanager and adsense using the appropriate 
	  // method to set ‘requestNonPersonalizedAds’ accordingly.
	  //
	}
	});
	
	//Reseteamos los checkbox si son visibles 
	if (jQuery('.body-filtros').is(":visible") ) {	
		jQuery('.body-filtros input[type=checkbox]').attr('checked',false);
		jQuery('.body-filtros label').removeClass('active');
	}
	
	
	if (jQuery('.bxslider').is(":visible") ) {
	//Galería cabecera home
	var slider=jQuery('.bxslider').bxSlider({
						  pager: true,
						  infiniteLoop: true,
						  useCSS: false,
						  auto: true,
					  	  autoHover: true,
						  controls: false,
						  pause: 5000,
						  speed:800,
						  adaptiveHeight:true,
						  onSlideBefore: function(slideElement, oldIndex, newIndex){
						  },
						  onSlideAfter: function(slideElement, oldIndex, newIndex){
						  },
						  onSlideNext: function(slideElement, oldIndex, newIndex){ 
						  },
						  onSlidePrev: function(slideElement, oldIndex, newIndex){
						  },
						});
						
	//Galería opiniones home
	var slider_opinion=jQuery('.bxslider_opiniones').bxSlider({
						  pager: true,
						  infiniteLoop: true,
						  useCSS: false,
						  auto: true,
					  	  autoHover: true,
						  controls: false,
						  pause: 5000,
						  speed:800,
						  adaptiveHeight:true,
						  onSlideBefore: function(slideElement, oldIndex, newIndex){
						  },
						  onSlideAfter: function(slideElement, oldIndex, newIndex){
						  },
						  onSlideNext: function(slideElement, oldIndex, newIndex){ 
						  },
						  onSlidePrev: function(slideElement, oldIndex, newIndex){
						  },
						});	
	}
						
	//Cuando quieres ver video del slider home 
	jQuery(document).on('click','.enl_video',function(e){
		e.preventDefault();
		
	});	
	
	//Desplegable Languages
	jQuery(document).on('click',".enl_language", function(e) {
		e.preventDefault();
		if(!jQuery(this).parent().hasClass('active')){
			jQuery(this).parent().addClass('active')
		}else{
			jQuery(this).parent().removeClass('active')
		}
	});	
	
	//Menú mobile eventos táctiles
	jQuery(document).on('touchstart',".enl_language", function(e) {
		e.preventDefault();
		if(!jQuery(this).parent().hasClass('active')){
			jQuery(this).parent().addClass('active')
		}else{
			jQuery(this).parent().removeClass('active')
		}
	});	
	
	//Mostrar Video a pantalla completa
	jQuery(document).on('click',".enl_video", function(e) {
		e.preventDefault();
		var url_video=jQuery(this).attr('href');
		jQuery('<div class="fullview"><span class="btn-close-player">Close</span><iframe src="'+url_video+'?autoplay=1&amp;rel=0&amp;fs=0&amp;showinfo=0" frameborder="0"></iframe></div>').appendTo('body');
	});	
	
	//Eliminamos el player 
	jQuery(document).on('click',".btn-close-player", function(e) {
		e.preventDefault();	
		jQuery('.fullview').remove();
	});
	
	//Galería de recursos
	if (jQuery('.carrusel_recursos').is(":visible") ) {
		jQuery('.carrusel-recientes').slick({
		  dots: false,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 1,
		  centerMode: false,
		  variableWidth: true,
		  arrows:false,
		  slidesToScroll: 2
		});
		
		jQuery('.carrusel-app').slick({
		  dots: false,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 1,
		  centerMode: false,
		  variableWidth: true,
		  arrows:false,
		  slidesToScroll: 2
		});
		
		jQuery('.carrusel-visitados').slick({
		  dots: false,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 1,
		  centerMode: false,
		  variableWidth: true,
		  arrows:false,
		  slidesToScroll: 2
		});
	}
	
	if (jQuery('.box-body-recursos').is(":visible") ) {
		//Funciones para el cambio de bloques
			
		resources = jQuery('.box_recurso');
		if ( resources.length == 0  ) {
			jQuery('.more-box-recursos h4').show();
			jQuery('.more-box-recursos .all_recursos').hide();
		}else{
			if(resources.length<=n_elems){
				jQuery('.more-box-recursos .all_recursos').hide();	
			}
			n_load=1;
			calc_pagination();
		}
			 
	}
	
	//Checkbox recursos 
	jQuery(document).on('change','.body-filtros input[type=checkbox]',function(event){
		event.preventDefault();
			//alert(jQuery(this).attr('class'));
			if(jQuery(this).parent().hasClass('active')){
				jQuery(this).parent().removeClass('active');
			}else{
				jQuery(this).parent().addClass('active');
			}
			
			filterChange();
	});
	
	//Limpiar filtros 
	jQuery(document).on('click','.clear_all_filters',function(event){
		event.preventDefault();
			//alert(jQuery(this).attr('class'));
			jQuery('.body-filtros input[type=checkbox]').attr('checked',false);
			jQuery('.body-filtros label').removeClass('active');
			//Falta mostrar todos los bloques 
			jQuery('.contenedor-recursos .item').removeClass('hide');
			n_load=1;
			calc_pagination();
				
	});
	
	//Más recursos en la páginación 
	jQuery(document).on('click','.more-box-recursos .all_recursos',function(event){
		event.preventDefault();
			n_load++;
			calc_pagination();
	});
	
	//Más recursos en la páginación 
	jQuery(document).on('click','.opc_recursos a',function(event){
		event.preventDefault();
			jQuery('.opc_recursos a').removeClass('active');
			var clase_enl=jQuery(this).attr('class');
			switch(clase_enl){
				case 'recursos_r':
					jQuery('.carrusel-recientes').show();
					jQuery('.carrusel-app').hide();
					jQuery('.carrusel-visitados').hide();
				break;
				case 'recursos_a':
					jQuery('.carrusel-recientes').hide();
					jQuery('.carrusel-app').show();
					jQuery('.carrusel-visitados').hide();
				break;
				case 'recursos_v':
					jQuery('.carrusel-recientes').hide();
					jQuery('.carrusel-app').hide();
					jQuery('.carrusel-visitados').show();
				break;
			}
			jQuery(this).addClass('active');
	});
	
	//Cuando pulsamos sobre un recurso
	jQuery(document).on('click','.box_recurso',function(event){
		event.preventDefault();
		var id_recurso=jQuery(this).attr('data-id');
		var url_recurso=jQuery(this).attr('href');
		if(typeof jQuery.cookie('cambridge-para-ti-recursos') === "undefined"){
			jQuery.cookie('cambridge-para-ti-recursos', id_recurso, { expires: 365 * 10 ,path: '/' });
		}else{
			var list_recusos=jQuery.cookie('cambridge-para-ti-recursos');
			var arr_recursos=list_recusos.split(",");
			//Eliminamos el primer recursos de la pila 
			//Si es mayor que 15
			if(arr_recursos.length>15){
				if(arr_recursos.indexOf(id_recurso)<0){
					arr_recursos.shift(); 
					arr_recursos.push(id_recurso);
				}
			}else{
				if(arr_recursos.indexOf(id_recurso)<0){
					arr_recursos.push(id_recurso);
				}
			}
			jQuery.cookie('cambridge-para-ti-recursos', arr_recursos.toString(), { expires: 365 * 10 ,path: '/' });
			//alert(arr_recursos.toString());
		}
		window.open(url_recurso,'_blank');
	});

});


/*************************
FUNCIONES JAVASCRIPT
**************************/

function loadAnalytics() {

	var cod_GA=jQuery('meta[property="google-tracking-id"]').attr('content');
	//Añadimos GA
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-31155962-17' , 'auto');
	ga('send', 'pageview');

}

	function filterChange() {
			
			filterValues = {};
	
			//Get cambridgeexams filter:
			filterValues.cambridgeexams = [];
	
			jQuery('input[name="cambridgeexams[]"]:checked').each(function(){
				filterValues.cambridgeexams.push( jQuery(this).val() )
			});
	
			//Get mcer filter:
			filterValues.mcer = [];
	
			jQuery('input[name="mcer[]"]:checked').each(function(){
				filterValues.mcer.push( jQuery(this).val() )
			});
	
			//Get abilities filter:
			filterValues.abilities = [];
	
			jQuery('input[name="abilities[]"]:checked').each(function(){
				filterValues.abilities.push( jQuery(this).val() )
			});
	
			//Get other filters:
			filterValues.is_new = jQuery('input[name="is_new"]').is(':checked')
			filterValues.is_app = jQuery('input[name="is_app"]').is(':checked')
			filterValues.is_beta = jQuery('input[name="is_beta"]').is(':checked')
	
			var count = 0;
	
			resources.each(function(){
				var item = jQuery(this);
	
				var hide = shouldHide(item);
	
				if( ! hide) count++;
	
				item.parent().toggleClass('hide', hide );
			});
			
			if(count==0){
				//No hay elementos
				jQuery('.more-box-recursos h4').show();
				jQuery('.more-box-recursos .all_recursos').hide();
			}else{
				//Miramos si hay que paginar	
				n_load=1;
				calc_pagination();
			}
	
			//jQuery('span.count').text(count);
	
		}
	
		function shouldHide(item) {
	
			var itemData = item.data();
	
			if( itemData.alwaysVisible ) {
				return false;
			}
	
			if ( filterValues.is_new && ! itemData.isNew) { return true; }
			if ( filterValues.is_app && ! itemData.isApp) { return true; }
			if ( filterValues.is_beta && ! itemData.isBeta) { return true; }
			
	
			if( filterValues.cambridgeexams.length && ! findOne(filterValues.cambridgeexams, itemData.cambridgeexams)) {
				return true;
			}
	
			if( filterValues.mcer.length && ! findOne(filterValues.mcer, itemData.mcer)) {
				return true;
			}
	
			if( filterValues.abilities.length && ! findOne(filterValues.abilities, itemData.abilities) ) {
				return true;
			}
	
			return false;
		}
		
		function findOne(haystack, arr) {
			//alert(filterValues.cambridgeexams.toString()+'--'+arr.toString());
			return arr.some(function (v) {
				return haystack.indexOf(v) >= 0;
			});
		}
		
function calc_pagination(){
	elems_show = jQuery('.item').not(".hide");
	var all_elems=elems_show.length;
	var count=0;
	elems_show.each(function(){
			if(count>=(n_load*n_elems)){
				jQuery(this).addClass('hide-page');
				//Mostramos botón de más 
				jQuery('.more-box-recursos .all_recursos').show();	
			}else{
				jQuery(this).removeClass('hide-page');
				count++;
			}
	});
	//ELiminamos si alguna de las páginas 
	if(count==all_elems){jQuery('.more-box-recursos .all_recursos').hide();}	
}		



//Ajusta tamaño de noticias
function ajusta_news(){
	var heights = jQuery('#list-news div.inside-new').map(function ()
	{
		return jQuery(this).outerHeight();
	}).get(),
	//Obtenemos tamaño max de los cuadros
	maxHeight = Math.max.apply(null, heights);
	jQuery('#list-news div.inside-new').each(function() {
		jQuery(this).css('height',maxHeight+30);
	});
}

//Función para capturar eventos scroll
function control_scroll(e){
  //Variable de scroll
  var scrollAmount = jQuery(window).scrollTop();
  var h_foot=jQuery('#footer').height();

  //Obtenemos altura y anchura del navegador
  h_win=jQuery(window).height();
  w_win=jQuery(window).width();

  //Añadir Cookie si se hace scroll a +100px
  if(scrollAmount>100){
 		/*if(jQuery.cookie('cambridge-para-ti') != 'acepta'){
			jQuery('.block-cookies').fadeOut(600,function(){
				//Creamos la cookie de aceptación
				jQuery.cookie('cambridge-para-ti', 'acepta', { expires: 365 * 10 ,path: '/' });
				var cod_GA=jQuery('meta[property="google-tracking-id"]').attr('content');
				//Añadimos GA
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

				ga('create', 'UA-31155962-17' , 'auto');
				ga('send', 'pageview');
			});
		}*/
  }

}

//Funcion para mostrar los elementos filtrados
function filter_catalogo(segmento,type1,type2){
	var allCourses = jQuery('#all-catalogo .content-catalogo div[data-type]');

	//allCourses.show();

	if(segmento==-1 & type1==-1 & type2==-1 ){
		//Cerrarmos alert de 0 libros
		jQuery('.empty-catalogo').hide();

		allCourses.show();

		//Reseteamos botones
		jQuery('#selectores-filtros a[data-filter-type=centre]').removeClass('bloqueado');
		jQuery('#selectores-filtros a[data-filter-type=demo]').removeClass('bloqueado');

		//Calculamos demos y evalución para los correspondientes al filtro
		var all_demos=jQuery('#all-catalogo .content-catalogo div[data-type=demo]').length;
		var all_evaluacion=jQuery('#all-catalogo .content-catalogo div[data-type=centre]').length;

		//Asignamos valores a enlaces correspondientes
		jQuery('#selectores-filtros a[data-filter-type=demo] strong').html(all_demos);
		if(all_demos==0){jQuery('#selectores-filtros a[data-filter-type=demo]').addClass('bloqueado');}
		jQuery('#selectores-filtros a[data-filter-type=centre] strong').html(all_evaluacion);
		if(all_evaluacion==0){jQuery('#selectores-filtros a[data-filter-type=centre]').addClass('bloqueado');}

		//Desbloqueamos filtros
		block_filter=0;
		//Activamos Lazyload para las imágenes
		jQuery("img.lazy:visible").lazyload({
			threshold : 1,
			load : function()
			{
				//Miramos span de Sample
					if(jQuery(this).parent().find('span').length>0){
						var alto_img=jQuery(this).height();
						jQuery(this).parent().find('span').css({bottom:(-alto_img/2)+20}).show();
						jQuery(this).parent().find('span.featured').css({marginTop:Math.round(-alto_img/2)+13}).show();
						jQuery(this).parent().find('span.cover').css({marginTop:Math.round(-alto_img/2)+16}).show();
					}
					//Miramos cover check
					if(jQuery(this).parents('.single-box-book').hasClass('check')){
						var alto_img=jQuery(this).height();
						var ancho_img=jQuery(this).width();
						jQuery(this).parent().find('div.cover_check').css({height:alto_img+2,width:ancho_img+2,top:(-alto_img/2)+13}).show();
					}else{
						var alto_img=jQuery(this).height();
						var ancho_img=jQuery(this).width();
						jQuery(this).parent().find('div.cover_check').css({height:alto_img+2,width:ancho_img+2,top:(-alto_img/2)+13});
					}
			}
		});
	}else{
		//Cerrarmos alert de 0 libros
		jQuery('.empty-catalogo').hide();

		allCourses.hide();

		//Filtro de primer nivel
		if(segmento!=-1) {

			allCourses.each(function(i, e){
					if( jQuery(e).data('segment') == segmento ) {
						if(type1==-1 && type2==-1){
							jQuery(e).show();
						}else{
							if( jQuery(e).data('type') == 'demo' && type1!=-1 ){
								jQuery(e).show();
							}
							if( jQuery(e).data('type') == 'centre' && type2!=-1 ){
								jQuery(e).show();
							}
						}
					}
			});

			//Reseteamos botones
			jQuery('#selectores-filtros a[data-filter-type=centre]').removeClass('bloqueado');
			jQuery('#selectores-filtros a[data-filter-type=demo]').removeClass('bloqueado');

			//Calculamos demos y evalución para los correspondientes al filtro
			var all_demos=jQuery('#all-catalogo .content-catalogo div[data-type=demo][data-segment='+segmento+']').length;
			var all_evaluacion=jQuery('#all-catalogo .content-catalogo div[data-type=centre][data-segment='+segmento+']').length;

			//Asignamos valores a enlaces correspondientes
			jQuery('#selectores-filtros a[data-filter-type=demo] strong').html(all_demos);
			if(all_demos==0){jQuery('#selectores-filtros a[data-filter-type=demo]').addClass('bloqueado');}
			jQuery('#selectores-filtros a[data-filter-type=centre] strong').html(all_evaluacion);
			if(all_evaluacion==0){jQuery('#selectores-filtros a[data-filter-type=centre]').addClass('bloqueado');}

			//Miramos si no hay libros
			if(all_demos==0 && all_evaluacion==0 ){
				jQuery('.empty-catalogo').show();
			}

			//Desbloqueamos filtros
			block_filter=0;
			//Activamos Lazyload para las imágenes
			jQuery("img.lazy:visible").lazyload({
				threshold : 1,
				load : function()
				{
					//Miramos span de Sample
					if(jQuery(this).parent().find('span').length>0){
						var alto_img=jQuery(this).height();
						jQuery(this).parent().find('span').css({bottom:(-alto_img/2)+20}).show();
						jQuery(this).parent().find('span.featured').css({marginTop:Math.round(-alto_img/2)+13}).show();
						jQuery(this).parent().find('span.cover').css({marginTop:Math.round(-alto_img/2)+16}).show();
					}
					//Miramos cover check
					if(jQuery(this).parents('.single-box-book').hasClass('check')){
						var alto_img=jQuery(this).height();
						var ancho_img=jQuery(this).width();
						jQuery(this).parent().find('div.cover_check').css({height:alto_img+2,width:ancho_img+2,top:(-alto_img/2)+13}).show();
					}else{
						var alto_img=jQuery(this).height();
						var ancho_img=jQuery(this).width();
						jQuery(this).parent().find('div.cover_check').css({height:alto_img+2,width:ancho_img+2,top:(-alto_img/2)+13});
					}
				}
			});
		}else{

			allCourses.each(function(i, e){
					if(type1==-1 && type2==-1){
						jQuery(e).show();
					}else{
						if( jQuery(e).data('type') == 'demo' && type1!=-1 ){
							jQuery(e).show();
						}
						if( jQuery(e).data('type') == 'centre' && type2!=-1 ){
							jQuery(e).show();
						}
					}
			});

			//Reseteamos botones
			jQuery('#selectores-filtros a[data-filter-type=centre]').removeClass('bloqueado');
			jQuery('#selectores-filtros a[data-filter-type=demo]').removeClass('bloqueado');

			//Calculamos demos y evalución para todos
			var all_demos=jQuery('#all-catalogo .content-catalogo div[data-type=demo]').length;
			var all_evaluacion=jQuery('#all-catalogo .content-catalogo div[data-type=centre]').length;

			//Asignamos valores a enlaces correspondientes
			jQuery('#selectores-filtros a[data-filter-type=demo] strong').html(all_demos);
			if(all_demos==0){jQuery('#selectores-filtros a[data-filter-type=demo]').addClass('bloqueado');}
			jQuery('#selectores-filtros a[data-filter-type=centre] strong').html(all_evaluacion);
			if(all_evaluacion==0){jQuery('#selectores-filtros a[data-filter-type=centre]').addClass('bloqueado');}

			//Miramos si no hay libros
			if(all_demos==0 && all_evaluacion==0 ){
				jQuery('.empty-catalogo').show();
			}

			//Desbloqueamos filtros
			block_filter=0;
			//Activamos Lazyload para las imágenes
			jQuery("img.lazy:visible").lazyload({
				threshold : 1,
				load : function()
				{
					//Miramos span de Sample
					if(jQuery(this).parent().find('span').length>0){
						var alto_img=jQuery(this).height();
						jQuery(this).parent().find('span').css({bottom:(-alto_img/2)+20}).show();
						jQuery(this).parent().find('span.featured').css({marginTop:Math.round(-alto_img/2)+13}).show();
						jQuery(this).parent().find('span.cover').css({marginTop:Math.round(-alto_img/2)+16}).show();
					}
					//Miramos cover check
					if(jQuery(this).parents('.single-box-book').hasClass('check')){
						var alto_img=jQuery(this).height();
						var ancho_img=jQuery(this).width();
						jQuery(this).parent().find('div.cover_check').css({height:alto_img+2,width:ancho_img+2,top:(-alto_img/2)+13}).show();
					}else{
						var alto_img=jQuery(this).height();
						var ancho_img=jQuery(this).width();
						jQuery(this).parent().find('div.cover_check').css({height:alto_img+2,width:ancho_img+2,top:(-alto_img/2)+13});
					}
				}
			});
		}

	}

}

//Función para eliminar hash
function removeHash () {
	var scrollV, scrollH, loc = window.location;
	if ("pushState" in history)
		history.pushState("", document.title, loc.pathname + loc.search);
	else {
		// Prevent scrolling by storing the page's current scroll offset
		scrollV = document.body.scrollTop;
		scrollH = document.body.scrollLeft;

		loc.hash = "";

		// Restore the scroll offset, should be flicker free
		document.body.scrollTop = scrollV;
		document.body.scrollLeft = scrollH;
	}
}

//Función para mostrar las notificaciones
function showNotification(msg,time){
   var t_visible;
   if (time === undefined || time === null) {
	  t_visible=2000;
   }else{
	  t_visible=time;
   }
   jQuery('#box-notificacion').html(msg).stop().clearQueue().fadeIn(400,function(){
	  jQuery(this).delay(t_visible).fadeOut(400);
   });
}

//Función para el cambio de orientación
function doOnOrientationChange()
  {
	switch(window.orientation)
	{
	  case -90:
	  case 90:


		break;
	  default:



		break;
	}
  }

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function recaptchaCallback(response) {
	jQuery('div[data-validation-rule="recaptcha"]').data('is-verified', true);
}

var validateForm = {

	form: null,
	fields: [],
	errors: [],
	hasErrors: false,

	validate: function( event ) {

		this.form      = jQuery(event.target);
		this.errors    = [];
		this.hasErrors = false;
		jQuery('.error', this.form).removeClass('error');
		jQuery('.errores', this.form).html('');

		this.fields = jQuery('*[data-validation-rule]:visible:not([readonly])', this.form);
		this.fields.each( jQuery.proxy( this.checkField , this ) );

		if( this.hasErrors ) {
			this.errors.unshift( this.form.data('error-msg') );
			this.showErrors();
			return false;
		}

		return true;
	},

	checkField: function(i,e) {

		var elem   = jQuery(e);
		var params = elem.data('validation-rule').split('|');
		var rule   = params.shift();
		var error  = false;

		//console.log('RULE:',rule);

		if( 'email' == rule ) {error = ! this.ruleIsEmail(elem);}
		if( 'repeat' == rule ) {error = ! this.ruleRepeat(elem, params[0]);}
		if( 'checkbox' == rule ) {error = ! this.ruleCheckbox(elem);}
		if( 'recaptcha' == rule ) {error = ! this.ruleValidRecaptcha(elem);}
		if( 'not-empty' == rule ) {error = ! this.ruleValidNotEmpty(elem);}
		if( 'zip' == rule ) {error = ! this.ruleValidZip(elem);}
		if( 'select-option' == rule ) {error = ! this.ruleValidSelectOption(elem);}
		if( 'multi-checkbox' == rule ) {error = ! this.ruleMultiCheckbox(elem);}
		if( 'min' == rule ) {error = ! this.ruleMinimumChars(elem, parseInt(params[0]));}
		if( 'screenshot' == rule ) {error = ! this.ruleValidScreenshot(elem, params);}


		if( error ) {
			if(rule == 'select-option') {
				elem.parent().addClass('error');
			} else if (rule == 'multi-checkbox') {
				elem.find('input[type="checkbox"]').addClass('error');
			} else {
				elem.addClass('error');
			}

			this.hasErrors = true;

			if( elem.data('error-msg') ) {
				this.errors.push( elem.data('error-msg') );
			}
		}
	},

	showErrors: function() {

		var errorList = jQuery.map(
			this.errors,
			function( value, index ){
				return jQuery('<p>').text(value);
			}
		);

		jQuery('.errores', this.form).html('').append( errorList );
	},

	ruleIsEmail: function(e) {
		return validateEmail(e.val());
	},

	ruleRepeat: function(e, repeatSelector) {
		return e.val() === jQuery(repeatSelector, this.form).val();
	},

	ruleCheckbox: function(e) {
		return e.is(":checked");
	},

	ruleValidRecaptcha: function(e) {
		return e.data('is-verified');
	},

	ruleValidNotEmpty: function(e) {
		return e.val() != '';
	},

	ruleValidZip: function(e) {
		return e.val().length == 5;
	},

	ruleValidSelectOption: function(e) {
		return e.prop('selectedIndex') != 0;
	},

	ruleMultiCheckbox: function(e) {
		return e.find('input[type="checkbox"]:checked').length > 0;
	},

	ruleMinimumChars: function(e, minChars) {
		return e.val().length >= minChars;
	},

	ruleValidScreenshot: function(e, params) {
		if( e.val() == '' ) {
			return true;
		}

		var fileExtension = e.val().split('.').pop().toLowerCase();

		return (jQuery.inArray(fileExtension, ['jpg','jpeg','png','gif']) !== -1 );
	}

}