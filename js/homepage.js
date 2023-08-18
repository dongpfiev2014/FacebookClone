// Tao image Modal
const imageModal = document.querySelector('.post-img-modal')
const body = document.getElementById('body')
const div = document.getElementById('img-modal')

const imgShow = document.querySelectorAll('.post-img')
console.log(imgShow)

function  toggleModalImage (){
    imageModal.classList.toggle('hide')
}
console.log(imgShow)


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
        toggleModalImage()

    }) 
})

imageModal.addEventListener('click', function(e){
    if(e.target == e.currentTarget){
        toggleModalImage()
    }
})

//-------Tao bai viet
const btnWritePost = document.getElementById('btn-write-post')
const newPostModal = document.querySelector('.post-new-feed')
const mainContent = document.getElementById('main-content')

function toggleModalNewPost (){
    newPostModal.classList.toggle('hide')
}

btnWritePost.addEventListener('click', ()=>{
    toggleModalNewPost()
    
    const btnPost = document.getElementById('btn-post')
    // console.log(btnPost)
    btnPost.addEventListener('click', ()=>{
        const newFeedText = document.getElementById('new-feed-text').value
        const div = document.createElement('div')
        div.innerHTML = `<div class="post-container">
         <div class="post-row">
        <div class="user-profile">
            <img src="/Team3-ClassC4EJS141/images/vu.dd/profile-pic.png">
            <div>
                <p>Duong Dinh Vu</p>
                <span>August 4 2023, 10:40</span>
            </div>
        </div>
        <a href="#"><i class='bx bx-edit-alt'></i></a>
    </div>
    <p class="post-text" id="feed-1">${newFeedText}</p>
    <img src="/Team3-ClassC4EJS141/images/vu.dd/feed-image-1.png" class="post-img" feed_numb="feed-1">
    
    <div class="post-row">
        <div class="activity-icons">
            <div><img src="/Team3-ClassC4EJS141/images/vu.dd/like-blue.png">120</div>
            <div><img src="/Team3-ClassC4EJS141/images/vu.dd/comments.png">120</div>
            <div><img src="/Team3-ClassC4EJS141/images/vu.dd/share.png"></div>
        </div>
        <div class="post-profile-icon">
            <img src="/Team3-ClassC4EJS141/images/vu.dd/profile-pic.png">
            <i class='bx bxs-down-arrow'></i>
        </div>
    </div>
    </div>`
        console.log(newFeedText)
        newPostModal.classList.add('hide')
        mainContent.appendChild(div)
        // toggleModalNewPost()
        console.log(btnPost)
        
    })
    // newPostModal.addEventListener('click', function(e){
    //     if(e.target == e.currentTarget){
    //         toggleModalNewPost()
    //     }
    // })
    
})

window.onload