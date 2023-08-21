// Tao image Modal
const imageModal = document.querySelector('.post-img-modal')
const body = document.getElementById('body')
const div = document.getElementById('img-modal')

const imgShow = document.querySelectorAll('.post-img')
// console.log(imgShow)

function  toggleModalImage (){
    imageModal.classList.toggle('hide')
}
// console.log(imgShow)


imgShow.forEach((img) => {
    img.addEventListener('click', ()=>{
        const imgURL = img.getAttribute('src')
        const pURL = img.getAttribute('feed_numb')
        const divUser = img.getAttribute('user_id')
        const pText = document.getElementById(pURL)
        const divUserIcon = document.getElementById(divUser)
        div.innerHTML = `
        <div class="post-img-modal-inner">
            <div class="post-img-modal-left">
                <img src="${imgURL}">
            </div>
            <div class="post-img-modal-right">
                <div class="user-profile">
                    ${divUserIcon.innerHTML}
                </div>
                
                <p>${pText.innerHTML}</p>
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
    const divNewPost = document.createElement('div')
    divNewPost.innerHTML = ` 
    <div class="post-new-feed">
        <div class="post-new-feed-inner">
            <div class="post-new-feed-header">
                <h4>Creat New Feed</h4>
             </div>
             <div class="post-new-feed-main">
                <textarea name="" id="new-feed-text" placeholder="What do you think?"></textarea>
                <h5>Choose image you want</h5>
                <input type="file" id="file">
             </div>
             <div class="post-new-feed-footer">
                 <button id="btn-post">Post</button>
             </div>
        </div>
    </div>`
    body.appendChild(divNewPost)
    console.log(divNewPost)
    const btnPost = document.getElementById('btn-post')
    const imgURL = ''
    const inputFile = document.getElementById("file")
    inputFile.addEventListener('change', (e)=>{
        const file = e.currentTarget.files[0]
        console.log(e.currentTarget.files[0])
        let reader = new FileReader();
        reader.onloadend = function () {
            
            localStorage.setItem("post-image", reader.result);
        };
        reader.readAsDataURL(file);
    })
    console.log(inputFile)
    btnPost.addEventListener('click', ()=>{
        const newFeedText = document.getElementById('new-feed-text').value
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="post-container">
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
            <img src="${localStorage.getItem("post-image")}" class="post-img" feed_numb="feed-1">
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
        
        divNewPost.remove()
        mainContent.appendChild(div)    
    })    
})


const profileImage = document.getElementById('profileImage')
const settingsMenu = document.getElementById('settings')
profileImage.addEventListener('click', ()=>{
    settingsMenu.classList.toggle('hide')
})