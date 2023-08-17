const imageModal = document.querySelector('.post-img-modal')
// const imgShow = document.getElementById("btn-1")
const body = document.getElementById('body')
const div = document.getElementById('img-modal')

const imgShow = document.querySelectorAll('.post-img')
console.log(imgShow)

function  toggleModal (){
    imageModal.classList.toggle('hide')
}
console.log(imgShow)
// imgShow.addEventListener('click', toggleModal)

imgShow.forEach((img) => {
    img.addEventListener('click', ()=>{
        const imgURL = img.getAttribute('src')
        const pURL = img.getAttribute('feed_numb')
        // console.log(pURL)
        // console.log(imgURL)
        const pText = document.getElementById(pURL)

        // console.log(pText)
        // console.log(pText.innerHTML)
        div.innerHTML = `
        <div class="post-img-modal-inner">
            <div class="post-img-modal-left">
                <img src="${imgURL}">
            </div>
            <div class="post-img-modal-right">
                <p>${pText.innerHTML}</p>
            </div>
        </div>`
        body.appendChild(div)
        toggleModal()

    }) 
})

imageModal.addEventListener('click', function(e){
    if(e.target == e.currentTarget){
        toggleModal()
    }
})