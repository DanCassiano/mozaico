(function( $ ){
    $.fn.mozaico = function( opcoes ) {

    	var padrao = {
    		imagens : "",
    		colunas : 6,
    		caption : "Imagens"
    	}

    	var elemento = $(this),
    		config   = $.extend( {}, padrao, opcoes );

    		elemento.append( _geraLinhas( config.imagens, config.colunas ) );
    		elemento.append( _geraRodape("", config.colunas ) );

    		
        
    		_geraMozaicoEstrutura( elemento, config );
    }; 

    var divEstrutura;

    function _geraMozaicoEstrutura( elementoAlvo, config )
    {
    		divEstrutura = $("<div></div>",{ class: 'mozaico' });
    		elementoAlvo.before( divEstrutura );

    		if( config.caption )
    			divEstrutura.append( _geraMozaicoHeader( config.caption ) );

    		var mozaicoCorpo = _geraMozaicoCorpo();
    		
			divEstrutura.append( mozaicoCorpo );
			
    		elementoAlvo.appendTo( mozaicoCorpo );
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
    		mascaraDacelula  = "<td><img width='128' height='128' src='{{imagem}}'></td>",
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
    					htmlCelulas += mascaraDacelula.replace("{{imagem}}", dados[imgAtual] );

    				imgAtual++;
    			}
    			html += mascaraDalinha.replace("{{coluna}}", htmlCelulas );
    			htmlCelulas = "";
    		}
    	return html;	
    }

    function _geraRodape( controles, tamanho )
    {
    	return "<tfoot><tr><td colspan='"+tamanho+"'></td></tr></tfoot>";
    }

})( jQuery );