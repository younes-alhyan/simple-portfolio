
const itemsInputForm = document.getElementById('items-input');
const itemsContainer = document.getElementById('items-container');

function item(param) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML += `<h1>${param.title}</h1>`
    card.innerHTML += '<div class = image-container></div>';
    card.innerHTML += `<p>${param.description}</p>`
    return card;
}
itemsInputForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from submitting the default way

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.text();
            itemsContainer.appendChild(item(data));
        } else {
            console.log('Form submission failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        console.log('An error occurred while submitting the form.');
    }
});