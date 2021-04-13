(function(BCS, document, jQuery, undefined) {
    "use strict";

    var banner_datas = [

            {
                href: "https://www.dlsite.com/home/circle/profile/=/maker_id/RG40614.html/?cho_191205",
                href_attributes: [
                   {
                       name: "target",
                       value: "_blank"
                   }                ],
                src: "//media.dlsite.com/bcs/chobit/1561820400/bn_0259c63c38fb83a2a28744dc77b3e42e52451d5c.jpg",
                ssl_src: "//media.dlsite.com/bcs/chobit/1561820400/bn_0259c63c38fb83a2a28744dc77b3e42e52451d5c.jpg",
                alt: "お兄ちゃんはおしまいシリーズ",
                title: "お兄ちゃんはおしまいシリーズ",

                width: "650",
                height: "208",
                enclosure: '<div class="banner">{field}</div>'
            }
        ],
        data_key = 'chobit_chobit_cbt-top-sp'
    ;

    function parseHTML(html) {
        var fragment = document.createDocumentFragment();
        var tmp = fragment.appendChild(document.createElement('div'));
        tmp.innerHTML = html;
        return tmp;
    }

    var _build = function (){
        var $banners = [];
        var i=0, j=0;
        for ( i=0 ; i < banner_datas.length ; i++) {
            var dat = banner_datas[i];
            var $child = document.createElement('a'),
                $banner = document.createElement('img');

            $child.href = dat.href.replace(/&amp;/g, '&');
            if( dat.href_attributes instanceof Array ){
                var href_attr = dat.href_attributes;
                for ( var ii=0 ; ii < href_attr.length ; ii++) {
                    var attr = href_attr[ii];
                    if(typeof attr !== "undefined") {
                        $child.setAttribute(attr.name, attr.value);
                    }
                }
            }

            $banner.src = ("https:" == document.location.protocol) ? document.location.protocol + dat.ssl_src : document.location.protocol + dat.src;
            $banner.alt = dat.alt;
            $banner.title = dat.title;
            if(typeof dat.width !== "undefined") {
                $banner.width = dat.width;
            }
            if(typeof dat.height !== "undefined") {
                $banner.height = dat.height;
            }
            if( dat.img_attributes instanceof Array ){
                var img_attr = dat.img_attributes;
                for ( var ii=0 ; ii < img_attributes.length ; ii++) {
                    var attr = img_attr[ii];
                    if(typeof attr !== "undefined") {
                        $banner.setAttribute(attr.name, attr.value);
                    }
                }
            }

            $child.appendChild($banner);
            $banners[i] = $child;
        }

        BCS.$banners = $banners;
        return true;
    };

    var _render = function (){
        if( typeof document.getElementsByClassName !== "undefined") {
            var $fobj = document.getElementsByClassName(BCS.Const.BCS_TARGET_CLASS_NAME);
        } else {
            var $fobj = BCS.getElementsByClassName(BCS.Const.BCS_TARGET_CLASS_NAME);
        }

        var $elm;
        var $banner;
        var fragment;
        var tmp;
        var filter_href;
        var empty_list;
        var delNode;
        for (var i = 0;i < $fobj.length; i++) {
            $elm = $fobj[i];
            if( $elm.getAttribute('data-key') === data_key ){

                // random
                if($elm.getAttribute('data-ext-action') == 'random' ) {
                    var num = Math.floor( Math.random() * BCS.$banners.length );
                    if( typeof BCS.$banners[num] !== "undefined" ) {
                        $banner = BCS.$banners[num].cloneNode(true);
                        tmp = parseHTML(banner_datas[num].enclosure.replace(/{field}/, $banner.outerHTML));
                        while( tmp.firstChild != null ) {
                            $elm.appendChild(tmp.firstChild);
                        }
                    }
                // url filter 
                } else if( $elm.getAttribute('data-ext-filter-url') !== null ) {
                    for (var ii = 0;ii < BCS.$banners.length; ii++) {
                        if( typeof BCS.$banners[ii] !== "undefined" ) {
                          $banner = BCS.$banners[ii].cloneNode(true);
                          filter_href = $banner.getAttribute('href');
                          if( filter_href.indexOf($elm.getAttribute('data-ext-filter-url')) != -1 ) {
                              tmp = parseHTML(banner_datas[ii].enclosure.replace(/{field}/, $banner.outerHTML));
                              while( tmp.firstChild != null ) {
                                  $elm.appendChild(tmp.firstChild);
                              }
                          }
                        }
                    }
                // site_id replace
                } else if( $elm.getAttribute('data-ext-replace-siteid') !== null ) {
                    for (var ii = 0;ii < BCS.$banners.length; ii++) {
                        if( typeof BCS.$banners[ii] !== "undefined" ) {
                          $banner = BCS.$banners[ii].cloneNode(true);
                          var filter_href = document.createElement('a');
                          filter_href.href = $banner.getAttribute('href');
                          filter_href.pathname = filter_href.pathname.replace(/girls-pro|gay|maniax-touch|home-touch|books-touch|comic-touch|pro-touch|soft-touch|girls-touch|girls-pro-touch|gay-touch|ecchi-eng-touch|eng-touch|maniax|home|books|comic|pro|soft|girls|eng|gay-eng|ecchi-eng/, $elm.getAttribute('data-ext-replace-siteid'));
                          $banner.setAttribute('href', filter_href.href);
                          tmp = parseHTML(banner_datas[ii].enclosure.replace(/{field}/, $banner.outerHTML));
                          while( tmp.firstChild != null ) {
                              $elm.appendChild(tmp.firstChild);
                          }
                        }
                    }
                } else {
                    for (var ii = 0;ii < BCS.$banners.length; ii++) {
                        if( typeof BCS.$banners[ii] !== "undefined" ) {
                          $banner = BCS.$banners[ii].cloneNode(true);
                          tmp = parseHTML(banner_datas[ii].enclosure.replace(/{field}/, $banner.outerHTML));
                          while( tmp.firstChild != null ) {
                              $elm.appendChild(tmp.firstChild);
                          }
                        }
                    }
                }

                // バナーが2個以上なら、呼出し元の要素にclassを付与する
                if( $elm.getAttribute('data-ext-ismulti-addclass') !== null ) {
                    if( 2 <= BCS.$banners.length ) {
                        $elm.className = $elm.className + ' ' + $elm.getAttribute('data-ext-ismulti-addclass');
                    }
                }

                // バナーが1つもなければ、指定されたIDの要素を含めてすべて削除
                // スペース区切りで複数の要素削除可能
                if( $elm.getAttribute('data-ext-empty') !== null ) {
                    //削除したいID要素取得
                    empty_list = $elm.getAttribute('data-ext-empty').split(" ");
                    if( $elm.children.length == 0) {
                        for (var ii = 0;ii < empty_list.length; ii++) {
                            if( empty_list[ii] != "" ) {
                                delNode = document.getElementById( empty_list[ii] );
                                if ( delNode !== null ) {
                                    delNode.parentNode.removeChild(delNode);
                                }
                            }
                        }
                    }
                }

                // callback
                if( $elm.getAttribute('data-ext-callback') !== null ) {
                    __callback($elm.getAttribute('data-ext-callback'));
                }
            }
        }
        return true;
    };

    //callback function[ jQuery Only ]
    var __callback = function (callback){
        if(typeof jQuery === 'function') {
            jQuery(window).triggerHandler(callback);
        }
    };

/* === run === */

    (function(){
        _build();
        _render();
    })();

})(this.BCS, document, this.BCS.jQuery);