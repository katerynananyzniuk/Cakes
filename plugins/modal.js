function _createModalFooter(buttons=[]){
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('div')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop()

        wrap.appendChild($btn)
    })
    return wrap
}

function noop() {}

function _createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('kmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width}">
                <div class="modal-header">
                    <h4 class="modal-title">${options.title || 'Title'}</h4>
                    ${options.closable?`<span class="modal-close" data-close='true'>&times;</span>`:''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    modal.querySelector('[data-content]').after(footer)
    document.body.appendChild(modal)
    return modal
}
 
$.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    const btnModal = document.getElementById('btn-modal')
    let closing = false
    let destroyed = false

    
    const modal = {
        open() {
            if(destroyed){
                return console.log('Modal was destroyed');
            }
            if(!closing) {
                $modal.classList.add('open')
            }
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
            },ANIMATION_SPEED)
            // if(btnModal.classList.contains('animate__animated')) {
            //     btnModal.classList.remove('animate__fadeOut')
            //     btnModal.classList.add('animate__fadeIn')
            // }
        }
    }
    const listener = function(event) {
        if(event.target.dataset.close){
            modal.close()
        }
    }
    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.remove()
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        },
        // onOpen() {
        //     modal.open()
        //     btnModal.classList.add('animate__animated')
        //     btnModal.classList.remove('animate__fadeIn')
        //     btnModal.classList.add('animate__fadeOut')
        // },
        // onClose() {
        //     modal.close()
        //     if(btnModal.classList.contains('animate__animated')) {
        //         btnModal.classList.remove('animate__fadeOut')
        //         btnModal.classList.add('animate__fadeIn')
        //     }
        // }
    })
}