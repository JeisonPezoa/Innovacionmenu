let currentMenuId = null;

function mostrarDetalles(menuId) {
    currentMenuId = menuId;
    const imagenes = {
        menu1: "https://media.istockphoto.com/id/1295633127/es/foto/carne-de-pollo-a-la-parrilla-y-ensalada-de-verduras-frescas-de-tomate-aguacate-lechuga-y.jpg?s=612x612&w=0&k=20&c=gnuOg5gI009lfvkxnObtGubcG7nVVsqH61zIZkdpc-w=",
        menu2: "https://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg",
        menu3: "https://www.conasi.eu/blog/wp-content/uploads/2019/02/postres-con-frutas-des.jpg"
    };

    document.getElementById('detalleImagen').src = imagenes[menuId];

    const checkboxesContainer = document.getElementById('checkboxes');
    checkboxesContainer.innerHTML = '';

    const productos = ['Entrada', 'Ensalada', 'Postre'];

    productos.forEach(producto => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('form-check');
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.classList.add('form-check-input');
        checkboxInput.id = `${menuId}-${producto.replace(/\s+/g, '-')}`;
        checkboxInput.name = `${menuId}-productos`;
        checkboxInput.value = producto;
        const checkboxLabel = document.createElement('label');
        checkboxLabel.classList.add('form-check-label');
        checkboxLabel.setAttribute('for', checkboxInput.id);
        checkboxLabel.textContent = producto;
        checkboxDiv.appendChild(checkboxInput);
        checkboxDiv.appendChild(checkboxLabel);
        checkboxesContainer.appendChild(checkboxDiv);
    });

    $('#detalleMenu').modal('show');
}

function confirmarPedido() {
    
    const productosSeleccionados = Array.from(document.querySelectorAll(`input[name="${currentMenuId}-productos"]:checked`)).map(checkbox => checkbox.value);
    
    
    const productosTotales = ['Entrada', 'Ensalada', 'Postre'];
    
    
    const productosNoSeleccionados = productosTotales.filter(producto => !productosSeleccionados.includes(producto));

    
    const menuCard = document.getElementById(currentMenuId);

    
    let stock = parseInt(menuCard.getAttribute('data-stock'));
    stock -= 1;

    
    menuCard.setAttribute('data-stock', stock);
    menuCard.querySelector('.count').textContent = stock;

    
    $('#detalleMenu').modal('hide');

    
    const detallesPedido = document.getElementById('detallesPedido');
    detallesPedido.innerHTML = `
        <div class="text-left">
            <p>Su pedido ha sido confirmado.</p>
            <p>A continuación, encontrará los detalles de que se quitó del menú:</p>
            <ul>
                ${productosSeleccionados.map(producto => `<li>${producto}</li>`).join('')}
            </ul>
            <p>Y su platillo contara con lo siguiente:</p>
            <ul>
                ${productosNoSeleccionados.map(producto => `<li>${producto}</li>`).join('')}
            </ul>
        </div>`;

    $('#agradecimientoMenu').modal('show');
}


