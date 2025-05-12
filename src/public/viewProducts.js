const socket = io();

const formProducts = document.querySelector('#formProducts');
const inputTitle = document.querySelector('#inputTitle');
const inputDescription = document.querySelector('#inputDescription');
const inputPrice = document.querySelector('#inputPrice');
const inputStock = document.querySelector('#inputStock');
const inputCategory = document.querySelector('#inputCategory');
const inputThumbnail = document.querySelector('#inputthumbnail');
const inputDiscount = document.querySelector('#inputDiscount');
const inputStatus = document.querySelector('#inputStatus');
const inputCode = document.querySelector('#inputCode'); 
const verProductos = document.querySelector('#verProductos');

function handleNewProduct(socket){
    const data = {
        title: inputTitle.value,
        description: inputDescription.value,
        price: inputPrice.value,
        stock: inputStock.value,
        category: inputCategory.value,
        thumbnails: inputThumbnail.value,
        discount: inputDiscount.value,
        status: inputStatus.value,
        code: inputCode.value 
    }

    inputTitle.value = '';
    inputDescription.value = '';
    inputPrice.value = '';
    inputStock.value = '';
    inputCategory.value = '';
    inputThumbnail.value = '';
    inputDiscount.value = '';
    inputStatus.value = '';
    inputCode.value = '';

    socket.emit('new-product', data);

    Swal.fire({
        title: 'success',
        text: "Producto agregado con exito", 
        icon: 'success'
    })
}

function handleviewProd(socket){
    socket.emit('init-view');
    socket.on(`view-products`, (data) => {
        let products = "";
        if(data.length)
        {
            products = data.map(prod => {
                return `<div><span>${prod.title}</span><button name="${prod.id}" class="mx-10 text-red-600 btnDelete">delete</button></div>`
            }).join('');
        }else{
            products = `<p>No hay productos</p>`
        }
        verProductos.innerHTML = products
    })
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: 'Productos cargados con exito',
        background: '#a5dc86',
    })
}
function handleRemoveProduct(socket, e){
    if (e.target.classList.contains('btnDelete')) {
        const idToDelete = parseInt(e.target.name);
        socket.emit('remove-product', idToDelete);
    }

    Swal.fire({
        title: 'success',
        text: "Producto eliminado con exito", 
        icon: 'success'
    })
} 

export function viewProducts(socket){
    handleviewProd(socket);

    formProducts.addEventListener('submit', (e) => {
        e.preventDefault();
        handleNewProduct(socket);
    })
    verProductos.addEventListener('click', (e) => {
        handleRemoveProduct(socket, e);
    })

    socket.on(`error`, (data) => {
        let errorMessage = "";
        /* if (Object.prototype.toString.call(data.messages) === '[object Array]') { // Verifica si data.messages es un array
            data.messages.forEach(message => {
                errorMessage += `<ul>${message}</ul>`; // Crea párrafos para cada mensaje
            });
        } else {
            errorMessage = `<li>${data.message}</li>`;
        } */

            if (Array.isArray(data.messages)) { // Verifica si data.messages es un array
                data.messages.forEach(message => {
                    errorMessage += `<p>${message}</p>`; // Crea párrafos para cada mensaje
                });}



            

            // PROBLEMA ES QUE MUESTRA TODO JUNTO EN UN SOLO PARRAFO                





        Swal.fire({
            title: 'Error',
            html: errorMessage, // Usa 'html' en lugar de 'text'
            icon: 'error'
        });
    })
}

viewProducts(socket);