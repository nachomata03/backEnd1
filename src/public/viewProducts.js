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
            products = data.reduce((acc, document) => {
                return acc + `<p>${document.title}</p>`;
            }, "") 
        }else{
            products = "<p>No hay productos</p>"
        }
        verProductos.innerHTML = `<div>${products}</div>`
    })
}

function handleRemoveProduct(socket){
    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'X';
    verProductos.appendChild(btnDelete);
    btnDelete.addEventListener('click', () => {
        socket.emit('remove-product');
    })
}

export function viewProducts(socket){
    handleNewProduct(socket);
    handleviewProd(socket);
    handleRemoveProduct(socket);
}