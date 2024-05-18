var homeText = document.getElementById("homeText");
if (homeText) {
     homeText.addEventListener("click", function () {
          var anchor = document.querySelector("[data-scroll-to='headerWrapperContainer']");
          if (anchor) {
               anchor.scrollIntoView({ "block": "start", "behavior": "smooth" })
          }
     });
}


var hOMEText = document.getElementById("hOMEText");
if (hOMEText) {
     hOMEText.addEventListener("click", function () {
          var anchor = document.querySelector("[data-scroll-to='homeContainer']");
          if (anchor) {
               anchor.scrollIntoView({ "block": "start", "behavior": "smooth" })
          }
     });
}


var cOMECEJText = document.getElementById("cOMECEJText");
if (cOMECEJText) {
     cOMECEJText.addEventListener("click", function () {
          var anchor = document.querySelector("[data-scroll-to='loginSignupAdContainer']");
          if (anchor) {
               anchor.scrollIntoView({ "block": "start", "behavior": "smooth" })
          }
     });
}