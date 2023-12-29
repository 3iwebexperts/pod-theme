document.addEventListener("DOMContentLoaded", function(event) {
  var form = document.getElementById("facet-filters-form");
  form.addEventListener("submit", onSubmitHandler);

  function onSubmitHandler(e, pagination = null) {
    e.preventDefault();
    let formData = new FormData(form);
    let searchParams = new URLSearchParams(formData).toString();
    let sortBy = $('#sort-by-popover input[name="sort_by"]:checked').val();
    if (sortBy) {
      searchParams += "&sort_by=" + sortBy;
    }
    if (pagination != null) {
      let totalPages = parseInt($("[data-all-pages]").val());
      let currentPage = parseInt($("[data-this-page]").val());
      let nextPage = currentPage + 1;
      if (nextPage <= totalPages) {
        searchParams += "&page=" + nextPage;
      }
    }

    let url = `${window.location.pathname}?section_id=collection-product-grid&${searchParams}`;

    $('.custom-loader-overlay').addClass('loading');
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        let html = new DOMParser().parseFromString(responseText, "text/html");
        if (pagination != null) {
          let products = document.querySelector("#product-grid").innerHTML;
          html.querySelector(".findify-template-container #product-grid").insertAdjacentHTML("afterbegin", products);
          document.querySelector(".findify-template-container").innerHTML = html.querySelector(".findify-template-container").innerHTML;
          document.querySelector(".findify-template-container .grid-loader").innerHTML = html.querySelector(".findify-template-container .grid-loader").innerHTML;
          if ((jQuery(".js-load-more")) && (jQuery(".js-load-more").length > 0)) {
            $(window).on("scroll", function(e) {
              if ($(this).scrollTop() > (jQuery(".js-load-more").offset().top - $(window).height() + 200) ) {
                $(window).off("scroll");
                $(".grid-loader [load-more-text]").addClass("hide");
                $(".grid-loader [loader]").removeClass("hide");
                onSubmitHandler(e, true);
              }
            });
          }
        } else {
          document.querySelector(".findify-template-container").innerHTML = html.querySelector(".findify-template-container").innerHTML;
        }
        // $("facet-filters.findify__filters").addClass("is-open");
        $("body").removeClass("drawer__close");
        $(".custom-overlay").removeClass("is-visible");
        sortby_filter_inn_item();
        initEventListners();
        swatch_slider();
        closeLoader();
      });
  }

  function initEventListners() {
    form = document.getElementById("facet-filters-form");
    form.addEventListener("submit", onSubmitHandler);
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener("change", onSubmitHandler);
    });
    let sortOptions = document.querySelectorAll(
      '#sort-by-popover input[name="sort_by"]'
    );
    sortOptions.forEach(function(sortOption) {
      sortOption.addEventListener("change", onSubmitHandler);
    });
  }
  initEventListners();
  sortby_filter_inn_item();
  if ((jQuery(".js-load-more")) && (jQuery(".js-load-more").length > 0)) {
    $(window).on("scroll", function(e) {
      if ($(this).scrollTop() > (jQuery(".js-load-more").offset().top - $(window).height() + 200) ) {
        $(window).off("scroll");
        $(".grid-loader [load-more-text]").addClass("hide");
        $(".grid-loader [loader]").removeClass("hide");
        onSubmitHandler(e, true);
      }
    });
  }
});

function sortby_filter_inn_item() {
  // sort by code
  $(document).on("click", ".sort_by_main", function() {
    $(this).find("#sort-by-popover").toggleClass("active");
  });

  $(document).on("click", ".product-facet__filter-item", function() {
    console.log("hello");
    $("collapsible-content.active").removeClass("active");
    $("button.collapsible-toggle.active").removeClass("active");
    $(this).find("collapsible-content").addClass("active");
    $(this).find(".collapsible-toggle").addClass("active");
  });

  // collection filter add and remove js
  $(document).on("click", "#custom_filter", function() {
    $("facet-filters.findify__filters").addClass("is-open");
    $("body").addClass("drawer__close");
    $(".custom-overlay").addClass("is-visible");
  });

  $(document).on("click", "#facet-filters .drawer__close, #shopify-section-swatch_drawer .drawer__close", function() {
    console.log("hey drawer close");
    $("facet-filters.findify__filters.is-open").removeClass("is-open");
    $("body.drawer__close").removeClass("drawer__close");
    $(".custom-overlay.is-visible").removeClass("is-visible");

    $("#shopify-section-swatch_drawer .drawer-backdrop.is-visible").removeClass(
      "is-visible"
    );
    $("#shopify-section-swatch_drawer .product-option__drawer.is-visible").removeClass("is-visible");
    $("body.drawer__close").removeClass("drawer__close");
  });

  $(document).on("click", "#facet-filters #apply_filter", function() {
    console.log("hey apply");
    $("facet-filters.findify__filters.is-open").removeClass("is-open");
    $("body.drawer__close").removeClass("drawer__close");
    $(".custom-overlay.is-visible").removeClass("is-visible");
  });

  // filter remove code
  // $(".product-facet__active-list .facet-remove").click(function () {
  //   let remove_label = $(this).data("label");
  //   // $(".drawer__close").trigger("click");
  //   // drawer__close
  //   console.log(remove_label, "remove click");
  //   $("#facet-filters .checkbox-container .checkbox-input input:checked").each(
  //     function () {
  //       if (remove_label == $(this).val()) {
  //         $($(this)).trigger("click");
  //       }
  //     }
  //   );
  // });

  document.querySelectorAll(".product-facet__active-list .facet-remove-all, facet-remove").forEach(function(element) {element.addEventListener("click", function() {
      document.querySelectorAll("#facet-filters .checkbox-container .checkbox-input input:checked").forEach(function(input) {
        console.log(input, "this ");
        // input.checked = false;
        input.click();
      });
    });
  });

  // $(".product-facet__active-list .facet-remove-all, facet-remove").click(
  //   function () {
  //     $(
  //       "#facet-filters .checkbox-container .checkbox-input input:checked"
  //     ).each(function () {
  //       console.log($(this), "this ");
  //       // $(this).prop("checked", false);
  //       $($(this)).trigger("click");
  //     });
  //   }
  // );
}