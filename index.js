let cakes = [
    {id: 1, title: 'Cake 1', price: 7, img: 'images/IMG_3162.JPEG'},
    {id: 2, title: 'Cake 2', price: 15, img: 'images/IMG_3452.JPEG'},
    {id: 3, title: 'Cake 3', price: 10, img: 'images/IMG_6541.JPEG'},
    {id: 4, title: 'Cake 4', price: 4, img: 'images/IMG_7143.JPEG'},
    {id: 5, title: 'Cake 5', price: 10, img: 'images/IMG_7968.JPG'},
    {id: 6, title: 'Cake 6', price: 20, img: 'images/IMG_9219.JPG'}
]

const priceModal = $.modal({
    title: 'Price',
    closable: true,
    width: '400px',
    footerButtons: [
        {text:'Close', type:'primary', handler(){
            priceModal.close()
        }}
    ]
})

const toHTML = cake => `
    <div class="col">
        <div class="card">
            <img src="${cake.img}" class="card-img-top" alt="${cake.title}">
            <div class="card-body">
                <h5 class="card-title">${cake.title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary" data-btn='price' data-id="${cake.id}">Show the price</a>
                <a href="#" class="btn btn-danger" data-btn='remove' data-id="${cake.id}">Delete from list</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = cakes.map(cake => toHTML(cake)).join('')
    document.querySelector('#cakes').innerHTML = html
}

render()

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const cake = cakes.find(c => c.id === id)
    
    if (btnType === 'price') {
        priceModal.setContent(`
        <p>The price for ${cake.title} - <strong>${cake.price}$</strong></p>
        `)
        priceModal.open() 
    } 
    else if (btnType === 'remove') {
        $.confirm({
            title: 'Are you sure?',
            content: `<p>You deleting the cake: <strong>${cake.title}</strong></p>`
        }).then(() => {
            cakes = cakes.filter(c => c.id !== id)
            render()
        }).catch(() => {
            console.log('cancel');
        })
    }
})