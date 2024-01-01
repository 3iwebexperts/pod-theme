function closeLoader(){
  setTimeout(function() { $('.custom-loader-overlay.loading').removeClass('loading'); },200)
}
function not_rendered_functions() {
  // hamburger_menu click event start
  $(document).on("click", "#hamburger_menu", function(e) {
    e.preventDefault();
    $(this).toggleClass("is-open");
    $("#main_navigation .navigation").toggleClass("is-visible");
    $("body").toggleClass("drawer-open");
  });
  $(document).on("click", ".navigation-backdrop", function(e) {
    $("#hamburger_menu").toggleClass("is-open");
    $("#main_navigation .navigation").toggleClass("is-visible");
    $("body").toggleClass("drawer-open");
  });
  // hamburger_menu click event end
  // megamenu tabs start
  $(document).on("click", ".tabs-list a", function(e) {
    e.preventDefault();
    var tabid = $(this).attr("href");
    $(".tabs-list a").removeClass("navigation-categories__button--active");
    $(".navigation-blocks .tab_inner").removeClass("navigation-categories__button--active");
    $(".tab_inner").hide();
    $(tabid).show();
    $(this).addClass("navigation-categories__button--active");
  });
  // megamenu tabs end
  // on scroll sticky start
  $(window).scroll(function() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 100) {
      $(".scroll_section").each(function(i) {
        if ($(this).position().top <= windscroll - 0) {
          $(".sticky_col_list a.active_tabs").removeClass("active_tabs");
          $(".sticky_col_list a").eq(i).addClass("active_tabs");
        }
      });
    } else {
      $(".sticky_col_list a.active_tabs").removeClass("active_tabs");
      $(".sticky_col_list a:first").addClass("active_tabs");
    }
  }).scroll();
  // on scroll sticky end
  // cart icon and cart drawer event start
  if ( $(".header-nav__menu-item .cart_icon") !== undefined || $(".ajax-cart__close") !== undefined || $("#shopify-section-ajax-cart .ajax-cart-backdrop") !== undefined) {
    $(document).on("click", ".header-nav__menu-item .cart_icon, .ajax-cart__close, #shopify-section-ajax-cart .ajax-cart-backdrop",function(k) {
        k.preventDefault();
        $("#ajax_cart .ajax-cart-container").toggleClass("is-open");
        $(".ajax-cart-backdrop").toggleClass("is-visible");
        $("body").toggleClass("ajax-cart-open");
      }
    );
  }
  // cart icon and cart drawer event end
  if ( $("#swatch_drawer .drawer__body-contents .product-option__single-selector input") !== undefined ) {
    $(document).on("click", "#swatch_drawer .drawer__body-contents .product-option__single-selector input, .pro_add_cart:not(.has_size)", function(e) {
        var variant_id = $(this).data("variant-id");
        data = {
          id: variant_id,
          quantity: 1,
        };
        jQuery.ajax({
          type: "POST",
          url: "/cart/add.js",
          data: data,
          dataType: "json",
          beforeSend: function() {
            $('.custom-loader-overlay').addClass('loading');
          },
          success: function(data) {
            setTimeout(function(e) {
              $("#ajax_cart .ajax-cart-container").toggleClass("is-open");
              $(".ajax-cart-backdrop").toggleClass("is-visible");
              $("body").toggleClass("ajax-cart-open");
              $("#shopify-section-swatch_drawer").remove();
              $("body").toggleClass("drawer-open");
              closeLoader();
            }, 1000);
            render_cart();
          },
          error: function(error) {
            console.log("select available variant!");
          },
        });
      }
    );
  }
  if ($(".quantity-adjuster__increment") !== undefined) {
    $(document).on("click", ".quantity-adjuster__increment", function(e) {
      e.preventDefault();
      var input = $(this).siblings(".quantity-adjuster__input");
      var currentValue = parseInt(input.val());
      input.val(currentValue + 1);
      form_submit();
    });
  }
  if ($(".quantity-adjuster__decrement") !== undefined) {
    $(document).on("click", ".quantity-adjuster__decrement", function(e) {
      e.preventDefault();
      var input = $(this).siblings(".quantity-adjuster__input");
      var currentValue = parseInt(input.val());
      if (currentValue > 1) {
        input.val(currentValue - 1);
      }
      form_submit();
    });
  }
  if ($(".ajax-cart__item-remove") !== undefined) {
    $(document).on("click", ".ajax-cart__item-remove", function(k) {
      k.preventDefault(); // Prevent the default behavior of the link
      var removeLink = $(this).attr("data-line-id"); // Get the href attribute of the clicked link
      // Send an AJAX request to remove the item
      $.ajax({
        url: removeLink,
        method: "GET",
        beforeSend: function() {
          $('.custom-loader-overlay').addClass('loading');
        },
        success: function(data) {
          render_cart();
          closeLoader();
        },
        error: function(xhr, status, error) {
          // Handle errors if any
          console.error("Error removing item:", status, error);
        },
      });
      // return false;
    });
  }
  if (
    $("#swatch_drawer .drawer-backdrop") !== undefined ||
    $("#swatch_drawer .drawer__close") !== undefined
  ) {
    $(document).on(
      "click", "#swatch_drawer .drawer__close, #swatch_drawer .drawer-backdrop",
      function(e) {
        $("#swatch_drawer .product-option__drawer").toggleClass("is-visible");
        $("#swatch_drawer .drawer-backdrop").toggleClass("is-visible");
        $("body").toggleClass("drawer-open");
      }
    );
  }
}
function common_functions() {
  if ($(".featured-categories") !== undefined) {
    // Swiper: Slider
    new Swiper(".featured-categories", {
      loop: false,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      slidesPerView: 9.5,
      grabCurso: true,
    });
  }
  if ($(".navigation-categories") !== undefined) {
    new Swiper(".navigation-categories", {
      loop: false,
      cssMode: true,
      freeMode: false,
      loop: false,
    });
  }
  new Swiper(".navigation-carousel__slider", {
    direction: "horizontal",
    loop: false,
    breakpoints: {
      320: {
        slidesPerView: 1.3,
      },
      992: {
        slidesPerView: 1.8,
      },
    },
  });
  new Swiper(".cust_swip", {
    slidesPerView: 1,
    autoHeight: true,
    
    pagination: {
      el: ".cust_pagination",
      clickable: true,
    },
  });

  new Swiper(".feature_card_slider", {
    // slidesPerView: 4,
    loop: false,
    // cssMode: true,
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: ".feature_next",
      prevEl: ".feature_prev",
    },
    pagination: {
      el: ".feature_paginate",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      530: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  });
  new Swiper(".coming_soon", {
    // slidesPerView: 4,
    loop: false,
    // cssMode: true,
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: ".coming_soon_prev",
      prevEl: ".coming_soon_next",
    },
    pagination: {
      el: ".coming_soon_paginate",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      530: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  });
  new Swiper(".shop-the-look__looks-container", {
    // slidesPerView: 4,
    loop: false,
    // cssMode: true,
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: ".shop-the-look__arrow--next",
      prevEl: ".shop-the-look__arrow--prev",
    },
    pagination: {
      el: ".look_pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      530: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  });
  $(".coming_col").click(function(e) {
    e.preventDefault();
    $(".main_coming_soon .notify_add").toggleClass("is-visible");
    $(".main_coming_soon .notify_over").toggleClass("is-visible");
    $("body").toggleClass("drawer-open");
    var d_img = $(this).find("img").attr("src");
    var d_title = $(this)
      .parent(".link-card")
      .find(".link-card__outer-text span")
      .text();
    // console.log(d_img);
    $(".notify_add").find(".drawer__body-contents img").attr("src", d_img);
    $(".notify_add").find(".drawer__body-contents img").attr("srcset", d_img);
    $(".notify_add")
      .find(".mkt-subscription__body-info .highlighted")
      .text(d_title);
  });
  $(".notify_close, .notify_over").click(function(e) {
    e.preventDefault();
    $(".main_coming_soon .notify_add").toggleClass("is-visible");
    $(".main_coming_soon .notify_over").toggleClass("is-visible");
    $("body").toggleClass("drawer-open");
  });
  let player = document.getElementById("player"),
    play = document.getElementById("ply_icn");
  if (player) {
    player.addEventListener("click", function() {
      let sndicn = document.getElementById("snd_icn");
      if (player.paused) {
        player.play();
        var element1 = document.getElementById("ply_icn");
        element1.classList.add("hidden");
        sndicn.classList.remove("hidden");
      } else {
        player.pause();
        var element1 = document.getElementById("ply_icn");
        element1.classList.remove("hidden");
        sndicn.classList.add("hidden");
      }
    });
    play.addEventListener("click", function() {
      let sndicn = document.getElementById("snd_icn");
      if (player.paused) {
        player.play();
        var element1 = document.getElementById("ply_icn");
        element1.classList.add("hidden");
        sndicn.classList.remove("hidden");
      } else {
        player.pause();
        var element1 = document.getElementById("ply_icn");
        element1.classList.remove("hidden");
        sndicn.classList.add("hidden");
      }
    });
  }
  var mmute = document.getElementById("mute");
  var uunmute = document.getElementById("unmute");
  $("#snd_icn").click(function() {
    if ($("#player").prop("muted")) {
      $("#player").prop("muted", false);
      mmute.classList.remove("hidden");
      uunmute.classList.add("hidden");
    } else {
      $("#player").prop("muted", true);
      mmute.classList.add("hidden");
      uunmute.classList.remove("hidden");
    }
  });
  $(".faq_box .accordion__toggle").click(function() {
    $(this)
      .closest(".accordion.group")
      .find(".accordion__content")
      .slideToggle();
    $(this).toggleClass("active");
  });
  $(".accordion").click(function() {
    $(this)
      .closest(" .accordion__toggle")
      .find(".accordion__body")
      .slideToggle();
    $(this).toggleClass(" is-open");
  });
}
$(document).ready(function() {
  $(".shop-the-look__slider .shop-the-look__slide").click(function() {
    $("#look_drawer .look-drawer").toggleClass("is-visible");
    $("#look_drawer .drawer-backdrop").toggleClass("is-visible");
    $("body").toggleClass("drawer-open");
    // shop look section render

    var col_url = $(this).data("collection");
    let look_url = col_url + "?section_id=collection-product-grid";
    $('.custom-loader-overlay').addClass('loading');
    fetch(look_url)
      .then((response) => response.text())
      .then((responseText) => {
        let look_html = new DOMParser().parseFromString(responseText, "text/html");
        // console.log(look_html,"look_html");
        let look_pro_render = look_html.querySelector("#render_look").innerHTML;
        document.querySelector("#look_drawer .look-drawer__body .slider-container .swiper-wrapper").innerHTML = "";
        document.querySelector("#look_drawer .look-drawer__body .slider-container .swiper-wrapper").innerHTML = look_pro_render;
        // look drawer slider code
        var contentSlider = new Swiper(".look_drawer_slider", {
          autoHeight: true,
          slidesPerView: 1,
        });
        closeLoader();
      });
  });
  $("#look_drawer .drawer__close, #look_drawer .drawer-backdrop").click(function() {
    $("#look_drawer .look-drawer").toggleClass("is-visible");
    $("#look_drawer .drawer-backdrop").toggleClass("is-visible");
    $("body").toggleClass("drawer-open");
  });
});

function form_submit() {
  const crtform = document.querySelector(".ajax-cart-form");
  // Get the form data
  var formData = $(crtform).serialize();
  // Send an Ajax request
  $.ajax({
    type: "POST",
    url: $(crtform).attr("action"),
    data: formData,
    beforeSend: function() {
      $('.custom-loader-overlay').addClass('loading');
    },
    success: function(data) {
      $(".header-cart__badge-count").text(data.item_count);
      $(".total_price").text(data.total_price);
      render_cart();
      closeLoader();
    },
  });
  return false;
}

function render_cart() {
  let cart_url = window.location.pathname + "?section_id=ajax-cart";
  $('.custom-loader-overlay').addClass('loading');
  fetch(cart_url)
    .then((response) => response.text())
    .then((responseText) => {
      let cart_html = new DOMParser().parseFromString(
        responseText, "text/html"
      );
      let ajax_cart_render = document.querySelector(".ajax-cart-container");
      ajax_cart_render.innerHTML = "";
      ajax_cart_render.insertAdjacentHTML(
        "beforeend", cart_html.body.querySelector(".ajax-cart-container").innerHTML
      );
      closeLoader();
    });
}

function Vardetails(i) {
  var available = jQuery(i).data("available");
  if (available == false) {
    jQuery(i).parents(".product-card").find(".product-card__add-to-cart-container .item_btn.pro_add_cart").removeClass("pro_add_cart");
    jQuery(i).parents(".product-card").find(".product-card__add-to-cart-container .item_btn").addClass("sold_out");
    jQuery(i).parents(".product-card").find(".product-card__add-to-cart-container .item_btn").prop("disabled", true);
    jQuery(i).parents(".product-card").find(".product-card__add-to-cart-container .item_btn span").text("SOLD OUT");
  } else {
    jQuery(i).parents(".product-card").find(".product-card__add-to-cart-container .item_btn.sold_out").removeClass("sold_out");
    jQuery(i).parents(".product-card").find(".product-card__add-to-cart-container .item_btn").addClass("pro_add_cart");
    jQuery(i).parents(".product-card").find(".product-card__add-to-cart-container .item_btn").prop("disabled", false);
    jQuery(i).parents(".product-card").find(".product-card__add-to-cart-container .item_btn span").text("ADD TO BAG");
  }
}

function swatch_slider(){
  if ($(".product-option__swatch") !== undefined) {
    new Swiper(".product-option__swatch", {
      loop: false,
      slidesPerView: 5,
      spaceBetween: 10,
      scrollbar: {
        el: ".product-option__scrollbar",
        hide: true,
      },
    });
  }  
}

function product_functions() {
  swatch_slider();
  if ($(".product-option__swatch label input") !== undefined) {
    $(document).on("click",".product-option__swatch label input", function() {
      var color_name = $(this).data("option-value");
      var var_url = $(this).data("var_url");
      var var_img = $(this).data("var_img");
      $(this).parents(".product-card__content").find(".product-card__color-title").text(color_name);
      $(this).parents(".product-card").find("a").attr("href", var_url);
      $(this).parents(".product-card").find(".product-card__gallery-slide img").attr("src", var_img);
    });
  }
  if ($(".pro_add_cart.has_size") !== undefined) {
    $(document).on("click", ".pro_add_cart.has_size", function(e) {
      e.preventDefault();
      $(this).parents(".product-card").find(".pro_add_cart").addClass("loading");
      $("#shopify-section-swatch_drawer").remove();
      var pro_url = $(this).parents(".product-card").find("a").attr("href");
      let sec_url = pro_url + "&sections=swatch_drawer";
      $('.custom-loader-overlay').addClass('loading');
      fetch(sec_url)
        .then((response) => response.text())
        .then((responseText) => {
          let res = jQuery.parseJSON(responseText);
          let sec_html = new DOMParser().parseFromString(
            res["swatch_drawer"], "text/html"
          );
          let sizeHTML = sec_html.querySelector('#shopify-section-swatch_drawer').innerHTML.trim();
          let renderProductsElement = document.querySelector("body");
          renderProductsElement.insertAdjacentHTML("beforeend", sec_html.body.innerHTML);
          $("#swatch_drawer .product-option__drawer").toggleClass("is-visible");
          $("#swatch_drawer .drawer-backdrop").toggleClass("is-visible");
          $("body").toggleClass("drawer-open");
          $(".product-card").find(".pro_add_cart").removeClass("loading");
          closeLoader();
        });
    });
  }
  $(document).on("click", ".readmore", function(event) {
    event.preventDefault();
    var descriptionFull = document.querySelector(".product-description-full");
    descriptionFull.style.display = "block";
    var descriptionShort = document.querySelector(".product-description-short");
    descriptionShort.style.display = "none";
  });
  $(document).on("click", ".readless", function(event) {
    event.preventDefault();
    var descriptionFull = document.querySelector(".product-description-full");
    descriptionFull.style.display = "none";
    var descriptionShort = document.querySelector(".product-description-short");
    descriptionShort.style.display = "block";
  });
  $(document).on(
    "click", ".product-option .product-option__drawer-btn",
    function() {
      $("#swatch_drawer .product-option__drawer").toggleClass("is-visible");
      $("#swatch_drawer .drawer-backdrop").toggleClass("is-visible");
      $("body").toggleClass("drawer-open");
    }
  );
  $(document).on("click", ".drawer .drawer__header .drawer__close", function() {
      console.log("I'm Close Button ");
      $("#swatch_drawer .product-option__drawer").removeClass("is-visible");
      $("#swatch_drawer .drawer-backdrop").removeClass("is-visible");
      $("body").removeClass("drawer-open");
      $(".custom-overlay").removeClass("is-visible");
    }
  );
}
$(document).ready(function() {
  not_rendered_functions();
  product_functions();
  common_functions();
});