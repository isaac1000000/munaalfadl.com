const items = [...document.getElementsByClassName('expandable')]

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


function expand(item){
    const copy = item.cloneNode(false)
    copy.style.position = 'fixed'
    copy.style.height = '90vh'
    copy.style.top = '5vh'
    copy.style.width = 'auto'
    copy.style.objectFit = 'cover'
    copy.style.maxWidth = '90vw'
    copy.style.left = '50%'
    copy.style.transform = 'translate(-50%, 0)'
    copy.style['-webkit-transform'] = 'translate(-50%, 0)'
    copy.style.zIndex = '102'

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

    copy.addEventListener('click', unexpand)
    focusFilter.addEventListener('click', unexpand)

    item.parentElement.appendChild(focusFilter)
    item.parentElement.appendChild(copy)

}

if (!isMobile) {
    items.forEach(item => {
        item.addEventListener('click', evt => {
            expand(item)
        })
    })    
}