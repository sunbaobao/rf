/**
 * Created by uu on 2017/6/15.
 */

!function ($, w) {
    var document = window.document;
    var v = "1.0.0";
    var cache = {
        user: {
            id: "",
            username: "",
            avatar: "",
            lv: "",
            sign: ""
        }
    };
    var myChat = function () {
        this.v = v;
        return this;
    };
    myChat.prototype.cache = function () {
        return cache;
    };
    myChat.prototype.checkInit = function () {
        if (this.cache().user.username !== "") {
            return true;
        } else {
            return false;
        }
    };
    myChat.prototype.addMeg = function (option) {
        //option 参数
        option = option || {};
        /**
         * option={
         * username:""
         * type:comment,
         * messages:"",//传递的消息
         * to:"",
         * date:date
         *  }
         **/
        /* if(!this.checkInit()){
         alert("初始化失败");
         return;
         }*/

        if (option.type === "comment") {

        }
        if (option.type === "to") {

        }
        if (option.type === "system") {

        }
    };
    myChat.prototype.init = function () {

    };
    myChat.prototype.initScrollBar = function initScrollBar(node) {
        var relH, ListH, scro_barH, scrollH;
        var $scroll = $(node).next();
        var $scrollBar = $scroll.find("span");//$(".scroll_bar span");
        var pT = parseInt($(node).parent().css("paddingTop"));
        $(window).on("resize", function () {
            //设置滚动条的高度和真实内容高度和容器的高度成比例
            /*var itemh = $(node).find(".onlineItem").outerHeight();//一个元素的高度
             var num = $(node).find(".onlineItem").length;//元素的个数*/
            relH = $(node).children().height();//总的高度
            ListH = $(node).outerHeight();//壳的高度
            scro_barH = (ListH * ListH) / relH;//滚动条的高度
            $scrollBar.css("height", scro_barH);
            scrollH = $scroll.height()
        });
        $(window).trigger("resize");
        $(node).on("scroll", function (e) {
            var ratio = $(this).scrollTop() / relH;
            $scrollBar.css("top", ListH * ratio + pT);
//                console.log(ListH * ratio + 15);
            return false;
        });
//            console.log($(node).scrollTop());
        $scrollBar.css("cursor", "pointer");
        $scrollBar.on("mousedown", function (e) {
            var preY = e.pageY;
            var t = parseInt($(this).css("top"));
            $(document).on("mousemove", function (e) {
                var cY = e.pageY;
                var mY = t + cY - preY;

                // console.log("padingtop",pT);
                mY = mY > pT ? mY : pT;
                if ((scrollH - mY - scro_barH - pT) < 0) {
                    mY = scrollH - scro_barH - pT;
                }
                $scrollBar.css("top", mY);
                $(node).scrollTop((relH * (mY - pT)) / (scrollH - 2 * pT))
                // console.log(t, cY, preY);
            });
            return false;
        });
        $(document).on("mouseup", function () {
            $(this).off("mousemove");
        })
    };
    w.myChat = new myChat();
}(jQuery, window);
