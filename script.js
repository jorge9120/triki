var default_content="";
var globalUsuarios=[];
var turno=true;
$(document).ready(function(){
	//consumirServicio()
	llamarMatriz()
	
	checkURL();
	$('ul li a').click(function (e){

			checkURL(this.hash);

	});

	$('#marcar').click(function (e){

		llenarTriqui();
		verificarGanador();

	});

	//filling in the default content
	default_content = $('#pageContent').html();
	

	
	setInterval("checkURL()",250);
	
	/*
	$('#guardar').on('click', function(e) {
        e.preventDefault();
		var jsonData=$('#formGeneral').serializeArray()
		.reduce(function(a, z) { a[z.name] = z.value; return a; }, {});
		
		globalUsuarios.push(jsonData)
		renderizar(globalUsuarios)
    }); 
*/

});

var lasturl="";

function checkURL(hash)
{

	if(!hash) hash=window.location.hash;
	
	if(hash != lasturl)
	{
		lasturl=hash;
		
		// FIX - if we've used the history buttons to return to the homepage,
		// fill the pageContent with the default_content
		
		if(hash=="")
		$('#pageContent').html(default_content);
		
		//else
		//loadPage(hash);
	}
}


function loadPage(url)
{
	url=url.replace('#page','');
	
	$('#loading').css('visibility','visible');
	
	$.ajax({
		type: "POST",
		url: "load_page.php",
		data: 'page='+url,
		dataType: "html",
		success: function(msg){
			
			if(parseInt(msg)!=0)
			{
				$('#pageContent').html(msg);
				$('#loading').css('visibility','hidden');
			}
		}
		
	});

}


	
function renderizar(globalUsuarios){


	html="";
	//console.log(jsonData)
	html+="<table class='table'>"
	html+="<thead>"
	html+="<tr>"
	html+="<th scope='col'>nombre</th>"
	html+="<th scope='col'>apellido</th>"
	html+="<th scope='col'>direccion</th>"
	html+="<th scope='col'>ver</th>"
	html+="<th scope='col'>eliminar</th>"
	html+="</thead>"
	html+="<tbody>"

	
	for(var i=0;i<globalUsuarios.length;i++){
		html+="<tr><td>"
		html+=globalUsuarios[i].nombre
		html+="</td>"
		
		html+="<td>"
		html+=globalUsuarios[i].apellido
		html+="</td>"

		html+="<td>"
		html+=globalUsuarios[i].direccion
		html+="</td>"


		html+="<td>"
		html+='<button type="button" class="btn btn-primary" id="ver"'
		html+=' onclick="ver('
		html+=i+')">Ver</button>'
		html+="</td>"
		html+="<td>"
		html+='<button type="button" class="btn btn-primary" id="eliminar"'
		html+=' onclick="eliminar('
		html+=i+')">Eliminar</button>'
		html+="</td>"

		html+="</tr>"
		//$("#tablaListado").html(html)
	}
	//console.log(html)
	html+="</tbody>"
	html+="</table>"
	$("#tablaListado").html(html)


	
}

function ver(i){

	alert("entrooo verrr"+i)
}

function eliminar(i){

	alert("entrooo eliminar"+i)
	console.log(globalUsuarios)
	 globalUsuarios.splice(i,1)
	renderizar(globalUsuarios)
}


function consumirServicio()
{

	$.ajax({
		type: "GET",
		data:"",
		url: "http://localhost:8080/test/holaMundo",
		contentType: "application/json; charset=utf-8",
		success: function(msg){
			$("#consumo").html(msg)
			console.log(msg)
		},
		error: function (data){
			console.log(data)
			
		}
	});

}

function llamarMatriz()
{

	$.ajax({
		type: "GET",
		data:"",
		url: "http://localhost:8080/test/triqui",
		contentType: "application/json; charset=utf-8",
		success: function(msg){
			var html="";
			var v=JSON.parse(msg);
			html+=v[0]
			html+="<br>"
			html+=v[1]
			html+="<br>"
			html+=v[2]

			$("#consumo").html(html)
		
			console.log(v)
		},
		error: function (data){
			console.log(data)
			
		}
	});

}

function llenarTriqui()
{
	console.log($("#x").val()+" "+$("#y").val());


	console.log(turno)
	var t="";
	if(turno){
		t=1
	}else{
		t=2
	}
	
	$.ajax({
		type: "GET",
		data:"",
		url: "http://localhost:8080/test/llenarTriqui?x="+$("#x").val()+"&y="+$("#y").val()+"&t="+t+" ",
		contentType: "application/json; charset=utf-8",
		success: function(msg){
			var html="";
			var v=JSON.parse(msg);
			html+=v[0]
			html+="<br>"
			html+=v[1]
			html+="<br>"
			html+=v[2]

			$("#consumo").html(html)

		},
		error: function (data){
			
		}
	});
	if(turno==true){
		turno = !turno
	} else{
		turno = !turno
	}

}

function verificarGanador(){

	$.ajax({
		type: "GET",
		data:"",
		url: "http://localhost:8080/test/ganador",
		contentType: "application/json; charset=utf-8",
		success: function(msg){
			

			$("#ganador").html(msg)

		},
		error: function (data){
			
		}
	});

}