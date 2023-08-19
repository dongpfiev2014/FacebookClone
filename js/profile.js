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
    commentItem.innerHTML = `<img src="../images/dong.km/Fri_5.jpg" alt="fri_5">
                  <div class="User1-Pan">
                    <div class="User1-PanCo">
                      <div class="User1-Name">
                        <span class="bold-text">Lionel Messi
                          <img
                            src="https://t3.ftcdn.net/jpg/05/43/29/02/360_F_543290296_snhXYYelZwXmXoo1sUoVMD54GXTPguWH.jpg"
                            alt="" class="BlueTick"></span>
                        <button
                          style="color: rgb(0, 102, 255); font-weight: bold; border: none; background-color: #E4E6EB; cursor: pointer;">Theo
                          dõi</button>
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
console.log(EditDelBut);
const EditDelButPan = document.querySelectorAll(".User1-Edit-Del");
console.log(EditDelButPan);

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
