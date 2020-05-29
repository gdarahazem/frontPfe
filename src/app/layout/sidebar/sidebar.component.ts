import { Component, OnInit } from '@angular/core';

declare const $: any;
declare const Waves: any;
declare const jQuery: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  roleState: string = null;
  firstName: string = localStorage.getItem('username');
  lastName: string = localStorage.getItem('username2');
  constructor(
  ) { }

  ngOnInit() {
    this.roleState = localStorage.getItem('role');
    console.log('rolteState', this.roleState);
    this.sidemenuCollapse();
    this.initLeftSidebar();
  }

  initLeftSidebar() {

    var _this = this;
    var $body = $("body");
    var $overlay = $(".overlay");

    //Close sidebar
    $(window).on("click", function (e) {
      var $target = $(e.target);
      if (e.target.nodeName.toLowerCase() === "i") {
        $target = $(e.target).parent();
      }

      if (
        !$target.hasClass("bars") &&
        _this.isOpen() &&
        $target.parents("#leftsidebar").length === 0
      ) {
        if (!$target.hasClass("js-right-sidebar")) $overlay.fadeOut();
        $body.removeClass("overlay-open");
      }
    });

    $.each($(".menu-toggle.toggled"), function (i, val) {
      $(val)
        .next()
        .slideToggle(0);
    });

    //When page load
    // $.each($('.menu .list li.active'), function (i, val) {
    //     var $activeAnchors = $(val).find('a:eq(0)');
    //     $activeAnchors.addClass('toggled');
    //     $activeAnchors.next().show();
    // });

    //Collapse or Expand Menu
    $(".menu-toggle").on("click", function (e) {
      var $this = $(this);
      var $content = $this.next();

      if ($($this.parents("ul")[0]).hasClass("list")) {
        var $not = $(e.target).hasClass("menu-toggle")
          ? e.target
          : $(e.target).parents(".menu-toggle");

        $.each(
          $(".menu-toggle.toggled")
            .not($not)
            .next(),
          function (i, val) {
            if ($(val).is(":visible")) {
              $(val)
                .prev()
                .toggleClass("toggled");
              $(val).slideUp();
            }
          }
        );
      }

      $this.toggleClass("toggled");
      $content.slideToggle(320);
    });

    //Set menu height
    _this.setMenuHeight(true);
    _this.checkStatuForResize(true);
    $(window).resize(function () {
      _this.setMenuHeight(false);
      _this.checkStatuForResize(false);
    });

    //Set Waves
    Waves.attach(".menu .list a", ["waves-block"]);
    Waves.init();

  }
  setMenuHeight(isFirstTime) {
    if (typeof $.fn.slimScroll != "undefined") {
      var height = $(window).height() - $(".navbar").innerHeight();
      var $el = $(".list");

      $el.slimscroll({
        height: height + "px",
        color: 'rgba(0,0,0,0.5)',
        size: '4px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
      });

    }
  }

  isOpen() {
    return $('body').hasClass('overlay-open');
  }
  checkStatuForResize(firstTime) {
    var $body = $('body');
    var $openCloseBar = $('.navbar .navbar-header .bars');
    var width = $body.width();

    if (firstTime) {
      $body.find('.content, .sidebar').addClass('no-animate').delay(1000).queue(function () {
        $(this).removeClass('no-animate').dequeue();
      });
    }

    if (width < 1170) {
      $body.addClass('ls-closed');
      $openCloseBar.fadeIn();
    }
    else {
      $body.removeClass('ls-closed');
      $openCloseBar.fadeOut();
    }
  }
  sidemenuCollapse() {
    $(".sidemenu-collapse").on("click", function () {
      var $body = $("body");
      if ($body.hasClass("side-closed")) {
        $body.removeClass("side-closed");
        $body.removeClass("submenu-closed");
      } else {
        $body.addClass("side-closed");
        $body.addClass("submenu-closed");
      }
    });
    $(".content, .navbar").mouseenter(function () {
      var $body = $("body");
      $body.removeClass("side-closed-hover");
      $body.addClass("submenu-closed");
    });
    $(".sidebar").mouseenter(function () {
      var $body = $("body");
      $body.addClass("side-closed-hover");
      $body.removeClass("submenu-closed");
    });

    if (localStorage.getItem("sidebar_option")) {
      jQuery("body").addClass(localStorage.getItem("sidebar_option"));
    }
    if ($("body").hasClass("side-closed")) {
      $(".sidebar-user-panel").css({ display: "none" });
    } else {
      $(".sidebar-user-panel").css({ display: "block" });
    }
    jQuery(document).on("click", ".sidemenu-collapse", function () {
      var sidebar_option = "";
      if ($("body").hasClass("side-closed")) {
        var sidebar_option = "side-closed submenu-closed";
        $(".sidebar-user-panel").css({ display: "none" });
      } else {
        $(".sidebar-user-panel").css({ display: "block" });
      }
      jQuery("body").addClass(sidebar_option);
      localStorage.setItem("sidebar_option", sidebar_option);
    });

  }

}
