const imageModal = document.querySelector('.post-img-modal')
const imgShow = document.getElementById("btn-1")
function  toggleModal (){
    imageModal.classList.toggle('hide')
}
console.log(imgShow)
imgShow.addEventListener('click', toggleModal)
imageModal.addEventListener('click', function(e){
    if(e.target == e.currentTarget){
        toggleModal()
    }
})