import { Component, OnInit } from '@angular/core';

const document: any = window.document;
declare const $: any;
declare const jQuery: any;
declare const mozFullScreenElement: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.setStartupStyles();
    this.callFullScreen();
    this.setNavbar();
    this.setRightSidebar();

    $(".navbar-right .dropdown-menu .body .menu").slimscroll({
      height: "254px",
      color: "rgba(0,0,0,0.5)",
      size: "4px",
      alwaysVisible: false,
      borderRadius: "0",
      railBorderRadius: "0"
    });

    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 50) {
        $(".navbar").addClass("active");
      } else {
        $(".navbar").removeClass("active");
      }
    });
  }

  setStartupStyles() {
    //set theme on startup
    if (localStorage.getItem("theme")) {
      $("body").removeClass("dark light");
      jQuery("body").addClass(localStorage.getItem("theme"));
    } else {
      jQuery("body").addClass("light");
    }

    // set dark sidebar menu on startup
    if (localStorage.getItem("menu_option")) {
      jQuery("body").addClass(localStorage.getItem("menu_option"));
    }
    else {
      jQuery("body").addClass("menu_light");
    }

    // set header color on startup
    if (localStorage.getItem("choose_skin")) {
      jQuery("body").addClass(localStorage.getItem("choose_skin"));
    } else {
      jQuery("body").addClass("theme-black");
    }
    if (localStorage.getItem("choose_skin_active")) {
      $(".right-sidebar .demo-choose-skin li").each(function (index) {
        jQuery(this).removeClass("actived");
        if (
          jQuery(this).attr("data-theme") ==
          localStorage.getItem("choose_skin_active")
        ) {
          jQuery(this).addClass("actived");
        }
      });
    }
    // set logo color on startup
    if (localStorage.getItem("choose_logoheader")) {
      jQuery("body").addClass(localStorage.getItem("choose_logoheader"));
    } else {
      jQuery("body").addClass("logo-white");
    }
    if (localStorage.getItem("choose_logoheader_active")) {
      $(".right-sidebar .demo-choose-logoheader li").each(function (index) {
        jQuery(this).removeClass("actived");
        if (
          jQuery(this).attr("data-theme") ==
          localStorage.getItem("choose_logoheader_active")
        ) {
          jQuery(this).addClass("actived");
        }
      });
    }
  }

  callFullScreen() {
    $(document).on("click", ".fullscreen-btn", function (e) {
      if (
        !document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });
  }

  setNavbar() {
    var $body = $("body");
    var $overlay = $(".overlay");

    //Open left sidebar panel
    $(".bars").on("click", function () {
      $body.toggleClass("overlay-open");
      if ($body.hasClass("overlay-open")) {
        $overlay.fadeIn();
      } else {
        $overlay.fadeOut();
      }
    });

    //Close collapse bar on click event
    $('.nav [data-close="true"]').on("click", function () {
      var isVisible = $(".navbar-toggle").is(":visible");
      var $navbarCollapse = $(".navbar-collapse");

      if (isVisible) {
        $navbarCollapse.slideUp(function () {
          $navbarCollapse.removeClass("in").removeAttr("style");
        });
      }
    });
  }

  setRightSidebar() {
    var _this = this;
    var $sidebar = $("#rightsidebar");
    var $overlay = $(".overlay");

    //Close sidebar
    $(window).on("click", function (e) {
      var $target = $(e.target);
      if (e.target.nodeName.toLowerCase() === "i") {
        $target = $(e.target).parent();
      }

      if (
        !$target.hasClass("js-right-sidebar") &&
        _this.isOpen() &&
        $target.parents("#rightsidebar").length === 0
      ) {
        if (!$target.hasClass("bars")) $overlay.fadeOut();
        $sidebar.removeClass("open");
      }
    });
    $(".js-right-sidebar").on("click", function () {
      $sidebar.toggleClass("open");
      if (_this.isOpen()) {
        $overlay.fadeIn();
      } else {
        $overlay.fadeOut();
      }
    });
  }

  isOpen() {
    return $(".right-sidebar").hasClass("open");
  }

}
