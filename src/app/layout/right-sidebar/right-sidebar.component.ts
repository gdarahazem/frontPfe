import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.sass']
})
export class RightSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.setSkinListHeightAndScroll(true);
    this.skinChanger();
    this.changeSidebarColor();
    this.changeDarkLightTheme();
    this.setSettingListHeightAndScroll(true);
  }
  setSkinListHeightAndScroll(isFirstTime) {
    var height =
      $(window).height() -
      ($(".navbar").innerHeight() + $(".right-sidebar .nav-tabs").outerHeight());
    var $el = $(".right-sidebar .demo-skin");

    if (!isFirstTime) {
      $el.slimScroll({ destroy: true }).height("auto");
      $el
        .parent()
        .find(".slimScrollBar, .slimScrollRail")
        .remove();
    }

    $el.slimscroll({
      height: height + "px",
      color: "rgba(0,0,0,0.5)",
      size: "6px",
      alwaysVisible: false,
      borderRadius: "0",
      railBorderRadius: "0"
    });
  }
  skinChanger() {
    $(".right-sidebar .demo-choose-skin li").on("click", function () {
      var $body = $("body");
      var $this = $(this);

      var existTheme = $(".right-sidebar .demo-choose-skin li.actived").data(
        "theme"
      );
      $(".right-sidebar .demo-choose-skin li").removeClass("actived");
      $body.removeClass("theme-" + existTheme);
      $this.addClass("actived");

      $body.addClass("theme-" + $this.data("theme"));
      var choose_skin = "theme-" + $this.data("theme");
      localStorage.setItem("choose_skin", choose_skin);
      localStorage.setItem("choose_skin_active", $this.data("theme"));
    });
  }

  changeSidebarColor() {
    $(".rightSetting .btn-sidebar-light").on("click", function () {
      $("body").removeClass("menu_dark logo-black");
      $("body").addClass("menu_light logo-white");
      var menu_option = "menu_light";
      localStorage.setItem("choose_logoheader", "logo-white");
      localStorage.setItem("menu_option", menu_option);
    }),
      $(".rightSetting .btn-sidebar-dark").on("click", function () {
        $("body").removeClass("menu_light logo-white");
        $("body").addClass("menu_dark logo-black");
        var menu_option = "menu_dark";
        localStorage.setItem("choose_logoheader", "logo-black");
        localStorage.setItem("menu_option", menu_option);
      });
  }

  changeDarkLightTheme() {
    $(".rightSetting .btn-theme-light").on("click", function () {
      $("body").removeClass("dark submenu-closed menu_dark logo-black");
      $("body").addClass("light submenu-closed menu_light logo-white");
      var theme = "light";
      var menu_option = "menu_light";
      localStorage.setItem("choose_logoheader", "logo-white");
      localStorage.setItem("choose_skin", "theme-black");
      localStorage.setItem("theme", theme);
      localStorage.setItem("menu_option", menu_option);
    }),
      $(".rightSetting .btn-theme-dark").on("click", function () {
        $("body").removeClass("light submenu-closed menu_light logo-white");
        $("body").addClass("dark submenu-closed menu_dark logo-black");

        var theme = "dark";
        var menu_option = "menu_dark";
        localStorage.setItem("choose_logoheader", "logo-black");
        localStorage.setItem("choose_skin", "theme-black");
        localStorage.setItem("theme", theme);
        localStorage.setItem("menu_option", menu_option);
      });

  }

  setSettingListHeightAndScroll(isFirstTime) {
    var height =
      $(window).height() -
      ($(".navbar").innerHeight() + $(".right-sidebar .nav-tabs").outerHeight());
    var $el = $(".right-sidebar .demo-settings");

    if (!isFirstTime) {
      $el.slimScroll({ destroy: true }).height("auto");
      $el
        .parent()
        .find(".slimScrollBar, .slimScrollRail")
        .remove();
    }

    $el.slimscroll({
      height: height + "px",
      color: "rgba(0,0,0,0.5)",
      size: "6px",
      alwaysVisible: false,
      borderRadius: "0",
      railBorderRadius: "0"
    });
  }

}
