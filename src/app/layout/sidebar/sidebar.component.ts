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
  verifyAdmin() {
    if (this.roleState === 'admin') {
      return false;
    }
    return true;
  }
  verifyEq() {
    if (this.roleState === 'Équipe qualité') {
      return false;
    }
    return true;
  }
  verifyEqEs() {
    if (this.roleState === 'Équipe qualité' || this.roleState === 'Équipe software') {
      return false;
    }
    return true;
  }
  verifyEs() {
    if (this.roleState === 'Équipe software') {
      return false;
    }
    return true;
  }
  initLeftSidebar() {

    let _this = this;
    let $body = $('body');
    let $overlay = $('.overlay');

    // Close sidebar
    $(window).on('click', function(e) {
      let $target = $(e.target);
      if (e.target.nodeName.toLowerCase() === 'i') {
        $target = $(e.target).parent();
      }

      if (
        !$target.hasClass('bars') &&
        _this.isOpen() &&
        $target.parents('#leftsidebar').length === 0
      ) {
        if (!$target.hasClass('js-right-sidebar')) { $overlay.fadeOut(); }
        $body.removeClass('overlay-open');
      }
    });

    $.each($('.menu-toggle.toggled'), function(i, val) {
      $(val)
        .next()
        .slideToggle(0);
    });

    // When page load
    // $.each($('.menu .list li.active'), function (i, val) {
    //     var $activeAnchors = $(val).find('a:eq(0)');
    //     $activeAnchors.addClass('toggled');
    //     $activeAnchors.next().show();
    // });

    // Collapse or Expand Menu
    $('.menu-toggle').on('click', function(e) {
      let $this = $(this);
      let $content = $this.next();

      if ($($this.parents('ul')[0]).hasClass('list')) {
        let $not = $(e.target).hasClass('menu-toggle')
          ? e.target
          : $(e.target).parents('.menu-toggle');

        $.each(
          $('.menu-toggle.toggled')
            .not($not)
            .next(),
          function(i, val) {
            if ($(val).is(':visible')) {
              $(val)
                .prev()
                .toggleClass('toggled');
              $(val).slideUp();
            }
          }
        );
      }

      $this.toggleClass('toggled');
      $content.slideToggle(320);
    });

    // Set menu height
    _this.setMenuHeight(true);
    _this.checkStatuForResize(true);
    $(window).resize(function() {
      _this.setMenuHeight(false);
      _this.checkStatuForResize(false);
    });

    // Set Waves
    Waves.attach('.menu .list a', ['waves-block']);
    Waves.init();

  }
  setMenuHeight(isFirstTime) {
    if (typeof $.fn.slimScroll != 'undefined') {
      let height = $(window).height() - $('.navbar').innerHeight();
      let $el = $('.list');

      $el.slimscroll({
        height: height + 'px',
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
    let $body = $('body');
    let $openCloseBar = $('.navbar .navbar-header .bars');
    let width = $body.width();

    if (firstTime) {
      $body.find('.content, .sidebar').addClass('no-animate').delay(1000).queue(function() {
        $(this).removeClass('no-animate').dequeue();
      });
    }

    if (width < 1170) {
      $body.addClass('ls-closed');
      $openCloseBar.fadeIn();
    } else {
      $body.removeClass('ls-closed');
      $openCloseBar.fadeOut();
    }
  }
  sidemenuCollapse() {
    $('.sidemenu-collapse').on('click', function() {
      let $body = $('body');
      if ($body.hasClass('side-closed')) {
        $body.removeClass('side-closed');
        $body.removeClass('submenu-closed');
      } else {
        $body.addClass('side-closed');
        $body.addClass('submenu-closed');
      }
    });
    $('.content, .navbar').mouseenter(function() {
      let $body = $('body');
      $body.removeClass('side-closed-hover');
      $body.addClass('submenu-closed');
    });
    $('.sidebar').mouseenter(function() {
      let $body = $('body');
      $body.addClass('side-closed-hover');
      $body.removeClass('submenu-closed');
    });

    if (localStorage.getItem('sidebar_option')) {
      jQuery('body').addClass(localStorage.getItem('sidebar_option'));
    }
    if ($('body').hasClass('side-closed')) {
      $('.sidebar-user-panel').css({ display: 'none' });
    } else {
      $('.sidebar-user-panel').css({ display: 'block' });
    }
    jQuery(document).on('click', '.sidemenu-collapse', function() {
      let sidebar_option = '';
      if ($('body').hasClass('side-closed')) {
        let sidebar_option = 'side-closed submenu-closed';
        $('.sidebar-user-panel').css({ display: 'none' });
      } else {
        $('.sidebar-user-panel').css({ display: 'block' });
      }
      jQuery('body').addClass(sidebar_option);
      localStorage.setItem('sidebar_option', sidebar_option);
    });

  }


}
