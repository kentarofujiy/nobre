var Shuffle = window.Shuffle;

class Demo {
  constructor(element) {
    this.element = element;
    this.shuffle = new Shuffle(element, {
      itemSelector: '.picture-item',
      sizer: element.querySelector('.my-sizer-element') });


    // Log events.
    this.addShuffleEventListeners();
    this._activeFilters = [];
    this.addFilterButtons();
    this.addSorting();
    this.addSearchFilter();
  }

  /**
     * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
     * for them like you normally would (with jQuery for example).
     */
  addShuffleEventListeners() {
    this.shuffle.on(Shuffle.EventType.LAYOUT, data => {
      console.log('layout. data:', data);
    });
    this.shuffle.on(Shuffle.EventType.REMOVED, data => {
      console.log('removed. data:', data);
    });
  }

  addFilterButtons() {
    const options = document.querySelector('.filter-options');
    if (!options) {
      return;
    }

    const filterButtons = Array.from(options.children);
    const onClick = this._handleFilterClick.bind(this);
    filterButtons.forEach(button => {
      button.addEventListener('click', onClick, false);
    });
  }

  _handleFilterClick(evt) {
    const btn = evt.currentTarget;
    const isActive = btn.classList.contains('active');
    const btnGroup = btn.getAttribute('data-group');

    this._removeActiveClassFromChildren(btn.parentNode);

    let filterGroup;
    if (isActive) {
      btn.classList.remove('active');
      filterGroup = Shuffle.ALL_ITEMS;
    } else {
      btn.classList.add('active');
      filterGroup = btnGroup;
    }

    this.shuffle.filter(filterGroup);
  }

  _removeActiveClassFromChildren(parent) {
    const { children } = parent;
    for (let i = children.length - 1; i >= 0; i--) {
      children[i].classList.remove('active');
    }
  }

  addSorting() {
    const buttonGroup = document.querySelector('.sort-options');
    if (!buttonGroup) {
      return;
    }
    buttonGroup.addEventListener('change', this._handleSortChange.bind(this));
  }

  _handleSortChange(evt) {
    // Add and remove `active` class from buttons.
    const buttons = Array.from(evt.currentTarget.children);
    buttons.forEach(button => {
      if (button.querySelector('input').value === evt.target.value) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });

    // Create the sort options to give to Shuffle.
    const { value } = evt.target;
    let options = {};

    function sortByDate(element) {
      return element.getAttribute('data-created');
    }

    function sortByTitle(element) {
      return element.getAttribute('data-title').toLowerCase();
    }

    if (value === 'date-created') {
      options = {
        reverse: true,
        by: sortByDate };

    } else if (value === 'title') {
      options = {
        by: sortByTitle };

    }
    this.shuffle.sort(options);
  }

  // Advanced filtering
  addSearchFilter() {
    const searchInput = document.querySelector('.js-shuffle-search');
    if (!searchInput) {
      return;
    }
    searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
  }

  /**
     * Filter the shuffle instance by items with a title that matches the search input.
     * @param {Event} evt Event object.
     */
  _handleSearchKeyup(evt) {
    const searchText = evt.target.value.toLowerCase();
    this.shuffle.filter((element, shuffle) => {
      // If there is a current filter applied, ignore elements that don't match it.
      if (shuffle.group !== Shuffle.ALL_ITEMS) {
        // Get the item's groups.
        const groups = JSON.parse(element.getAttribute('data-groups'));
        const isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;
        // Only search elements in the current group
        if (!isElementInCurrentGroup) {
          return false;
        }
      }
      const titleElement = element.querySelector('.picture-item__title');
      const titleText = titleElement.textContent.toLowerCase().trim();
      return titleText.indexOf(searchText) !== -1;
    });
  }}


document.addEventListener('DOMContentLoaded', () => {
  window.demo = new Demo(document.getElementById('grid'));
});


/************************************************************************************
 * jquery.themepunch.essential.js - jQuery Plugin for esg Portfolio Slider
 * @version: 2.1.0 (06.07.2016)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
************************************************************************************/
//! ++++++++++++++++++++++++++++++++++++++
!function (jQuery, undefined) {
  function checkBottomPos(e, t) {
    var a = e.container.offset().top + e.container.height() + (e.contPadTop + e.contPadBottom) - jQuery(document).scrollTop(),
    o = jQuery(window).height(),
    r = jQuery(document).height();
    (e.lastBottomCompare != a && o >= a || t && o >= a || r === o && o > a) && (e.lastBottomCompare = a, e.lmbut && 1 != e.lmbut.data('loading') && (e.lmbut.data('loading', 1), loadMoreItems(e)))
  }
  function createCookie(e, t, a) {
    var o;
    if (a) {
      var r = new Date;
      r.setTime(r.getTime() + 24 * a * 60 * 60 * 1000),
      o = '; expires=' + r.toGMTString()
    } else o = '';
    document.cookie = encodeURIComponent(e) + '=' + encodeURIComponent(t) + o + '; path=/'
  }
  function readCookie(e) {
    for (var t = encodeURIComponent(e) + '=', a = document.cookie.split(';'), o = 0; o < a.length; o++) {
      for (var r = a[o]; ' ' === r.charAt(0); ) r = r.substring(1, r.length);
      if (0 === r.indexOf(t)) return decodeURIComponent(r.substring(t.length, r.length))
    }
    return null
  }
  function eraseCookie(e) {
    createCookie(e, '', - 1)
  }
  function checkAvailableFilters(e, t) {
  }
  function checkMoreToLoad(e) {
    var t = e.container,
    a = new Array;
    fidlist = new Array,
    searchchanged = jQuery(e.filterGroupClass + '.esg-filter-wrapper.eg-search-wrapper .eg-justfilteredtosearch').length,
    forcesearch = jQuery(e.filterGroupClass + '.esg-filter-wrapper.eg-search-wrapper .eg-forcefilter').length,
    jQuery(e.filterGroupClass + '.esg-filter-wrapper .esg-filterbutton.selected, ' + e.filterGroupClass + ' .esg-filter-wrapper .esg-filterbutton.selected').each(function () {
      var e = jQuery(this).data('fid');
      - 1 == jQuery.inArray(e, fidlist) && (a.push(e), fidlist.push(e))
    }),
    0 == jQuery(e.filterGroupClass + '.esg-filter-wrapper .esg-filterbutton.selected, ' + e.filterGroupClass + ' .esg-filter-wrapper .esg-filterbutton.selected').length && a.push( - 1);
    for (var o = new Array, r = 0; r < e.loadMoreItems.length; r++) jQuery.each(e.loadMoreItems[r][1], function (t, i) {
      jQuery.each(a, function (t, a) {
        a == i && - 1 != e.loadMoreItems[r][0] && (0 == forcesearch || 1 == forcesearch && 'cat-searchresult' === e.loadMoreItems[r][2]) && o.push(e.loadMoreItems[r])
      })
    });
    return addCountSuffix(t, e),
    o
  }
  function addCountSuffix(e, t) {
    var a = jQuery(t.filterGroupClass + '.esg-filter-wrapper.eg-search-wrapper .eg-justfilteredtosearch').length,
    o = jQuery(t.filterGroupClass + '.esg-filter-wrapper.eg-search-wrapper .eg-forcefilter').length;
    jQuery(t.filterGroupClass + '.esg-filter-wrapper.eg-show-amount .esg-filterbutton').each(function () {
      var r = jQuery(this);
      if (0 == r.find('.eg-el-amount').length || a > 0) {
        var i = r.data('fid'),
        s = r.data('filter');
        o > 0 && (s += '.cat-searchresult');
        for (var n = e.find('.' + s).length, l = 0; l < t.loadMoreItems.length; l++) {
          0 == o ? jQuery.each(t.loadMoreItems[l][1], function (e, a) {
            a === i && - 1 != t.loadMoreItems[l][0] && n++
          })  : - 1 != jQuery.inArray(i, t.loadMoreItems[l][1]) && 'cat-searchresult' === t.loadMoreItems[l][2] && n++
        }
        0 == r.find('.eg-el-amount').length && r.append('<span class="eg-el-amount">0</span>'),
        countToTop(r, n)
      }
    }),
    jQuery(t.filterGroupClass + '.esg-filter-wrapper.eg-search-wrapper .eg-justfilteredtosearch').removeClass('eg-justfilteredtosearch')
  }
  function countToTop(e, t) {
    function a(e, t) {
      o.html(Math.round(e.target[t]))
    }
    var o = e.find('.eg-el-amount'),
    r = {
      value: parseInt(o.text(), 0)
    };
    punchgs.TweenLite.to(r, 2, {
      value: t,
      onUpdate: a,
      onUpdateParams: [
        '{self}',
        'value'
      ],
      ease: punchgs.Power3.easeInOut
    })
  }
  function buildLoader(e, t, a) {
    return t.esgloader != undefined && t.esgloader.length > 0 ? !1 : (e.append('<div class="esg-loader ' + t.spinner + '"><div class="dot1"></div><div class="dot2"></div><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'), esgloader = e.find('.esg-loader'), ('spinner1' == t.spinner || 'spinner2' == t.spinner) && esgloader.css({
      backgroundColor: t.spinnerColor
    }), ('spinner3' == t.spinner || 'spinner4' == t.spinner) && e.find('.bounce1, .bounce2, .bounce3, .dot1, .dot2').css({
      backgroundColor: t.spinnerColor
    }), a || punchgs.TweenLite.to(e, 0.3, {
      minHeight: '100px',
      zIndex: 0
    }), esgloader)
  }
  function setKeyToNull(e, t) {
    jQuery.each(e.loadMoreItems, function (a, o) {
      o[0] == t && (e.loadMoreItems[a][0] = - 1, e.loadMoreItems[a][2] = 'already loaded')
    })
  }
  function loadMoreEmpty(e) {
    for (var t = !0, a = 0; a < e.loadMoreItems.length; a++) - 1 != e.loadMoreItems[a][0] && (t = !1);
    return t
  }
  function loadMoreItems(e) {
    var t = e.container,
    a = checkMoreToLoad(e),
    o = new Array;
    jQuery.each(a, function (t, a) {
      o.length < e.loadMoreAmount && (o.push(a[0]), setKeyToNull(e, a[0]))
    });
    var r = checkMoreToLoad(e).length;
    if ('scroll' === e.loadMoreType && (e.esgloader.addClass('infinityscollavailable'), 'add' != e.esgloaderprocess && (e.esgloaderprocess = 'add', punchgs.TweenLite.to(e.esgloader, 0.5, {
      autoAlpha: 1,
      overwrite: 'all'
    }))), o.length > 0) {
      e.lmbut.length > 0 && (punchgs.TweenLite.to(e.lmbut, 0.4, {
        autoAlpha: 0.2
      }), e.lmbut.data('loading', 1));
      var i = {
        action: e.loadMoreAjaxAction,
        client_action: 'load_more_items',
        token: e.loadMoreAjaxToken,
        data: o,
        gridid: e.gridID
      };
      jQuery.ajax({
        type: 'post',
        url: e.loadMoreAjaxUrl,
        dataType: 'json',
        data: i
      }).success(function (a, o, i) {
        if (a.success) {
          var s = jQuery(a.data);
          jQuery(e.filterGroupClass + '.esg-filter-wrapper.eg-search-wrapper .eg-forcefilter').length > 0 && s.addClass('cat-searchresult'),
          e.container.find('ul').first().append(s),
          checkAvailableFilters(t, e),
          prepareItemsInGrid(e, !0),
          setItemsOnPages(e),
          setTimeout(function () {
            e.animDelay = 'off',
            organiseGrid(e, 'Ajax Loaded'),
            prepareSortingAndOrders(t),
            loadMoreEmpty(e) ? e.lmbut.remove()  : (e.lmtxt = e.loadMoreTxt + ' (' + r + ')', 'off' == e.loadMoreNr && (e.lmtxt = e.loadMoreTxt), 0 == r ? e.lmbut.html(e.loadMoreEndTxt)  : e.lmbut.html(e.lmtxt), e.lmbut.length > 0 && (punchgs.TweenLite.to(e.lmbut, 0.4, {
              autoAlpha: 1,
              overwrite: 'all'
            }), e.lmbut.data('loading', 0))),
            setTimeout(function () {
              e.animDelay = 'on'
            }, 500)
          }, 10)
        }
      }).error(function (t, a, o) {
        e.lmbut.html('FAILURE: ' + a)
      })
    } else loadMoreEmpty(e) ? (e.lmbut.remove(), 'scroll' === e.loadMoreType && e.esgloader.remove())  : e.lmbut.data('loading', 0).html(e.loadMoreEndTxt)
  }
  function killOldCustomAjaxContent(e) {
    var t = e.data('lastposttype'),
    a = e.data('oldajaxsource'),
    o = e.data('oldajaxtype'),
    r = e.data('oldajaxvideoaspect'),
    i = e.data('oldselector');
    if (t != undefined && '' != t) try {
      jQuery.each(jQuery.fn.tpessential.defaults.ajaxTypes, function (s, n) {
        n != undefined && n.type != undefined && n.type == t && n.killfunc != undefined && setTimeout(function () {
          n.killfunc.call(this, {
            id: a,
            type: o,
            aspectratio: r,
            selector: i
          }) && e.empty()
        }, 250)
      })
    } catch (s) {
      console.log(s)
    }
    e.data('lastposttype', '')
  }
  function addAjaxNavigagtion(e, t) {
    function a(e) {
      var t = new Array;
      return jQuery.each(e, function (e, a) {
        jQuery(a).closest('.itemtoshow.isvisiblenow').length > 0 && t.push(a)
      }),
      t
    }
    var o = ' eg-acp-' + e.ajaxClosePosition;
    o = o + ' eg-acp-' + e.ajaxCloseStyle,
    o = o + ' eg-acp-' + e.ajaxCloseType,
    loc = 'eg-icon-left-open-1',
    roc = 'eg-icon-right-open-1',
    xoc = '<i class="eg-icon-cancel"></i>',
    'type1' == e.ajaxCloseType && (loc = 'eg-icon-left-open-big', roc = 'eg-icon-right-open-big', e.ajaxCloseTxt = '', xoc = 'X'),
    ('true' == e.ajaxCloseInner || 1 == e.ajaxCloseInner) && (o += ' eg-acp-inner');
    var r = '<div class="eg-ajax-closer-wrapper' + o + '">';
    switch ('tr' == e.ajaxClosePosition || 'br' == e.ajaxClosePosition ? ('on' == e.ajaxNavButton && (r = r + '<div class="eg-ajax-left eg-ajax-navbt"><i class="' + loc + '"></i></div><div class="eg-ajax-right eg-ajax-navbt"><i class="' + roc + '"></i></div>'), 'on' == e.ajaxCloseButton && (r = r + '<div class="eg-ajax-closer eg-ajax-navbt">' + xoc + e.ajaxCloseTxt + '</div>'))  : ('on' == e.ajaxCloseButton && (r = r + '<div class="eg-ajax-closer eg-ajax-navbt">' + xoc + e.ajaxCloseTxt + '</div>'), 'on' == e.ajaxNavButton && (r = r + '<div class="eg-ajax-left eg-ajax-navbt"><i class="' + loc + '"></i></div><div class="eg-ajax-right eg-ajax-navbt"><i class="' + roc + '"></i></div>')), r += '</div>', e.ajaxClosePosition) {
      case 'tl':
      case 'tr':
      case 't':
        t.prepend(r);
        break;
      case 'bl':
      case 'br':
      case 'b':
        t.append(r)
    }
    t.find('.eg-ajax-closer').click(function () {
      showHideAjaxContainer(t, !1, null, null, 0.25, !0)
    }),
    t.find('.eg-ajax-right').click(function () {
      var e = t.data('container').find('.lastclickedajax').closest('li'),
      o = e.nextAll().find('.eg-ajax-a-button'),
      r = e.prevAll().find('.eg-ajax-a-button');
      o = a(o),
      r = a(r),
      o.length > 0 ? o[0].click()  : r[0].click()
    }),
    t.find('.eg-ajax-left').click(function () {
      var e = t.data('container').find('.lastclickedajax').closest('li'),
      o = e.nextAll().find('.eg-ajax-a-button'),
      r = e.prevAll().find('.eg-ajax-a-button');
      o = a(o),
      r = a(r),
      r.length > 0 ? r[r.length - 1].click()  : o[o.length - 1].click()
    })
  }
  function showHideAjaxContainer(e, t, a, o, r, i) {
    r = r == undefined ? 0.25 : r;
    var s = e.data('container').data('opt'),
    n = e.data('lastheight') != undefined ? e.data('lastheight')  : '100px';
    t ? (r += 1.2, addAjaxNavigagtion(s, e), punchgs.TweenLite.set(e, {
      height: 'auto'
    }), punchgs.TweenLite.set(e.parent(), {
      minHeight: 0,
      maxHeight: 'none',
      height: 'auto',
      overwrite: 'all'
    }), punchgs.TweenLite.from(e, r, {
      height: n,
      ease: punchgs.Power3.easeInOut,
      onStart: function () {
        punchgs.TweenLite.to(e, r, {
          autoAlpha: 1,
          ease: punchgs.Power3.easeOut
        })
      },
      onComplete: function () {
        e.data('lastheight', e.height()),
        jQuery(window).trigger('resize.essg'),
        0 == e.find('.eg-ajax-closer-wrapper').length && addAjaxNavigagtion(s, e)
      }
    }), 'off' != s.ajaxScrollToOnLoad && jQuery('html, body').animate({
      scrollTop: e.offset().top - o
    }, {
      queue: !1,
      speed: 0.5
    }))  : (i && (killOldCustomAjaxContent(e), n = '0px'), punchgs.TweenLite.to(e.parent(), r, {
      height: n,
      ease: punchgs.Power2.easeInOut,
      onStart: function () {
        punchgs.TweenLite.to(e, r, {
          autoAlpha: 0,
          ease: punchgs.Power3.easeOut
        })
      },
      onComplete: function () {
        setTimeout(function () {
          i && e.html('')
        }, 300)
      }
    }))
  }
  function removeLoader(e) {
    e.closest('.eg-ajaxanimwrapper').find('.esg-loader').remove()
  }
  function ajaxCallBack(opt, a) {
    if (opt.ajaxCallback == undefined || '' == opt.ajaxCallback || opt.ajaxCallback.length < 3) return !1;
    var splitter = opt.ajaxCallback.split(')'),
    splitter = splitter[0].split('('),
    callback = splitter[0],
    arguments = splitter.length > 1 && '' != splitter[1] ? splitter[1] + ',' : '',
    obj = new Object;
    try {
      obj.containerid = '#' + opt.ajaxContentTarget,
      obj.postsource = a.data('ajaxsource'),
      obj.posttype = a.data('ajaxtype'),
      'on' == opt.ajaxCallbackArgument ? eval(callback + '(' + arguments + 'obj)')  : eval(callback + '(' + arguments + ')')
    } catch (e) {
      console.log('Callback Error'),
      console.log(e)
    }
  }
  function loadMoreContent(e, t, a) {
    e.find('.lastclickedajax').removeClass('lastclickedajax'),
    a.addClass('lastclickedajax');
    var o = jQuery('#' + t.ajaxContentTarget).find('.eg-ajax-target').eq(0),
    r = a.data('ajaxsource'),
    i = a.data('ajaxtype'),
    s = a.data('ajaxvideoaspect');
    if (o.data('container', e), s = '16:9' == s ? 'widevideo' : 'normalvideo', showHideAjaxContainer(o, !1), o.length > 0) switch (t.ajaxJsUrl != undefined && '' != t.ajaxJsUrl && t.ajaxJsUrl.length > 3 && jQuery.getScript(t.ajaxJsUrl).done(function (e, a) {
        t.ajaxJsUrl = ''
      }).fail(function (e, a, o) {
        console.log('Loading Error on Ajax jQuery File. Please doublecheck if JS File and Path exist:' + t.ajaxJSUrl),
        t.ajaxJsUrl = ''
      }), t.ajaxCssUrl != undefined && '' != t.ajaxCssUrl && t.ajaxCssUrl.length > 3 && (jQuery('<link>').appendTo('head').attr({
        type: 'text/css',
        rel: 'stylesheet'
      }).attr('href', t.ajaxCssUrl), '' == t.ajaxCssUrl), buildLoader(o.closest('.eg-ajaxanimwrapper'), t), o.data('ajaxload') != undefined && o.data('ajaxload').abort(), killOldCustomAjaxContent(o), i) {
      case 'postid':
        var n = {
          action: t.loadMoreAjaxAction,
          client_action: 'load_more_content',
          token: t.loadMoreAjaxToken,
          postid: r
        };
        setTimeout(function () {
          o.data('ajaxload', jQuery.ajax({
            type: 'post',
            url: t.loadMoreAjaxUrl,
            dataType: 'json',
            data: n
          })),
          o.data('ajaxload').success(function (e, r, i) {
            e.success && (jQuery(o).html(e.data), showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset), removeLoader(o), ajaxCallBack(t, a))
          }),
          o.data('ajaxload').error(function (e, t, a) {
            'abort' != t && (jQuery(o).append('<p>FAILURE: <strong>' + t + '</strong></p>'), removeLoader(o))
          })
        }, 300);
        break;
      case 'youtubeid':
        setTimeout(function () {
          o.html('<div class="eg-ajax-video-container ' + s + '"><iframe width="560" height="315" src="//www.youtube.com/embed/' + r + '?autoplay=1&vq=hd1080" frameborder="0" allowfullscreen></iframe></div>'),
          removeLoader(o),
          showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset),
          ajaxCallBack(t, a)
        }, 300);
        break;
      case 'vimeoid':
        setTimeout(function () {
          o.html('<div class="eg-ajax-video-container ' + s + '"><iframe src="https://player.vimeo.com/video/' + r + '?portrait=0&autoplay=1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>'),
          removeLoader(o),
          showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset),
          ajaxCallBack(t, a)
        }, 300);
        break;
      case 'wistiaid':
        setTimeout(function () {
          o.html('<div class="eg-ajax-video-container ' + s + '"><iframe src="//fast.wistia.net/embed/iframe/' + r + '"allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="640" height="388"></iframe></div>'),
          removeLoader(o),
          showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset),
          ajaxCallBack(t, a)
        }, 300);
        break;
      case 'html5vid':
        r = r.split('|'),
        setTimeout(function () {
          o.html('<video autoplay="true" loop="" class="rowbgimage" poster="" width="100%" height="auto"><source src="' + r[0] + '" type="video/mp4"><source src="' + r[1] + '" type="video/webm"><source src="' + r[2] + '" type="video/ogg"></video>'),
          removeLoader(o),
          showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset),
          ajaxCallBack(t, a)
        }, 300);
        break;
      case 'soundcloud':
      case 'soundcloudid':
        setTimeout(function () {
          o.html('<iframe width="100%" height="250" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + r + '&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'),
          removeLoader(o),
          showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset),
          ajaxCallBack(t, a)
        }, 300);
        break;
      case 'imageurl':
        setTimeout(function () {
          var e = new Image;
          e.onload = function () {
            var e = jQuery(this);
            o.html(''),
            e.css({
              width: '100%',
              height: 'auto'
            }),
            o.append(jQuery(this)),
            removeLoader(o),
            showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset),
            ajaxCallBack(t, a)
          },
          e.onerror = function (e) {
            o.html('Error'),
            removeLoader(o),
            showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset)
          },
          e.src = r
        }, 300);
        break;
      default:
        jQuery.each(jQuery.fn.tpessential.defaults.ajaxTypes, function (e, a) {
          a.openAnimationSpeed == undefined && (a.openAnimationSpeed = 0),
          a != undefined && a.type != undefined && a.type == i && setTimeout(function () {
            o.data('lastposttype', i),
            o.data('oldajaxsource', r),
            o.data('oldajaxtype', i),
            o.data('oldajaxvideoaspect', s),
            o.data('oldselector', '#' + t.ajaxContentTarget + ' .eg-ajax-target'),
            showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset, 0),
            o.html(a.func.call(this, {
              id: r,
              type: i,
              aspectratio: s
            })),
            removeLoader(o)
          }, 300)
        })
    }
  }
  function resetFiltersFromCookies(e, t, a) {
    if ('on' == e.cookies.filter) {
      var o = a !== undefined ? a : readCookie('grid_' + e.girdID + '_filters');
      if (o !== undefined && null !== o && o.length > 0) {
        var r = 0;
        jQuery.each(o.split(','), function (a, o) {
          o !== undefined && - 1 !== o && '-1' !== o && jQuery(e.filterGroupClass + '.esg-filterbutton,' + e.filterGroupClass + ' .esg-filterbutton').each(function () {
            jQuery(this).data('fid') != o && parseInt(jQuery(this).data('fid'), 0) !== parseInt(o, 0) || jQuery(this).hasClass('esg-pagination-button') || (t ? jQuery(this).click()  : jQuery(this).addClass('selected'), r++)
          })
        }),
        r > 0 && jQuery(e.filterGroupClass + '.esg-filterbutton.esg-allfilter,' + e.filterGroupClass + ' .esg-filterbutton.esg-allfilter').removeClass('selected')
      }
    }
  }
  function resetPaginationFromCookies(e, t) {
    if ('on' === e.cookies.pagination) {
      var a = t !== undefined ? t : readCookie('grid_' + e.girdID + '_pagination');
      a !== undefined && null !== a && a.length > 0 && jQuery(e.filterGroupClass + '.esg-filterbutton.esg-pagination-button,' + e.filterGroupClass + ' .esg-filterbutton.esg-pagination-button').each(function () {
        parseInt(jQuery(this).data('page'), 0) !== parseInt(a, 0) || jQuery(this).hasClass('selected') || jQuery(this).click()
      })
    }
  }
  function resetSearchFromCookies(e) {
    if ('on' === e.cookies.search) {
      var t = readCookie('grid_' + e.gridID + '_search');
      t !== undefined && null != t && t.length > 0 && (jQuery(e.filterGroupClass + '.eg-search-wrapper .eg-search-input').val(t).trigger('change'), e.cookies.searchjusttriggered = !0)
    }
  }
  function mainPreparing(e, t) {
    function a() {
      if (1 == t.lastsearchtimer) return !1;
      t.lastsearchtimer = 1,
      buildLoader(jQuery(t.filterGroupClass + '.eg-search-wrapper'), {
        spinner: 'spinner3',
        spinnerColor: '#fff'
      }, !0),
      punchgs.TweenLite.fromTo(jQuery(t.filterGroupClass + '.eg-search-wrapper').find('.esg-loader'), 0.3, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        ease: punchgs.Power3.easeInOut
      });
      var a = jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input'),
      o = a.val(),
      r = jQuery(t.filterGroupClass + '.eg-search-wrapper.esg-filter-wrapper .hiddensearchfield');
      if (a.attr('disabled', 'true'), o.length > 0) {
        a.trigger('searchstarting');
        var i = {
          search: o,
          id: t.gridID
        },
        s = {
          action: t.loadMoreAjaxAction,
          client_action: 'get_grid_search_ids',
          token: t.loadMoreAjaxToken,
          data: i
        };
        jQuery.ajax({
          type: 'post',
          url: t.loadMoreAjaxUrl,
          dataType: 'json',
          data: s
        }).success(function (a, i, s) {
          if ('on' === t.cookies.search && createCookie('grid_' + t.gridID + '_search', o, t.cookies.timetosave * (1 / 60 / 60)), t.cookies.searchjusttriggered === !0) {
            var n = readCookie('grid_' + t.girdID + '_pagination'),
            l = readCookie('grid_' + t.girdID + '_filters');
            setTimeout(function () {
              resetFiltersFromCookies(t, !0, l),
              resetPaginationFromCookies(t, n)
            }, 200),
            t.cookies.searchjusttriggered = !1
          }
          setTimeout(function () {
            t.lastsearchtimer = 0,
            jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input').attr('disabled', !1),
            punchgs.TweenLite.to(jQuery(t.filterGroupClass + '.eg-search-wrapper').find('.esg-loader'), 0.5, {
              autoAlpha: 1,
              ease: punchgs.Power3.easeInOut,
              onComplete: function () {
                jQuery(t.filterGroupClass + '.eg-search-wrapper').find('.esg-loader').remove()
              }
            }),
            jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input').trigger('searchended')
          }, 1000);
          var u = new Array;
          a && jQuery.each(a, function (e, t) {
            t != undefined && jQuery.isNumeric(t) && u.push(t)
          }),
          e.find('.cat-searchresult').removeClass('cat-searchresult');
          var d = 0;
          jQuery.each(t.loadMoreItems, function (e, t) {
            t[2] = 'notsearched',
            jQuery.each(u, function (e, a) {
              return parseInt(t[0], 0) === parseInt(a, 0) && - 1 != parseInt(t[0], 0) ? (t[2] = 'cat-searchresult', d++, !1)  : void 0
            })
          }),
          jQuery.each(u, function (t, a) {
            e.find('.eg-post-id-' + a).addClass('cat-searchresult')
          }),
          r.addClass('eg-forcefilter').addClass('eg-justfilteredtosearch'),
          jQuery(t.filterGroupClass + '.esg-filter-wrapper .esg-allfilter').trigger('click')
        }).error(function (e, a, o) {
          console.log('FAILURE: ' + a),
          setTimeout(function () {
            t.lastsearchtimer = 0,
            jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input').attr('disabled', !1),
            punchgs.TweenLite.to(jQuery(t.filterGroupClass + '.eg-search-wrapper').find('.esg-loader'), 0.5, {
              autoAlpha: 1,
              ease: punchgs.Power3.easeInOut,
              onComplete: function () {
                jQuery(t.filterGroupClass + '.eg-search-wrapper').find('.esg-loader').remove()
              }
            }),
            jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input').trigger('searchended')
          }, 1000)
        })
      } else {
        jQuery.each(t.loadMoreItems, function (e, t) {
          t[2] = 'notsearched'
        }),
        e.find('.cat-searchresult').removeClass('cat-searchresult');
        var r = jQuery(t.filterGroupClass + '.eg-search-wrapper.esg-filter-wrapper .hiddensearchfield');
        r.removeClass('eg-forcefilter').addClass('eg-justfilteredtosearch'),
        'on' === t.cookies.search && createCookie('grid_' + t.gridID + '_search', '', - 1),
        jQuery(t.filterGroupClass + '.esg-filter-wrapper .esg-allfilter').trigger('click'),
        setTimeout(function () {
          t.lastsearchtimer = 0,
          jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input').attr('disabled', !1),
          punchgs.TweenLite.to(jQuery(t.filterGroupClass + '.eg-search-wrapper').find('.esg-loader'), 0.5, {
            autoAlpha: 1,
            ease: punchgs.Power3.easeInOut,
            onComplete: function () {
              jQuery(t.filterGroupClass + '.eg-search-wrapper').find('.esg-loader').remove()
            }
          }),
          jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input').trigger('searchended')
        }, 1000)
      }
    }
    resetFiltersFromCookies(t);
    var o = e.find('.eg-leftright-container'),
    r = getBestFitColumn(t, jQuery(window).width(), 'id');
    if (t.column = r.column, t.columnindex = r.index, t.mmHeight = r.mmHeight, prepareItemsInGrid(t), organiseGrid(t, 'MainPreparing'), jQuery(t.filterGroupClass + '.eg-search-wrapper').length > 0) {
      var i = t.filterGroupClass.replace('.', ''),
      s = 'Search Result',
      n = jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-submit'),
      l = jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-clean');
      jQuery(t.filterGroupClass + '.esg-filter-wrapper.eg-search-wrapper').append('<div style="display:none !important" class="esg-filterbutton hiddensearchfield ' + i + '" data-filter="cat-searchresult"><span>' + s + '</span></div>'),
      t.lastsearchtimer = 0,
      n.click(a),
      jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input').on('change', a),
      l.click(function () {
        'on' === t.cookies.search && createCookie('grid_' + t.gridID + '_search', '', - 1),
        jQuery.each(t.loadMoreItems, function (e, t) {
          t[2] = 'notsearched'
        }),
        e.find('.cat-searchresult').removeClass('cat-searchresult');
        var a = jQuery(t.filterGroupClass + '.eg-search-wrapper.esg-filter-wrapper .hiddensearchfield');
        jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input').val(''),
        a.removeClass('eg-forcefilter').addClass('eg-justfilteredtosearch'),
        jQuery(t.filterGroupClass + '.esg-filter-wrapper .esg-allfilter').trigger('click'),
        setTimeout(function () {
          t.lastsearchtimer = 0,
          jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input').attr('disabled', !1),
          punchgs.TweenLite.to(jQuery(t.filterGroupClass + '.eg-search-wrapper').find('.esg-loader'), 0.5, {
            autoAlpha: 1,
            ease: punchgs.Power3.easeInOut,
            onComplete: function () {
              jQuery(t.filterGroupClass + '.eg-search-wrapper').find('.esg-loader').remove()
            }
          }),
          jQuery(t.filterGroupClass + '.eg-search-wrapper .eg-search-input').trigger('searchended')
        }, 1000)
      })
    }
    addCountSuffix(e, t),
    jQuery(t.filterGroupClass + '.esg-filter-wrapper,' + t.filterGroupClass + ' .esg-filter-wrapper').each(function (e) {
      var a = jQuery(this);
      a.hasClass('dropdownstyle') && (a.find('.esg-filter-checked').each(function () {
        jQuery(this).prependTo(jQuery(this).parent())
      }), is_mobile() ? a.find('.esg-selected-filterbutton').click(function () {
        var e = a.find('.esg-selected-filterbutton');
        e.hasClass('hoveredfilter') ? (e.removeClass('hoveredfilter'), a.find('.esg-dropdown-wrapper').stop().hide())  : (e.addClass('hoveredfilter'), a.find('.esg-dropdown-wrapper').stop().show())
      })  : 'click' == t.showDropFilter ? (a.click(function () {
        var e = jQuery(this).closest('.esg-filter-wrapper');
        e.find('.esg-selected-filterbutton').addClass('hoveredfilter'),
        e.find('.esg-dropdown-wrapper').stop().show()
      }), a.on('mouseleave', function () {
        var e = jQuery(this).closest('.esg-filter-wrapper');
        e.find('.esg-selected-filterbutton').removeClass('hoveredfilter'),
        e.find('.esg-dropdown-wrapper').stop().hide()
      }))  : a.hover(function () {
        var e = jQuery(this).closest('.esg-filter-wrapper');
        e.find('.esg-selected-filterbutton').addClass('hoveredfilter'),
        e.find('.esg-dropdown-wrapper').stop().show()
      }, function () {
        var e = jQuery(this).closest('.esg-filter-wrapper');
        e.find('.esg-selected-filterbutton').removeClass('hoveredfilter'),
        e.find('.esg-dropdown-wrapper').stop().hide()
      }))
    }),
    is_mobile() && jQuery(document).on('click touchstart', function (e) {
      var a = jQuery(e.target).closest('.esg-filter-wrapper');
      0 == a.length && (t.container.find('.hoveredfilter').removeClass('hoveredfilter'), t.container.find('.esg-dropdown-wrapper').stop().hide())
    }),
    t.container.find('.esg-filters').each(function (e) {
      punchgs.TweenLite.set(this, {
        zIndex: 70 - e
      })
    }),
    t.container.find('.esg-filter-wrapper.dropdownstyle').each(function (e) {
      punchgs.TweenLite.set(this, {
        zIndex: 1570 - e
      })
    }),
    jQuery('body').on('click', t.filterGroupClass + '.esg-left,' + t.filterGroupClass + ' .esg-left', function () {
      t = getOptions(e),
      t.oldpage = t.currentpage,
      t.currentpage--,
      t.currentpage < 0 && (t.currentpage = t.realmaxpage - 1);
      var a = getBestFitColumn(t, jQuery(window).width(), 'id');
      t.column = a.column,
      t.columnindex = a.index,
      t.mmHeight = a.mmHeight,
      setItemsOnPages(t),
      organiseGrid(t, 'LeftNavigation'),
      setOptions(e, t),
      stopAllVideos(!0)
    }),
    jQuery('body').on('click', t.filterGroupClass + '.esg-right,' + t.filterGroupClass + ' .esg-right', function () {
      t = getOptions(e),
      t.oldpage = t.currentpage,
      t.currentpage++,
      t.currentpage >= t.realmaxpage && (t.currentpage = 0);
      var a = getBestFitColumn(t, jQuery(window).width(), 'id');
      t.column = a.column,
      t.columnindex = a.index,
      t.mmHeight = a.mmHeight,
      setItemsOnPages(t),
      organiseGrid(t, 'RightNavigation'),
      setOptions(e, t),
      stopAllVideos(!0)
    }),
    jQuery(t.filterGroupClass + '.esg-filterbutton, ' + t.filterGroupClass + ' .esg-filterbutton').each(function () {
      jQuery(this).hasClass('esg-pagination-button') || jQuery(this).click(function () {
        var t = getOptions(e);
        stopAllVideos(!0);
        var a = jQuery(this);
        a.hasClass('esg-pagination-button') || (jQuery(t.filterGroupClass + '.esg-allfilter, ' + t.filterGroupClass + ' .esg-allfilter').removeClass('selected'), a.hasClass('esg-allfilter') && jQuery(t.filterGroupClass + '.esg-filterbutton, ' + t.filterGroupClass + ' .esg-filterbutton').each(function () {
          jQuery(this).removeClass('selected')
        })),
        a.closest('.esg-filters').hasClass('esg-singlefilters') || 'single' == t.filterType ? (jQuery(t.filterGroupClass + '.esg-filterbutton, ' + t.filterGroupClass + ' .esg-filterbutton').each(function () {
          jQuery(this).removeClass('selected')
        }), a.addClass('selected'))  : a.hasClass('selected') ? a.removeClass('selected')  : a.addClass('selected');
        var o = jQuery(t.filterGroupClass + '.esg-filter-wrapper .hiddensearchfield');
        o.hasClass('eg-forcefilter') && o.addClass('selected');
        var r = 0,
        i = '';
        if (jQuery(t.filterGroupClass + '.esg-filterbutton.selected,' + t.filterGroupClass + ' .esg-filterbutton.selected').each(function () {
          jQuery(this).hasClass('selected') && !jQuery(this).hasClass('esg-pagination-button') && (r++, i = 0 === r ? jQuery(this).data('fid')  : i + ',' + jQuery(this).data('fid'))
        }), 'on' === t.cookies.filter && t.cookies.searchjusttriggered !== !0 && createCookie('grid_' + t.girdID + '_filters', i, t.cookies.timetosave * (1 / 60 / 60)), 0 == r && jQuery(t.filterGroupClass + '.esg-allfilter,' + t.filterGroupClass + ' .esg-allfilter').addClass('selected'), t.filterchanged = !0, t.currentpage = 0, 1 == t.maxpage ? (jQuery(t.filterGroupClass + '.navigationbuttons,' + t.filterGroupClass + ' .navigationbuttons').css({
          display: 'none'
        }), jQuery(t.filterGroupClass + '.esg-pagination,' + t.filterGroupClass + ' .esg-pagination').css({
          display: 'none'
        }))  : (jQuery(t.filterGroupClass + '.navigationbuttons,' + t.filterGroupClass + ' .navigationbuttons').css({
          display: 'inline-block'
        }), jQuery(t.filterGroupClass + '.esg-pagination,' + t.filterGroupClass + ' .esg-pagination').css({
          display: 'inline-block'
        })), t.lmbut != undefined && t.lmbut.length > 0) {
          var s = checkMoreToLoad(t).length;
          s > 0 ? 'off' == t.loadMoreNr ? t.lmbut.html(t.loadMoreTxt)  : t.lmbut.html(t.loadMoreTxt + ' (' + s + ')')  : t.lmbut.data('loading', 0).html(t.loadMoreEndTxt)
        }
        setItemsOnPages(t),
        organiseGrid(t, 'filtergroup'),
        setOptions(e, t)
      })
    });
    var u;
    jQuery(window).on('resize.essg', function () {
      if (clearTimeout(u), 'on' == t.forceFullWidth || 'on' == t.forceFullScreen) {
        var a = e.parent().parent().find('.esg-relative-placeholder').offset().left;
        e.closest('.esg-container-fullscreen-forcer').css({
          left: 0 - a,
          width: jQuery(window).width()
        })
      } else e.closest('.esg-container-fullscreen-forcer').css({
        left: 0,
        width: 'auto'
      });
      if (o.length > 0) {
        var r = o.outerWidth(!0);
        punchgs.TweenLite.set(e.find('.esg-overflowtrick'), {
          width: e.width() - r,
          overwrite: 'all'
        })
      }
      var i = getBestFitColumn(t, jQuery(window).width(), 'id');
      t.column = i.column,
      t.columnindex = i.index,
      t.mmHeight = i.mmHeight,
      setOptions(e, t),
      u = setTimeout(function () {
        t = getOptions(e),
        setItemsOnPages(t),
        organiseGrid(t, 'resize'),
        setOptions(e, t)
      }, 200)
    }),
    e.on('itemsinposition', function () {
      var e = jQuery(this),
      t = getOptions(e);
      clearTimeout(t.iteminspositiontimer),
      t.iteminspositiontimer = setTimeout(function () {
        var a = e.find('.eg-leftright-container');
        if (clearTimeout(e.data('callednow')), t.maxheight > 0 && t.maxheight < 9999999999) {
          t.inanimation = !1;
          var o = e.find('.esg-overflowtrick').first();
          h = t.mainul,
          a = e.find('.eg-leftright-container');
          var r = parseInt(o.css('paddingTop'), 0);
          r = r == undefined ? 0 : r,
          r = null == r ? 0 : r;
          var i = parseInt(o.css('paddingBottom'), 0);
          i = i == undefined ? 0 : i,
          i = null == i ? 0 : i;
          var s = t.maxheight + t.overflowoffset + r + i;
          if ('on' == t.forceFullScreen) {
            var n = jQuery(window).height();
            if (t.fullScreenOffsetContainer != undefined) try {
              var l = t.fullScreenOffsetContainer.split(',');
              jQuery.each(l, function (e, a) {
                n -= jQuery(a).outerHeight(!0),
                n < t.minFullScreenHeight && (n = t.minFullScreenHeight)
              })
            } catch (u) {
            }
            s = n
          }
          var d = 0.3;
          h.height() < 200 && (d = 1),
          punchgs.TweenLite.to(h, d, {
            force3D: 'auto',
            height: s,
            ease: punchgs.Power3.easeInOut,
            clearProps: 'transform'
          }),
          punchgs.TweenLite.to(o, d, {
            force3D: !0,
            height: s,
            ease: punchgs.Power3.easeInOut,
            clearProps: 'transform',
            onComplete: function () {
              e.closest('.eg-grid-wrapper, .myportfolio-container').css({
                height: 'auto'
              }).removeClass('eg-startheight')
            }
          }),
          a.length > 0 && punchgs.TweenLite.set(a, {
            minHeight: s,
            ease: punchgs.Power3.easeInOut
          });
          var c = jQuery(t.filterGroupClass + '.esg-navbutton-solo-left,' + t.filterGroupClass + ' .esg-navbutton-solo-left'),
          p = jQuery(t.filterGroupClass + '.esg-navbutton-solo-right,' + t.filterGroupClass + ' .esg-navbutton-solo-right');
          c.length > 0 && c.css({
            marginTop: 0 - c.height() / 2
          }),
          p.length > 0 && p.css({
            marginTop: 0 - p.height() / 2
          })
        } else if (0 == t.maxheight) {
          var o = e.find('.esg-overflowtrick').first(),
          h = e.find('ul').first();
          punchgs.TweenLite.to(h, 1, {
            force3D: 'auto',
            height: 0,
            ease: punchgs.Power3.easeInOut,
            clearProps: 'transform'
          }),
          punchgs.TweenLite.to(o, 1, {
            force3D: !0,
            height: 0,
            ease: punchgs.Power3.easeInOut,
            clearProps: 'transform'
          })
        }
        e.data('callednow', setTimeout(function () {
          e.find('.itemtoshow.isvisiblenow').each(function () {
            hideUnderElems(jQuery(this))
          })
        }, 250)),
        t.firstLoadFinnished === undefined && (e.trigger('essential_grid_ready_to_use'), resetSearchFromCookies(t), resetPaginationFromCookies(t), t.firstLoadFinnished = !0)
      }, 50)
    }),
    prepareSortingAndOrders(e),
    prepareSortingClicks(e)
  }
  function prepareSortingAndOrders(e) {
    var t = getOptions(e);
    e.find('.tp-esg-item').each(function () {
      var e = new Date(jQuery(this).data('date'));
      jQuery(this).data('date', e.getTime() / 1000)
    }),
    jQuery(t.filterGroupClass + '.esg-sortbutton-order,' + t.filterGroupClass + ' .esg-sortbutton-order').each(function () {
      var e = jQuery(this);
      e.removeClass('tp-desc').addClass('tp-asc'),
      e.data('dir', 'asc')
    })
  }
  function prepareSortingClicks(e) {
    opt = getOptions(e);
    var t;
    jQuery(opt.filterGroupClass + '.esg-sortbutton-wrapper .esg-sortbutton-order,' + opt.filterGroupClass + ' .esg-sortbutton-wrapper .esg-sortbutton-order').click(function () {
      var a = jQuery(this);
      a.hasClass('tp-desc') ? (a.removeClass('tp-desc').addClass('tp-asc'), a.data('dir', 'asc'))  : (a.removeClass('tp-asc').addClass('tp-desc'), a.data('dir', 'desc'));
      var o = a.data('dir');
      stopAllVideos(!0, !0),
      jQuery(opt.filterGroupClass + '.esg-sorting-select,' + opt.filterGroupClass + ' .esg-sorting-select').each(function () {
        var a = jQuery(this).val();
        clearTimeout(t),
        e.find('.tp-esg-item').tsort({
          data: a,
          forceStrings: 'false',
          order: o
        }),
        t = setTimeout(function () {
          opt = getOptions(e),
          setItemsOnPages(opt),
          organiseGrid(opt, 'preparSorting'),
          setOptions(e, opt)
        }, 200)
      })
    }),
    jQuery(opt.filterGroupClass + '.esg-sorting-select,' + opt.filterGroupClass + ' .esg-sorting-select').each(function () {
      var a = jQuery(this);
      a.change(function () {
        var o = jQuery(this).closest('.esg-sortbutton-wrapper').find('.esg-sortbutton-order'),
        r = a.val(),
        i = a.find('option:selected').text(),
        s = o.data('dir');
        stopAllVideos(!0, !0),
        clearTimeout(t),
        a.parent().parent().find('.sortby_data').text(i);
        var n = e.find('.tp-esg-item').tsort({
          data: r,
          forceStrings: 'false',
          order: s
        });
        n !== undefined && (opt = getOptions(e), setItemsOnPages(opt), organiseGrid(opt, 'OnSorting'), setOptions(e, opt))
      })
    })
  }
  function fixCenteredCoverElement(e, t, a) {
    if (t == undefined && (t = e.find('.esg-entry-cover')), a == undefined && (a = e.find('.esg-entry-media')), t && a) {
      var o = a.outerHeight();
      punchgs.TweenLite.set(t, {
        height: o
      });
      var r = e.find('.esg-cc');
      punchgs.TweenLite.set(r, {
        top: (o - r.height()) / 2
      })
    }
  }
  function getBestFitColumn(e, t, a) {
    var o = t,
    r = 0,
    i = 9999,
    s = 0,
    n = e.column,
    l = (e.column, e.column),
    u = 0,
    d = 0;
    e.responsiveEntries != undefined && e.responsiveEntries.length > 0 && jQuery.each(e.responsiveEntries, function (e, t) {
      var a = t.width != undefined ? t.width : 0,
      c = t.amount != undefined ? t.amount : 0;
      i > a && (i = a, n = c, d = e),
      a > s && (s = a, lamount = c),
      a > r && o >= a && (r = a, l = c, u = e)
    }),
    i > t && (l = n, u = d);
    var c = new Object;
    return c.index = u,
    c.column = l,
    c.mmHeight = e.responsiveEntries[c.index].mmheight,
    'id' == a ? c : l
  }
  function getOptions(e) {
    return e.data('opt')
  }
  function setOptions(e, t) {
    e.data('opt', t)
  }
  function checkMediaListeners(e) {
    e.find('iframe').each(function (e) {
      var t = jQuery(this);
      t.attr('src').toLowerCase().indexOf('youtube') > 0 ? prepareYT(t)  : t.attr('src').toLowerCase().indexOf('vimeo') > 0 ? prepareVimeo(t)  : t.attr('src').toLowerCase().indexOf('wistia') > 0 ? prepareWs(t)  : t.attr('src').toLowerCase().indexOf('soundcloud') > 0 && prepareSoundCloud(t)
    }),
    e.find('video').each(function (e) {
      prepareVideo(jQuery(this))
    })
  }
  function waitMediaListeners(e) {
    var t = e.find('iframe').first(),
    a = e.find('video').first(),
    o = t.length > 0 && t.attr('src').toLowerCase().indexOf('youtube') > 0 ? 'y' : t.length > 0 && t.attr('src').toLowerCase().indexOf('vimeo') > 0 ? 'v' : t.length > 0 && t.attr('src').toLowerCase().indexOf('wistia') > 0 ? 'w' : t.length > 0 && t.attr('src').toLowerCase().indexOf('soundcloud') > 0 ? 's' : a.length > 0 && a.length >= 1 ? 'h' : '',
    r = setInterval(function () {
      e.find('iframe').each(function (e) {
        ('' === o || 'y' === o && prepareYT(t) || 'v' === o && prepareVimeo(t) || 'w' === o && prepareWs(t) || 's' === o && prepareSoundCloud(t) || 'h' === o && prepareVideo(t)) && clearInterval(r)
      })
    }, 50)
  }
  function directionPrepare(e, t, a, o, r) {
    var i = new Object;
    switch (e) {
      case 0:
        i.x = 0,
        i.y = 'in' == t ? 0 - o : 10 + o,
        i.y = r && 'in' == t ? i.y - 5 : i.y;
        break;
      case 1:
        i.y = 0,
        i.x = 'in' == t ? a : - 10 - a,
        i.x = r && 'in' == t ? i.x + 5 : i.x;
        break;
      case 2:
        i.y = 'in' == t ? o : - 10 - o,
        i.x = 0,
        i.y = r && 'in' == t ? i.y + 5 : i.y;
        break;
      case 3:
        i.y = 0,
        i.x = 'in' == t ? 0 - a : 10 + a,
        i.x = r && 'in' == t ? i.x - 5 : i.x
    }
    return i
  }
  function getDir(e, t) {
    var a = e.width(),
    o = e.height(),
    r = (t.x - e.offset().left - a / 2) * (a > o ? o / a : 1),
    i = (t.y - e.offset().top - o / 2) * (o > a ? a / o : 1),
    s = Math.round((Math.atan2(i, r) * (180 / Math.PI) + 180) / 90 + 3) % 4;
    return s
  }
  function hideUnderElems(e) {
    e.find('.eg-handlehideunder').each(function () {
      var t = jQuery(this),
      a = t.data('hideunder'),
      o = t.data('hideunderheight'),
      r = t.data('hidetype');
      t.data('knowndisplay') == undefined && t.data('knowndisplay', t.css('display')),
      e.width() < a && a != undefined || e.height() < o && o != undefined ? 'visibility' == r ? t.addClass('forcenotvisible')  : 'display' == r && t.addClass('forcenotdisplay')  : 'visibility' == r ? t.removeClass('forcenotvisible')  : 'display' == r && t.removeClass('forcenotdisplay')
    })
  }
  function offsetParrents(e, t) {
    var a = t.closest('.mainul'),
    o = a.parent();
    if (t.position().top + t.height() > a.height() + 40 || 0 == e || 0 != a.data('bh') && a.data('bh') != undefined && t.position().top + t.height() > parseInt(a.data('bh'), 0) + 40) {
      (a.data('bh') == undefined || 0 == a.data('bh')) && a.data('bh', a.height()),
      (o.data('bh') == undefined || 0 == o.data('bh')) && o.data('bh', o.height());
      var r = a.data('bh'),
      i = o.data('bh');
      0 != e ? (a.data('alreadyinoff', !1), punchgs.TweenLite.to(a, 0.2, {
        height: r + e
      }), punchgs.TweenLite.to(o, 0.2, {
        height: i + e
      }))  : a.data('alreadyinoff') || (a.data('alreadyinoff', !0), punchgs.TweenLite.to(a, 0.3, {
        height: r,
        ease: punchgs.Power3.easeIn,
        onComplete: function () {
          a.data('bh', 0),
          o.data('bh', 0),
          a.data('alreadyinoff', !1)
        }
      }), punchgs.TweenLite.to(o, 0.3, {
        height: i,
        ease: punchgs.Power3.easeIn,
        onComplete: function () {
          a.data('bh', 0),
          o.data('bh', 0),
          a.data('alreadyinoff', !1)
        }
      }))
    }
  }
  function itemHoverAnim(e, t, a, o) {
    if (1 != e.data('simplevideo') && checkMediaListeners(e), e.find('.isplaying, .isinpause').length > 0) return !1;
    clearTimeout(e.data('hovertimer'));
    var r = a.mainhoverdelay;
    'set' == t && (r = 0),
    e.data('hovertimer', setTimeout(function () {
      e.data('animstarted', 1),
      punchgs.TweenLite.set(e, {
        z: 0.01,
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0
      }),
      e.addClass('esg-hovered');
      var r = e.find('.esg-entry-cover');
      if (punchgs.TweenLite.set(r, {
        transformStyle: 'flat'
      }), 'set' != t && fixCenteredCoverElement(e, r), e.find('.esg-entry-content').length > 0 && 'set' != t && 'even' == a.layout) {
        var i = e.data('pt'),
        s = e.data('pb'),
        n = e.data('pl'),
        l = e.data('pr'),
        u = e.data('bt'),
        d = e.data('bb'),
        c = e.data('bl'),
        p = e.data('br');
        if (e.data('hhh', e.outerHeight()), e.data('www', e.outerWidth()), punchgs.TweenLite.set(e.find('.esg-entry-content'), {
          display: 'block'
        }), punchgs.TweenLite.set(e, {
          z: 0.1,
          zIndex: 50,
          x: 0 - (n + l + p + c) / 2,
          y: 0 - (i + s + u + d) / 2,
          height: 'auto',
          width: e.data('www') + n + l + c + p
        }), 'on' == a.evenGridMasonrySkinPusher) {
          var h = e.height() - e.data('hhh');
          offsetParrents(h, e)
        }
        e.css({
          paddingTop: i + 'px',
          paddingLeft: n + 'px',
          paddingRight: l + 'px',
          paddingBottom: l + 'px'
        }),
        e.css({
          borderTopWidth: u + 'px',
          borderBottomWidth: d + 'px',
          borderLeftWidth: c + 'px',
          borderRightWidth: p + 'px'
        }),
        1 != a.inanimation && punchgs.TweenLite.set(e.closest('.esg-overflowtrick'), {
          overflow: 'visible',
          overwrite: 'all'
        })
      }
      jQuery.each(esgAnimmatrix, function (a, r) {
        e.find(r[0]).each(function () {
          var a = jQuery(this),
          i = a.data('delay') != undefined ? a.data('delay')  : 0;
          animfrom = r[2],
          animto = r[3],
          animto.delay = i,
          animto.overwrite = 'all',
          animfrom.overwrite = 'all',
          animto.transformStyle = 'flat',
          animto.force3D = !0;
          var s = 0,
          n = r[0].indexOf('out') > - 1;
          a.hasClass('esg-entry-media') || n || (animto.clearProps = 'transform'),
          n && (animfrom.clearProps = 'transform'),
          animto.z = 0.001,
          animfrom.transformPerspective == undefined && (animfrom.transformPerspective = 1000),
          a.hasClass('esg-overlay') && (animfrom.z == undefined && (animfrom.z = - 0.002), animto.z = - 0.0001);
          var l = a;
          if (a.hasClass('esg-entry-media') && a.find('.esg-media-video').length > 0) return !0;
          var u = punchgs.TweenLite.killTweensOf(l, !1);
          if ('set' == t) {
            var u = punchgs.TweenLite.set(l, animfrom);
            punchgs.TweenLite.set(e.find('.esg-entry-cover'), {
              visibility: 'visible'
            }),
            n && u.eventCallback('onComplete', resetTransforms, [
              l
            ])
          } else switch (r[0]) {
            case '.esg-shifttotop':
              animto.y = 0 - e.find('.esg-bc.eec').last().height();
              var u = punchgs.TweenLite.fromTo(a, 0.5, {
                y: 0
              }, {
                y: animto.y
              });
              break;
            case '.esg-slide':
              var d = directionPrepare(o, 'in', e.width(), e.height()),
              c = new Object,
              p = new Object;
              jQuery.extend(c, animfrom),
              jQuery.extend(p, animto),
              c.css.x = d.x,
              c.css.y = d.y;
              var u = punchgs.TweenLite.fromTo(l, r[1], c, p, s);
              break;
            case '.esg-slideout':
              var d = directionPrepare(o, 'out', e.width(), e.height()),
              c = new Object,
              p = new Object;
              jQuery.extend(c, animfrom),
              jQuery.extend(p, animto),
              p.x = d.x,
              p.y = d.y,
              p.clearProps = '';
              var u = punchgs.TweenLite.fromTo(l, r[1], c, p, s);
              break;
            default:
              var u = punchgs.TweenLite.fromTo(l, r[1], animfrom, animto, s)
          }
        })
      })
    },
    r))
  }
  function videoClickEvent(e, t, a, o) {
    e.css({
      transform: 'none',
      '-moz-transform': 'none',
      '-webkit-transform': 'none'
    }),
    e.closest('.esg-overflowtrick').css({
      transform: 'none',
      '-moz-transform': 'none',
      '-webkit-transform': 'none'
    }),
    e.closest('ul').css({
      transform: 'none',
      '-moz-transform': 'none',
      '-webkit-transform': 'none'
    }),
    o || e.find('.esg-media-video').each(function () {
      var t = jQuery(this),
      a = e.find('.esg-entry-media');
      if (t.data('youtube') != undefined && 0 == e.find('.esg-youtube-frame').length) {
        var o = 'https://www.youtube.com/embed/' + t.data('youtube') + '?version=3&enablejsapi=1&html5=1&controls=1&autohide=1&rel=0&showinfo=0';
        a.append('<iframe class="esg-youtube-frame" wmode="Opaque" style="position:absolute;top:0px;left:0px;display:none" width="' + t.attr('width') + '" height="' + t.attr('height') + '" data-src="' + o + '" src="about:blank"></iframe>')
      }
      if (t.data('vimeo') != undefined && 0 == e.find('.esg-vimeo-frame').length) {
        var r = 'https://player.vimeo.com/video/' + t.data('vimeo') + '?title=0&byline=0&html5=1&portrait=0&api=1;';
        a.append('<iframe class="esg-vimeo-frame"  allowfullscreen="false" style="position:absolute;top:0px;left:0px;display:none" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" width="' + t.attr('width') + '" height="' + t.attr('height') + '" data-src="' + r + '" src="about:blank"></iframe>')
      }
      if (t.data('wistia') != undefined && 0 == e.find('.esg-wistia-frame').length) {
        var i = 'https://fast.wistia.net/embed/iframe/' + t.data('wistia') + '?version=3&enablejsapi=1&html5=1&controls=1&autohide=1&rel=0&showinfo=0';
        a.append('<iframe class="esg-wistia-frame" wmode="Opaque" style="position:absolute;top:0px;left:0px;display:none" width="' + t.attr('width') + '" height="' + t.attr('height') + '" data-src="' + i + '" src="about:blank"></iframe>')
      }
      if (t.data('soundcloud') != undefined && 0 == e.find('.esg-soundcloud-frame').length) {
        var s = 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/' + t.data('soundcloud') + '&amp;auto_play=false&amp;hide_related=false&amp;visual=true&amp;show_artwork=true';
        a.append('<iframe class="esg-soundcloud-frame" allowfullscreen="false" style="position:absolute;top:0px;left:0px;display:none" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" width="' + t.attr('width') + '" height="' + t.attr('height') + '" scrolling="no" frameborder="no" data-src="' + s + '" src="about:blank"></iframe>')
      }
      t.data('mp4') == undefined && t.data('webm') == undefined && t.data('ogv') == undefined || 0 != e.find('.esg-video-frame').length || (a.append('<video class="esg-video-frame" style="position:absolute;top:0px;left:0px;display:none" width="' + t.attr('width') + '" height="' + t.attr('height') + '" data-origw="' + t.attr('width') + '" data-origh="' + t.attr('height') + '" ></video'), t.data('mp4') != undefined && a.find('video').append('<source src="' + t.data('mp4') + '" type="video/mp4" />'), t.data('webm') != undefined && a.find('video').append('<source src="' + t.data('webm') + '" type="video/webm" />'), t.data('ogv') != undefined && a.find('video').append('<source src="' + t.data('ogv') + '" type="video/ogg" />'))
    }),
    adjustMediaSize(e, !0, null, a);
    var r = e.find('.esg-youtube-frame'),
    i = e.find('.esg-entry-cover'),
    s = e.find('.esg-media-poster');
    vt = 'y',
    go = !1,
    0 == r.length && (r = e.find('.esg-vimeo-frame'), vt = 'v'),
    0 == r.length && (r = e.find('.esg-wistia-frame'), vt = 'w'),
    0 == r.length && (r = e.find('.esg-soundcloud-frame'), vt = 's'),
    0 == r.length && (r = e.find('.esg-video-frame'), vt = 'h'),
    'about:blank' == r.attr('src') ? r.attr('src', r.data('src'))  : r.hasClass('esg-video-frame') ? punchgs.TweenLite.set(r, {
      opacity: 0,
      display: 'block'
    })  : go = !0,
    loadVideoApis(t, a),
    o || punchgs.TweenLite.set(r, {
      opacity: 0,
      display: 'block'
    });
    var n = setInterval(function () {
      (go || 'y' == vt && prepareYT(r) || 'v' == vt && prepareVimeo(r) || 'w' == vt && prepareWs(r) || 's' == vt && prepareSoundCloud(r) || 'h' == vt && prepareVideo(r)) && (clearInterval(n), o || (is_mobile() ? (punchgs.TweenLite.set(r, {
        autoAlpha: 1
      }), punchgs.TweenLite.set(s, {
        autoAlpha: 0
      }), punchgs.TweenLite.set(i, {
        autoAlpha: 0
      }))  : (punchgs.TweenLite.to(r, 0.5, {
        autoAlpha: 1
      }), punchgs.TweenLite.to(s, 0.5, {
        autoAlpha: 0
      }), punchgs.TweenLite.to(i, 0.5, {
        autoAlpha: 0
      }), ('y' === vt || 'w' === vt) && playYT(r, o)), 'v' === vt && playVimeo(r, o), 's' === vt && playSC(r, o), 'h' === vt && playVideo(r, o)), r.attr('src') != undefined && (r.attr('src').toLowerCase().indexOf('youtube') > 0 && playYT(r, o), r.attr('src').toLowerCase().indexOf('vimeo') > 0 && playVimeo(r, o), r.attr('src').toLowerCase().indexOf('wistia') > 0 && playWs(r, o), r.attr('src').toLowerCase().indexOf('soundcloud') > 0 && playSC(r, o)))
    }, 100)
  }
  function setMediaEntryAspectRatio(e) {
    var t = e.img !== undefined ? e.img.attr('width')  : 1,
    a = e.img !== undefined ? e.img.attr('height')  : 1;
    (e.ar === undefined || 'auto' == e.ar || NaN === e.ar) && (e.imgw = e.imgw === undefined ? e.img != undefined ? e.img.width()  : 1 : e.imgw, e.imgh = e.imgh === undefined ? e.img != undefined ? e.img.height()  : 1 : e.imgh, e.imgw = null === e.imgw || NaN === e.imgw || e.imgw === undefined || e.imgw === !1 ? 1 : e.imgw, e.imgh = null === e.imgh || NaN === e.imgh || e.imgh === undefined || e.imgh === !1 ? 1 : e.imgh, e.imgw = e.img != undefined ? t !== undefined && t !== !1 ? t : e.imgw : 1, e.imgh = e.img != undefined ? a !== undefined && a !== !1 ? a : e.imgh : 1, e.ar = e.img !== undefined && e.img.length >= 1 ? e.imgh / e.imgw * 100 : 0),
    1 !== e.ip.data('keepAspectRatio') && (e.ip.css({
      paddingBottom: e.ar + '%'
    }), e.ip.data('bottompadding', e.ar)),
    e.keepAspectRatio && e.ip.data('keepAspectRatio', 1)
  }
  function prepareItemsInGrid(e, t) {
    var a = e.container;
    a.addClass('esg-container'),
    t || a.find('.mainul>li').each(function () {
      jQuery(this).addClass('eg-newli')
    });
    var o = e.mainul[0].getElementsByClassName('eg-newli'),
    r = (100 / e.column, e.aspectratio),
    i = a.find('.esg-overflowtrick').parent().width(),
    s = (a.find('ul').first(), a.find('.esg-overflowtrick').first(), 0),
    n = 1,
    l = 1;
    r = r.split(':'),
    r.length > 1 ? (n = parseInt(r[0], 0) / parseInt(r[1], 0), l = parseInt(r[1], 0) / parseInt(r[0], 0), s = i / e.column / n, kar = !0, l = 100 * l)  : (n = 'auto', l = 'auto', kar = !1);
    for (var u = 0; u < o.length; u++) {
      var d = o[u],
      c = jQuery(d),
      p = c.find('.esg-entry-media'),
      h = p.find('img'),
      g = h != undefined && h.length > 0 ? h.attr('src')  : undefined,
      f = h != undefined && h.length > 0 ? h.data('lazysrc')  : undefined;
      f === undefined && (f = g),
      p.addClass(e.mediaFilter),
      punchgs.TweenLite.set(c, {
        force3D: 'auto',
        autoAlpha: 0,
        opacity: 0
      }),
      c.addClass('tp-esg-item');
      var m = {
        bgpos: h.length >= 1 && h != undefined ? h.data('bgposition')  : undefined,
        bgsize: h.length >= 1 && h != undefined ? h.data('bgsize')  : undefined,
        bgrepeat: h.length >= 1 && h != undefined ? h.data('bgrepeat')  : undefined
      };
      m.bgpos = m.bgpos === undefined ? '' : 'background-position:' + m.bgpos + ';',
      m.bgsize = m.bgsize === undefined ? '' : 'background-size:' + m.bgsize + ';',
      m.bgrepeat = m.bgrepeat === undefined ? '' : 'background-repeat:' + m.bgrepeat + ';',
      p.append('<div class="esg-media-poster" src="' + f + '" data-src="' + f + '" data-lazythumb="' + h.data('lazythumb') + '" style="' + m.bgsize + m.bgrepeat + m.bgpos + 'background-image:url(' + f + ')"></div>'),
      'even' == e.layout ? p.wrap('<div class="esg-entry-media-wrapper" style="width:100%;height:100%;overflow:hidden;position:relative;"></div>')  : p.wrap('<div class="esg-entry-media-wrapper" style="overflow:hidden;position:relative;"></div>'),
      setMediaEntryAspectRatio({
        ip: p,
        img: h,
        ar: l,
        keepAspectRatio: kar
      }),
      h != undefined && h.length > 0 && h.css({
        display: 'none'
      }),
      c.find('.esg-media-video').each(function () {
        var t = jQuery(this),
        o = 'display:none;',
        r = 'data-src=',
        i = 'src=';
        if (t.data('poster') != undefined && t.data('poster').length > 3 ? p.find('.esg-media-poster').css({
          opacity: 1,
          backgroundImage: 'url(' + t.data('poster') + ')'
        }).attr('src', t.data('poster')).data('src', t.data('poster'))  : (c.find('.esg-entry-cover').remove(), c.find('.esg-media-poster').remove(), o = 'display:block;', r = 'src=', i = 'data-src=', l = parseInt(t.attr('height'), 0) / parseInt(t.attr('width'), 0) * 100, setMediaEntryAspectRatio({
          ip: p,
          ar: l,
          keepAspectRatio: !0
        }), c.data('simplevideo', 1)), 0 == c.find('.esg-click-to-play-video').length && (c.find('.esg-entry-cover').find('*').each(function () {
          0 == jQuery(this).closest('a').length && 0 == jQuery(this).find('a').length && jQuery(this).addClass('esg-click-to-play-video')
        }), c.find('.esg-overlay').addClass('esg-click-to-play-video')), t.data('youtube') != undefined) {
          var s = 'https://www.youtube.com/embed/' + t.data('youtube') + '?version=3&enablejsapi=1&html5=1&controls=1&autohide=1&rel=0&showinfo=0';
          p.append('<iframe class="esg-youtube-frame" wmode="Opaque" style="position:absolute;top:0px;left:0px;' + o + '" width="' + t.attr('width') + '" height="' + t.attr('height') + '" ' + r + '"' + s + '" ' + i + '"about:blank"></iframe>')
        }
        if (t.data('vimeo') != undefined) {
          var n = 'https://player.vimeo.com/video/' + t.data('vimeo') + '?title=0&byline=0&html5=1&portrait=0&api=1';
          p.append('<iframe class="esg-vimeo-frame" style="position:absolute;top:0px;left:0px;' + o + '" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""  width="' + t.attr('width') + '" height="' + t.attr('height') + '" ' + r + '"' + n + '" ' + i + '"about:blank"></iframe>')
        }
        if (t.data('wistia') != undefined) {
          var u = 'https://fast.wistia.net/embed/iframe/' + t.data('wistia') + '?version=3&enablejsapi=1&html5=1&controls=1&autohide=1&rel=0&showinfo=0';
          p.append('<iframe class="esg-wistia-frame" wmode="Opaque" style="position:absolute;top:0px;left:0px;' + o + '" width="' + t.attr('width') + '" height="' + t.attr('height') + '" ' + r + '"' + u + '" ' + i + '"about:blank"></iframe>')
        }
        if (t.data('soundcloud') != undefined) {
          var d = 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/' + t.data('soundcloud') + '&amp;auto_play=false&amp;hide_related=false&amp;visual=true&amp;show_artwork=true';
          p.append('<iframe class="esg-soundcloud-frame" style="position:absolute;top:0px;left:0px;' + o + '" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" width="' + t.attr('width') + '" height="' + t.attr('height') + '" ' + r + '"' + d + '" ' + i + '"about:blank"></iframe>')
        }
        if (t.data('mp4') != undefined || t.data('webm') != undefined || t.data('ogv') != undefined) {
          p.append('<video class="esg-video-frame" controls style="position:absolute;top:0px;left:0px;' + o + '" width="' + t.attr('width') + '" height="' + t.attr('height') + '" data-origw="' + t.attr('width') + '" data-origh="' + t.attr('height') + '"></video');
          var h = p.find('video');
          t.data('mp4') != undefined && h.append('<source src="' + t.data('mp4') + '" type="video/mp4" />'),
          t.data('webm') != undefined && h.append('<source src="' + t.data('webm') + '" type="video/webm" />'),
          t.data('ogv') != undefined && h.append('<source src="' + t.data('ogv') + '" type="video/ogg" />')
        }
        c.find('.esg-click-to-play-video').click(function () {
          var t = jQuery(this).closest('.tp-esg-item');
          videoClickEvent(t, a, e)
        }),
        1 == c.data('simplevideo') && waitMediaListeners(c)
      }),
      0 == c.find('.esg-media-video').length && c.find('.esg-click-to-play-video').remove(),
      adjustMediaSize(c, !0, null, e),
      c.find('.esg-entry-content').length > 0 && c.find('.esg-media-cover-wrapper').length > 0 && (c.find('.esg-entry-content').index() < c.find('.esg-media-cover-wrapper').index() || c.find('.esg-entry-content').addClass('esg-notalone')),
      c.find('.esg-entry-cover').each(function (e) {
        var t = jQuery(this),
        a = t.data('clickable');
        t.css({
          visibility: 'hidden'
        }),
        t.find('.esg-top').wrapAll('<div class="esg-tc eec"></div>'),
        t.find('.esg-left').wrapAll('<div class="esg-lc eec"></div>'),
        t.find('.esg-right').wrapAll('<div class="esg-rc eec"></div>'),
        t.find('.esg-center').wrapAll('<div class="esg-cc eec"></div>'),
        t.find('.esg-bottom').wrapAll('<div class="esg-bc eec"></div>'),
        t.find('.eec').append('<div></div>'),
        'on' == a && t.find('.esg-overlay').length >= 1 && t.click(function (e) {
          0 == jQuery(e.target).closest('a').length && jQuery(this).find('.eg-invisiblebutton') [0].click()
        }).css({
          cursor: 'pointer'
        })
      }),
      c.data('pt', parseInt(c.css('paddingTop'), 0)),
      c.data('pb', parseInt(c.css('paddingBottom'), 0)),
      c.data('pl', parseInt(c.css('paddingLeft'), 0)),
      c.data('pr', parseInt(c.css('paddingRight'), 0)),
      c.data('bt', parseInt(c.css('borderTopWidth'), 0)),
      c.data('bb', parseInt(c.css('borderBottomWidth'), 0)),
      c.data('bl', parseInt(c.css('borderLeftWidth'), 0)),
      c.data('br', parseInt(c.css('borderRightWidth'), 0)),
      c.find('.esg-entry-content').length > 0 && 'even' == e.layout && (c.css({
        paddingTop: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingBottom: '0px'
      }), c.css({
        borderTopWidth: '0px',
        borderBottomWidth: '0px',
        borderLeftWidth: '0px',
        borderRightWidth: '0px'
      })),
      e.ajaxContentTarget != undefined && jQuery('#' + e.ajaxContentTarget).length > 0 && c.find('.eg-ajaxclicklistener, a').each(function () {
        var t = jQuery(this),
        o = jQuery('#' + e.ajaxContentTarget).find('.eg-ajax-target');
        o.parent().hasClass('eg-ajaxanimwrapper') || o.wrap('<div class="eg-ajaxanimwrapper" style="position:relative;overflow:hidden;"></div>'),
        t.data('ajaxsource') != undefined && t.data('ajaxtype') != undefined && (t.addClass('eg-ajax-a-button'), t.click(function () {
          return loadMoreContent(a, e, t),
          o.length > 0 ? !1 : !0
        }))
      }),
      c.find('.eg-triggerfilter').click(function () {
        var t = jQuery(this).data('filter');
        return jQuery(e.filterGroupClass + '.esg-filterbutton,' + e.filterGroupClass + ' .esg-filterbutton').each(function () {
          jQuery(this).data('filter') == t && jQuery(this).trigger('click')
        }),
        !1
      }).css({
        cursor: 'pointer'
      }),
      c.on('mouseenter.hoverdir, mouseleave.hoverdir', function (t) {
        var a = jQuery(this),
        o = getDir(a, {
          x: t.pageX,
          y: t.pageY
        });
        if ('mouseenter' === t.type) itemHoverAnim(jQuery(this), 'nope', e, o);
         else {
          if (clearTimeout(a.data('hovertimer')), 1 == a.data('animstarted')) {
            a.data('animstarted', 0),
            a.removeClass('esg-hovered');
            var r = (a.find('.esg-entry-cover'), 0);
            a.find('.esg-entry-content').length > 0 && 'even' == e.layout && (punchgs.TweenLite.set(a.find('.esg-entry-content'), {
              display: 'none'
            }), punchgs.TweenLite.set(a, {
              zIndex: 5
            }), punchgs.TweenLite.set(a.closest('.esg-overflowtrick'), {
              overflow: 'hidden',
              overwrite: 'all'
            }), a.css({
              paddingTop: '0px',
              paddingLeft: '0px',
              paddingRight: '0px',
              paddingBottom: '0px'
            }), a.css({
              borderTopWidth: '0px',
              borderBottomWidth: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px'
            }), punchgs.TweenLite.set(a, {
              z: 0,
              height: a.data('hhh'),
              width: a.data('www'),
              x: 0,
              y: 0
            }), 'on' == e.evenGridMasonrySkinPusher && offsetParrents(0, a)),
            jQuery.each(esgAnimmatrix, function (e, t) {
              a.find(t[0]).each(function () {
                var e = jQuery(this),
                i = e.data('delay') != undefined ? e.data('delay')  : 0,
                s = t[5],
                n = 0;
                switch (animobject = e, splitted = !1, isOut = t[0].indexOf('out') > - 1, i > r && (r = i), s.z == undefined && (s.z = 1), t[0]) {
                  case '.esg-slide':
                    var l = directionPrepare(o, 'in', a.width(), a.height(), !0);
                    s.x = l.x,
                    s.y = l.y;
                    var u = punchgs.TweenLite.to(animobject, 0.5, {
                      y: s.y,
                      x: s.x,
                      overwrite: 'all',
                      onCompleteParams: [
                        animobject
                      ],
                      onComplete: function (e) {
                        punchgs.TweenLite.set(e, {
                          autoAlpha: 0
                        })
                      }
                    });
                    break;
                  case '.esg-slideout':
                    var l = directionPrepare(o, 'out', a.width(), a.height());
                    s.x = 0,
                    s.y = 0,
                    s.overwrite = 'all';
                    var u = punchgs.TweenLite.fromTo(animobject, 0.5, {
                      autoAlpha: 1,
                      x: l.x,
                      y: l.y
                    }, {
                      x: 0,
                      y: 0,
                      autoAlpha: 1,
                      overwrite: 'all'
                    });
                    break;
                  default:
                    s.force3D = 'auto';
                    var u = punchgs.TweenLite.to(animobject, t[4], s, n)
                }
                isOut && u.eventCallback('onComplete', resetTransforms, [
                  animobject
                ])
              })
            })
          }
          a.hasClass('esg-demo') && setTimeout(function () {
            itemHoverAnim(a)
          }, 800)
        }
      }), itemHoverAnim(c, 'set', e), c.hasClass('esg-demo') && itemHoverAnim(c)
    }
    loadVideoApis(a, e),
    setItemsOnPages(e),
    e.mainul.find('.eg-newli').removeClass('eg-newli')
  }
  function resetTransforms(e) {
    punchgs.TweenLite.set(e, {
      clearProps: 'transform',
      css: {
        clearProps: 'transform'
      }
    })
  }
  function adjustMediaSize(e, t, a, o) {
    var r = e.find('iframe').length > 0 ? 'iframe' : e.find('.esg-video-frame').length > 0 ? '.esg-video-frame' : '';
    '' !== r && e.find(r).each(function (r) {
      var i = jQuery(this);
      i.data('origw', i.attr('width')),
      i.data('origh', i.attr('height'));
      var s,
      n,
      l = i.data('origw'),
      u = i.data('origh');
      s = a != undefined ? a.itemw : e.width(),
      n = Math.round(s / l * u),
      s = Math.round(s),
      i.data('neww', s),
      i.data('newh', n),
      t && 'even' != o.layout ? punchgs.TweenLite.set(i, {
        width: s,
        height: n
      })  : punchgs.TweenLite.set(i, {
        width: '100%',
        height: '100%'
      })
    })
  }
  function setItemsOnPages(e) {
    var t = e.container,
    a = t.find('.mainul>li'),
    o = e.column * e.row,
    r = e.rowItemMultiplier,
    i = r.length;
    if (i > 0 && 'even' == e.layout) {
      o = 0;
      for (var s = 0; s < e.row; s++) {
        var n = s - i * Math.floor(s / i);
        o += r[n][e.columnindex]
      }
    }
    if ('on' == e.evenCobbles && e.cobblesPattern != undefined) {
      var l = 0,
      o = 0;
      jQuery.each(a, function (t, a) {
        var r = jQuery(r),
        i = r.data('cobblesw'),
        s = r.data('cobblesh');
        if (e.cobblesPattern != undefined && e.cobblesPattern.length > 2) {
          var n = getCobblePat(e.cobblesPattern, t);
          i = parseInt(n.w, 0),
          s = parseInt(n.h, 0)
        }
        i = i == undefined ? 1 : i,
        s = s == undefined ? 1 : s,
        e.column < i && (i = e.column),
        l += i * s,
        e.column * e.row >= l && o++
      })
    }
    var u = o * e.currentpage,
    d = (t.find('.esg-overflowtrick').parent().width(), u + o),
    c = jQuery(e.filterGroupClass + '.esg-filterbutton.selected:not(.esg-navigationbutton),' + e.filterGroupClass + ' .esg-filterbutton.selected:not(.esg-navigationbutton)'),
    p = 0;
    if (jQuery(e.filterGroupClass + '.esg-filter-wrapper, ' + e.filterGroupClass + ' .esg-filter-wrapper').length > 0 ? jQuery.each(a, function (t, a) {
      var o = jQuery(a);
      o.find('.esgbox').each(function () {
        'all' == e.lightBoxMode ? jQuery(this).attr('rel', 'group')  : 'contentgroup' != e.lightBoxMode && jQuery(this).attr('rel', '')
      });
      var r = !0,
      i = 0;
      jQuery.each(c, function (e, t) {
        o.hasClass(jQuery(t).data('filter')) && (r = !1, i++)
      }),
      'and' == e.filterLogic && i < c.length && (r = !0),
      hidsbutton = jQuery(e.filterGroupClass + '.esg-filter-wrapper .hiddensearchfield'),
      hidsbutton.hasClass('eg-forcefilter') && i < c.length && (r = !0),
      p >= u && d > p && !r ? (o.addClass('itemtoshow').removeClass('itemishidden').removeClass('itemonotherpage'), ('filterpage' == e.lightBoxMode || 'filterall' == e.lightBoxMode) && o.find('.esgbox').attr('rel', 'group'), p++)  : ('filterall' == e.lightBoxMode && o.find('.esgbox').attr('rel', 'group'), r ? o.addClass('itemishidden').removeClass('itemtoshow').removeClass('fitsinfilter')  : (u > p || p >= d ? (o.addClass('itemonotherpage'), o.removeClass('itemtoshow'), p++)  : (o.addClass('itemtoshow').removeClass('itemishidden').removeClass('itemonotherpage'), p++), o.addClass('fitsinfilter')))
    })  : jQuery.each(a, function (t, a) {
      var o = jQuery(a);
      o.find('.esgbox').each(function () {
        'all' == e.lightBoxMode ? jQuery(this).attr('rel', 'group')  : 'contentgroup' != e.lightBoxMode && jQuery(this).attr('rel', '')
      }),
      'filterall' == e.lightBoxMode && o.find('.esgbox').attr('rel', 'group'),
      p >= u && d > p ? (o.addClass('itemtoshow').removeClass('itemishidden').removeClass('itemonotherpage'), p++, ('filterpage' == e.lightBoxMode || 'filterall' == e.lightBoxMode) && o.find('.esgbox').attr('rel', 'group'))  : (u > p || p >= d ? (o.addClass('itemonotherpage'), o.removeClass('itemtoshow'), p++)  : (o.addClass('itemtoshow').removeClass('itemishidden').removeClass('itemonotherpage'), p++), o.addClass('fitsinfilter'))
    }), e.nonefiltereditems = t.find('.itemtoshow, .fitsinfilter').length, 'none' != e.loadMoreType) {
      var h = 0,
      g = !1;
      c.each(function () {
        var e = jQuery(this).data('filter');
        if (e != undefined) {
          var a = t.find('.' + e).length;
          h += a,
          0 == a && (g = !0)
        }
      }),
      (0 == c.length || 1 == c.length) && (h = 1),
      (0 == h || g) && loadMoreItems(e)
    }
    var f = jQuery(e.filterGroupClass + '.esg-pagination,' + e.filterGroupClass + ' .esg-pagination');
    f.find('.esg-pagination').remove(),
    f.html(''),
    e.maxpage = 0;
    var m,
    w = Math.ceil(e.nonefiltereditems / o);
    if (e.realmaxpage = w, w > 7 && 'on' == e.smartPagination) if (e.currentpage < 3) {
      for (var s = 0; 4 > s; s++) m = s == e.currentpage ? 'selected' : '',
      e.maxpage++,
      f.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + m + '" data-page="' + s + '">' + (s + 1) + '</div>');
      f.append('<div class="esg-navigationbutton">...</div>'),
      f.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + m + '" data-page="' + (w - 1) + '">' + w + '</div>')
    } else if (w - e.currentpage < 4) {
      f.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + m + '" data-page="0">1</div>'),
      f.append('<div class="esg-navigationbutton">...</div>');
      for (var s = w - 4; w > s; s++) m = s == e.currentpage ? 'selected' : '',
      e.maxpage++,
      f.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + m + '" data-page="' + s + '">' + (s + 1) + '</div>')
    } else {
      f.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + m + '" data-page="0">1</div>'),
      f.append('<div class="esg-navigationbutton">...</div>');
      for (var s = e.currentpage - 1; s < e.currentpage + 2; s++) m = s == e.currentpage ? 'selected' : '',
      e.maxpage++,
      f.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + m + '" data-page="' + s + '">' + (s + 1) + '</div>');
      f.append('<div class="esg-navigationbutton">...</div>'),
      f.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + m + '" data-page="' + (w - 1) + '">' + w + '</div>')
    } else for (var s = 0; w > s; s++) m = s == e.currentpage ? 'selected' : '',
    e.maxpage++,
    f.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + m + '" data-page="' + s + '">' + (s + 1) + '</div>');
    if (1 == e.maxpage ? (jQuery(e.filterGroupClass + '.esg-navigationbutton,' + e.filterGroupClass + ' .esg-navigationbutton').not('.esg-loadmore').css({
      display: 'none'
    }), f.css({
      display: 'none'
    }))  : (jQuery(e.filterGroupClass + '.esg-navigationbutton,' + e.filterGroupClass + ' .esg-navigationbutton').css({
      display: 'inline-block'
    }), f.css({
      display: 'inline-block'
    })), e.currentpage >= Math.ceil(e.nonefiltereditems / o)) {
      e.oldpage = e.currentpage,
      e.currentpage = 0;
      var v = 0;
      t.find('.itemtoshow, .fitsinfilter').each(function () {
        v++,
        d > v && jQuery(this).removeClass('itemonotherpage')
      }),
      f.find('.esg-pagination-button').first().addClass('selected')
    }
    e.currentpage < 0 && (e.currentpage = 0),
    f.find('.esg-pagination-button').on('click', function () {
      e.oldpage = e.currentpage,
      e.currentpage = jQuery(this).data('page'),
      e = getOptions(t);
      var a = getBestFitColumn(e, jQuery(window).width(), 'id');
      e.column = a.column,
      e.columnindex = a.index,
      e.mmHeight = a.mmHeight,
      'on' === e.cookies.pagination && e.cookies.searchjusttriggered !== !0 && createCookie('grid_' + e.girdID + '_pagination', e.currentpage, e.cookies.timetosave * (1 / 60 / 60)),
      setItemsOnPages(e),
      organiseGrid(e, 'paginholder'),
      setOptions(t, e),
      stopAllVideos(!0),
      'on' == e.paginationScrollToTop && jQuery('html, body').animate({
        scrollTop: t.offset().top - e.paginationScrollToTopOffset
      }, {
        queue: !1,
        speed: 0.5
      })
    }),
    e.firstshowever == undefined && jQuery(e.filterGroupClass + '.esg-navigationbutton,' + e.filterGroupClass + ' .esg-navigationbutton').css({
      visibility: 'hidden'
    })
  }
  function waittorungGrid(e, t, a) {
    var o = e.closest('.mainul');
    clearTimeout(o.data('intreorganisier')),
    o.hasClass('gridorganising') ? o.data('intreorganisier', setTimeout(function () {
      waittorungGrid(e, t, a)
    }, 10))  : runGrid(t, a)
  }
  function loadAllPrepared(e, t) {
    if (1 == e.data('preloading')) return !1;
    var a = new Image;
    e.data('lazysrc') != e.attr('src') && e.data('lazysrc') != undefined && 'undefined' != e.data('lazysrc') && e.data('lazysrc') != undefined && 'undefined' != e.data('lazysrc') && e.attr('src', e.data('lazysrc')),
    e.data('preloading', 1),
    a.onload = function (o) {
      e.data('lazydone', 1),
      e.data('ww', a.width),
      e.data('hh', a.height),
      e.closest('.showmeonload').addClass('itemtoshow').removeClass('showmeonload').addClass('loadedmedia'),
      removeLLCover(e, a.width, a.height),
      'on' == t.lazyLoad && waittorungGrid(e, t, !0)
    },
    a.onerror = function () {
      e.data('lazydone', 1),
      e.closest('.showmeonload').addClass('itemtoshow').removeClass('showmeonload').addClass('loadedmedia'),
      'on' == t.lazyLoad && waittorungGrid(e, t, !0)
    },
    e.attr('src') != undefined && 'undefined' != e.attr('src') ? a.src = e.attr('src')  : a.src = e.data('src'),
    a.complete && (e.data('lazydone', 1), e.data('ww', a.width), e.data('hh', a.height), e.closest('.showmeonload').addClass('itemtoshow').removeClass('showmeonload').addClass('loadedmedia'), removeLLCover(e, a.width, a.height), 'on' == t.lazyLoad && waittorungGrid(e, t, !0))
  }
  function organiseGrid(e, t) {
    waitForLoads(e.container.find('.itemtoshow'), e)
  }
  function removeLLCover(e, t, a) {
    var o = e.parent();
    setMediaEntryAspectRatio({
      ip: o,
      img: e,
      imgw: t,
      imgh: a
    }),
    !e.hasClass('coverremoved') && o.find('.lazyloadcover').length > 0 ? (e.addClass('coverremoved'), punchgs.TweenLite.set(o.find('.lazyloadcover'), {
      zIndex: 0
    }), punchgs.TweenLite.fromTo(e, 0.5, {
      autoAlpha: 0,
      zIndex: 1
    }, {
      force3D: !0,
      autoAlpha: 1,
      ease: punchgs.Power1.easeInOut,
      onComplete: function () {
        e.parent().find('.lazyloadcover').remove()
      }
    }))  : 'off' == opt.lazyLoad && punchgs.TweenLite.set(e, {
      force3D: !0,
      autoAlpha: 1
    })
  }
  function runGrid(e, t) {
    var a = e.container;
    'scroll' == e.loadMoreType && checkBottomPos(e),
    e.firstshowever == undefined ? (a.is(':hidden') && punchgs.TweenLite.set(a, {
      autoAlpha: 1,
      display: 'block'
    }), runGridMain(e, t), jQuery(e.filterGroupClass + '.esg-navigationbutton, ' + e.filterGroupClass + ' .esg-navigationbutton').css({
      visibility: 'visible'
    }), e.firstshowever = 1)  : (runGridMain(e, t), jQuery(e.filterGroupClass + '.esg-navigationbutton, ' + e.filterGroupClass + ' .esg-navigationbutton').css({
      visibility: 'visible'
    }))
  }
  function getCobblePat(e, t) {
    var a = new Object;
    return a.w = 1,
    a.h = 1,
    e = e.split(','),
    e != undefined && (e = e[t - Math.floor(t / e.length) * e.length].split('x'), a.w = e[0], a.h = e[1]),
    a
  }
  function runGridMain(e, t) {
    var a,
    o = e.container,
    r = o.find('.itemtoshow, .isvisiblenow').not('.ui-sortable-helper'),
    i = new Object,
    s = o.find('ul').first(),
    n = (o.find('.esg-overflowtrick').first(), e.aspectratio),
    l = 0;
    e.aspectratioOrig = e.aspectratio,
    o.find('.mainul').addClass('gridorganising'),
    n = n.split(':'),
    a = parseInt(n[0], 0) / parseInt(n[1], 0),
    i.item = 0,
    i.pagetoanimate = 0 - e.currentpage,
    i.col = 0,
    i.row = 0,
    i.pagecounter = 0,
    i.itemcounter = 0,
    i.fakecol = 0,
    i.fakerow = 0,
    i.maxheight = 0,
    i.allcol = 0,
    i.allrow = 0,
    i.ulcurheight = 0,
    i.ulwidth = s.width(),
    i.verticalsteps = 1,
    i.currentcolumnheight = new Array;
    for (var u = 0; u < e.column; u++) i.currentcolumnheight[u] = 0;
    i.pageitemcounterfake = 0,
    i.pageitemcounter = 0,
    e.delayBasic != undefined ? i.delaybasic = e.delayBasic : i.delaybasic = 0.08,
    i.anim = e.pageAnimation,
    i.itemtowait = 0,
    i.itemouttowait = 0,
    i.ease = 'punchgs.Power1.easeInOut',
    i.easeout = i.ease,
    i.row = 0,
    i.col = 0;
    var d = e.rowItemMultiplier,
    c = d.length;
    e.column;
    i.y = 0,
    i.fakey = 0,
    o.find('.esg-overflowtrick').css({
      width: '100%'
    }),
    100 == o.find('.esg-overflowtrick').width() && o.find('.esg-overflowtrick').css({
      width: o.find('.esg-overflowtrick').parent().width()
    }),
    i.cwidth = o.find('.esg-overflowtrick').width() - 2 * e.overflowoffset,
    e.inanimation = !0,
    i.cwidth_n_spaces = i.cwidth - (e.column - 1) * e.space,
    i.itemw = Math.round(i.cwidth_n_spaces / e.column),
    i.originalitemw = i.itemw;
    var p = !1;
    if ('on' == e.forceFullScreen) {
      if (l = jQuery(window).height(), e.fullScreenOffsetContainer != undefined) try {
        var h = e.fullScreenOffsetContainer.split(',');
        jQuery.each(h, function (t, a) {
          l -= jQuery(a).outerHeight(!0),
          l < e.minFullScreenHeight && (l = e.minFullScreenHeight)
        })
      } catch (g) {
      }
      p = !0
    }
    'even' == e.layout ? (i.itemh = 0 == Math.round(l) ? Math.round(i.cwidth_n_spaces / e.column / a)  : Math.round(l / e.row), e.aspectratio = 0 == l ? e.aspectratio : i.itemw + ':' + i.itemh, c > 0 ? punchgs.TweenLite.set(r, {
      display: 'block',
      visibility: 'visible',
      overwrite: 'auto'
    })  : 'on' == e.evenCobbles ? punchgs.TweenLite.set(r, {
      display: 'block',
      visibility: 'visible',
      overwrite: 'auto'
    })  : punchgs.TweenLite.set(r, {
      display: 'block',
      width: i.itemw,
      height: i.itemh,
      visibility: 'visible',
      overwrite: 'auto'
    }))  : punchgs.TweenLite.set(r, {
      display: 'block',
      width: i.itemw,
      height: 'auto',
      visibility: 'visible',
      overwrite: 'auto'
    }),
    t || punchgs.TweenLite.killTweensOf(r),
    i.originalitemh = i.itemh;
    for (var f = new Array, m = e.row * e.column * 2, w = 0; m > w; w++) {
      for (var v = new Array, y = 0; y < e.column; y++) v.push(0);
      f.push(v)
    }
    var b = 0;
    0 == r.length && o.trigger('itemsinposition'),
    jQuery.each(r, function (t, r) {
      var n = jQuery(r);
      if (i.itemw = i.originalitemw, punchgs.TweenLite.set(n.find('.esg-entry-content'), {
        minHeight: e.mmHeight + 'px'
      }), 'on' != e.evenCobbles || n.hasClass('itemonotherpage') || n.hasClass('itemishidden')) {
        var u = i.row - c * Math.floor(i.row / c);
        if ('even' == e.layout && c > 0 && (e.column = d[u][e.columnindex], i.cwidth = o.find('.esg-overflowtrick').width() - 2 * e.overflowoffset, i.cwidth_n_spaces = i.cwidth - (e.column - 1) * e.space, i.itemw = Math.round(i.cwidth_n_spaces / e.column), i.itemh = 0 == l ? i.cwidth_n_spaces / e.column / a : l / e.row, e.aspectratio = 0 == l ? e.aspectratio : i.itemw + ':' + i.itemh, punchgs.TweenLite.set(n, {
          width: i.itemw,
          height: i.itemh,
          overwrite: 'auto'
        })), p) {
          var h = n.find('.esg-entry-media'),
          g = i.itemh / i.itemw * 100;
          punchgs.TweenLite.set(h, {
            paddingBottom: g + '%'
          })
        }
      } else {
        var w = n.data('cobblesw'),
        v = n.data('cobblesh');
        if (e.cobblesPattern != undefined && e.cobblesPattern.length > 2) {
          var y = getCobblePat(e.cobblesPattern, b);
          w = parseInt(y.w, 0),
          v = parseInt(y.h, 0),
          b++
        }
        w = w == undefined ? 1 : w,
        v = v == undefined ? 1 : v,
        e.column < w && (w = e.column),
        i.cobblesorigw = i.originalitemw,
        i.cobblesorigh = i.originalitemh,
        i.itemw = i.itemw * w + (w - 1) * e.space,
        i.itemh = i.originalitemh,
        i.itemh = i.itemh * v + (v - 1) * e.space;
        var x = w + ':' + v,
        j = !1,
        C = 0,
        k = 0;
        switch (x) {
          case '1:1':
            do 0 == f[C][k] && (f[C][k] = '1:1', j = !0, i.cobblesx = k, i.cobblesy = C),
            k++,
            k == e.column && (k = 0, C++),
            C >= m && (j = !0);
            while (!j);
            break;
          case '1:2':
            do 0 == f[C][k] && m - 1 > C && 0 == f[C + 1][k] && (f[C][k] = '1:2', f[C + 1][k] = '1:2', i.cobblesx = k, i.cobblesy = C, j = !0),
            k++,
            k == e.column && (k = 0, C++),
            C >= m && (j = !0);
            while (!j);
            break;
          case '1:3':
            do 0 == f[C][k] && m - 2 > C && 0 == f[C + 1][k] && 0 == f[C + 2][k] && (f[C][k] = '1:3', f[C + 1][k] = '1:3', f[C + 2][k] = '1:3', i.cobblesx = k, i.cobblesy = C, j = !0),
            k++,
            k == e.column && (k = 0, C++),
            C >= m && (j = !0);
            while (!j);
            break;
          case '2:1':
            do 0 == f[C][k] && k < e.column - 1 && 0 == f[C][k + 1] && (f[C][k] = '2:1', f[C][k + 1] = '2:1', i.cobblesx = k, i.cobblesy = C, j = !0),
            k++,
            k == e.column && (k = 0, C++),
            C >= m && (j = !0);
            while (!j);
            break;
          case '3:1':
            do 0 == f[C][k] && k < e.column - 2 && 0 == f[C][k + 1] && 0 == f[C][k + 2] && (f[C][k] = '3:1', f[C][k + 1] = '3:1', f[C][k + 2] = '3:1', i.cobblesx = k, i.cobblesy = C, j = !0),
            k++,
            k == e.column && (k = 0, C++),
            C >= m && (j = !0);
            while (!j);
            break;
          case '2:2':
            do k < e.column - 1 && m - 1 > C && 0 == f[C][k] && 0 == f[C][k + 1] && 0 == f[C + 1][k] && 0 == f[C + 1][k + 1] && (f[C][k] = '2:2', f[C + 1][k] = '2:2', f[C][k + 1] = '2:2', f[C + 1][k + 1] = '2:2', i.cobblesx = k, i.cobblesy = C, j = !0),
            k++,
            k == e.column && (k = 0, C++),
            C >= m && (j = !0);
            while (!j);
            break;
          case '3:2':
            do k < e.column - 2 && m - 1 > C && 0 == f[C][k] && 0 == f[C][k + 1] && 0 == f[C][k + 2] && 0 == f[C + 1][k] && 0 == f[C + 1][k + 1] && 0 == f[C + 1][k + 2] && (f[C][k] = '3:2', f[C][k + 1] = '3:2', f[C][k + 2] = '3:2', f[C + 1][k] = '3:2', f[C + 1][k + 1] = '3:2', f[C + 1][k + 2] = '3:2', i.cobblesx = k, i.cobblesy = C, j = !0),
            k++,
            k == e.column && (k = 0, C++),
            C >= m && (j = !0);
            while (!j);
            break;
          case '2:3':
            do k < e.column - 1 && m - 2 > C && 0 == f[C][k] && 0 == f[C][k + 1] && 0 == f[C + 1][k] && 0 == f[C + 1][k + 1] && 0 == f[C + 2][k + 1] && 0 == f[C + 2][k + 1] && (f[C][k] = '2:3', f[C][k + 1] = '2:3', f[C + 1][k] = '2:3', f[C + 1][k + 1] = '2:3', f[C + 2][k] = '2:3', f[C + 2][k + 1] = '2:3', i.cobblesx = k, i.cobblesy = C, j = !0),
            k++,
            k == e.column && (k = 0, C++),
            C >= m && (j = !0);
            while (!j);
            break;
          case '3:3':
            do k < e.column - 2 && m - 2 > C && 0 == f[C][k] && 0 == f[C][k + 1] && 0 == f[C][k + 2] && 0 == f[C + 1][k] && 0 == f[C + 1][k + 1] && 0 == f[C + 1][k + 2] && 0 == f[C + 2][k] && 0 == f[C + 2][k + 1] && 0 == f[C + 2][k + 2] && (f[C][k] = '3:3', f[C][k + 1] = '3:3', f[C][k + 2] = '3:3', f[C + 1][k] = '3:3', f[C + 1][k + 1] = '3:3', f[C + 1][k + 2] = '3:3', f[C + 2][k] = '3:3', f[C + 2][k + 1] = '3:3', f[C + 2][k + 2] = '3:3', i.cobblesx = k, i.cobblesy = C, j = !0),
            k++,
            k == e.column && (k = 0, C++),
            C >= m && (j = !0);
            while (!j)
        }
        e.aspectratio = i.itemw + ':' + i.itemh,
        punchgs.TweenLite.set(n, {
          width: i.itemw,
          height: i.itemh,
          overwrite: 'auto'
        });
        var h = n.find('.esg-entry-media'),
        g = i.itemh / i.itemw * 100;
        punchgs.TweenLite.set(h, {
          paddingBottom: g + '%'
        })
      }
      'even' == e.layout || (n.hasClass('itemtoshow') && (n.width() != i.itemw || 0 == n.css('opacity') || 'hidden' == n.css('visibility')) ? i = prepareItemToMessure(n, i, o)  : (adjustMediaSize(n, !0, i, e), i.itemh = n.height())),
      i = animateGrid(r, e, i),
      i.itemcounter++,
      s.height() < i.maxheight && o.trigger('itemsinposition')
    }), e.aspectratio = e.aspectratioOrig, 0 == i.itemtowait && (e.container.trigger('itemsinposition'), o.find('.mainul').removeClass('gridorganising')); var x = getBestFitColumn(e, jQuery(window).width(), 'id'); if (e.column = x.column, e.columnindex = x.index, e.mmHeight = x.mmHeight, e.maxheight = i.maxheight, e.container.trigger('itemsinposition'), e.inanimation = !0, e.started = !1, e.filterchanged = !1, e.silent = !1, e.silentout = !1, e.changedAnim = '', setOptions(o, e), e.esgloader.length > 0 && 'remove' != e.esgloaderprocess) {
      e.esgloaderprocess = 'remove';
      var j = 0;
      e.esgloader.hasClass('infinityscollavailable') && (j = 1),
      punchgs.TweenLite.to(e.esgloader, 1, {
        autoAlpha: 0,
        ease: punchgs.Power3.easeInOut,
        delay: j
      })
    }
  }
  function prepareItemToMessure(e, t, a) {
    return adjustMediaSize(e, !0, t, a.data('opt')),
    t.itemh = e.outerHeight(!0),
    t
  }
  function animateGrid(e, t, a) {
    var o = jQuery(e);
    if (a.skipanim = !1, a.x = Math.round(a.col * a.itemw), 'even' == t.layout);
     else {
      a.idealcol = 0,
      a.backupcol = a.col;
      for (var r = 0; r < t.column; r++) a.currentcolumnheight[a.idealcol] > a.currentcolumnheight[r] && (a.idealcol = r);
      a.y = a.currentcolumnheight[a.idealcol],
      a.x = Math.round(a.idealcol * a.itemw) + a.idealcol * t.space,
      a.col = a.idealcol,
      a.itemh == undefined && (a.itemh = 0)
    }
    if (a.cobblesx != undefined && (a.x = a.cobblesx * a.cobblesorigw, a.y = a.cobblesy * a.cobblesorigh), a.waits = a.col * a.delaybasic + a.row * (a.delaybasic * t.column), a.speed = t.animSpeed, a.inxrot = 0, a.inyrot = 0, a.outxrot = 0, a.outyrot = 0, a.inorigin = 'center center', a.outorigin = 'center center', a.itemh = Math.round(a.itemh), a.scale = 1, a.outfade = 0, a.infade = 0, o.hasClass('itemonotherpage') && (a.skipanim = !0), 'horizontal-slide' == a.anim ? (a.waits = 0, a.hsoffset = 0 - a.cwidth - parseInt(t.space), a.hsoffsetout = 0 - a.cwidth - parseInt(t.space), t.oldpage != undefined && t.oldpage > t.currentpage && (a.hsoffset = a.cwidth + parseInt(t.space), a.hsoffsetout = a.cwidth + parseInt(t.space)))  : 'vertical-slide' == a.anim && (a.waits = 0, a.maxcalcheight = t.row * t.space + t.row * a.itemh, a.vsoffset = a.maxcalcheight + parseInt(t.space), a.vsoffsetout = a.maxcalcheight + parseInt(t.space), t.oldpage != undefined && t.oldpage > t.currentpage && (a.vsoffset = 0 - a.maxcalcheight - parseInt(t.space), a.vsoffsetout = 0 - a.maxcalcheight - parseInt(t.space))), a.outwaits = a.waits, 'even' == t.layout && a.cobblesx == undefined && (a.x = a.x + a.col * t.space), a.cobblesx != undefined && (a.x = a.x + a.cobblesx * t.space, a.y = a.y + a.cobblesy * t.space), ('vertical-flip' == a.anim || 'horizontal-flip' == a.anim || 'vertical-flipbook' == a.anim || 'horizontal-flipbook' == a.anim) && (a = fakePositions(o, a, t)), 'vertical-flip' == a.anim ? (a.inxrot = - 180, a.outxrot = 180)  : 'horizontal-flip' == a.anim && (a.inyrot = - 180, a.outyrot = 180), a.outspeed = a.speed, 'off' == t.animDelay && (a.waits = 0, a.outwaits = 0), 'scale' == a.anim ? a.scale = 0 : 'vertical-flipbook' == a.anim ? (a.inxrot = - 90, a.outxrot = 90, a.inorigin = 'center top', a.outorigin = 'center bottom', a.waits = a.waits + a.speed / 3, a.outfade = 1, a.infade = 1, a.outspeed = a.speed / 1.2, a.ease = 'Sine.easeOut', a.easeout = 'Sine.easeIn', 'off' == t.animDelay && (a.waits = a.speed / 3, a.outwaits = 0))  : 'horizontal-flipbook' == a.anim ? (a.inyrot = - 90, a.outyrot = - 90, a.inorigin = 'left center', a.outorigin = 'right center', a.waits = a.waits + a.speed / 2.4, a.outfade = 1, a.infade = 1, a.outspeed = a.speed / 1.2, a.ease = 'Sine.easeOut', a.easeout = 'Sine.easeIn', 'off' == t.animDelay && (a.waits = a.speed / 3, a.outwaits = 0))  : ('fall' == a.anim || 'rotatefall' == a.anim) && (a.outoffsety = 100, a = fakePositions(o, a, t), a.outfade = 0), 'rotatefall' == a.anim ? (a.rotatez = 20, a.outorigin = 'left top', a.outfade = 1, a.outoffsety = 600)  : 'rotatescale' == a.anim ? (a.scale = 0, a.inorigin = 'left bottom', a.outorigin = 'center center', a.faeout = 1, a.outoffsety = 100, a = fakePositions(o, a, t))  : 'stack' == a.anim && (a.scale = 0, a.inorigin = 'center center', a.faeout = 1, a.ease = 'punchgs.Power3.easeOut', a = fakePositions(o, a, t), a.ease = 'Back.easeOut'), t.silent && (a.waits = 0, a.outwaits = 0, a.speed = 0, a.outspeed = 0), t.silentout && (a.outwaits = 0, a.outspeed = 0.4, a.speed = 0.4, a.ease = 'punchgs.Power3.easeOut', a.easeout = a.ease), a.hooffset = t.overflowoffset, a.vooffset = t.overflowoffset, a.itemw + a.x - a.cwidth < 20 && a.itemw + a.x - a.cwidth > - 20) {
      var i = a.itemw + a.x - a.cwidth;
      a.itemw = a.itemw - i
    }
    if (!o.hasClass('itemtoshow') && !o.hasClass('fitsinfilter') || a.skipanim) a.itemouttowait++,
    punchgs.TweenLite.set(o, {
      zIndex: 5
    }),
    o.removeClass('isvisiblenow'),
    o.css('opacity') > 0 ? 'stack' == a.anim ? (punchgs.TweenLite.set(o, {
      zIndex: a.pageitemcounterfake + 100
    }), punchgs.TweenLite.to(o, a.outspeed / 2, {
      force3D: 'auto',
      x: - 20 - a.itemw,
      rotationY: 30,
      rotationX: 10,
      ease: Sine.easeInOut,
      delay: a.outwaits
    }), punchgs.TweenLite.to(o, 0.01, {
      force3D: 'auto',
      zIndex: a.pageitemcounterfake,
      delay: a.outwaits + a.outspeed / 3
    }), punchgs.TweenLite.to(o, 0.2 * a.outspeed, {
      force3D: 'auto',
      delay: a.outwaits + 0.9 * a.outspeed,
      autoAlpha: 0,
      ease: Sine.easeInOut
    }), punchgs.TweenLite.to(o, a.outspeed / 3, {
      zIndex: 2,
      force3D: 'auto',
      x: 0,
      scale: 0.9,
      rotationY: 0,
      rotationX: 0,
      ease: Sine.easeInOut,
      delay: a.outwaits + a.outspeed / 1.4,
      onComplete: function () {
        o.hasClass('itemtoshow') || punchgs.TweenLite.set(o, {
          autoAlpha: 0,
          overwrite: 'all',
          display: 'none'
        }),
        a.itemouttowait--,
        0 == a.itemouttowait && t.container.trigger('itemsinposition')
      }
    }))  : 'horizontal-flipbook' == a.anim || 'vertical-flipbook' == a.anim ? punchgs.TweenLite.to(o, a.outspeed, {
      force3D: 'auto',
      zIndex: 2,
      scale: a.scale,
      autoAlpha: a.outfade,
      transformOrigin: a.outorigin,
      rotationX: a.outxrot,
      rotationY: a.outyrot,
      ease: a.easeout,
      delay: a.outwaits,
      onComplete: function () {
        o.hasClass('itemtoshow') || punchgs.TweenLite.set(o, {
          autoAlpha: 0,
          overwrite: 'all',
          display: 'none'
        }),
        a.itemouttowait--,
        0 == a.itemouttowait && t.container.trigger('itemsinposition')
      }
    })  : 'fall' == a.anim ? punchgs.TweenLite.to(o, a.outspeed, {
      zIndex: 2,
      force3D: 'auto',
      y: a.outoffsety,
      autoAlpha: 0,
      ease: a.easeout,
      delay: a.outwaits,
      onComplete: function () {
        o.hasClass('itemtoshow') || punchgs.TweenLite.set(o, {
          autoAlpha: 0,
          overwrite: 'all',
          display: 'none'
        }),
        a.itemouttowait--,
        0 == a.itemouttowait && t.container.trigger('itemsinposition')
      }
    })  : 'horizontal-slide' == a.anim ? punchgs.TweenLite.to(o, a.outspeed, {
      zIndex: 2,
      force3D: 'auto',
      autoAlpha: 1,
      left: a.hooffset + o.position().left + a.hsoffsetout,
      top: a.vooffset + o.position().top,
      ease: a.easeout,
      delay: a.outwaits,
      onComplete: function () {
        punchgs.TweenLite.set(o, {
          autoAlpha: 0,
          overwrite: 'all',
          display: 'none'
        }),
        a.itemouttowait--,
        0 == a.itemouttowait && t.container.trigger('itemsinposition')
      }
    })  : 'vertical-slide' == a.anim ? punchgs.TweenLite.to(o, a.outspeed, {
      zIndex: 2,
      force3D: 'auto',
      autoAlpha: 1,
      left: a.hooffset + o.position().left,
      top: a.vooffset + o.position().top + a.vsoffsetout,
      ease: a.easeout,
      delay: a.outwaits,
      onComplete: function () {
        punchgs.TweenLite.set(o, {
          autoAlpha: 0,
          overwrite: 'all',
          display: 'none'
        }),
        a.itemouttowait--,
        0 == a.itemouttowait && t.container.trigger('itemsinposition')
      }
    })  : 'rotatefall' == a.anim && o.css('opacity') > 0 ? (punchgs.TweenLite.set(o, {
      zIndex: 300 - a.item
    }), punchgs.TweenLite.to(o, a.outspeed / 2, {
      force3D: 'auto',
      transformOrigin: a.outorigin,
      ease: 'punchgs.Bounce.easeOut',
      rotationZ: a.rotatez,
      delay: a.outwaits
    }), punchgs.TweenLite.to(o, a.outspeed / 2, {
      zIndex: 2,
      force3D: 'auto',
      autoAlpha: 0,
      y: a.outoffsety,
      ease: punchgs.Power3.easeIn,
      delay: a.outwaits + a.outspeed / 3
    }))  : punchgs.TweenLite.to(o, a.outspeed, {
      force3D: 'auto',
      zIndex: 2,
      scale: a.scale,
      autoAlpha: a.outfade,
      transformOrigin: a.outorigin,
      rotationX: a.outxrot,
      rotationY: a.outyrot,
      ease: a.easeout,
      delay: a.outwaits,
      onComplete: function () {
        o.hasClass('itemtoshow') || punchgs.TweenLite.set(o, {
          autoAlpha: 0,
          overwrite: 'all',
          display: 'none'
        }),
        a.itemouttowait--,
        0 == a.itemouttowait && t.container.trigger('itemsinposition')
      }
    })  : punchgs.TweenLite.set(o, {
      zIndex: 2,
      scale: a.scale,
      autoAlpha: 0,
      transformOrigin: a.outorigin,
      rotationX: a.outxrot,
      rotationY: a.outyrot,
      onComplete: function () {
        o.hasClass('itemtoshow') || punchgs.TweenLite.set(o, {
          autoAlpha: 0,
          overwrite: 'all',
          display: 'none'
        }),
        a.itemouttowait--,
        0 == a.itemouttowait && t.container.trigger('itemsinposition')
      }
    }),
    a = shiftGridFake(a, t);
     else {
      o.addClass('isvisiblenow'),
      'even' != t.layout ? (a.currentcolumnheight[a.idealcol] = a.currentcolumnheight[a.idealcol] + a.itemh + parseInt(t.space), a.ulcurheight < a.currentcolumnheight[a.idealcol] && (a.ulcurheight = a.currentcolumnheight[a.idealcol]))  : a.ulcurheight = a.y + a.itemh,
      a.maxheight < a.ulcurheight && (a.maxheight = a.ulcurheight),
      a.itemtowait++;
      var s = Math.round(a.hooffset + a.x),
      n = Math.round(a.vooffset + a.y);
      'on' == t.rtl && (s = a.ulwidth - s - a.itemw),
      0 == o.css('opacity') && 'fade' == a.anim ? punchgs.TweenLite.set(o, {
        opacity: 0,
        autoAlpha: 0,
        width: a.itemw,
        height: a.itemh,
        scale: 1,
        left: s,
        y: 0,
        top: n,
        overwrite: 'all'
      })  : 0 == o.css('opacity') && 'scale' == a.anim ? punchgs.TweenLite.set(o, {
        width: a.itemw,
        height: a.itemh,
        scale: 0,
        left: s,
        y: 0,
        top: n,
        overwrite: 'all'
      })  : 0 == o.css('opacity') && 'rotatescale' == a.anim ? punchgs.TweenLite.set(o, {
        width: a.itemw,
        height: a.itemh,
        scale: 1,
        left: s,
        top: n,
        xPercent: 150,
        yPercent: 150,
        rotationZ: 20,
        overwrite: 'all'
      })  : 0 == o.css('opacity') && 'fall' == a.anim ? punchgs.TweenLite.set(o, {
        width: a.itemw,
        height: a.itemh,
        scale: 0.5,
        left: s,
        top: n,
        y: 0,
        overwrite: 'all'
      })  : 0 == o.css('opacity') && 'rotatefall' == a.anim && punchgs.TweenLite.set(o, {
        autoAlpha: 0,
        width: a.itemw,
        height: a.itemh,
        left: s,
        rotationZ: 0,
        top: n,
        y: 0,
        overwrite: 'all'
      }),
      0 != o.css('opacity') || 'vertical-flip' != a.anim && 'horizontal-flip' != a.anim && 'vertical-flipbook' != a.anim && 'horizontal-flipbook' != a.anim || punchgs.TweenLite.set(o, {
        autoAlpha: a.infade,
        zIndex: 10,
        scale: 1,
        y: 0,
        transformOrigin: a.inorigin,
        rotationX: a.inxrot,
        rotationY: a.inyrot,
        width: a.itemw,
        height: a.itemh,
        left: s,
        top: n,
        overwrite: 'all'
      }),
      'stack' == a.anim && punchgs.TweenLite.set(o, {
        zIndex: a.pageitemcounter,
        scale: 0.5,
        autoAlpha: 1,
        left: s,
        top: n
      }),
      'horizontal-slide' == a.anim && 0 == o.css('opacity') && punchgs.TweenLite.set(o, {
        autoAlpha: 1,
        left: Math.round(a.hooffset + (a.x - a.hsoffset)),
        top: n,
        width: a.itemw,
        height: a.itemh
      }),
      'vertical-slide' == a.anim && 0 == o.css('opacity') && punchgs.TweenLite.set(o, {
        autoAlpha: 1,
        left: s,
        top: Math.round(a.vooffset + a.y - a.vsoffset),
        width: a.itemw,
        height: a.itemh
      });
      var l = o.find('.esg-entry-cover'),
      u = o.find('.esg-entry-media');
      if (l && u) {
        var d = u.outerHeight(),
        c = o.find('.esg-cc');
        punchgs.TweenLite.to(l, 0.01, {
          height: d,
          ease: a.ease,
          delay: a.waits
        }),
        punchgs.TweenLite.to(c, 0.01, {
          top: (d - c.height()) / 2,
          ease: a.ease,
          delay: a.waits
        })
      }
      t.container.trigger('itemsinposition'),
      punchgs.TweenLite.to(o, a.speed, {
        force3D: 'auto',
        autoAlpha: 1,
        scale: 1,
        transformOrigin: a.inorigin,
        rotationX: 0,
        rotationY: 0,
        y: 0,
        x: 0,
        xPercent: 0,
        yPercent: 0,
        z: 0.1,
        rotationZ: 0,
        left: s,
        top: n,
        ease: a.ease,
        delay: a.waits,
        onComplete: function () {
          o.hasClass('itemtoshow') && punchgs.TweenLite.set(o, {
            autoAlpha: 1,
            overwrite: 'all'
          }),
          a.itemtowait--,
          0 == a.itemtowait && (t.container.trigger('itemsinposition'), o.closest('.mainul').removeClass('gridorganising'))
        }
      }),
      'masonry' == t.layout && (a.col = a.backupcol),
      a = shiftGrid(a, t, o)
    }
    return a
  }
  function fakePositions(e, t, a) {
    if (!e.hasClass('itemtoshow') && !e.hasClass('fitsinfilter') || t.skipanim) {
      var o = e.data('col'),
      r = e.data('row');
      (o == undefined || r == undefined) && 0 != t.x && 0 != t.y && (t.x = Math.round(t.fakecol * t.itemw), t.y = t.fakey, o = t.fakecol, r = t.fakerow, e.data('col', t.fakecol), e.data('row', t.fakerow)),
      'rotatefall' == t.anim ? t.outwaits = (a.column - o) * t.delaybasic + r * (t.delaybasic * a.column)  : t.outwaits = o * t.delaybasic + r * (t.delaybasic * a.column)
    } else ;
    return t
  }
  function shiftGrid(e, t, a) {
    if (a.data('col', e.col), a.data('row', e.row), e.pageitemcounter++, e.col = e.col + e.verticalsteps, e.allcol++, e.col == t.column && (e.col = 0, e.row++, e.allrow++, e.y = parseFloat(e.y) + parseFloat(e.itemh) + parseFloat(t.space), e.row == t.row && (e.row = 0, e.pageitemcounter >= t.column * t.row && (e.pageitemcounter = 0), e.pagetoanimate = e.pagetoanimate + 1, e.pagecounter++, 0 == e.pageitemcounter))) for (var o = 0; o < t.column; o++) e.currentcolumnheight[o] = 0;
    return e
  }
  function shiftGridFake(e, t) {
    return e.fakecol = e.fakecol + 1,
    e.pageitemcounterfake++,
    e.fakecol == t.column && (e.fakecol = 0, e.fakerow++, e.fakey = e.fakey + e.itemh + t.space, e.fakerow == t.row && (e.fakerow = 0, e.pageitemcounterfake = 0)),
    e
  }
  function loadVideoApis(e, t) {
    var a = 0,
    o = 0,
    r = 0,
    i = 0,
    s = 0,
    n = 'http';
    'https:' === location.protocol && (n = 'https'),
    e.find('iframe').each(function (e) {
      try {
        if (jQuery(this).attr('src').indexOf('you') > 0 && 0 == a) {
          a = 1;
          var t = document.createElement('script'),
          o = 'https';
          t.src = o + '://www.youtube.com/iframe_api';
          var r = document.getElementsByTagName('script') [0],
          i = !0;
          jQuery('head').find('*').each(function () {
            jQuery(this).attr('src') == o + '://www.youtube.com/iframe_api' && (i = !1)
          }),
          i && r.parentNode.insertBefore(t, r)
        }
      } catch (s) {
      }
    }),
    e.find('iframe').each(function (e) {
      try {
        if (jQuery(this).attr('src').indexOf('ws') > 0 && 0 == r) {
          r = 1;
          var t = document.createElement('script');
          t.src = n + '://fast.wistia.com/assets/external/E-v1.js';
          var a = document.getElementsByTagName('script') [0],
          o = !0;
          jQuery('head').find('*').each(function () {
            jQuery(this).attr('src') == n + '://fast.wistia.com/assets/external/E-v1.js' && (o = !1)
          }),
          o && a.parentNode.insertBefore(t, a)
        }
      } catch (i) {
      }
    }),
    e.find('iframe').each(function (e) {
      try {
        if (jQuery(this).attr('src').indexOf('vim') > 0 && 0 == o) {
          o = 1;
          var t = document.createElement('script');
          t.src = 'https://secure-a.vimeocdn.com/js/froogaloop2.min.js';
          var a = document.getElementsByTagName('script') [0],
          r = !0;
          jQuery('head').find('*').each(function () {
            'https://secure-a.vimeocdn.com/js/froogaloop2.min.js' == jQuery(this).attr('src') && (r = !1)
          }),
          r && a.parentNode.insertBefore(t, a)
        }
      } catch (i) {
      }
    }),
    e.find('iframe').each(function (e) {
      try {
        if (jQuery(this).attr('src').indexOf('soundcloud') > 0 && 0 == s) {
          s = 1;
          var t = document.createElement('script');
          t.src = n + '://w.soundcloud.com/player/api.js';
          var a = document.getElementsByTagName('script') [0],
          o = !0;
          jQuery('head').find('*').each(function () {
            jQuery(this).attr('src') == n + '://w.soundcloud.com/player/api.js' && (o = !1)
          }),
          o && a.parentNode.insertBefore(t, a)
        }
      } catch (r) {
      }
    });
    var l = {
      youtube: a,
      vimeo: o,
      wistia: r,
      soundcloud: s,
      htmlvid: i
    };
    return l
  }
  function toHHMMSS() {
    var e = new Date,
    t = Math.floor(e) / 1000,
    a = Math.floor(t / 60),
    o = Math.floor(a / 60),
    r = Math.floor(o / 24),
    o = o - 24 * r,
    a = a - 24 * r * 60 - 60 * o,
    t = t - 24 * r * 60 * 60 - 60 * o * 60 - 60 * a;
    return o + ':' + a + ':' + t
  }
  function stopAllVideos(e, t, a) {
    var o = ' isplaying';
    e && (o = '');
    for (var r = document.getElementsByClassName('tp-esg-item isvisiblenow'), i = 0; i < r.length; i++) {
      for (var s = r[i].getElementsByClassName('esg-youtubevideo haslistener' + o), n = r[i].getElementsByClassName('esg-vimeovideo haslistener' + o), l = r[i].getElementsByClassName('esg-wistiavideo haslistener' + o), u = r[i].getElementsByClassName('esg-htmlvideo haslistener' + o), d = r[i].getElementsByClassName('esg-soundcloud' + o), c = 0; c < s.length; c++) {
        var p = jQuery(s[c]),
        h = p.data('player');
        a != p.attr('id') && (h.pauseVideo(), e && forceVideoInPause(p, !0, h, 'youtube'))
      }
      for (c = 0; c < n.length; c++) {
        var p = jQuery(n[c]),
        g = p.attr('id'),
        h = $f(g);
        a != g && (h.api('pause'), a === undefined && e && forceVideoInPause(p, !0, h, 'vimeo'))
      }
      for (c = 0; c < l.length; c++) {
        var p = jQuery(l[c]),
        h = p.data('player');
        a != p.attr('id') && (p.wistiaApi.pause(), e && forceVideoInPause(p, !0, h, 'wistia'))
      }
      for (c = 0; c < u.length; c++) {
        var p = jQuery(u[c]),
        g = p.attr('id'),
        h = document.getElementById(g);
        a != g && (h.pause(), e && forceVideoInPause(p, !0, h, 'html5vid'))
      }
      for (c = 0; c < d.length; c++) {
        var p = jQuery(d[c]),
        h = p.data('player');
        a != p.attr('id') && (h.pause(), e && forceVideoInPause(p, !0, h, 'soundcloud'))
      }
    }
  }
  function forceVideoInPause(e, t, a, o) {
    e.removeClass('isplaying');
    var r = e.closest('.tp-esg-item');
    if (r.find('.esg-media-video').length > 0 && !jQuery('body').data('fullScreenMode')) {
      var i = r.find('.esg-entry-cover'),
      s = r.find('.esg-media-poster');
      if (s.length > 0) if (is_mobile() ? (punchgs.TweenLite.set(i, {
        autoAlpha: 1
      }), punchgs.TweenLite.set(s, {
        autoAlpha: 1
      }), punchgs.TweenLite.set(e, {
        autoAlpha: 0
      }))  : (punchgs.TweenLite.to(i, 0.5, {
        autoAlpha: 1
      }), punchgs.TweenLite.to(s, 0.5, {
        autoAlpha: 1
      }), punchgs.TweenLite.to(e, 0.5, {
        autoAlpha: 0
      })), t) if ('youtube' == o) try {
        a.destroy()
      } catch (n) {
      } else if ('vimeo' == o) try {
        a.api('unload')
      } catch (n) {
      } else if ('wistia' == o) try {
        a.end()
      } catch (n) {
      } else 'html5vid' != o && (e.removeClass('haslistener'), e.removeClass('readytoplay'));
       else setTimeout(function () {
        is_mobile() || e.css({
          display: 'none'
        })
      }, 500)
    }
  }
  function onPlayerStateChange(e) {
    var t = e.target.getIframe(),
    a = jQuery(t);
    e.data == YT.PlayerState.PLAYING && (e.target.setPlaybackQuality('hd1080'), stopAllVideos(!0, !1, t.id), a.addClass('isplaying').removeClass('isinpause')),
    2 == e.data && forceVideoInPause(a),
    0 == e.data && forceVideoInPause(a)
  }
  function vimeoready_auto(e) {
    var t = $f(e),
    a = jQuery('#' + e);
    t.addEvent('ready', function (o) {
      a.addClass('readytoplay'),
      t.addEvent('play', function (t) {
        stopAllVideos(!0, !1, e),
        a.addClass('isplaying'),
        a.removeClass('isinpause')
      }),
      t.addEvent('finish', function (e) {
        forceVideoInPause(a),
        a.removeClass('isplaying')
      }),
      t.addEvent('pause', function (e) {
        forceVideoInPause(a),
        a.removeClass('isplaying')
      })
    })
  }
  function addEvent(e, t, a) {
    e.addEventListener ? e.addEventListener(t, a, !1)  : e.attachEvent(t, a, !1)
  }
  function html5vidready(e, t, a) {
    t.addClass('readytoplay'),
    t.on('play', function () {
      stopAllVideos(!0, !1, a),
      t.addClass('isplaying'),
      t.removeClass('isinpause')
    }),
    t.on('pause', function () {
      forceVideoInPause(t),
      t.removeClass('isplaying')
    }),
    t.on('ended', function () {
      forceVideoInPause(t),
      t.removeClass('isplaying')
    })
  }
  function prepareYT(e) {
    var t = 'ytiframe' + Math.round(100000 * Math.random() + 1);
    if (e.hasClass('haslistener') || 'undefined' == typeof YT) {
      var a = e.data('player');
      return a != undefined && 'function' == typeof a.playVideo ? !0 : !1
    }
    try {
      e.attr('id', t);
      var a = new YT.Player(t, {
        events: {
          onStateChange: onPlayerStateChange
        }
      });
      e.data('player', a),
      e.addClass('haslistener').addClass('esg-youtubevideo')
    } catch (o) {
      return !1
    }
  }
  function playYT(e) {
    var t = e.data('player');
    t != undefined && 'function' == typeof t.playVideo && t.playVideo()
  }
  function prepareVimeo(e) {
    if (e.hasClass('haslistener') || 'undefined' == typeof $f) {
      if (typeof $f != undefined && 'undefined' != typeof $f) {
        var t = $f(e.attr('id'));
        return 'function' == typeof t.api && e.hasClass('readytoplay') ? !0 : !1
      }
      return !1
    }
    try {
      var a = 'vimeoiframe' + Math.round(100000 * Math.random() + 1);
      e.attr('id', a);
      for (var o, r = e.attr('src'), i = {
      }, s = r, n = /([^&=]+)=([^&]*)/g; o = n.exec(s); ) i[decodeURIComponent(o[1])] = decodeURIComponent(o[2]);
      r = i.player_id != undefined ? r.replace(i.player_id, a)  : r + '&player_id=' + a;
      try {
        r = r.replace('api=0', 'api=1')
      } catch (l) {
      }
      r += '&api=1',
      e.attr('src', r);
      var u = e[0];
      $f(u).addEvent('ready', function () {
        vimeoready_auto(a)
      }),
      e.addClass('haslistener').addClass('esg-vimeovideo')
    } catch (l) {
      return !1
    }
  }
  function playVimeo(e) {
    var t = $f(e.attr('id'));
    t.api('play')
  }
  function prepareWs(e) {
    var t = 'wsiframe' + Math.round(100000 * Math.random() + 1);
    if (e.hasClass('haslistener') || 'undefined' == typeof Ws) {
      var a = e.data('player');
      return a != undefined && 'function' == typeof a.playVideo ? !0 : !1
    }
    try {
      e.attr('id', t);
      var a = new Ws.Player(t, {
        events: {
          onStateChange: onPlayerStateChange
        }
      });
      e.data('player', a),
      e.addClass('haslistener').addClass('esg-wistiavideo')
    } catch (o) {
      return !1
    }
  }
  function playWs(e) {
    var t = e.data('player');
    t != undefined && 'function' == typeof t.playVideo && t.wistiaApi.Plau()
  }
  function prepareSoundCloud(e) {
    if (e.data('player') != undefined || 'undefined' == typeof SC) {
      var t = e.data('player');
      return t != undefined && 'function' == typeof t.getVolume ? !0 : !1
    }
    var a = 'sciframe' + Math.round(100000 * Math.random() + 1);
    try {
      e.attr('id', a);
      var t = SC.Widget(a);
      t.bind(SC.Widget.Events.PLAY, function () {
        stopAllVideos(!0, !1, e.attr('id')),
        e.addClass('isplaying'),
        e.removeClass('isinpause')
      }),
      t.bind(SC.Widget.Events.PAUSE, function () {
        forceVideoInPause(e),
        e.removeClass('isplaying')
      }),
      t.bind(SC.Widget.Events.FINISH, function () {
        forceVideoInPause(e),
        e.removeClass('isplaying')
      }),
      e.data('player', t),
      e.addClass('haslistener').addClass('esg-soundcloud')
    } catch (o) {
      return !1
    }
  }
  function playSC(e) {
    var t = e.data('player');
    t != undefined && 'function' == typeof t.getVolume && setTimeout(function () {
      t.play()
    }, 500)
  }
  function prepareVideo(e) {
    if (e.hasClass('haslistener')) try {
      var t = e.attr('id'),
      a = document.getElementById(t);
      return 'function' == typeof a.play && e.hasClass('readytoplay') ? !0 : !1
    } catch (o) {
      return !1
    } else {
      var r = 'videoid_' + Math.round(100000 * Math.random() + 1);
      e.attr('id', r);
      var a = document.getElementById(r);
      a.oncanplay = html5vidready(a, e, r),
      e.addClass('haslistener').addClass('esg-htmlvideo')
    }
  }
  function playVideo(e) {
    var t = e.attr('id'),
    a = document.getElementById(t);
    a.play()
  }
  var esgAnimmatrix = [
    ['.esg-none',
    0,
    {
      autoAlpha: 1,
      rotationZ: 0,
      x: 0,
      y: 0,
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      skewX: 0,
      skewY: 0
    },
    {
      autoAlpha: 1,
      ease: punchgs.Power2.easeOut,
      overwrite: 'all'
    },
    0,
    {
      autoAlpha: 1,
      overwrite: 'all'
    }
    ],
    [
      '.esg-fade',
      0.3,
      {
        autoAlpha: 0,
        rotationZ: 0,
        x: 0,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0
      },
      {
        autoAlpha: 1,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-fadeout',
      0.3,
      {
        autoAlpha: 1,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      {
        autoAlpha: 0,
        rotationZ: 0,
        x: 0,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0
      },
      0.3,
      {
        autoAlpha: 1,
        rotationZ: 0,
        x: 0,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-covergrowup',
      0.3,
      {
        autoAlpha: 1,
        top: '100%',
        marginTop: - 10,
        rotationZ: 0,
        x: 0,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0
      },
      {
        autoAlpha: 1,
        top: '0%',
        marginTop: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 1,
        top: '100%',
        marginTop: - 10,
        bottom: 0,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      !0
    ],
    [
      '.esg-flipvertical',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        rotationX: 180,
        autoAlpha: 0,
        z: - 0.001,
        transformOrigin: '50% 50%'
      },
      {
        rotationX: 0,
        autoAlpha: 1,
        scale: 1,
        z: 0.001,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      0.5,
      {
        rotationX: 180,
        autoAlpha: 0,
        scale: 1,
        z: - 0.001,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      !0
    ],
    [
      '.esg-flipverticalout',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        rotationX: 0,
        autoAlpha: 1,
        z: 0.001,
        transformOrigin: '50% 50%'
      },
      {
        rotationX: - 180,
        scale: 1,
        autoAlpha: 0,
        z: - 150,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      0.5,
      {
        rotationX: 0,
        autoAlpha: 1,
        scale: 1,
        z: 0,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-fliphorizontal',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        rotationY: 180,
        autoAlpha: 0,
        z: - 0.001,
        transformOrigin: '50% 50%'
      },
      {
        rotationY: 0,
        autoAlpha: 1,
        scale: 1,
        z: 0.001,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      0.5,
      {
        rotationY: 180,
        autoAlpha: 0,
        scale: 1,
        z: - 0.001,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      !0
    ],
    [
      '.esg-fliphorizontalout',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        z: 0.001,
        transformOrigin: '50% 50%'
      },
      {
        rotationY: - 180,
        scale: 1,
        autoAlpha: 0,
        z: - 150,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      0.5,
      {
        rotationY: 0,
        autoAlpha: 1,
        scale: 1,
        z: 0.001,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-flipup',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 0.8,
        rotationZ: 0,
        rotationX: 90,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        z: 0.001,
        transformOrigin: '50% 100%'
      },
      {
        scale: 1,
        rotationX: 0,
        autoAlpha: 1,
        z: 0.001,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        scale: 0.8,
        rotationX: 90,
        autoAlpha: 0,
        z: 0.001,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      !0
    ],
    [
      '.esg-flipupout',
      0.5,
      {
        rotationX: 0,
        autoAlpha: 1,
        y: 0,
        ease: punchgs.Bounce.easeOut,
        overwrite: 'all'
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: - 90,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        z: 0.001,
        transformOrigin: '50% 0%'
      },
      0.3,
      {
        rotationX: 0,
        autoAlpha: 1,
        y: 0,
        ease: punchgs.Bounce.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-flipdown',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: - 90,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        z: 0.001,
        transformOrigin: '50% 0%'
      },
      {
        rotationX: 0,
        autoAlpha: 1,
        y: 0,
        ease: punchgs.Bounce.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        rotationX: - 90,
        z: 0,
        ease: punchgs.Power2.easeOut,
        autoAlpha: 0,
        overwrite: 'all'
      },
      !0
    ],
    [
      '.esg-flipdownout',
      0.5,
      {
        scale: 1,
        rotationX: 0,
        autoAlpha: 1,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      {
        x: 0,
        y: 0,
        scale: 0.8,
        rotationZ: 0,
        rotationX: 90,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        z: 0.001,
        transformOrigin: '50% 100%'
      },
      0.3,
      {
        scale: 1,
        rotationX: 0,
        autoAlpha: 1,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-flipright',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 0.8,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 90,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '0% 50%'
      },
      {
        scale: 1,
        rotationY: 0,
        autoAlpha: 1,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        scale: 0.8,
        rotationY: 90,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      !0
    ],
    [
      '.esg-fliprightout',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        rotationY: 0,
        autoAlpha: 1,
        transformOrigin: '100% 50%'
      },
      {
        scale: 1,
        rotationY: - 90,
        autoAlpha: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        scale: 1,
        z: 0,
        rotationY: 0,
        autoAlpha: 1,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-flipleft',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: - 90,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '100% 50%'
      },
      {
        rotationY: 0,
        autoAlpha: 1,
        z: 0.001,
        scale: 1,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        rotationY: - 90,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      !0
    ],
    [
      '.esg-flipleftout',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        rotationY: 0,
        autoAlpha: 1,
        transformOrigin: '0% 50%'
      },
      {
        scale: 1,
        rotationY: 90,
        autoAlpha: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        scale: 1,
        z: 0,
        rotationY: 0,
        autoAlpha: 1,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-turn',
      0.5,
      {
        x: 50,
        y: 0,
        scale: 0,
        rotationZ: 0,
        rotationX: 0,
        rotationY: - 40,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
      },
      {
        scale: 1,
        x: 0,
        rotationY: 0,
        autoAlpha: 1,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      0.3,
      {
        scale: 0,
        rotationY: - 40,
        autoAlpha: 1,
        z: 0,
        x: 50,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      !0
    ],
    [
      '.esg-turnout',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
      },
      {
        scale: 1,
        rotationY: 40,
        scale: 0.6,
        autoAlpha: 0,
        x: - 50,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      0.3,
      {
        scale: 1,
        rotationY: 0,
        z: 0,
        autoAlpha: 1,
        x: 0,
        rotationX: 0,
        rotationZ: 0,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slide',
      0.5,
      {
        x: - 10000,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 1,
        x: - 10000,
        y: 0,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideout',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideright',
      0.5,
      {
        xPercent: - 50,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        xPercent: - 50,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-sliderightout',
      0.5,
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        xPercent: 50,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-scaleleft',
      0.5,
      {
        x: 0,
        y: 0,
        scaleX: 0,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '100% 50%'
      },
      {
        autoAlpha: 1,
        x: 0,
        scaleX: 1,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 1,
        x: 0,
        z: 0,
        scaleX: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-scaleright',
      0.5,
      {
        x: 0,
        y: 0,
        scaleX: 0,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '0% 50%'
      },
      {
        autoAlpha: 1,
        x: 0,
        scaleX: 1,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 1,
        x: 0,
        z: 0,
        scaleX: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideleft',
      0.5,
      {
        xPercent: 50,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        xPercent: 50,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideleftout',
      0.5,
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        xPercent: - 50,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideup',
      0.5,
      {
        x: 0,
        yPercent: 50,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        yPercent: 50,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideupout',
      0.5,
      {
        autoAlpha: 1,
        yPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        x: 0,
        yPercent: - 50,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        yPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slidedown',
      0.5,
      {
        x: 0,
        yPercent: - 50,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        yPercent: - 50,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slidedownout',
      0.5,
      {
        autoAlpha: 1,
        yPercent: 0,
        z: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        x: 0,
        yPercent: 50,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        z: 10,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        yPercent: 0,
        z: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideshortright',
      0.5,
      {
        x: - 30,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        x: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        x: - 30,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideshortrightout',
      0.5,
      {
        autoAlpha: 1,
        x: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        x: 30,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        x: 30,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideshortleft',
      0.5,
      {
        x: 30,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        x: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        x: 30,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideshortleftout',
      0.5,
      {
        autoAlpha: 1,
        x: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        x: - 30,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        x: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideshortup',
      0.5,
      {
        x: 0,
        y: 30,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        y: 30,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideshortupout',
      0.5,
      {
        autoAlpha: 1,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        x: 0,
        y: - 30,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideshortdown',
      0.5,
      {
        x: 0,
        y: - 30,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        y: - 30,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-slideshortdownout',
      0.5,
      {
        autoAlpha: 1,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        x: 0,
        y: 30,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-skewright',
      0.5,
      {
        xPercent: - 100,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 60,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        skewX: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        skewX: - 60,
        xPercent: - 100,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-skewrightout',
      0.5,
      {
        autoAlpha: 1,
        xPercent: 0,
        skewX: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        xPercent: 100,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: - 60,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        xPercent: 0,
        skewX: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-skewleft',
      0.5,
      {
        xPercent: 100,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: - 60,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        skewX: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        xPercent: 100,
        z: 0,
        skewX: 60,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-skewleftout',
      0.5,
      {
        autoAlpha: 1,
        xPercent: 0,
        skewX: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        xPercent: - 100,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 60,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        xPercent: 0,
        skewX: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-shifttotop',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 1,
        y: 0,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-rollleft',
      0.5,
      {
        xPercent: 50,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        rotationZ: 90,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        rotationZ: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        xPercent: 50,
        z: 0,
        rotationZ: 90,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-rollleftout',
      0.5,
      {
        autoAlpha: 1,
        xPercent: 0,
        rotationZ: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        xPercent: 50,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        rotationZ: 90,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        xPercent: 0,
        rotationZ: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-rollright',
      0.5,
      {
        xPercent: - 50,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        rotationZ: - 90,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        rotationZ: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        xPercent: - 50,
        rotationZ: - 90,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-rollrightout',
      0.5,
      {
        autoAlpha: 1,
        xPercent: 0,
        rotationZ: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      {
        xPercent: - 50,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        rotationZ: - 90,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        xPercent: 0,
        rotationZ: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-falldown',
      0.4,
      {
        x: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        yPercent: - 100
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.4,
      {
        yPercent: - 100,
        autoAlpha: 0,
        z: 0,
        ease: punchgs.Power2.easeOut,
        delay: 0.2,
        overwrite: 'all'
      }
    ],
    [
      '.esg-falldownout',
      0.4,
      {
        autoAlpha: 1,
        yPercent: 0,
        ease: punchgs.Back.easeOut,
        overwrite: 'all'
      },
      {
        x: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        yPercent: 100
      },
      0.4,
      {
        autoAlpha: 1,
        yPercent: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-rotatescale',
      0.3,
      {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        rotationZ: 80,
        scale: 0.6,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        scale: 1,
        rotationZ: 0,
        ease: punchgs.Back.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 0,
        scale: 0.6,
        z: 0,
        rotationZ: 80,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-rotatescaleout',
      0.3,
      {
        autoAlpha: 1,
        scale: 1,
        rotationZ: 0,
        ease: punchgs.Back.easeOut,
        overwrite: 'all'
      },
      {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        rotationZ: 80,
        scale: 0.6,
        transformOrigin: '50% 50%'
      },
      0.3,
      {
        autoAlpha: 1,
        scale: 1,
        rotationZ: 0,
        ease: punchgs.Back.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-zoomintocorner',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '20% 50%'
      },
      {
        autoAlpha: 1,
        scale: 1.2,
        x: 0,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.5,
      {
        autoAlpha: 0,
        x: 0,
        y: 0,
        scale: 1,
        autoAlpha: 1,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-zoomouttocorner',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1.2,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '80% 50%'
      },
      {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.5,
      {
        autoAlpha: 0,
        x: 0,
        y: 0,
        scale: 1.2,
        autoAlpha: 1,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-zoomtodefault',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1.2,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.5,
      {
        autoAlpha: 0,
        x: 0,
        y: 0,
        scale: 1.2,
        autoAlpha: 1,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-zoomback',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 0.2,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: punchgs.Back.easeOut,
        overwrite: 'all'
      },
      0.5,
      {
        autoAlpha: 0,
        x: 0,
        y: 0,
        scale: 0.2,
        autoAlpha: 0,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-zoombackout',
      0.5,
      {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: punchgs.Back.easeOut,
        overwrite: 'all'
      },
      {
        x: 0,
        y: 0,
        scale: 0.2,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.5,
      {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: punchgs.Back.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-zoomfront',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1.5,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.5,
      {
        autoAlpha: 0,
        x: 0,
        y: 0,
        scale: 1.5,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-zoomfrontout',
      0.5,
      {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: punchgs.Back.easeOut,
        overwrite: 'all'
      },
      {
        x: 0,
        y: 0,
        scale: 1.5,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
      },
      0.5,
      {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: punchgs.Back.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-flyleft',
      0.8,
      {
        x: - 80,
        y: 0,
        z: 0,
        scale: 0.3,
        rotationZ: 0,
        rotationY: 75,
        rotationX: 10,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0.01,
        transformOrigin: '30% 10%'
      },
      {
        x: 0,
        y: 0,
        rotationY: 0,
        z: 0.001,
        rotationX: 0,
        rotationZ: 0,
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      0.8,
      {
        autoAlpha: 0.01,
        x: - 40,
        y: 0,
        z: 300,
        rotationY: 60,
        rotationX: 20,
        overwrite: 'all'
      }
    ],
    [
      '.esg-flyleftout',
      0.8,
      {
        x: 0,
        y: 0,
        rotationY: 0,
        z: 0.001,
        rotationX: 0,
        rotationZ: 0,
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      {
        x: - 80,
        y: 0,
        z: 0,
        scale: 0.3,
        rotationZ: 0,
        rotationY: 75,
        rotationX: 10,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0.01,
        transformOrigin: '30% 10%'
      },
      0.8,
      {
        x: 0,
        y: 0,
        rotationY: 0,
        z: 0.001,
        rotationX: 0,
        rotationZ: 0,
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-flyright',
      0.8,
      {
        scale: 1,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        x: 80,
        y: 0,
        z: 0,
        scale: 0.3,
        rotationZ: 0,
        rotationY: - 75,
        rotationX: 10,
        transformOrigin: '70% 20%'
      },
      {
        x: 0,
        y: 0,
        rotationY: 0,
        z: 0.001,
        rotationX: 0,
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      0.8,
      {
        autoAlpha: 0,
        x: 40,
        y: - 40,
        z: 300,
        rotationY: - 60,
        rotationX: - 40,
        overwrite: 'all'
      }
    ],
    [
      '.esg-flyrightout',
      0.8,
      {
        x: 0,
        y: 0,
        rotationY: 0,
        z: 0.001,
        rotationX: 0,
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      },
      {
        scale: 1,
        skewX: 0,
        skewY: 0,
        autoAlpha: 0,
        x: 80,
        y: 0,
        z: 0,
        scale: 0.3,
        rotationZ: 0,
        rotationY: - 75,
        rotationX: 10,
        transformOrigin: '70% 20%'
      },
      0.8,
      {
        x: 0,
        y: 0,
        rotationY: 0,
        z: 0.001,
        rotationX: 0,
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
        ease: punchgs.Power3.easeInOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-mediazoom',
      0.3,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        scale: 1.4,
        x: 0,
        y: 0,
        ease: punchgs.Back.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        z: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-zoomandrotate',
      0.6,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
      },
      {
        autoAlpha: 1,
        scale: 1.4,
        x: 0,
        y: 0,
        rotationZ: 30,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      0.4,
      {
        x: 0,
        y: 0,
        scale: 1,
        z: 0,
        rotationZ: 0,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-pressback',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
      },
      {
        rotationY: 0,
        autoAlpha: 1,
        scale: 0.8,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        rotationY: 0,
        autoAlpha: 1,
        z: 0,
        scale: 1,
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      }
    ],
    [
      '.esg-3dturnright',
      0.5,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformPerspective: 600
      },
      {
        x: - 40,
        y: 0,
        scale: 0.8,
        rotationZ: 2,
        rotationX: 5,
        rotationY: - 28,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        transformOrigin: '100% 50% 40%',
        transformPerspective: 600,
        ease: punchgs.Power3.easeOut,
        overwrite: 'all'
      },
      0.3,
      {
        z: 0,
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        skewX: 0,
        skewY: 0,
        autoAlpha: 1,
        force3D: 'auto',
        ease: punchgs.Power2.easeOut,
        overwrite: 'all'
      },
      !0
    ]
  ];
  jQuery.fn.extend({
    tpessential: function (e) {
      return jQuery.fn.tpessential.defaults = {
        forceFullWidth: 'off',
        forceFullScreen: 'off',
        fullScreenOffsetContainer: '',
        row: 3,
        column: 4,
        space: 10,
        pageAnimation: 'fade',
        animSpeed: 600,
        delayBasic: 0.08,
        smartPagination: 'on',
        paginationScrollToTop: 'off',
        paginationScrollToTopOffset: 200,
        layout: 'even',
        rtl: 'off',
        aspectratio: 'auto',
        bgPosition: 'center center',
        bgSize: 'cover',
        videoJsPath: '',
        overflowoffset: 0,
        mainhoverdelay: 0,
        rowItemMultiplier: [
        ],
        filterGroupClass: '',
        filterType: '',
        filterLogic: 'or',
        showDropFilter: 'hover',
        evenGridMasonrySkinPusher: 'on',
        loadMoreType: 'none',
        loadMoreItems: [
        ],
        loadMoreAmount: 5,
        loadMoreTxt: 'Load More',
        loadMoreNr: 'on',
        loadMoreEndTxt: 'No More Items for the Selected Filter',
        loadMoreAjaxUrl: '',
        loadMoreAjaxToken: '',
        loadMoreAjaxAction: '',
        lazyLoad: 'off',
        lazyLoadColor: '#ff0000',
        gridID: 0,
        mediaFilter: '',
        spinner: '',
        spinnerColor: '',
        lightBoxMode: 'single',
        cobblesPattern: '',
        searchInput: '.faqsearch',
        googleFonts: '',
        googleFontJS: '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js',
        ajaxContentTarget: '',
        ajaxScrollToOnLoad: 'off',
        ajaxScrollToOffset: 100,
        ajaxCallback: '',
        ajaxCallbackArgument: 'on',
        ajaxCssUrl: '',
        ajaxJsUrl: '',
        ajaxCloseButton: 'on',
        ajaxNavButton: 'on',
        ajaxCloseTxt: 'Close',
        ajaxCloseType: 'type1',
        ajaxClosePosition: 'tr',
        ajaxCloseInner: 'true',
        ajaxCloseStyle: 'light',
        ajaxTypes: [
        ],
        cookies: {
          search: 'off',
          filter: 'off',
          pagination: 'off',
          loadmore: 'off',
          timetosave: '30'
        }
      },
      e = jQuery.extend({
      }, jQuery.fn.tpessential.defaults, e),
      'undefined' == typeof WebFontConfig && (WebFontConfig = new Object),
      this.each(function () {
        function t(e, t) {
          mainPreparing(e, t),
          t.initialised = 'ready',
          jQuery('body').trigger('essentialready', e.attr('id'))
        }
        var a = e,
        o = jQuery(this);
        if (a.contPadTop = parseInt(o.css('paddingTop'), 0), a.contPadBottom = parseInt(o.css('paddingBottom'), 0), o == undefined) return !1;
        if (o.parent().css({
          position: 'relative'
        }), 'cobbles' == a.layout ? (a.layout = 'even', a.evenCobbles = 'on')  : a.evenCobbles = 'off', 'true' != a.get && 1 != a.get) {
          if (a.get = !0, a.filterGroupClass == undefined || 0 == a.filterGroupClass.length ? a.filterGroupClass = '#' + o.attr('id')  : a.filterGroupClass = '.' + a.filterGroupClass, 1 == window.tplogs) try {
            console.groupCollapsed('Essential Grid  2.0.5 Initialisation on ' + o.attr('id')),
            console.groupCollapsed('Used Options:'),
            console.info(e),
            console.groupEnd(),
            console.groupCollapsed('Tween Engine:')
          } catch (r) {
          }
          if (punchgs.TweenLite == undefined) {
            if (1 == window.tplogs) try {
              console.error('GreenSock Engine Does not Exist!')
            } catch (r) {
            }
            return !1
          }
          if (punchgs.force3D = !0, 1 == window.tplogs) try {
            console.info('GreenSock Engine Version in Essential Grid:' + punchgs.TweenLite.version)
          } catch (r) {
          }
          if (punchgs.TweenLite.lagSmoothing(2000, 16), punchgs.force3D = 'auto', 1 == window.tplogs) try {
            console.groupEnd(),
            console.groupEnd()
          } catch (r) {
          }
          jQuery('body').data('fullScreenMode', !1),
          jQuery(window).on('mozfullscreenchange webkitfullscreenchange fullscreenchange', function () {
            jQuery('body').data('fullScreenMode', !jQuery('body').data('fullScreenMode'))
          }),
          a.esgloader = buildLoader(o.parent(), a),
          a.firstshowever == undefined && jQuery(a.filterGroupClass + '.esg-navigationbutton,' + a.filterGroupClass + ' .esg-navigationbutton').css({
            visibility: 'hidden'
          }),
          o.parent().append('<div class="esg-relative-placeholder" style="width:100%;height:auto"></div>'),
          o.wrap('<div class="esg-container-fullscreen-forcer" style="position:relative;left:0px;top:0px;width:100%;height:auto;"></div>');
          var i = o.parent().parent().find('.esg-relative-placeholder').offset().left;
          ('on' == a.forceFullWidth || 'on' == a.forceFullScreen) && o.closest('.esg-container-fullscreen-forcer').css({
            left: 0 - i,
            width: jQuery(window).width()
          }),
          a.animDelay = 0 == a.delayBasic ? 'off' : 'on',
          a.container = o,
          a.mainul = o.find('ul').first(),
          a.mainul.addClass('mainul').wrap('<div class="esg-overflowtrick"></div>');
          var s = jQuery(a.filterGroupClass + '.esg-navbutton-solo-left,' + a.filterGroupClass + ' .esg-navbutton-solo-left'),
          n = jQuery(a.filterGroupClass + '.esg-navbutton-solo-right,' + a.filterGroupClass + ' .esg-navbutton-solo-right');
          s.length > 0 && (s.css({
            marginTop: 0 - s.height() / 2
          }), s.appendTo(o.find('.esg-overflowtrick'))),
          n.length > 0 && (n.css({
            marginTop: 0 - n.height() / 2
          }), n.appendTo(o.find('.esg-overflowtrick'))),
          punchgs.CSSPlugin.defaultTransformPerspective = 1200,
          a.animSpeed = a.animSpeed / 1000,
          a.delayBasic = a.delayBasic / 100,
          setOptions(o, a),
          a.filter = a.statfilter,
          a.origcolumn = a.column,
          a.currentpage = 0,
          o.addClass('esg-layout-' + a.layout);
          loadVideoApis(o, a);
          if ('even' == a.layout && 'on' == a.forceFullScreen) {
            var l = jQuery(window).height();
            if (a.fullScreenOffsetContainer != undefined) try {
              var u = a.fullScreenOffsetContainer.split(',');
              u && jQuery.each(u, function (e, t) {
                l -= jQuery(t).outerHeight(!0),
                l < a.minFullScreenHeight && (l = a.minFullScreenHeight)
              })
            } catch (r) {
            }
            var d = o.find('.esg-overflowtrick').first(),
            c = o.find('ul').first();
            d.css({
              display: 'block',
              height: l + 'px'
            }),
            c.css({
              display: 'block',
              height: l + 'px'
            }),
            o.closest('.eg-grid-wrapper, .myportfolio-container').css({
              height: 'auto'
            }).removeClass('eg-startheight')
          }
          if (0 != a.googleFonts.length && 'masonry' == a.layout) {
            var p = (a.googleFonts.length, !0);
            if (jQuery('head').find('*').each(function () {
              jQuery(this).attr('src') != undefined && jQuery(this).attr('src').indexOf('webfont.js') > 0 && (p = !1)
            }), WebFontConfig.active == undefined && p) {
              WebFontConfig = {
                google: {
                  families: a.googleFonts
                },
                active: function () {
                  t(o, a)
                },
                inactive: function () {
                  t(o, a)
                },
                timeout: 1500
              };
              var h = document.createElement('script');
              h.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js',
              h.type = 'text/javascript',
              h.async = 'true';
              var g = document.getElementsByTagName('script') [0];
              g.parentNode.insertBefore(h, g)
            } else t(o, a)
          } else t(o, a);
          'button' == a.loadMoreType ? (o.append('<div class="esg-loadmore-wrapper" style="text-align:center"><div class="esg-navigationbutton esg-loadmore">LOAD MORE</div></div>'), a.lmbut = a.container.find('.esg-loadmore'), a.lmtxt = a.loadMoreTxt + ' (' + checkMoreToLoad(a).length + ')', 'off' == a.loadMoreNr && (a.lmtxt = a.loadMoreTxt), a.lmbut.html(a.lmtxt), a.lmbut.click(function () {
            1 != a.lmbut.data('loading') && loadMoreItems(a)
          }), 0 == checkMoreToLoad(a).length && a.lmbut.remove())  : 'scroll' == a.loadMoreType && (o.append('<div style="display:inline-block" class="esg-navigationbutton esg-loadmore">LOAD MORE</div>'), a.lmbut = a.container.find('.esg-loadmore'), a.lmtxt = a.loadMoreTxt + ' (' + checkMoreToLoad(a).length + ')', 'off' == a.loadMoreNr && (a.lmtxt = a.loadMoreTxt), a.lmbut.html(a.lmtxt), jQuery(document, window).scroll(function () {
            checkBottomPos(a, !0)
          }), 0 == checkMoreToLoad(a).length && a.lmbut.remove()),
          checkAvailableFilters(o, a),
          tabBlurringCheck(o, a)
        }
      })
    },
    esappend: function (e) {
      var t = jQuery(this);
      return prepareItemsInGrid(opt, !0),
      organiseGrid(opt, 'esappend'),
      prepareSortingAndOrders(t),
      opt.lastslide
    },
    esskill: function () {
      var e = jQuery(this);
      e.find('*').each(function () {
        jQuery(this).off('click, focus, focusin, hover, play, ended, stop, pause, essentialready'),
        jQuery(this).remove()
      }),
      e.remove(),
      e.html(),
      e = null
    },
    esreadsettings: function (e) {
      e = e == undefined ? new Object : e;
      var t = jQuery(this),
      a = getOptions(t);
      return a
    },
    esredraw: function (e) {
      e = e == undefined ? new Object : e;
      var t = jQuery(this),
      a = getOptions(t);
      if (a !== undefined) {
        if (e != undefined) {
          if (e.space != undefined && (a.space = parseInt(e.space, 0)), e.row != undefined && (a.row = parseInt(e.row, 0)), e.rtl != undefined && (a.rtl = e.rtl), e.aspectratio != undefined && (a.aspectratio = e.aspectratio), e.forceFullWidth != undefined) if (a.forceFullWidth = e.forceFullWidth, 'on' == a.forceFullWidth) {
            var o = t.parent().parent().find('.esg-relative-placeholder').offset().left;
            t.closest('.esg-container-fullscreen-forcer').css({
              left: 0 - o,
              width: jQuery(window).width()
            })
          } else t.closest('.esg-container-fullscreen-forcer').css({
            left: 0,
            width: 'auto'
          });
          if (e.rowItemMultiplier != undefined && (a.rowItemMultiplier = e.rowItemMultiplier), e.responsiveEntries != undefined && (a.responsiveEntries = e.responsiveEntries), e.column != undefined) {
            if (e.column <= 0 || e.column >= 20) {
              var r = getBestFitColumn(a, jQuery(window).width(), 'id');
              a.column = r.column,
              a.columnindex = r.index,
              a.mmHeight = r.mmHeight
            } else a.column = parseInt(e.column, 0);
            a.origcolumn = a.column
          }
          e.animSpeed != undefined && (a.animSpeed = e.animSpeed / 1000),
          e.delayBasic != undefined && (a.delayBasic = e.delayBasic / 100),
          e.pageAnimation != undefined && (a.pageAnimation = e.pageAnimation),
          e.changedAnim != undefined && (a.changedAnim = e.changedAnim),
          1 == e.silent && (a.silent = !0)
        }
        a.started = !0,
        setOptions(t, a),
        setItemsOnPages(a),
        organiseGrid(a, 'esredraw')
      }
    },
    esquickdraw: function (e) {
      var t = jQuery(this),
      a = getOptions(t);
      a.silent = !0,
      setOptions(t, a),
      setItemsOnPages(a),
      organiseGrid(a, 'esquickdraw')
    },
    esreinit: function (e) {
      var t = jQuery(this);
      return prepareItemsInGrid(opt, !0),
      organiseGrid(opt, 'esreinit'),
      prepareSortingAndOrders(t),
      opt.lastslide
    },
    somemethodb: function (e) {
      return this.each(function () {
        jQuery(this)
      })
    }
  });
  var vis = function () {
    var e,
    t,
    a = {
      hidden: 'visibilitychange',
      webkitHidden: 'webkitvisibilitychange',
      mozHidden: 'mozvisibilitychange',
      msHidden: 'msvisibilitychange'
    };
    for (e in a) if (e in document) {
      t = a[e];
      break
    }
    return function (a) {
      return a && document.addEventListener(t, a),
      !document[e]
    }
  }(),
  tabBlurringCheck = function () {
    var e = document.documentMode === undefined,
    t = window.chrome;
    jQuery('body').hasClass('esg-blurlistenerexists') || (jQuery('body').addClass('esg-blurlistenerexists'), e && !t ? jQuery(window).on('focusin', function () {
      setTimeout(function () {
        jQuery('body').find('.esg-grid.esg-container').each(function () {
          jQuery(this).esquickdraw()
        })
      }, 300)
    }).on('focusout', function () {
    })  : window.addEventListener ? window.addEventListener('focus', function (e) {
      setTimeout(function () {
        jQuery('body').find('.esg-grid.esg-container').each(function () {
          jQuery(this).esquickdraw()
        })
      }, 300)
    }, !1)  : window.attachEvent('focus', function (e) {
      setTimeout(function () {
        jQuery('body').find('.esg-grid.esg-container').each(function () {
          jQuery(this).esquickdraw()
        })
      }, 300)
    }))
  },
  is_mobile = function () {
    var e = [
      'android',
      'webos',
      'iphone',
      'ipad',
      'blackberry',
      'Android',
      'webos',
      ,
      'iPod',
      'iPhone',
      'iPad',
      'Blackberry',
      'BlackBerry'
    ],
    t = !1;
    for (i in e) navigator.userAgent.split(e[i]).length > 1 && (t = !0);
    return t
  },
  waitForLoads = function (e, t) {
    jQuery.each(e, function (e, a) {
      a = jQuery(a),
      a.hasClass('isvisiblenow') || 'add' === t.esgloaderprocess || (t.esgloaderprocess = 'add', punchgs.TweenLite.to(t.esgloader, 0.5, {
        autoAlpha: 1,
        ease: punchgs.Power3.easeInOut
      }))
    });
    var a = setInterval(function () {
      t.bannertimeronpause = !0,
      t.cd = 0;
      var o = 0;
      if (e.find('.esg-media-poster').each(function (e) {
        var a = jQuery(this),
        r = a.attr('src'),
        i = a.parent();
        if (1 != a.data('lazydone') && 'on' == t.lazyLoad && i.find('.lazyloadcover').length < 1) {
          lthumb = a.data('lazythumb');
          var s = '',
          n = '';
          lthumb != undefined && (r = a.data('lazysrc'), s = ';background-image:url(' + lthumb + ')', n = 'esg-lazyblur'),
          i.append('<div class="lazyloadcover ' + n + '" style="background-color:' + t.lazyLoadColor + s + '"></div>')
        }
        1 != a.data('lazydone') && 3 > o && (o++, loadAllPrepared(jQuery(this), t)),
        'on' !== t.lazyLoad && punchgs.TweenLite.set(a, {
          autoAlpha: 1
        })
      }), 0 == o && t.esgloader.length > 0 && 'remove' !== t.esgloaderprocess) {
        t.esgloaderprocess = 'remove';
        var r = 0;
        t.esgloader.hasClass('infinityscollavailable') && (r = 1),
        punchgs.TweenLite.to(t.esgloader, 0.5, {
          autoAlpha: 0,
          ease: punchgs.Power3.easeInOut,
          delay: r
        })
      }
      0 != o || e.closest('.mainul').hasClass('gridorganising') || (clearInterval(a), runGrid(t))
    }, 50);
    runGrid(t)
  }
}(jQuery),
function (e, t) {
  'use strict';
  function a(e) {
    return e && e.toLowerCase ? e.toLowerCase()  : e
  }
  function o(e, t) {
    for (var a = 0, o = e.length; o > a; a++) if (e[a] == t) return !r;
    return r
  }
  var r = !1,
  i = null,
  s = parseFloat,
  n = Math.min,
  l = /(-?\d+\.?\d*)$/g,
  u = /(\d+\.?\d*)$/g,
  d = [
  ],
  c = [
  ],
  p = function (e) {
    return 'string' == typeof e
  },
  h = function (e, t) {
    for (var a, o = e.length, r = o; r--; ) a = o - r - 1,
    t(e[a], a)
  },
  g = Array.prototype.indexOf || function (e) {
    var t = this.length,
    a = Number(arguments[1]) || 0;
    for (a = 0 > a ? Math.ceil(a)  : Math.floor(a), 0 > a && (a += t); t > a; a++) if (a in this && this[a] === e) return a;
    return - 1
  };
  e.tinysort = {
    id: 'TinySort',
    version: '1.5.6',
    copyright: 'Copyright (c) 2008-2013 Ron Valstar',
    uri: 'http://tinysort.sjeiti.com/',
    licensed: {
      MIT: 'http://www.opensource.org/licenses/mit-license.php',
      GPL: 'http://www.gnu.org/licenses/gpl.html'
    },
    plugin: function () {
      var e = function (e, t) {
        d.push(e),
        c.push(t)
      };
      return e.indexOf = g,
      e
    }(),
    defaults: {
      order: 'asc',
      attr: i,
      data: i,
      useVal: r,
      place: 'start',
      returns: r,
      cases: r,
      forceStrings: r,
      ignoreDashes: r,
      sortFunction: i
    }
  },
  e.fn.extend({
    tinysort: function () {
      var f,
      m,
      w,
      v,
      y = this,
      b = [
      ],
      x = [
      ],
      j = [
      ],
      C = [
      ],
      k = 0,
      A = [
      ],
      O = [
      ],
      T = function (e) {
        h(d, function (t) {
          t.call(t, e)
        })
      },
      P = function (e, t) {
        return 'string' == typeof t && (e.cases || (t = a(t)), t = t.replace(/^\s*(.*?)\s*$/i, '$1')),
        t
      },
      Q = function (e, t) {
        var a = 0;
        for (0 !== k && (k = 0); 0 === a && v > k; ) {
          var o = C[k],
          i = o.oSettings,
          n = i.ignoreDashes ? u : l;
          if (T(i), i.sortFunction) a = i.sortFunction(e, t);
           else if ('rand' == i.order) a = Math.random() < 0.5 ? 1 : - 1;
           else {
            var d = r,
            g = P(i, e.s[k]),
            f = P(i, t.s[k]);
            if (!i.forceStrings) {
              var m = p(g) ? g && g.match(n)  : r,
              w = p(f) ? f && f.match(n)  : r;
              if (m && w) {
                var y = g.substr(0, g.length - m[0].length),
                b = f.substr(0, f.length - w[0].length);
                y == b && (d = !r, g = s(m[0]), f = s(w[0]))
              }
            }
            a = o.iAsc * (f > g ? - 1 : g > f ? 1 : 0)
          }
          h(c, function (e) {
            a = e.call(e, d, g, f, a)
          }),
          0 === a && k++
        }
        return a
      };
      for (f = 0, w = arguments.length; w > f; f++) {
        var I = arguments[f];
        p(I) ? A.push(I) - 1 > O.length && (O.length = A.length - 1)  : O.push(I) > A.length && (A.length = O.length)
      }
      for (A.length > O.length && (O.length = A.length), v = A.length, 0 === v && (v = A.length = 1, O.push({
      })), f = 0, w = v; w > f; f++) {
        var L = A[f],
        z = e.extend({
        }, e.tinysort.defaults, O[f]),
        Y = !(!L || '' === L),
        X = Y && ':' === L[0];
        C.push({
          sFind: L,
          oSettings: z,
          bFind: Y,
          bAttr: !(z.attr === i || '' === z.attr),
          bData: z.data !== i,
          bFilter: X,
          $Filter: X ? y.filter(L)  : y,
          fnSort: z.sortFunction,
          iAsc: 'asc' == z.order ? 1 : - 1
        })
      }
      return y.each(function (a, o) {
        var r,
        i = e(o),
        s = i.parent().get(0),
        n = [
        ];
        for (m = 0; v > m; m++) {
          var l = C[m],
          u = l.bFind ? l.bFilter ? l.$Filter.filter(o)  : i.find(l.sFind)  : i;
          n.push(l.bData ? u.data(l.oSettings.data)  : l.bAttr ? u.attr(l.oSettings.attr)  : l.oSettings.useVal ? u.val()  : u.text()),
          r === t && (r = u)
        }
        var d = g.call(j, s);
        0 > d && (d = j.push(s) - 1, x[d] = {
          s: [
          ],
          n: [
          ]
        }),
        r.length > 0 ? x[d].s.push({
          s: n,
          e: i,
          n: a
        })  : x[d].n.push({
          e: i,
          n: a
        })
      }),
      h(x, function (e) {
        e.s.sort(Q)
      }),
      h(x, function (e) {
        var t = e.s,
        a = e.n,
        i = t.length,
        s = a.length,
        l = i + s,
        u = [
        ],
        d = l,
        c = [
          0,
          0
        ];
        switch (z.place) {
          case 'first':
            h(t, function (e) {
              d = n(d, e.n)
            });
            break;
          case 'org':
            h(t, function (e) {
              u.push(e.n)
            });
            break;
          case 'end':
            d = s;
            break;
          default:
            d = 0
        }
        for (f = 0; l > f; f++) {
          var p = o(u, f) ? !r : f >= d && d + i > f,
          g = p ? 0 : 1,
          m = (p ? t : a) [c[g]].e;
          m.parent().append(m),
          (p || !z.returns) && b.push(m.get(0)),
          c[g]++
      }
    }), y.length = 0, Array.prototype.push.apply(y, b), y
  }
}), e.fn.TinySort = e.fn.Tinysort = e.fn.tsort = e.fn.tinysort
}(jQuery);
var essapi_1;
jQuery(document).ready(function() {
	essapi_1 = jQuery("#esg-grid-1-1").tpessential({
        gridID:1,
        layout:"cobbles",
        forceFullWidth:"off",
        lazyLoad:"off",
        row:3,
        loadMoreAjaxToken:"3d23f5c156",
        loadMoreAjaxUrl:"http://www.highgradelab.com/tavern/main-demo/wp-admin/admin-ajax.php",
        loadMoreAjaxAction:"Essential_Grid_Front_request_ajax",
        ajaxContentTarget:"ess-grid-ajax-container-",
        ajaxScrollToOffset:"0",
        ajaxCloseButton:"off",
        ajaxContentSliding:"on",
        ajaxScrollToOnLoad:"on",
        ajaxNavButton:"off",
        ajaxCloseType:"type1",
        ajaxCloseInner:"false",
        ajaxCloseStyle:"light",
        ajaxClosePosition:"tr",
        space:5,
        pageAnimation:"fade",
        paginationScrollToTop:"off",
        spinner:"spinner3",
        spinnerColor:"#b78f52",
        lightBoxMode:"all",
        animSpeed:1000,
        delayBasic:1,
        mainhoverdelay:1,
        filterType:"single",
        showDropFilter:"hover",
        filterGroupClass:"esg-fgc-1",
        googleFonts:['Open+Sans:300,400,600,700,800','Raleway:100,200,300,400,500,600,700,800,900','Droid+Serif:400,700','Dancing+Script','Merriweather:400,300,300italic,400italic,700,700italic,900,900italic'],
        aspectratio:"4:3",
        responsiveEntries: [
						{ width:1400,amount:3,mmheight:0},
						{ width:1170,amount:3,mmheight:0},
						{ width:1024,amount:3,mmheight:0},
						{ width:960,amount:3,mmheight:0},
						{ width:778,amount:3,mmheight:0},
						{ width:640,amount:3,mmheight:0},
						{ width:480,amount:1,mmheight:0}
						]
	});

	try{
	jQuery("#esg-grid-1-1 .esgbox").esgbox({
		padding : [0,0,0,0],
 		width:800,
 		height:600,
 		minWidth:100,
 		minHeight:100,
 		maxWidth:9999,
 		maxHeight:9999,
 		autoPlay:false,
 		playSpeed:3000,
 		preload:3,
      beforeLoad:function() { 
		 },
      afterLoad:function() { 
 		if (this.element.hasClass("esgboxhtml5")) {
			this.type ="html5";
		   var mp = this.element.data("mp4"),
		      ogv = this.element.data("ogv"),
		      webm = this.element.data("webm");
		      ratio = this.element.data("ratio");
		      ratio = ratio==="16:9" ? "56.25%" : "75%"
         this.content ='<div class="esg-lb-video-wrapper" style="width:100%"><video autoplay="true" loop=""  poster="" width="100%" height="auto"><source src="'+mp+'" type="video/mp4"><source src="'+webm+'" type="video/webm"><source src="'+ogv+'" type="video/ogg"></video></div>';
		   };
		 },
		beforeShow : function () { 
			this.title = jQuery(this.element).attr('lgtitle');
			if (this.title) {
   		this.title =  '<div style="padding:0px 0px 0px 0px">'+this.title+'</div>';
			}
		},
		afterShow : function() {
		},
		openEffect : 'fade',
		closeEffect : 'fade',
		nextEffect : 'fade',
		prevEffect : 'fade',
		openSpeed : 'normal',
		closeSpeed : 'normal',
		nextSpeed : 'normal',
		prevSpeed : 'normal',
		helpers:{overlay:{locked:false}},
		helpers : {
			media : {},
			overlay: {
				locked: false
			},
		    title : {
				type:"inside",
				position:"bottom",
			}
		}
});

 } catch (e) {}

});