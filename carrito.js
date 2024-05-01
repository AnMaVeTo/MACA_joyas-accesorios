
    // Script para agregar productos al carrito
    const botonesAgregar = document.querySelectorAll('.add-to-cart-btn');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    function agregarAlCarrito(evento) {
        const boton = evento.target;
        const item = boton.closest('.item-container');

        const imagen = item.querySelector('.item-image img').src;
        const precio = item.querySelector('.item-details p').textContent;
        const nombre = item.querySelector('.item-details h3').textContent;

        agregarItemAlCarrito(imagen, nombre, precio);
    }

    function agregarItemAlCarrito(imagen, nombre, precio) {
        const fila = document.createElement('li');
        fila.innerHTML = `
            <img src="${imagen}" width="50">
            <p>${nombre}</p>
            <p>${precio}</p>
            <button class="eliminar-item">Eliminar</button>
        `;
        document.getElementById('lista-carrito').appendChild(fila);
    }

    // Script para eliminar productos del carrito
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.addEventListener('click', eliminarItem);

    function eliminarItem(evento) {
        if (evento.target.classList.contains('eliminar-item')) {
            const botonEliminar = evento.target;
            botonEliminar.closest('li').remove();
        }
    }

    // Script para vaciar el carrito
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    botonVaciarCarrito.addEventListener('click', () => {
        listaCarrito.innerHTML = '';
    });

