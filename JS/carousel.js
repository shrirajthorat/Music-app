// owl carousel starts


$('.owl-carousel').owlCarousel({
  loop:true,
  margin:0,
  nav:false,
  dots:false,
  autoplay:true,
  autoplayTimeout:1500,  // time
  autoplayHoverPause:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
     },
      1000:{
          items:5
      }
  }
})

