(function( $ ){
    $.fn.mozaico = function( opcoes ) {

    	var padrao = {
    		imagens : "",
    		colunas : 4,
    		caption : "Imagens",
    		paginacao: true
    	}

    	var elemento = $(this),
    		config   = $.extend( {}, padrao, opcoes );         
    		_geraMozaicoEstrutura( elemento, config );
    }; 

    var divEstrutura;

    function _geraMozaicoEstrutura( elementoAlvo, config )
    {
    		divEstrutura = $("<div></div>",{ class: 'mozaico' });
    		elementoAlvo.before( divEstrutura );

    		if( config.caption )
    			divEstrutura.append( _geraMozaicoHeader( config.caption ) );

    			elementoAlvo.append( _geraLinhas( config.imagens, config.colunas ) );		

    		var mozaicoCorpo = _geraMozaicoCorpo();			    
			    divEstrutura.append( mozaicoCorpo );
    		    elementoAlvo.appendTo( mozaicoCorpo );
    		    divEstrutura.append( _geraRodape( config , config.colunas ) );

    		    _bindEvento( $(".mozaico-triger"), 'click', function( e ){
    			        e.preventDefault();
	         			$(".mozaico-triger").removeClass('selecionado')
                        $(this).addClass('selecionado')
		    			var img          = $( this).find('img'),    				    				
				       	    theImage     = new Image();
		                    theImage.src = img.prop('src');
    			            _visualizacao( img.prop('src'), theImage.width, theImage.height );
    		    });
    }

    function _geraMozaicoHeader( titulo )
    {
    	return "<div class='mozaico-header'>"+titulo+"</div>";
    }

    function _geraMozaicoCorpo()
    {
    	return $("<div></div>",{ class: 'mozaico-corpo' });
    }

    function _geraLinhas( dados, colunas )
    {
    	var mascaraDalinha   = "<tr>{{coluna}}</tr>",
    		mascaraDacelula  = "<td><a href='{{imagem}}' class='mozaico-triger'><img width='128' height='128' src='{{imagem}}'></a></td>",
    		html             = "",
    		htmlCelulas      = "",    	
    		imgAtual         = 0,	
    		totalRegistros   = dados.length;

    		linhas = Math.ceil( totalRegistros / colunas );
    		
    		for( var l = 0; l < linhas; l++)
    		{
    			for( var c = 0; c < colunas; c++ )
    			{
    				if( imgAtual < totalRegistros )
    					htmlCelulas += mascaraDacelula.replace(/{{imagem}}/g, dados[imgAtual] );

    				imgAtual++;
    			}
    			html += mascaraDalinha.replace("{{coluna}}", htmlCelulas );
    			htmlCelulas = "";
    		}
    	return html;	
    }

    function _geraMozaicoPaginacao( qtdPaginas, qtdDados )
    {
    	var html = "<ul class='mozaico-paginacao'>";
                    
                for( var i = 1 ; i <= qtdPaginas; i++ )
                	html += "<li><a href=''>"+i+"</a></li>";

    		html += "</ul>";
    	return html;
    }

    function _geraRodape( config, tamanho )
    {
    	var controles = "";
    	if( config.paginacao == true )
    	{
    		controles += _geraMozaicoPaginacao( 2, 0);
    	}
    	return "<div class='mozaico-rodape' >"+ controles+"</div>";
    }

    function _visualizacao( srcImagem, largura, altura )
    {
    	if( $('#mascara')[0] == undefined )
    	{
    		var mascara = $("<div></div>", { id: "mascara", class: "mozaico-mascara" } );
    			mascara.append( '<div class="mozaico-view"></div>' )
    					  $("body").append( mascara )
    	}

    	var larguraWindow     = $(document).width(),
    	    alturaWindow      = $(document).height(),
    	    larguraContainer  = ( largura > larguraWindow ?  ( larguraWindow - 100 ) : largura  ),
    		alturaContainer   = ( altura >  alturaWindow ? ( alturaWindow - 80 ) : altura ),
    		topContainer      = ( altura >  alturaWindow ? '2%' : ( (alturaWindow/2) - (alturaContainer/2) )  );

    	$(".mozaico-view")
    		.html( '<span id="esquerdo"><<</span><img src="'+srcImagem+'" /><span id="direito" >>></span>' )
    		.animate({  width  : larguraContainer , 
    				    height : alturaContainer,
    				    margin : topContainer +" auto" }, 'slow');

    	$('#mascara').fadeIn();  

    	_bindEvento( $("#esquerdo"), 'click', function(e){  e.preventDefault(); _anterior()   }); 
    	_bindEvento( $("#direito"), 'click', function(e){  e.preventDefault();  _proxima()  });     	    	
    }

    function _proxima()
    {
    	var indiceClick = 0,
    		elementos   = $(".mozaico-triger");

    		elementos.each(function(indice, item){

    			if( $(item).hasClass('selecionado') )
    			{
    				indiceClick = indice;
    			}
    		});

    		if( elementos.length == ( indiceClick + 1 ))
    			indiceClick = 0;
    		else
    			indiceClick += 1;

    	var click = $(".mozaico-triger")[indiceClick];
    		$(click).click();

    		console.log( click, indiceClick )

    }

    function _anterior()
    {
    	$(".mozaico-triger").find('.selecionado').prev().find('a').click();
    }


    function _bindEvento( elemento, evento, retorno )
    {
    	elemento.on( evento, retorno );
    }

})( jQuery );