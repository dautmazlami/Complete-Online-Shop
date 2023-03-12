const imagePickerElement = document.querySelector('#image-upload-control input');
const imagePreviewelement = document.querySelector('#image-upload-control img');

function updateImagepreview() {
    const files = imagePickerElement.files;

    if (!files || files.length === 0 ) {
        imagePreviewelement.style.display = 'none'
        return;
    }

    const pickedFile = files[0];

    imagePreviewelement.src = URL.createObjectURL(pickedFile);
    imagePreviewelement.style.display = 'block';

}

imagePickerElement.addEventListener('change', updateImagepreview);