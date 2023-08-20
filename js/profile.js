//THAY ĐỔI VỊ TRÍ ICON CỦA THANH BÌNH LUẬN

const commentBox = document.getElementById("comment-box");
const commentButton = document.getElementById("comment-button");
const commentIcon = document.getElementById("comment-icon");

commentBox.addEventListener("focus", function () {
  commentBox.classList.add("expanded");
  commentButton.classList.remove("hidden");
  commentIcon.classList.add("expanded-icon");
  //   commentIcon.style.right = " ";
  //   commentIcon.style.left = "20px";
  //   commentIcon.style.bottom = "20px";
});

commentBox.addEventListener("blur", function () {
  if (!commentBox.value.trim()) {
    commentBox.classList.remove("expanded");
    commentButton.classList.add("hidden");
    commentIcon.classList.remove("expanded-icon");
  }
});

//ĐƯA BÌNH LUẬN VÀO TRONG BOX COMMENT

function addComment() {
  const commentText = commentBox.value;

  if (commentText.trim() !== "") {
    const commentId = `Comment-${new Date().getTime()}`;

    const commentUser = document.querySelector(".Box-Comment");
    const commentItem = document.createElement("div");
    commentItem.classList.add("User1");
    commentItem.id = commentId;

    // Thay thế các dấu xuống dòng bằng thẻ <br>
    const commentHtml = commentText.replace(/\n/g, "<br>");
    commentItem.innerHTML = `<img src="../images/dong.km/avatar.jpg" alt="fri_5">
                  <div class="User1-Pan">
                    <div class="User1-PanCo">
                      <div class="User1-Name">
                        <span class="bold-text">Luka Modrić
                          <img
                            src="https://t3.ftcdn.net/jpg/05/43/29/02/360_F_543290296_snhXYYelZwXmXoo1sUoVMD54GXTPguWH.jpg"
                            alt="" class="BlueTick"></span>
                        <button
                          style="color: rgb(0, 102, 255); font-weight: bold; border: none; background-color: #E4E6EB; cursor: pointer;"></button>
                      </div>
                      <div class="User1-Comment">${commentText}</div>
                      <button class="User1-Edit" onclick="clickEditDelBtn('${commentId}')">···</button>
                      <div class="User1-Edit-Del" id="EditDelHolder">
                        <button class="User1-Edit-Del-CS" onclick="editComment('${commentId}')">Chỉnh sửa</button>
                        <button class="User1-Edit-Del-X" onclick="openConfirmModal('${commentId}')">Xóa</button>
                        <input id="Flag" type="hidden" value="0" />
                      </div>
                    </div>
                    <div class="User1-React">
                      <div>Thích</div>
                      <div>Phản hồi</div>
                      <div>1 phút</div>
                    </div>
                  </div>`;
    if (commentUser.firstChild) {
      commentUser.insertBefore(commentItem, commentUser.firstChild);
    } else {
      commentUser.appendChild(commentItem);
    }
    commentBox.value = "";
  }
}

commentButton.addEventListener("click", addComment);

commentBox.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    if (!event.shiftKey && !event.altKey) {
      // Ngăn chặn hành vi mặc định của nút Enter (chuyển dòng) khi không có Shift hoặc Alt
      event.preventDefault();
      addComment();
    } else if (event.altKey) {
      // Ngăn chặn hành vi mặc định của nút Enter (chuyển dòng) khi kết hợp với Alt
      event.preventDefault();
      commentBox.value += "\n"; // Thêm xử lý khác nếu cần
    }
  }
});

//POST STATUS LÊN PROFILE FACEBOOK (NỘI DUNG VÀ HÌNH ẢNH)

//HIỂN THỊ BẢNG CHỈNH SỬA HOẶC XÓA BÌNH LUẬN

const EditDelBut = document.querySelectorAll(".User1-Edit");
// console.log(EditDelBut);
const EditDelButPan = document.querySelectorAll(".User1-Edit-Del");
// console.log(EditDelButPan);

function DisplayEditDel() {
  EditDelButPan.forEach((x) => {
    x.style.opacity = "1";
    x.style.transform = "scale(1)";
    y = false;
  });
}

function HiddenEditDel() {
  EditDelButPan.forEach((x) => {
    x.style.opacity = "0";
    x.style.transform = "scale(0)";
    y = true;
  });
}
let y = true;
function CheckEditDel() {
  EditDelBut.forEach((button) => {
    button.addEventListener("click", () => {
      if (y) {
        DisplayEditDel();
      } else {
        HiddenEditDel();
      }
    });
  });
}

// CheckEditDel();

const hideOpenedEditDelHolder = (newCommentId) => {
  const oldCommentId = document.getElementById("OpenHolderCommentId").value;
  if (!oldCommentId || newCommentId === oldCommentId) {
    // re-set value to hidden input
    document.getElementById("OpenHolderCommentId").value = newCommentId;

    return;
  }

  // hide old holder
  changeEditDelHolderFlag(
    document.getElementById(oldCommentId)?.querySelector("#EditDelHolder"),
    0
  );

  // re-set value to hidden input
  document.getElementById("OpenHolderCommentId").value = newCommentId;
};

//EDIT BÌNH LUẬN KHI NHẤN NÚT CHỈNH SỬA

// Open popup holder which have edit & delete buttons
const changeEditDelHolderFlag = (holder, flag) => {
  if (holder) {
    // change holder style
    holder.style.opacity = `${flag}`;
    holder.style.transform = `scale(${flag})`;

    // update new flag value
    holder.querySelector("#Flag").value = flag;
  }
};
const clickEditDelBtn = (commentId) => {
  // hide all edit & delete holder
  hideOpenedEditDelHolder(commentId);

  // get comment container element
  const container = document.getElementById(commentId);

  // get new flag value
  const newFlagValue = 1 - parseInt(container.querySelector("#Flag").value);

  // change holder flag & style
  const holder = container.querySelector("#EditDelHolder");
  changeEditDelHolderFlag(holder, newFlagValue);
};

// Xử lý sự kiện khi nhấn nút "Edit"
const editComment = (commentId) => {
  // hide all edit & delete holder
  hideOpenedEditDelHolder(commentId);

  // get comment container element
  const container = document.getElementById(commentId);

  // hide current edit & del holder
  container.querySelector(".User1-Edit").click();

  // Tạo element textarea và gán nội dung
  const textarea = document.createElement("textarea");
  textarea.value = container.querySelector(".User1-Comment").textContent;
  textarea.classList.add("style-edit-textarea");

  // Thay thế phần tử .comment-text bằng textarea
  const commentPanCo = container.querySelector(".User1-PanCo");
  commentPanCo.replaceChild(
    textarea,
    commentPanCo.querySelector(".User1-Comment")
  );

  // Tạo nút "Save" để lưu chỉnh sửa
  const saveButton = document.createElement("button");
  saveButton.innerHTML = `<i class="fa-solid fa-play fa-lg"></i>`;
  saveButton.style.fontWeight = "bold";
  saveButton.classList.add("style-edit-savebutton");
  commentPanCo.appendChild(saveButton);

  // Xử lý sự kiện khi nhấn nút "Save"
  function AddEditedTextToCom() {
    const newText = textarea.value;
    commentPanCo.replaceChild(createCommentDiv(newText), textarea);
    commentPanCo.removeChild(saveButton);
  }

  saveButton.addEventListener("click", () => {
    AddEditedTextToCom();
  });

  // Thay đổi sự kiện keydown trên textarea
  textarea.addEventListener("keydown", (event) => {
    if (event.keyCode === 13 && !event.shiftKey && !event.altKey) {
      // Ngăn chặn hành vi mặc định của nút Enter (chuyển dòng) khi không có Shift hoặc Alt
      event.preventDefault();
      AddEditedTextToCom();
    }
  });
};

// Xử lý sự kiện khi nhấn nút "Delete"
const DeleteUserComments = document.querySelectorAll(".User1");
const ModalConfirmDelete = document.getElementById("modal-Del-Edit");
const ConfirmNo = document.getElementById("ConfirmNo");
const ConfirmYes = document.getElementById("ConfirmYes");
const ConfirmDelOval = document.getElementById("ConfirmDelOval");

ConfirmNo.addEventListener("click", () => {
  ModalConfirmDelete.style.display = "none";
});
ConfirmDelOval.addEventListener("click", () => {
  ModalConfirmDelete.style.display = "none";
});
ConfirmYes.addEventListener("click", () => {
  const commentId = document.getElementById("NeedDeleteCommentId").value;
  if (commentId) {
    document.getElementById(commentId).remove();
    ModalConfirmDelete.style.display = "none";
  }
});

const openConfirmModal = (commentId) => {
  if (ModalConfirmDelete.style.display === "flex") {
    return;
  }

  // hide all edit & delete holder
  hideOpenedEditDelHolder(commentId);

  // hide current edit & del holder
  document.getElementById(commentId).querySelector(".User1-Edit").click();

  // open modal
  ModalConfirmDelete.style.display = "flex";

  document.getElementById("NeedDeleteCommentId").value = commentId;
};

// Tạo phần tử div cho bình luận
function createCommentDiv(text) {
  const div = document.createElement("div");
  div.classList.add("User1-Comment");
  div.textContent = text;
  return div;
}

//TẠO MODAL POST BÀI VIẾT CÁ NHÂN

const StatusButton = document.getElementById("status-input-id");
const ModalStatusButton = document.getElementById("StatusPanelWrapper");
const CloseStatusPanel = document.getElementById("CloseStatusPanel");
const Post_Status_Text = document.getElementById("Post_Status_Text");
const postButton = document.getElementById("CreatePostConfirm");
const imageUpload = document.getElementById("imageUpload");
const imagePreviewModal = document.getElementById("image-preview-modal");

StatusButton.addEventListener("click", () => {
  ModalStatusButton.style.display = "flex";
  document.addEventListener("keydown", function (event) {
    // Kiểm tra xem nút "esc" đã được nhấn (mã phím 27)
    if (event.keyCode === 27) {
      // Thoát khỏi vòng lặp hoặc thực hiện hành động thoát khỏi màn hình modal
      // Ví dụ: Đóng modal
      ModalStatusButton.style.display = "none"; // Hãy đảm bảo bạn có hàm closeModal() tương ứng
    }
  });
  CloseStatusPanel.addEventListener("click", () => {
    ModalStatusButton.style.display = "none";
    imageUpload;
  });
});

// Đóng modal khi nhấn chuột ra ngoài modal
document.addEventListener("click", function (event) {
  if (event.target === ModalStatusButton) {
    ModalStatusButton.style.display = "none";
  }
});

Post_Status_Text.addEventListener("input", () => {
  // Kiểm tra nội dung của textarea
  if (Post_Status_Text.value.trim() !== "") {
    // Nếu có nội dung, thay đổi màu và enable nút "post"
    postButton.style.backgroundColor = "#1b74e4";
    postButton.disabled = false;
    postButton.style.color = "white";
    postButton.style.cursor = "pointer";
  } else {
    // Nếu không có nội dung, thiết lập màu về mặc định và disable nút "post"
    postButton.style.backgroundColor = ""; // Đặt lại màu về mặc định hoặc có thể thiết lập lại màu khác
    postButton.disabled = true;
    postButton.style.color = "";
    postButton.style.cursor = "none";
  }
});

imageUpload.addEventListener("change", function () {
  imagePreviewModal.innerHTML = ""; // Xóa các ảnh trước đó
  while (imagePreviewModal.firstChild) {
    imagePreviewModal.removeChild(imagePreviewModal.firstChild);
  }
  const images = imageUpload.files; // Lấy danh sách các ảnh đã chọn
  // console.log(images);
  if (images.length > 0) {
    postButton.style.backgroundColor = "#1b74e4";
    postButton.disabled = false;
    postButton.style.color = "white";
    postButton.style.cursor = "pointer";
  }
  //Lấy danh sách ảnh
  for (let i = 0; i < images.length; i++) {
    const imageNode = document.createElement("img");
    const reader = new FileReader();

    // console.log(reader);
    reader.onload = function () {
      imageNode.src = reader.result;
    };
    reader.readAsDataURL(images[i]);
    imagePreviewModal.appendChild(imageNode);
  }
});

postButton.addEventListener("click", function () {
  const text = Post_Status_Text.value;
  const images = imageUpload.files; // Get the selected images

  console.log(images);

  if (text || images.length > 0) {
    // Create a new post item
    const PostItem = document.createElement("div");
    PostItem.classList.add("ConMyPosts-1");

    const mediaContainerId = `mediaContainer-${Date.now()}`;
    const now = new Date();
    // Create the HTML structure for the post
    let postHTML = `<div class="ConMyPosts-1-Header">
    <div class="ConMyPosts-1-Header-Left">
      <img src="../images/dong.km/avatar.jpg" alt="">
      <div class="ConMyPosts-1-Header-Left-Name">
        <div class="ConMyPosts-1-Header-Left-Name-Up">
          <span class="bold-text">
            Luka Modrić
            <img
              src="https://t3.ftcdn.net/jpg/05/43/29/02/360_F_543290296_snhXYYelZwXmXoo1sUoVMD54GXTPguWH.jpg"
              alt="" class="BlueTick"></span>
        </div>
        <div class="ConMyPosts-1-Header-Left-Name-Date">
        ${now.toLocaleDateString()} lúc ${now.toLocaleTimeString()}
        </div>
      </div>
    </div>
    <div class="ConMyPosts-1-Header-Right">
      <div>···</div>
    </div>
  </div>
  <div class="ConMyPosts-1-Content">
    <div class="ConMyPosts-1-Content-Para">
      ${text}
    </div>
    <div class="ConMyPosts-1-Content-Media" id="${mediaContainerId}">
    </div>
  </div>
  <div class="ConMyPosts-1-Com">
    <div class="ConMyPosts-1-Com-Rea">
      <div class="ConMyPosts-1-Com-React">
        <img
          src="data:image/png;base64,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"
          alt="">
        <img src="https://www.freeiconspng.com/thumbs/facebook-love-png/facebook-love-png-3.png" alt="">
        <p style="margin-left: 8px;"></p>
      </div>
      <div class="ConMyPosts-1-Com-Sum">
        <div class="ConMyPosts-1-Com-SumCom">
          <p></p>
          <i class="fa-solid fa-comment fa-xl"></i>
        </div>
        <div class="ConMyPosts-1-Com-SumSha">
          <p></p>
          <i class="fa-solid fa-share fa-xl"></i>
        </div>
      </div>
    </div>
    <hr class="customBio-hr" />
    <div class="ConMyPosts-1-Com-Like">
      <button class="ConMyPosts-1-Com-But">
        <i class="fa-regular fa-thumbs-up fa-lg"></i>Thích</button>
      <button class="ConMyPosts-1-Com-But">
        <i class="fa-regular fa-comment-dots fa-lg"></i>Bình luận</button>
      <button class="ConMyPosts-1-Com-But">
        <i class="fa-regular fa-share-from-square fa-lg"></i>Chia sẻ</button>
    </div>
    <hr class="customBio-hr" />
    <div class="ConMyPosts-1-Com-Comment">
      <div class="comment-avatar">
        <img src="../images/dong.km/avatar.jpg" alt="Avatar">
      </div>
      <div class="comment-wrapper" id="expandable-comment-box">
        <textarea id="comment-box" placeholder="Viết bình luận..."></textarea>
        <div id="comment-icon">
          <i class="fa-regular fa-note-sticky fa-lg"></i>
          <i class="fa-regular fa-face-smile fa-lg"></i>
          <i class="fa-solid fa-camera fa-lg"></i>
          <i class="fa-regular fa-images fa-lg"></i>
          <i class="fa-solid fa-user-ninja fa-lg"></i>
        </div>
        <button id="comment-button" class="hidden">
          <i class="fa-solid fa-play fa-xl"></i>
        </button>
      </div>
    </div>
    <div class="Box-Comment">
    </div>
  </div>
  <div class="Post1-SeeAll">
    <button class="SeeMore">Xem thêm bình luận</button>
  </div>`;

    // Set the HTML content of the post item
    PostItem.innerHTML = postHTML;

    // Append the post item to the container
    const PostStatusBox = document.querySelector(".ConMyPost");

    if (PostStatusBox.firstChild) {
      PostStatusBox.insertBefore(PostItem, PostStatusBox.firstChild);
    } else {
      PostStatusBox.appendChild(PostItem);
    }

    // Add images to the post if available
    if (images.length > 0) {
      const mediaContainer = PostItem.querySelector(
        ".ConMyPosts-1-Content-Media"
      );

      for (let i = 0; i < images.length; i++) {
        const imageNode = document.createElement("img");
        const reader = new FileReader();

        reader.onload = function () {
          imageNode.src = reader.result;
        };

        reader.readAsDataURL(images[i]);
        mediaContainer.appendChild(imageNode);
      }

      if (images.length > 4) {
        // Lấy tất cả các phần tử <img> trong .ConMyPosts-1-Content-Media
        const imgElements = document.querySelectorAll(
          ".ConMyPosts-1-Content-Media img"
        );

        // Lặp qua tất cả các phần tử <img> và cập nhật thuộc tính width
        imgElements.forEach(function (img) {
          img.style.width = "30%"; // Thay đổi giá trị "50%" thành giá trị bạn muốn
        });
      }
    }

    Post_Status_Text.value = "";
    while (imagePreviewModal.firstChild) {
      imagePreviewModal.removeChild(imagePreviewModal.firstChild);
    }
    ModalStatusButton.style.display = "none";

    // Sau khi tạo bài post, lưu nó vào LocalStorage
    savePostToLocalStorage(text, images);
  }
});

//

// LƯU BÀI POST VÀO LOCAL STORAGE

// Hàm để lưu bài post vào LocalStorage
function savePostToLocalStorage(text, images) {
  // Kiểm tra xem có dữ liệu đã lưu trong LocalStorage hay chưa
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  // Chuyển đổi ảnh thành định dạng Base64 trước khi lưu
  const imageBase64Array = [];
  for (let i = 0; i < images.length; i++) {
    const reader = new FileReader();
    reader.onload = function () {
      imageBase64Array.push(reader.result);
      if (imageBase64Array.length === images.length) {
        // Sau khi chuyển đổi xong tất cả các ảnh, lưu bài post vào LocalStorage
        const post = {
          text: text,
          images: imageBase64Array,
          // Thêm các thông tin khác của bài post vào đây
        };
        posts.push(post);
        localStorage.setItem("posts", JSON.stringify(posts));
      }
    };
    reader.readAsDataURL(images[i]);
  }
}

// Hàm để hiển thị các bài post đã lưu trong LocalStorage
function displaySavedPosts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  // Lặp qua mảng các bài post và hiển thị chúng trên trang web
  posts.forEach((post) => {
    // Tạo các phần tử HTML tương tự như bạn đã làm trong sự kiện click postButton
    // Để hiển thị cả văn bản và ảnh, bạn có thể sử dụng post.text cho văn bản và post.images cho các ảnh
    // Sau đó thêm các phần tử này vào trang web để hiển thị bài post
    const PostItem = document.createElement("div");
    PostItem.classList.add("ConMyPosts-1");

    const mediaContainerId = `mediaContainer-${Date.now()}`;
    const now = new Date();
    // Create the HTML structure for the post
    let postHTML = `<div class="ConMyPosts-1-Header">
    <div class="ConMyPosts-1-Header-Left">
      <img src="../images/dong.km/avatar.jpg" alt="">
      <div class="ConMyPosts-1-Header-Left-Name">
        <div class="ConMyPosts-1-Header-Left-Name-Up">
          <span class="bold-text">
            Luka Modrić
            <img
              src="https://t3.ftcdn.net/jpg/05/43/29/02/360_F_543290296_snhXYYelZwXmXoo1sUoVMD54GXTPguWH.jpg"
              alt="" class="BlueTick"></span>
        </div>
        <div class="ConMyPosts-1-Header-Left-Name-Date">
        ${now.toLocaleDateString()} lúc ${now.toLocaleTimeString()}
        </div>
      </div>
    </div>
    <div class="ConMyPosts-1-Header-Right">
      <div>···</div>
    </div>
  </div>
  <div class="ConMyPosts-1-Content">
    <div class="ConMyPosts-1-Content-Para">
      ${post.text}
    </div>
    <div class="ConMyPosts-1-Content-Media" id="${mediaContainerId}">
    ${post.images.map((image) => `<img src="${image}" alt="Image">`).join("")}
    </div>
    </div>
  </div>
  <div class="ConMyPosts-1-Com">
    <div class="ConMyPosts-1-Com-Rea">
      <div class="ConMyPosts-1-Com-React">
        <img
          src="data:image/png;base64,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"
          alt="">
        <img src="https://www.freeiconspng.com/thumbs/facebook-love-png/facebook-love-png-3.png" alt="">
        <p style="margin-left: 8px;"></p>
      </div>
      <div class="ConMyPosts-1-Com-Sum">
        <div class="ConMyPosts-1-Com-SumCom">
          <p></p>
          <i class="fa-solid fa-comment fa-xl"></i>
        </div>
        <div class="ConMyPosts-1-Com-SumSha">
          <p></p>
          <i class="fa-solid fa-share fa-xl"></i>
        </div>
      </div>
    </div>
    <hr class="customBio-hr" />
    <div class="ConMyPosts-1-Com-Like">
      <button class="ConMyPosts-1-Com-But">
        <i class="fa-regular fa-thumbs-up fa-lg"></i>Thích</button>
      <button class="ConMyPosts-1-Com-But">
        <i class="fa-regular fa-comment-dots fa-lg"></i>Bình luận</button>
      <button class="ConMyPosts-1-Com-But">
        <i class="fa-regular fa-share-from-square fa-lg"></i>Chia sẻ</button>
    </div>
    <hr class="customBio-hr" />
    <div class="ConMyPosts-1-Com-Comment">
      <div class="comment-avatar">
        <img src="../images/dong.km/avatar.jpg" alt="Avatar">
      </div>
      <div class="comment-wrapper" id="expandable-comment-box">
        <textarea id="comment-box" placeholder="Viết bình luận..."></textarea>
        <div id="comment-icon">
          <i class="fa-regular fa-note-sticky fa-lg"></i>
          <i class="fa-regular fa-face-smile fa-lg"></i>
          <i class="fa-solid fa-camera fa-lg"></i>
          <i class="fa-regular fa-images fa-lg"></i>
          <i class="fa-solid fa-user-ninja fa-lg"></i>
        </div>
        <button id="comment-button" class="hidden">
          <i class="fa-solid fa-play fa-xl"></i>
        </button>
      </div>
    </div>
    <div class="Box-Comment">
    </div>
  </div>
  <div class="Post1-SeeAll">
    <button class="SeeMore">Xem thêm bình luận</button>
  </div>`;

    // Set the HTML content of the post item
    PostItem.innerHTML = postHTML;

    // Thêm bài post vào trang web
    const PostStatusBox = document.querySelector(".ConMyPost");
    if (PostStatusBox.firstChild) {
      PostStatusBox.insertBefore(PostItem, PostStatusBox.firstChild);
    } else {
      PostStatusBox.appendChild(PostItem);
    }
  });
}

//THAY ĐỔI ẢNH BÌA VÀ AVATAR
//ẢNH BÌA
const inputFileCover = document.getElementById("CoverFile");

const Cover = document.getElementById("ImgCover");
inputFileCover.addEventListener("change", (e) => {
  const file = e.currentTarget.files[0];

  let reader = new FileReader();
  reader.onloadend = function () {
    Cover.setAttribute("src", reader.result);
    localStorage.setItem("Cover", reader.result);
  };
  reader.readAsDataURL(file);
});

//ẢNH AVATAR
const inputFileAvatar = document.getElementById("AvatarFile");

const Avatar = document.getElementById("avatar");
inputFileAvatar.addEventListener("change", (e) => {
  const file = e.currentTarget.files[0];

  let reader = new FileReader();
  reader.onloadend = function () {
    Avatar.setAttribute("src", reader.result);
    localStorage.setItem("Avatar", reader.result);
  };
  reader.readAsDataURL(file);
});

window.onload = () => {
  Avatar.setAttribute("src", localStorage.getItem("Avatar"));
  Cover.setAttribute("src", localStorage.getItem("Cover"));
};

//HIỂN THỊ LẠI POST TỪ LOCAL
displaySavedPosts();
