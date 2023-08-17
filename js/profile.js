// const searchInput = document.getElementById("searchInput");

// searchInput.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     performSearch();
//   }
// });

// function performSearch() {
//   const searchText = searchInput.value;
//   // Thực hiện tìm kiếm hoặc xử lý logic tìm kiếm ở đây
//   console.log("Searching for:", searchText);
// }

// const fixedElement = document.getElementById("bold-text");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 800) {
//     // Điều kiện hiển thị sau khi kéo xuống 100px
//     fixedElement.classList.remove("hidden");
//   } else {
//     fixedElement.classList.add("hidden");
//   }
// });

//HÀM GIÚP THAY ĐỔI ICON CỦA BÌNH LUẬN Ở STATUS

const commentBox = document.getElementById("comment-box");
const commentButton = document.getElementById("comment-button");
const commentIcon = document.getElementById("comment-icon");

console.log(commentIcon);

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
