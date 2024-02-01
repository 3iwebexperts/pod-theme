// variant code start
function selectVariant() {
  let var_string = "";
  let var_url = $(".product-details").data("url");
  let serializedData = $(".thumb_slider .product-option__single-selector").find(":input").serializeArray();
  $.each(serializedData, function (index, value) {
    if (var_string != "") {
      var_string += " / ";
    }
    var_string += value["value"];
  });
  $("#variantHtml option").each(function () {
    let opt_val = $(this).text().trim();
    var_string = var_string.trim();
    if (opt_val == var_string) {
      $('#variantHtml option[data-title="' + opt_val + '"]').prop("selected",true);
      $("#variantHtml").change();
      var_url += "?variant=" + $('#variantHtml option[data-title="' + opt_val + '"]').val();
      fetch_url(var_url);
    }
  });
}
// variant code end

// product info section render start
function fetch_url(var_url) {
  $('.custom-loader-overlay').addClass('loading');
  fetch(var_url)
    .then((response) => response.text())
    .then((responseText) => {
      let pro_html = new DOMParser().parseFromString(responseText, "text/html");
      let pro_sec_render = document.querySelector(".product-details");
      pro_sec_render.innerHTML = "";
      pro_sec_render.insertAdjacentHTML("beforeend",pro_html.body.querySelector(".product-details").innerHTML);
      product_render_function();
      closeLoader();
    });
}

function product_render_function() {
  // Product page thumbnail slider
  var swiper_1 = new Swiper(".thumb_slider", {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".product_large_img", {
    loop: false,
    spaceBetween: 0,
    zoom: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".product-gallery__arrow_next",
      prevEl: ".product-gallery__arrow_prev",
    },
    pagination: {
      el: ".product-gallery__pagination",
      clickable: true,
    },
    thumbs: {
      swiper: swiper_1,
    },
   
  });

  // Selected slide 
      var activeSlideIndex = localStorage.getItem('activeSlideIndex');
     if (activeSlideIndex !== null) {
        swiper_1.slideTo(parseInt(activeSlideIndex), 1000, true);
       swiper2.slideTo(parseInt(activeSlideIndex), 1000, true);
      }
      swiper_1.on('slideChange', function () {
        var activeIndex = swiper_1.activeIndex;
        localStorage.setItem('activeSlideIndex', activeIndex);
      });

  // color variant change code
  $('.thumb_slider input[type="radio"]').on("change", function (params) {
    console.log($(this).data("v_id"),"asdasd");
    let v_image = $(this).data("v_image");
    $(".sticky-image__background-image img").prop("src", v_image);
    $(".sticky-image__background-image img").prop("srcset", v_image);
     
    selectVariant();
  });
  
}
jQuery(document).ready(function () {
  $(document).on("click", "#swatch_drawer .drawer__body-contents .pro_selector input", function (e) {
      let var_id = $(this).data("variant-id");
      let var_val = $(this).val();
      $("#swatch_drawer .drawer__close").trigger("click");
      $(".product__atc-btn").prop("disabled", false);

      $("#variantHtml option").each(function () {
        let select_id = $(this).val();
        if (select_id == var_id) {
          $('#variantHtml option[value="' + select_id + '"]').prop("selected", true);
          $("#variantHtml").change();
          $(".product-variant-id").val(select_id);
          $(".product-option .product-option__drawer-btn-value").text(var_val);
        }
      });
    }
  );
  // add to cart js start
  if ($(".product .product__atc-btn") !== undefined) {
    $(document).on("click", ".product .product__atc-btn", function (e) {
      var variant_id = $(".product-variant-id").val();
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
        success: function (data) {
          setTimeout(function (e) {
            $("#ajax_cart .ajax-cart-container").toggleClass("is-open");
            $(".ajax-cart-backdrop").toggleClass("is-visible");
            $("body").toggleClass("ajax-cart-open");
            $("#shopify-section-swatch_drawer").remove();
            // $("body").toggleClass("drawer-open");
            closeLoader();
          }, 1000);
          render_cart();
        },
        error: function (error) {
          console.log("select available variant!");
          // alert(error.responseJSON.description);
        },
      });
    });
  }
  // size chart click event
  if ($(".product #custom_sizing_drwer") !== undefined) {
    $(document).on("click", ".product #custom_sizing_drwer", function (e) {
      $(".product .product_sizechart .drawer-backdrop").toggleClass("is-visible");
      $(".product #custom_sizing_drwer .fit-guide__drawer").toggleClass("is-visible");
      $("body.product").toggleClass("drawer-open");
    });
  }
  // features & details drawer click event
  if ($(".product #custom_features_drawer") !== undefined) {
    $(document).on("click", ".product #custom_features_drawer", function (e) {
      $(".product .product_features .drawer-backdrop").toggleClass("is-visible");
      $(".product #custom_features_drawer .features-detail__drawer").toggleClass("is-visible");
      $("body.product").toggleClass("drawer-open");
    });
  }
  // reviews drawer click event
  if ($(".product #custom_reviews_drawer") !== undefined) {
    $(document).on("click", ".product #custom_reviews_drawer", function (e) {
      $(".product .product_reviews .drawer-backdrop").toggleClass("is-visible");
      $(".product .reviews__drawer").toggleClass("is-visible");
      $("body.product").toggleClass("drawer-open");
    });
  }
  if ($(".product .product_reviews .review__close") !== undefined) {
    $(document).on("click", ".product .product_reviews .review__close", function (e) {
      $(".product .product_reviews .drawer-backdrop").toggleClass("is-visible");
      $(".product .reviews__drawer").toggleClass("is-visible");
      $("body.product").toggleClass("drawer-open");
    });
  }
  product_render_function();
});
