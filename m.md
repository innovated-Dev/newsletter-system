step by step 
1. initialised carousel array of 4 images 
2. select 4 divs in the dom
3. loop all the element in doms
4. loop all the carousel images
5. set each element style backround to corresponding

<!-- step 1 -->
const carousel = ["/assets/Slider 1.png", "/assets/Slider 2.png", "/assets/Slider 3.png", "/assets/Slider 5.png"];
<!-- step 2 -->
const carouselEl = document.querySelectorAll("div");
<!-- step 3 & 4-->
for(let index = 0; index < carouselEl.length; index++){
    let each = carouselEl[index];
    for(let index = 0; index < carousel.length; index++){
        <!-- step 5 -->
        each.style.backgroundImage = carousel[index];
    }
}
