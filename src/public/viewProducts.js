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
    formProducts.addEventListener('submit', (e) => {
        e.preventDefault();

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
        socket.emit('new-product', data);
        inputTitle.value = '';
        inputDescription.value = '';
        inputPrice.value = '';
        inputStock.value = '';
        inputCategory.value = '';
        inputThumbnail.value = '';
        inputDiscount.value = '';
        inputStatus.value = '';
        inputCode.value = '';
    })
}

function handleviewProd(socket){
    socket.emit('init-view');
    socket.on(`view-products`, (data) => {
        let products = "";
        if(data.length)
        {
            console.log(data)
            products = data.map(prod => {
                return `<div><span>${prod.title}</span><button name="${prod.id}" class="mx-10 text-red-600 btnDelete">delete</button></div>`
            }).join('');
        }else{
            products = "<p>No hay productos</p>"
        }
        verProductos.innerHTML = /* `<div>${products}</div>` */ products
    })
}

function handleRemoveProduct(socket){
    verProductos.addEventListener('click', (e) => {
        if (e.target.classList.contains('btnDelete')) {
            const idToDelete = parseInt(e.target.name);
            console.log(typeof(idToDelete));
            socket.emit('remove-product', idToDelete);
        }
    })
} 

export function viewProducts(socket){
    handleNewProduct(socket);
    handleviewProd(socket);
    handleRemoveProduct(socket);
}