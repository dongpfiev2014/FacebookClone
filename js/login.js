const btnLogin = document.getElementById("btnLogin");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const body = document.getElementById("body");
const btnRegister = document.getElementById("register");
console.log(btnRegister);

const listLogin = [
  {
    email: "test@gmail.com",
    password: "1234",
  },
  {
    email: "test1@gmail.com",
    password: "1234",
  },
  {
    email: "test2@gmail.com",
    password: "1234",
  },
];

btnLogin.addEventListener("click", () => {
  let count = 0;
  for (let i = 0; i < listLogin.length; i++) {
    if (
      emailInput.value == listLogin[i].email &&
      passwordInput.value == listLogin[i].password
    ) {
      count++;
      break;
    }
  }
  if (count > 0) {
    window.location.href = "../html/homepage.html";
  } else {
    alert("login fail");
  }
});

btnRegister.addEventListener("click", () => {
  const divRegister = document.createElement("div");
  divRegister.innerHTML = `
    <div class="register" id="registerModal">
        <div class="register-modal">
            <div class="register-modal-header">
                <h2>Đăng kí</h2>
                <p>Nhanh chóng và dễ dàng</p>
            </div>
            <div class="register-modal-main">
                <div class="register-name">
                    <input type="text" placeholder="Họ">
                    <input type="text" placeholder="Tên">
                </div>
                <div class="register-email">
                    <input type="text" placeholder="Email" id="emailModalInput">
                </div>
                <div class="register-password">
                    <input type="password" placeholder="Mật khẩu mới" id="passwordModalInput">
                </div>
                <div class="register-birthday">
                    <p>Ngày sinh</p>
                    <div class="register-birthday-choose">
                        <input type="date">
                    </div>
                    
                </div>
                <div class="register-sex">
                    <p>Giới tính</p>
                    <div class="register-sex-choose">
                        <div class="register-sex-choose-item">
                            <p>Nữ</p>
                            <input type="radio">
                        </div>
                        <div class="register-sex-choose-item">
                            <p>Nam</p>
                            <input type="radio">
                        </div>
                        <div class="register-sex-choose-item">
                            <p>Tùy chọn</p>
                            <input type="radio">
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="register-modal-footer">
                <p>Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Facebook. Tìm hiểu thêm.</p>
                <p>Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.</p>
                <div class="register-button">
                    <button id="btnRegisterModal">Đăng ký</button>
                </div>
                
            </div>
        </div>
    </div>
    `;
  body.appendChild(divRegister);
  const btnRegisterModal = document.getElementById("btnRegisterModal");
  const registerModal = document.getElementById("registerModal");
  registerModal.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
      body.removeChild(divRegister);
    }
  });
  console.log(btnRegisterModal);
  btnRegisterModal.addEventListener("click", () => {
    const emailModalInput = document.getElementById("emailModalInput");
    const passwordModalInput = document.getElementById("passwordModalInput");
    body.removeChild(divRegister);
    console.log(emailModalInput.value);
    console.log(passwordModalInput.value);
    listLogin.push({
      email: emailModalInput.value,
      password: passwordModalInput.value,
    });
    console.log(listLogin);
  });
});
