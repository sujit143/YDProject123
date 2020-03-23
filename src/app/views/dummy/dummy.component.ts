import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
// import * as owlCarousel from '../../../assets/js/owl.carousel.js';
// declare var owlCarousel: owlCarousel;
@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  constructor() {
    jQuery(document).ready(function ($) {
      (<any>$('#owl-experts')).owlCarousel({
        center: false,
        items: 2,
        loop: false,
        margin: 10,
        autoPlay: false,
        pagination: false,
        navigation: false,
        responsive: {
          0: {
            items: 2,
            nav: false,
            center: true,
            loop: true,
            dots: false
          },
          600: {
            items: 3,
            nav: false
          },
          768: {
            items: 4,
            nav: false
          },
          1000: {
            items: 5,
            nav: false,
            loop: false
          },
          1900: {
            items: 5,
            nav: false,
            loop: false
          }
        }
      });
      var owlExperts = $("#owl-experts");

    });
  }

  ngOnInit() {
  }


  scrollDivFunc(){
    
        // Cache selectors
        var lastId,
            topMenu = $("#menu1, #owl-experts"),
            topMenuHeight = topMenu.outerHeight() + 1,
            // All list items
            menuItems = topMenu.find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function () {
                var item = $($(this).attr("href"));
                if (item.length) { return item; }
            });

        // Bind click handler to menu items
        // so we can get a fancy scroll animation
        menuItems.click(function (e) {
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 850);
            e.preventDefault();
        });

        // Bind to scroll
        $(window).scroll(function () {
            // Get container scroll position
            var fromTop = $(this).scrollTop() + topMenuHeight;

            // Get id of current scroll item
            var cur = scrollItems.map(function () {
                if ($(this).offset().top < fromTop)
                    return this;
            });
            // Get the id of the current element
            var cursor = cur[cur.length - 1];
            var id = cursor && cursor.length ? cursor[0].id : "";

            if (lastId !== id) {
                lastId = id;
                // Set/remove active class
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href=#" + id + "]").parent().addClass("active");
            }
        });
  }

}
