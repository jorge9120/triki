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

function boton(i){
	alert(i);
	var x;
	var y;
	if(i==0){
	x=0;
	y=0;	
	}
	
	if(i==1){
		x=0;
		y=1;	
		}

	if(i==2){
	x=0;
	y=2;	
	}

	if(i==3){
		x=1;
		y=0;	
		}

	if(i==4){
		x=1;
		y=1;	
		}
	if(i==5){
		x=1;
		y=2;	
		}	

	if(i==6){
		x=2;
		y=0;	
		}

	if(i==7){
		x=2;
		y=1;	
		}

	if(i==8){
		x=2;
		y=2;	
		}
		
		llenarTriqui(x,y);

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
			html+="<button type='button' class='btn btn-light'  onclick='boton(0)'>"
			html+=v[0][0]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'   onclick='boton(1)'>"
			html+=v[0][1]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'   onclick='boton(2)'>"
			html+=v[0][2]
			html+="</button>"
			html+="<br>"
			html+="<button type='button' class='btn btn-light'   onclick='boton(3)'>"
			html+=v[1][0]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'   onclick='boton(4)'>"
			html+=v[1][1]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'   onclick='boton(5)'>"
			html+=v[1][2]
			html+="</button>"
			html+="<br>"
			html+="<button type='button' class='btn btn-light'   onclick='boton(6)'>"
			html+=v[2][0]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'   onclick='boton(7)'>"
			html+=v[2][1]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'   onclick='boton(8)'>"
			html+=v[2][2]
			html+="</button>"

			$("#consumo").html(html)
		
			console.log(v)
		},
		error: function (data){
			console.log(data)
			
		}
	});

}

/*function llamarMatriz()
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

}*/


function llenarTriqui(x,y)
{
	//console.log($("#x").val()+" "+$("#y").val());


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
		url: "http://localhost:8080/test/llenarTriqui?x="+x+"&y="+y+"&t="+t+" ",
		contentType: "application/json; charset=utf-8",
		success: function(msg){
			var html="";
			var v=JSON.parse(msg);
			html+="<button type='button' class='btn btn-light'  onclick='boton(0)'>"
			html+=v[0][0]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'  onclick='boton(1)'>"
			html+=v[0][1]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'  onclick='boton(2)'>"
			html+=v[0][2]
			html+="</button>"
			html+="<br>"
			html+="<button type='button' class='btn btn-light'  onclick='boton(3)'>"
			html+=v[1][0]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'  onclick='boton(4)'>"
			html+=v[1][1]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'  onclick='boton(5)'>"
			html+=v[1][2]
			html+="</button>"
			html+="<br>"
			html+="<button type='button' class='btn btn-light'  onclick='boton(6)'>"
			html+=v[2][0]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'  onclick='boton(7)'>"
			html+=v[2][1]
			html+="</button>"
			html+="<button type='button' class='btn btn-light'  onclick='boton(8)'>"
			html+=v[2][2]
			html+="</button>"

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
	verificarGanador();
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