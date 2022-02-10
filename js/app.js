// Selectores
const listaProductos = document.querySelector('#lista-productos');
const tableCarrito = document.querySelector('#lista-carrito tbody');
const formBuscador = document.querySelector('#formulario');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let carrito;
let boton;
// Evento Ready de jQuery

// Listeners
document.addEventListener('DOMContentLoaded', () => {

	const carritoStorage = JSON.parse(localStorage.getItem('carrito'));

	carrito = carritoStorage || [];

	actualizarCarritoHTML();
	// if(carritoStorage === null) {
	// 	carrito = [];
	// } else {
	// 	carrito = carritoStorage;
	// }
	renderProducts(productos);

	// $('#vaciar-carrito').trigger('click');

	// const event = new Event('click');
	// document.querySelector('#vaciar-carrito').dispatchEvent(event);

});
$('#link').on('click',scrollDown);
	function scrollDown(e){
			e.preventDefault();
			$('html,body').animate({
				scrollTop: $('.card:last-child').offset().down
			},5000,()=>{
				console.log("scroll terminado")
			})

	}

	
// $('#lista-productos').on('click', agregarProducto);
listaProductos.addEventListener('click', agregarProducto);
formBuscador.addEventListener('submit', buscarProductos);
tableCarrito.addEventListener('click', eliminarProducto);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);
// $('#vaciar-carrito').click(vaciarCarrito);

/*
Animacion 
setInterval(()=>{
		$("#hero").slideToggle(2000);

},3000);
*/

setTimeout(() => {
	const clickEvt = new Event('click', {
		bubbles: true
	});
	boton = document.querySelector('#id1');
	// document.querySelector('#id1').dispatchEvent(new Event("click"));
	console.log("Pasa");
	boton.dispatchEvent(clickEvt);
}, 2000);

/* Remover listeners */
// $('#lista-productos').off('click');
// listaProductos.removeEventListener('click', agregarProducto);

function vaciarCarrito(e) {
	e.preventDefault();
	// Vaciar el arreglo carrito;
	carrito = [];

	// Actualizar HTML del carrito
	actualizarCarritoHTML();
	// Actualizar el storage del carrito
	actualizarStorage();
}

function eliminarProducto(e) {
	e.preventDefault();
	if (e.target.nodeName === "A" || e.target.nodeName === "I") {
		// Borrar el producto del arreglo carrito
		const id = e.target.closest('a').dataset.id;
		// const id = e.target.closest('a').getAttribute('data-id');

		const carritoFiltrado = carrito.filter(producto => producto.id !== id);
		carrito = [...carritoFiltrado];
		// console.log(carritoFiltrado);

		// Actualizar HTML del carrito
		actualizarCarritoHTML();
		// Actualizar el storage del carrito
		actualizarStorage();
	}
}

function buscarProductos(e) {
	e.preventDefault();

	// Leer el texto del input
	const inputBuscador = document.querySelector('#buscador').value;
	const inputFiltrado = inputBuscador.toLowerCase().trim();

	const resultado = productos.filter(producto => producto.nombre.toLowerCase().includes(inputFiltrado));

	console.log(resultado);
	renderProducts(resultado);
	formBuscador.reset();
}

function agregarProducto(e) {
	e.preventDefault();
	console.log("Agregar Producto");

	if (e.target.classList.contains("agregar-carrito")) {
		const productCard = e.target.parentElement.parentElement;

		const productoAgregado = {
			imagen: productCard.querySelector('img.imagen-producto').src,
			nombre: productCard.querySelector('h4').textContent,
			precio: productCard.querySelector('.precio span').textContent,
			cantidad: 1,
			id: productCard.querySelector('a').dataset.id
		}

		// Chequear si productoAgregado existe en el carrito

		const existe = carrito.some(producto => producto.id === productoAgregado.id);
		// const index = carrito.findIndex( producto => producto.id === productoAgregado.id );

		//if(index !== -1) {
		// carrito[index].cantidad++
		//}
		if (existe) {
			const nuevoCarrito = carrito.map(producto => {
				if (producto.id === productoAgregado.id) {
					producto.cantidad++;
				}
				return producto;
			});
			carrito = [...nuevoCarrito];
			// carrito = nuevoCarrito;
		} else {
			// Se agrega por primera vez
			carrito.push(productoAgregado);
			// carrito = [...carrito, productoAgregado] // = push
		}

		// Renderizo la tabla con los items del carrito
		actualizarCarritoHTML();
		actualizarStorage();
	}
}

function actualizarCarritoHTML() {
	tableCarrito.innerHTML = '';

	carrito.forEach(producto => {
		const { imagen, nombre, precio, cantidad, id } = producto;
		// const row = document.createElement('tr');
		// row.innerHTML = `
		// 	<td>
		// 		<img src="${imagen}" width="100%">
		// 	</td>
		// 	<td>
		// 		${nombre}
		// 	</td>
		// 	<td>
		// 		${precio}
		// 	</td>
		// 	<td>
		// 		${cantidad}
		// 	</td>
		// 	<td>
		// 		<a href="#" class="borrar-producto" data-id="${id}"><i class="fas fa-trash"></i></a>
		// 	</td>
		// `

		$('#lista-carrito tbody')
			.append(`
				<tr>
					<td>
						<img src="${imagen}" width="100%">
					</td>
					<td>
						${nombre}
					</td>
					<td>
						${precio}
					</td>
					<td>
						${cantidad}
					</td>
					<td>
						<a href="#" class="borrar-producto" data-id="${id}"><i class="fas fa-trash"></i></a>
					</td>
				</tr>
			`);

		// tableCarrito.appendChild(row);
	});
}

function actualizarStorage() {
	// TODO
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderProducts(listadoProductos) {
	listaProductos.innerHTML = ''

	listadoProductos.forEach(producto => {
		const html = `
			<div class="card">
				<img src="${producto.imagen}" class="imagen-producto u-full-width">

				<div class="info-card">
					<h4>${producto.nombre}</h4>
					<p>Juan Perez</p>
					<img src="img/estrellas.png">
					<p class="precio">$2000 <span class="u-pull-right">${producto.precio}</span></p>
					<a id="id${producto.id}" href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${producto.id}">Agregar al Carrito</a>
				</div>
			</div>
		`
		// listaProductos.innerHTML = listaProductos.innerHTML + html;
		listaProductos.innerHTML += html;
	});
}

