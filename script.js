// Hero Slider Functionality
// const carousels = ["/assets/Slider 1.png", "/assets/Slider 2.png", "/assets/Slider 3.png", "/assets/Slider 5.png"];

// The carousel was declared as an array
// console.log(carousels);

// let heroSlides = document.querySelectorAll(".hero-slide");
// console.log(heroSlides);
// const heroDots = document.querySelectorAll(".hero-dot");
// console.log(heroDots);
// let currentHeroSlideIndex = 0;
// let heroInterval;

//the heroslides was initialized to select all heroslides element, as well as the herodots is intialized to select all herodot element in the dom
//the current hero slide index is zero, and the hero interval was declared.


// Set background images for slides
// heroSlides.forEach((slideElement, index) => {
//   if (carousels[index]) {
//     slideElement.style.background = `url(${carousels[index]})`;
//   } else {
//     console.log("Image not set");
//   }
// });
//heroslides is looped here with foreach having two parameters one signifies each element while the seconds signifies their index
// if carousel index is selected, then select the element parameter with style of background of corresponding images as background. else image not set  


// const carousel = ["../assets/Slider 1.png", "../assets/Slider 2.png", "../assets/Slider 3.png", "../assets/Slider 5.png"];
// console.log(carousel)
// const carouselEl = document.querySelectorAll(".hero-slide");
// console.log(carouselEl);

// carouselEl.forEach((slideElement, index) => {
//   if (carousel[index]) {
//     let image = document.createElement("img");
//     console.log(image);
//     image.src = `url(${carousel[index]})`;
//     image.style.width = "100%";
//     image.style.height = "100%";
//    let conatin = slideElement;
//    console.log(conatin);
//    //let original = conatin.replace('img');
//   } 
// });
// var $myName;
// console.log($myName);
//prompt, using this code above is there away to change a particular element to another element in the dom, like for example replacing the slideelement to image element.


// //Show Hero Slider
// function showHeroSlide(index) {
//   // Reset animations for content
//   heroSlides.forEach((slide, i) => {
//     slide.classList.remove("active");
//     const content = slide.querySelector(".hero-content");
//     if (content) {
//       content.style.animation = "none";
//     }
//   });

//   heroDots.forEach((dot) => dot.classList.remove("active"));

//   // Show active slide with animation
//   heroSlides[index].classList.add("active");
//   heroDots[index].classList.add("active");

//   // Trigger content animation
//   const activeContent = heroSlides[index].querySelector(".hero-content");
//   if (activeContent) {
//     setTimeout(() => {
//       activeContent.style.animation = "";
//     }, 50);
//   }
// }

// function nextHeroSlide() {
//   currentHeroSlideIndex = (currentHeroSlideIndex + 1) % heroSlides.length;
//   showHeroSlide(currentHeroSlideIndex);
// }

// function previousHeroSlide() {
//   currentHeroSlideIndex =
//     (currentHeroSlideIndex - 1 + heroSlides.length) % heroSlides.length;
//   showHeroSlide(currentHeroSlideIndex);
// }

// function currentHeroSlide(slideNumber) {
//   currentHeroSlideIndex = slideNumber - 1;
//   showHeroSlide(currentHeroSlideIndex);
//   resetHeroInterval();
// }

// function nextSlide() {
//   nextHeroSlide();
//   resetHeroInterval();
// }

// function previousSlide() {
//   previousHeroSlide();
//   resetHeroInterval();
// }

// function resetHeroInterval() {
//   clearInterval(heroInterval);
//   heroInterval = setInterval(nextHeroSlide, 6000);
// }

// // Initialize the slider
// function initHeroSlider() {
//   showHeroSlide(currentHeroSlideIndex);
//   resetHeroInterval();

//   // Add click events to dots
//   heroDots.forEach((dot, index) => {
//     dot.addEventListener("click", () => {
//       currentHeroSlide(index + 1);
//     });
//   });

//   // Pause on hover
//   const heroSection = document.querySelector(".hero");
//   heroSection.addEventListener("mouseenter", () => {
//     clearInterval(heroInterval);
//   });

//   heroSection.addEventListener("mouseleave", () => {
//     resetHeroInterval();
//   });
// }

// // Start the slider when page loads
// document.addEventListener("DOMContentLoaded", initHeroSlider);


//get form field
const formField = document.getElementById('newsletterForm');
console.log(formField);

//listen to field submitted
formField.addEventListener("submit", (e)=>{
  e.preventDefault();

// get the field value of the form
  const firstName = formField.firstName.value;
  const lastName = formField.firstName.value;
  const email = formField.email.value;

// check if the field is gotten correctly
  console.log(firstName, lastName, email);

// Show subscribing state immediately after submitting and disabled the submit button
const submitBtn = formField.querySelector('button[type="submit"]');
const originalText = submitBtn.textContent;
console.log(originalText);
submitBtn.textContent = 'Subcribing....';
submitBtn.disabled = true;

// Simulate processing time (liek sending to server)
// Step 1 - Set a toast message like immediately after submitting the form
setTimeout(()=> {
    // create the success message element
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        background: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 5px;
        margin-top: 10px;
        text-align: center;
      `;
      //set success message to be sent to user as feedback!
    successMsg.textContent = `Thanks for subscribing ${firstName}! You'll be notified soon at ${email}`;

    // Add success message after form
    formField.parentNode.insertBefore(successMsg, formField.nextSibling);

    //Clear form and reset  button back to normal position
    formField.reset();
    submitBtn.textContent = originalText;
    submitBtn.disbaled = false;

    // Remove success message after 5 seconds 
    setTimeout(()=>{
      successMsg.remove();
    }, 5000);

}, 1000); // 1 second delay to show loading


});