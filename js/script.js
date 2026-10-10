const curtainScreen = document.getElementById("curtainScreen");
const openInvitation = document.getElementById("openInvitation");
const pageNames = document.getElementById("pageNames");

openInvitation.addEventListener("click", () => {
  // IMPORTANT: hide the monogram immediately when opening begins.
  openInvitation.classList.add("is-hiding");
  openInvitation.setAttribute("aria-hidden", "true");
  openInvitation.disabled = true;
  curtainScreen.classList.add("is-opening");

  setTimeout(() => {
    pageNames.classList.add("is-visible");
    pageNames.setAttribute("aria-hidden", "false");
  }, 1050);

  setTimeout(() => {
    curtainScreen.style.opacity = "0";
  }, 3200);

  setTimeout(() => {
    curtainScreen.remove();
  }, 4050);
});

/* ---------------------------------------------------------
   Language switching
   English is the default. Marathi is applied to all
   current text sections without reloading the page.
   --------------------------------------------------------- */

const copy = {
  en: {
    eyebrow: "YOU ARE CORDIALLY INVITED TO<br>CELEBRATE THE WEDDING OF",
    date: "28 DECEMBER 2026",
    intro: "WE WOULD LIKE TO INVITE YOU TO<br>CELEBRATE WITH US ON THE MOST<br>SPECIAL DAY OF OUR LIVES.",
    scroll: "SCROLL",
    welcomeTitle: "We are so happy to celebrate this day with you.",
    welcomeCopy: "Having you with us means the world. We can't wait to welcome you.",
    locationKicker: "THE CELEBRATION",
    locationTitle: "Wedding Location",
    locationName: "Shivtirth Mangal Karyalaya Va Lawns Tirthpuri",
    locationCity: "Tirthpuri, Maharashtra",
    directions: "GET DIRECTIONS",
    thankKicker: "WITH LOVE & GRATITUDE",
    thankTitle: "Thank You",
    thankCopy: "For joining us on this special day.<br>Your presence is the best gift we could receive."
  },
  mr: {
    eyebrow: "आपणास आमच्या विवाह सोहळ्यास<br>मनःपूर्वक आमंत्रण",
    date: "२८ डिसेंबर २०२६",
    intro: "आमच्या आयुष्यातील या खास दिवशी<br>आपण आमच्यासोबत यावे,<br>हीच मनापासून इच्छा.",
    scroll: "पुढे",
    welcomeTitle: "तुमच्यासोबत हा आनंदाचा दिवस<br>साजरा करताना आम्हाला खूप आनंद होईल.",
    welcomeCopy: "आपली उपस्थिती आमच्यासाठी खूप खास आहे.<br>आपले स्वागत करण्यासाठी आम्ही उत्सुक आहोत.",
    locationKicker: "सोहळ्याचे ठिकाण",
    locationTitle: "विवाह स्थळ",
    locationName: "शिवतीर्थ मंगल कार्यालय वा लॉन तीर्थपुरी",
    locationCity: "तीर्थपुरी, महाराष्ट्र",
    directions: "मार्ग पहा",
    thankKicker: "मनःपूर्वक आभार",
    thankTitle: "धन्यवाद",
    thankCopy: "या खास दिवशी आमच्यासोबत सहभागी झाल्याबद्दल धन्यवाद.<br>आपली उपस्थिती आमच्यासाठी सर्वात सुंदर भेट आहे."
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang === "mr" ? "mr" : "en";

  document.querySelectorAll(".language").forEach(button => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  Object.entries(copy[lang]).forEach(([key, value]) => {
    document.querySelectorAll(`[data-i18n="${key}"]`).forEach(element => {
      element.innerHTML = value;
    });
  });
}

document.querySelectorAll(".language").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage("en");

/* Handle directions button click to open Google Maps */
const directionsBtn = document.getElementById("directionsBtn");
if (directionsBtn) {
  directionsBtn.addEventListener("click", () => {
    const mapsUrl = "https://www.google.com/maps/search/CWP9%2BM5X+Gondiya+Ghungarde+Hadgaon+Rd+Tirthpuri+Maharashtra+431209";
    window.open(mapsUrl, "_blank");
  });
}

/* Smoothly reveal later pages as the user scrolls. */
const pageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.setAttribute("aria-hidden", "false");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".page").forEach(page => pageObserver.observe(page));
