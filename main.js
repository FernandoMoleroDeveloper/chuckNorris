
let categories = [];
let container;
let containerJoke;
let arraySeleccion = [];
//Creamos el window para que cargue los botones y lea la informacion del array
window.onload = () => {
	getCategories().then((resp) => renderBtns(resp));//nos devuelve el array que hemso llamado
	container = document.getElementsByClassName('categories')[0];//le asignamos al  boton 
    newJokeBtn = document.getElementsByClassName("btn-newJoke")[0];
    newJokeBtn.addEventListener('click', () => { nuevoChiste()});
    containerJoke = document.getElementsByClassName("container-joke")[0];
};

async function getCategories() { //hacemos una funcion asincrona para llamar a la web y nos devuvla el array
	const URL = 'https://api.chucknorris.io/jokes/categories';
	const response = await fetch(URL);
	const categories = await response.json();
	return categories;
}

const renderBtns = (resp) => { //hacemos una funcion que pinte los botones con el array recibido y su correspondiente informacion de cada uno porque tiene la misma clase
	resp.forEach((categoria, index) => {
		container.innerHTML += `
			<div id="btn" class="button-container">
                <button class="category-button category-button--off" type="check">${categoria}</button>
			</div>
            `;
	});

    let buttonOption = document.getElementsByClassName("category-button");
for (let i=0 ; i< buttonOption.length; i++){ //hacemos un bucle para recorrer el array de botones
    buttonOption[i].addEventListener('click', () => { pulsarBoton(i, resp)});//asignamos la propiedad de clicar
}
 
};

let pulsarBoton = (index, resp) => { //Con esta funcion detectamos si esta seleccionado la opcion
  if (arraySeleccion.includes(resp[index])===false){ //creamos un arraySleccion vacio(que lo ponemos fuera con una funcion) para que con el includes lo vaya añadiendo si no está añadido
   arraySeleccion.push(resp[index]);//si no esta añadido lo sube
  }else {
    arraySeleccion= arraySeleccion.filter(element  => element !== resp[index]) //arraySeleccion contiene el array de lo que hemos subido, si está añadido lo quitamos con filter seleccionando
  }
  console.log(arraySeleccion)
}

let nuevoChiste = () => {
    let categoriesString = arraySeleccion.join(',')
    getNewJoke(categoriesString).then((resp) => printJoke(resp))
}

const getNewJoke = async(string) =>{
    const url= 'https://api.chucknorris.io/jokes/random?category=' + string;
    const response = await fetch(url);
	const data = await response.json();

    console.log(data.value);
	return data.value;
   
}


const printJoke = (chiste)=>{
    containerJoke.innerHTML = chiste;
    
}


