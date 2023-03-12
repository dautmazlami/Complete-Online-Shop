const deleteProductButtonElements = document.querySelectorAll('.product-item button');

async function deleteProduct(event) {
    const buttonElement = event.target;
    const productId = buttonElement.dataset.productid;
    const csrftoken = buttonElement.dataset.csrf;

    //Ajax request
    const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrftoken, {
        method: 'DELETE',
    });

    if (!response.ok) {
        alert('Something went wrong deleting the product!');
        return;
    }

    buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProductButtonElement of deleteProductButtonElements) {
    deleteProductButtonElement.addEventListener('click', deleteProduct);
}