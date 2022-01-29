window.addEventListener("load", iniciar, false);

function iniciar()
{
	nombre=document.getElementById("nombre");
	correo=document.getElementById("correo");

	nombre.addEventListener("input", validaNombre, false);
	correo.addEventListener("input", validaCorreo, false);
}

function validaNombre()
{
	var arr_nombres = ["alex", "juan", "ana", "pedro"];
	var i, encontrado = false;
	
	for (i = 0;i < arr_nombres.length && !encontrado;i++)
	{
		if (nombre.value == arr_nombres[i])
			encontrado = true;
	}
	
	if(!encontrado)
	{
		nombre.setCustomValidity('El usuario introducido no existe');
	}
	else
	{
		nombre.setCustomValidity('');
	}
}

function validaCorreo()
{
	var dominio = correo.value.substr(correo.value.length-3, correo.value.length-1)
	if (correo.value.length < 4 || dominio != ".es")
	{
		correo.setCustomValidity('Debes introducir una dirección de correo española (acabada en .es)');
	}
	else
	{
		correo.setCustomValidity('');
	}
}