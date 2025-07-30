const register = () => {
  return `
    <div class="registerForm">
      <form>
        <div><h1>Register</h1></div>
        <div>
          <input type="text" name="name" placeholder="Name" required />
          <span><i class="fa-solid fa-signature"></i></span>
        </div>
        <div>
          <input type="email" name="email" placeholder="Email" required />
          <span><i class="fa-solid fa-envelope"></i></span>
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%&*])[A-Za-z\\d!@#$%&*]{8,}$" required />
          <span><i class="fa-solid fa-key"></i></span>
        </div>
        <div>
          <input type="password" name="re-password" placeholder="Confirm Password" required />
          <span><i class="fa-solid fa-repeat"></i></span>
        </div>
        <div>
          <textarea name="address" placeholder="Address" required></textarea>
          <span><i class="fa-solid fa-location-dot"></i></span>
        </div>
        <div>
          <input type="file" accept="image/*" name="profileImage" required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  `;
};

export let handleRegisterBind = () => {
  const state = {
    setState(name, value) {
      this[name] = value;
    },
  };

  const form = document.querySelector('.registerForm form');
  const inputs = document.querySelectorAll('input');
  const textArea = document.querySelector('textarea');

  function handleChange(e) {
    let { name, value, files } = e.target;

    if (name === "profileImage") {
      value = files[0];
      const reader = new FileReader();
      reader.onload = function () {
        form.style.backgroundImage = `url(${reader.result})`;
      };
      reader.readAsDataURL(value);
    }

    state.setState(name, value);
  }

  function checkPasswordMatch(e) {
    const { name, value } = e.target;
    if (name === "re-password") {
      e.target.style.borderBottom = state.password === value ? "3px solid black" : "3px solid red";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, email, password, address, profileImage } = state;
    if (!name || !email || !password || !address || !profileImage) {
      alert("All fields are mandatory");
      return;
    }

    if (password !== state["re-password"]) {
      alert("Password and confirm password do not match");
      return;
    }

    const payload = { email, password, profileImage, address, name };
    const formData = new FormData();
    for (let key in payload) {
      formData.append(key, payload[key]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Registration successful");
        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong");
    }
  }

  form.addEventListener("submit", handleSubmit);
  inputs.forEach((input) => {
    input.addEventListener("change", handleChange);
    input.addEventListener("input", checkPasswordMatch);
  });
  textArea.addEventListener("change", handleChange);
};

export default register;
