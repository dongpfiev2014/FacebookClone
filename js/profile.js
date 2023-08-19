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
  commentText = commentBox.value;

  if (commentText.trim() !== "") {
    const commentUser = document.querySelector(".Box-Comment");
    const commentItem = document.createElement("div");
    commentItem.classList.add("User1");
    // Thay thế các dấu xuống dòng bằng thẻ <br>
    const commentHtml = commentText.replace(/\n/g, "<br>");
    commentItem.innerHTML = `<img src="/Team3-ClassC4EJS141/images/dong.km/Fri_5.jpg" alt="">
                  <div class="User1-Pan">
                    <div class="User1-PanCo">
                      <div class="User1-Name">
                        <span class="bold-text">Lionel Messi
                          <img
                            src="https://t3.ftcdn.net/jpg/05/43/29/02/360_F_543290296_snhXYYelZwXmXoo1sUoVMD54GXTPguWH.jpg"
                            alt="" class="BlueTick"></span>
                        <button
                          style="color: rgb(0, 102, 255); font-weight: bold; border: none; background-color: none; cursor: pointer;">Theo
                          dõi</button>
                      </div>
                      <div class="User1-Comment">${commentText}</div>
                      <button class="User1-Edit" id="EditDelBut">···</button>
                      <div class="User1-Edit-Del">
                        <button class="User1-Edit-Del-CS">Chỉnh sửa</button>
                        <button class="User1-Edit-Del-X">Xóa</button>
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

/* <div class="User1-SumReact">
          <img
            src="data:image/png;base64,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"
            alt="">
          <img src="https://www.freeiconspng.com/thumbs/facebook-love-png/facebook-love-png-3.png" alt="">
          <p style="margin-left: 5px;">69</p>
        </div>

<div class="User1-Reply">
        <i class="fa-solid fa-arrow-right-to-bracket fa-lg"></i>
        <p>Xem tất cả 3 phản hồi</p>
      </div> */

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

CheckEditDel();

// Đoạn mã để hiển thị hoặc ẩn bảng chỉnh sửa hoặc xóa

// function DisplayEditDel(editDelButPan) {
//   editDelButPan.style.opacity = "1";
//   editDelButPan.style.transform = "scale(1)";
// }

// function HiddenEditDel(editDelButPan) {
//   editDelButPan.style.opacity = "0";
//   editDelButPan.style.transform = "scale(0)";
// }

// // Hàm xử lý sự kiện click nút chỉnh sửa
// function handleEditClick(event) {
//   const editDelButPan = event.target.nextElementSibling;
//   if (y) {
//     DisplayEditDel(editDelButPan);
//   } else {
//     HiddenEditDel(editDelButPan);
//   }
//   y = !y;
// }

// let y = true;

// // Thêm sự kiện click cho các nút chỉnh sửa ban đầu
// const EditDelBut = document.querySelectorAll(".User1-Edit");
// EditDelBut.forEach((button) => {
//   button.addEventListener("click", handleEditClick);
// });

// // Thêm sự kiện MutationObserver để theo dõi thay đổi trong DOM
// const observer = new MutationObserver((mutationsList) => {
//   for (const mutation of mutationsList) {
//     if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
//       // Nếu có thay đổi trong DOM và có các node mới được thêm vào
//       // Thêm sự kiện click cho các nút chỉnh sửa trên các comment mới
//       const newEditDelBut =
//         mutation.addedNodes[0].querySelectorAll(".User1-Edit");
//       newEditDelBut.forEach((button) => {
//         button.addEventListener("click", handleEditClick);
//       });
//     }
//   }
// });

// // Bắt đầu theo dõi một phần của DOM mà bạn muốn
// const targetNode = document.body; // Thay đổi để phù hợp với DOM thực tế của bạn
// const config = { childList: true, subtree: true };
// observer.observe(targetNode, config);

//EDIT BÌNH LUẬN KHI NHẤN NÚT CHỈNH SỬA

const EditCommentButton = document.querySelectorAll(".User1-Edit-Del-CS");
const DeleteCommentButton = document.querySelectorAll(".User1-Edit-Del-X");
const comments = document.querySelectorAll(".User1-PanCo");

// Xử lý sự kiện khi nhấn nút "Edit"
EditCommentButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    HiddenEditDel();
    const commentText =
      comments[index].querySelector(".User1-Comment").textContent;

    // Tạo element textarea và gán nội dung
    const textarea = document.createElement("textarea");
    textarea.value = commentText;
    textarea.classList.add("style-edit-textarea");

    // Thay thế phần tử .comment-text bằng textarea
    const commentContainer = comments[index];
    commentContainer.replaceChild(
      textarea,
      commentContainer.querySelector(".User1-Comment")
    );

    // Tạo nút "Save" để lưu chỉnh sửa
    const saveButton = document.createElement("button");
    saveButton.innerHTML = `<i class="fa-solid fa-play fa-lg"></i>`;
    saveButton.style.fontWeight = "bold";
    saveButton.classList.add("style-edit-savebutton");
    commentContainer.appendChild(saveButton);

    // Xử lý sự kiện khi nhấn nút "Save"
    saveButton.addEventListener("click", () => {
      const newText = textarea.value;
      commentContainer.replaceChild(createCommentDiv(newText), textarea);
      commentContainer.removeChild(saveButton);
    });
  });
});

// Xử lý sự kiện khi nhấn nút "Delete"
const DeleteUserComments = document.querySelectorAll(".User1");
const BtnConfirmDelete = document.getElementById("ConfirmYes");
const ModalConfirmDelete = document.getElementById("modal-Del-Edit");
const ConfirmNo = document.getElementById("ConfirmNo");
const ConfirmYes = document.getElementById("ConfirmYes");
const ConfirmDelOval = document.getElementById("ConfirmDelOval");

DeleteCommentButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    ModalConfirmDelete.style.display = "flex";

    ConfirmNo.addEventListener("click", () => {
      ModalConfirmDelete.style.display = "none";
    });
    ConfirmDelOval.addEventListener("click", () => {
      ModalConfirmDelete.style.display = "none";
    });
    DeleteUserComments.forEach((button, index) => {
      ConfirmYes.addEventListener("click", () => {
        DeleteUserComments[index].remove();
        ModalConfirmDelete.style.display = "none";
      });
    });
  });
});

// Tạo phần tử div cho bình luận
function createCommentDiv(text) {
  const div = document.createElement("div");
  div.classList.add("User1-Comment");
  div.textContent = text;
  return div;
}
