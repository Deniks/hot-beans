const form = document.querySelector("#contacts-form");
const telInput = document.querySelector("#phone");
const applyButton = document.querySelectorAll(".apply-button a");
const jobInput = document.createElement("INPUT");

const fileInputs = document.querySelectorAll(".file-input");

const toast = new ToastBuilder();

const uploadFileLoaders = () => {
  const fileUploader = document.querySelector(".file-uploader");
  fileUploader.style.display = "inline-flex";
  fileInputs.forEach((item) => {
    item.required = true;
    item.addEventListener("change", (e) => {
      let fileName = e.target.value.split("\\").pop();
      if (fileName.length > 10) fileName = fileName.substring(0, 10) + "...";
      if (fileName) {
        toast(`<i class="fas fa-thumbs-up"></i> Uploaded File - ${fileName}`);
      }
    });
  });
};

function application(title) {
  if (form.children[0] === jobInput) {
    jobInput.value = title;
  } else {
    jobInput.type = "text";
    jobInput.id = "job";
    jobInput.name = "job-title";
    jobInput.value = title;
    jobInput.readOnly = true;
  }

  form.prepend(jobInput);
}

Array.from(applyButton).forEach((element) => {
  element.addEventListener("click", (event) => {
    const jobTitle =
      event.currentTarget.parentElement.parentElement.children[0].children[0]
        .innerText;
    application(jobTitle);
    uploadFileLoaders();
  });
});

function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach((event) => {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

setInputFilter(telInput, (value) => /^\d*\.?\d*$/.test(value));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ToastBuilder() {
  return async (text) => {
    let defaultText = "default text";
    let displayTime = 3000;
    const { body } = document;
    const div = document.createElement("DIV");
    div.classList.add("toast");

    body.insertBefore(div, body.firstChild);
    const toast = document.getElementsByClassName("toast")[0];
    toast.innerHTML = text || defaultText;

    // Fade In
    toast.style.opacity = 1;
    let topOffset = 15;
    const height = (div.offsetHeight / document.body.offsetHeight) * 100;
    const offset = 15;
    topOffset += height + offset;

    toast.style.top = `${topOffset}%`;

    await sleep(displayTime);

    // Fade Out
    const width = div.offsetWidth + 20;
    toast.style.right = `-${width}px`;
    toast.style.opacity = 0;

    await sleep(600);

    div.remove();
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let fName = document.getElementById("fName").value;
  let lName = document.getElementById("lName").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  if (document.getElementById("job")) {
    let job = document.getElementById("job").value;

    fetch("/contacts/send-application", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        job,
        fName,
        lName,
        phone,
        email,
        message,
      }),
    })
      .then((res) => {
        const { status } = res;
        console.log(res);

        if (status === 422 || status === 500) {
          toast(
            `<i class="fas fa-exclamation-circle"></i> Check your input fields`
          );
        }
        if (status === 200) {
          toast(`<i class="fas fa-thumbs-up"></i> Application has been sent!`);
          form.reset();
        }
      })
      .catch((res) => {
        console.log(res);
      });
  } else {
    fetch("/contacts/send-message", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ fName, lName, phone, email, message }),
    })
      .then((res) => {
        const { status } = res;
        console.log(res);

        if (status === 422 || status === 500) {
          toast(
            `<i class="fas fa-exclamation-circle"></i> Check your input fields`
          );
        }
        if (status === 200) {
          toast(
            `<i class="fas fa-thumbs-up"></i> Successfully sent a message!`
          );
          form.reset();
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
});
