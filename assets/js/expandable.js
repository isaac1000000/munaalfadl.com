const items = [...document.getElementsByClassName('expandable')]

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function expand(item){
    // the img sits inside a <picture>, so clone that to keep the webp source
    const wrapped = item.parentElement.tagName === 'PICTURE'
    const source = wrapped ? item.parentElement : item
    const host = source.parentElement
    const copy = wrapped ? source.cloneNode(true) : source.cloneNode(false)
    const shown = wrapped ? copy.querySelector('img') : copy

    shown.style.position = 'fixed'
    shown.style.height = '90vh'
    shown.style.top = '5vh'
    shown.style.width = 'auto'
    shown.style.objectFit = 'contain'
    shown.style.maxWidth = '90vw'
    shown.style.left = '50%'
    shown.style.transform = 'translate(-50%, 0)'
    shown.style['-webkit-transform'] = 'translate(-50%, 0)'
    shown.style.zIndex = '102'

    const focusFilter = document.createElement('div')
    focusFilter.style.position = 'fixed'
    focusFilter.style.left = '0'
    focusFilter.style.top = '0'
    focusFilter.style.height = '100vh'
    focusFilter.style.width = '100vw'
    focusFilter.style.backdropFilter = 'brightness(.2)'
    focusFilter.style['-webkit-backdrop-filter'] = 'brightness(.2)'
    focusFilter.style.zIndex = '101'

    function unexpand() {
        copy.remove()
        focusFilter.remove()
    }

    shown.addEventListener('click', unexpand)
    focusFilter.addEventListener('click', unexpand)
    window.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            unexpand()
        }
    })

    host.appendChild(focusFilter)
    host.appendChild(copy)

}

if (!isMobile) {
    items.forEach(item => {
        item.addEventListener('click', evt => {
            expand(item)
        })
    })    
}