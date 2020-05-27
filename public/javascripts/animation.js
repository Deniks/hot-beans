const navigation = document.getElementById("navigation");
const burger = document.getElementById("burger");
const header = document.getElementById("header");
const mediaQuery = window.matchMedia("(max-width: 1010px)");
let prevScrollpos = window.pageYOffset;

const slideRight = {
  origin: "left",
  delay: 200,
  distance: "120px",
  easing: "ease-in-out",
  scrollBar: true,
};

const slideLeft = {
  origin: "right",
  delay: 200,
  distance: "120px",
  easing: "ease-in-out",
  scrollBar: true,
};

const slideUp = {
  distance: "150%",
  delay: 300,
  origin: "bottom",
  opacity: 0,
  scrollBar: true,
};

ScrollReveal().reveal("p", slideUp);
ScrollReveal().reveal(".title", slideUp);

ScrollReveal().reveal(".feature-icon", slideRight);

window.onscroll = (ev) => {
  // Header Animation
  // Color Change
  if (
    document.body.scrollTop >= 100 ||
    document.documentElement.scrollTop >= 100
  ) {
    header.classList.add("navigation-scroll");
  } else {
    header.classList.remove("navigation-scroll");
  }

  // Appearnce Change
  if (
    document.body.scrollTop >= 700 ||
    document.documentElement.scrollTop >= 700
  ) {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      header.style.top = "0";
    } else {
      header.style.top = "-74px";
    }
    prevScrollpos = currentScrollPos;
  }
};

// Mobile Menu

burger.addEventListener("click", () => {
  if (
    (window.location.pathname === "/" &&
      document.documentElement.scrollTop < 100) ||
    (window.location.pathname !== "/" && document.body.scrollTop < 100)
  ) {
    header.classList.toggle("navigation-scroll");
  }
  if (navigation.classList.contains("active-nav")) {
    document.querySelector("html").style.overflowY = "scroll";
  } else {
    document.querySelector("html").style.overflowY = "hidden";
  }
  navigation.classList.toggle("active-nav");
  burger.classList.toggle("open");
});
