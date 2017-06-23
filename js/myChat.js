/**
 * Created by uu on 2017/6/15.
 */

!function ($, w) {
    $(function () {
        var document = window.document;
        var v = "1.0.0";
        var scroll_switch = true;
        var onlineUser = [];
        var usernum = 0;
        var cache = {
            dir: "",
            user: {
                id: "12",
                username: "随机用户",
                avatar: "",
                lv: "",
                sign: ""
            },
            onlineUser: onlineUser
        };

        var myChat = function () {
            this.v = v;
            var that = this;
            var $chatW = $(".chatListW .itemW");
            var $textArea = $(".meg_input textarea");
            $(".meg_input textarea").focus(function (e) {
                $(".meg_input textarea").on("keydown.textA", function (e) {
                    if (e.keyCode === 13) {
                        $(".chatInput_input .input_send")[0].click();
                        return false;
                    }
                    // console.log(e);

                })
            });
            $(".chatInput_input .input_send").on("click", function () {
                var value = $.trim($(this).next().children().val());
                var type = $(this).next().children().data("sendType") || "";
                if (value === "") {
                    return;
                }
                var data = {};
                if (type === "to") {
                    var toName = $textArea.data("toName");
                    var toId = $textArea.data("toId");
                    var toLv = $textArea.data("toLv");
                    var reg = new RegExp("@" + toName, "g");
                    value = value.replace("@" + toName, "");

                    data = {
                        type: "to",
                        user: cache.user,
                        to: {
                            username: toName,
                            id: toId,
                            lv: toLv
                        },
                        messages: value
                    };
                    $textArea.data("sendType", "comment");
                    // console.log(toName,value,reg.test(value));
                } else {
                    data = {
                        type: "comment",
                        user: cache.user,
                        messages: value
                    };
                }
                $(this).next().children().val("");

                that.addMsg(data);
                // console.log($(this).next().children().val());
                $(window).trigger("sendMessages", data)
            });
            $(".menu_clear").on("click", function () {
                $chatW.html("");
                $(window).trigger("resize");
            });
            $(".scroll_switch").on("click", function () {
                $(this).toggleClass("scroll_off");
                scroll_switch = !scroll_switch;
            });
            $(".chatListW").on("click", ".userInfo", function () {
                $(this).parent().siblings().find(".manage-menu").css("display", "none");
                var $menu = $(this).children(".manage-menu");
                $menu.css("display", "block");
                $(document).one("click.manage_menu", function () {
                    $menu.css("display", "none");
                });
                return false;
            });
            $(".chatListW").on("click", ".at", function () {
                //    @处理
                var toName = $(this).parents(".userInfo").find(".name").text();
                var toId = $(this).parents(".userInfo").data("uid");
                var toLv = $(this).parents(".userInfo").data("ulv");
                console.log(typeof toId,cache.user.id);
                if (cache.user.id==toId){
                    console.log(toId,cache.user.id);
                    $textArea.data("sendType", "comment");
                }else {
                    $textArea.data("sendType", "to");
                }
                console.log(toName);
                insertMeg($textArea[0], "@" + toName);
                $textArea.data("toName", toName);
                $textArea.data("toId", toId);
                $textArea.data("toLv", toLv);
            });
            $(".onlineList").on("click", ".at", function () {
                //    @处理
                var toName = $(this).parents(".onlineItem").data("username");
                var toId = $(this).parents(".onlineItem").data("uid");
                var toLv = $(this).parents(".onlineItem").data("ulv");
                console.log(typeof toId,cache.user.id);
                if (cache.user.id==toId){
                    console.log(toId,cache.user.id);
                    $textArea.data("sendType", "comment");
                }else {
                    $textArea.data("sendType", "to");
                }
                console.log(toName);
                insertMeg($textArea[0], "@" + toName);
                $textArea.data("toName", toName);
                $textArea.data("toId", toId);
                $textArea.data("toLv", toLv);
            });
            // $(document)
            return this;

        };
        //插入焦点
        var insertMeg = function (obj, str) {
            var result, val = obj.value;
            obj.focus();
            if (document.selection) { //ie
                result = document.selection.createRange();
                document.selection.empty();
                result.text = str;
            } else {
                result = [val.substring(0, obj.selectionStart), str, val.substr(obj.selectionEnd)];
                obj.focus();
                obj.value = result.join('');
            }
        };
        var faces = function () {
            var alt = ["[微笑]", "[嘻嘻]", "[哈哈]", "[可爱]", "[可怜]", "[挖鼻]", "[吃惊]", "[害羞]", "[挤眼]", "[闭嘴]", "[鄙视]", "[爱你]", "[泪]", "[偷笑]", "[亲亲]", "[生病]", "[太开心]", "[白眼]", "[右哼哼]", "[左哼哼]", "[嘘]", "[衰]", "[委屈]", "[吐]", "[哈欠]", "[抱抱]", "[怒]", "[疑问]", "[馋嘴]", "[拜拜]", "[思考]", "[汗]", "[困]", "[睡]", "[钱]", "[失望]", "[酷]", "[色]", "[哼]", "[鼓掌]", "[晕]", "[悲伤]", "[抓狂]", "[黑线]", "[阴险]", "[怒骂]", "[互粉]", "[心]", "[伤心]", "[猪头]", "[熊猫]", "[兔子]", "[ok]", "[耶]", "[good]", "[NO]", "[赞]", "[来]", "[弱]", "[草泥马]", "[神马]", "[囧]", "[浮云]", "[给力]", "[围观]", "[威武]", "[奥特曼]", "[礼物]", "[钟]", "[话筒]", "[蜡烛]", "[蛋糕]"],
                arr = {};
            $.each(alt, function (index, item) {
                arr[item] = 'images/face/' + index + '.gif';
            });
            var content = "";
            var $faceC = $(".faceContent");
            for (var key in arr) {
                content += '<div class="item" title="' + key + '"><img src="' + arr[key] + '"></div>'
            }
            if (!$faceC.data("load")) {
                $faceC.data("load", "true");
                // console.log($faceC.data("load"));
                $faceC.html(content);
            }
            $faceC.on("click", ".item", function (e) {
                insertMeg($(".meg_input textarea")[0], 'face' + this.title + " ");
                $faceC.css("display", "none");
            });
            $(".menu_face").on("click", function () {
                if ($faceC.css("display") === "block") {
                    $faceC.css("display", "none");
                } else {
                    $faceC.css("display", "block");
                    return false;
                }
            });
            $(document).on("click.face", function (e) {
                if ($faceC.css("display") === "block") {
                    // console.log(1);
                    if (!$(e.target).hasClass("faceContent") && !($(e.target).parents(".faceContent").length !== 0)) {
                        $faceC.css("display", "none");
                        // $(this).off("click.face");
                    }
                }
            });
            return arr;
        }();

        myChat.prototype.cache = function () {
            return cache;
        };
        myChat.prototype.online = function (user) {
            // if(onlineUser[)
            usernum++;
            for (var a = 0; a < onlineUser.length; a++) {
                if (onlineUser[a].id === user.id) {
                    console.warn("error,用户已在线");
                    return;
                }
            }
            onlineUser.push(user);
            onlineUser.sort(function (obj1, obj2) {
                if (parseInt(obj1.lv) < parseInt(obj2.lv)) {
                    return -1;
                } else if (parseInt(obj1.lv) > parseInt(obj2.lv)) {
                    return 1;
                } else {
                    return 0
                }
            });
            console.log(onlineUser);
            var tem = '';
            for (var key in onlineUser) {
                tem += '<div class="onlineItem" data-uid="' + onlineUser[key].id +
                    '" data-username="' + onlineUser[key].username +
                    '" data-ulv="' + onlineUser[key].lv +
                    '"><div class="onlineIteLeft fl"><span class="auto"  style="background-image: url(' + onlineUser[key].avatar +
                    ')"></span><p>' + onlineUser[key].username +
                    '</p></div><div class="lv  fr lv' + onlineUser[key].lv +
                    '" style="';
                if (onlineUser[key].lv === "") {
                    tem += "display:none";
                }
                tem += '"></div> <div class="option"><p class="shield">屏蔽</p><p class="at">@Ta</p>';
                if (user.lv === "0") {
                    tem += '<p class="pChat">私聊</p>'
                }
                tem += '</div></div>';
            }
            console.log(tem);
            $(".onlineList .itemW").html(tem);
            $(window).trigger("resize");
        };
        myChat.prototype.offline = function (user) {
            // if(onlineUser[)
            for (var k = 0; k < onlineUser.length; k++) {
                if (user.id === onlineUser[k].id) {
                    onlineUser.splice(k, 1);
                    console.log(user.id, "下线");
                    console.log(onlineUser);
                }
            }
        };
        myChat.prototype.checkInit = function () {
            if (this.cache().user.username !== "") {
                return true;
            } else {
                return false;
            }
        };
        var TemplateEngine = function (html, options) {
            var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n',
                cursor = 0;
            var add = function (line, js) {
                js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                    (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
                return add;
            };
            while (match = re.exec(html)) {
                add(html.slice(cursor, match.index))(match[1], true);
                cursor = match.index + match[0].length;
            }
            add(html.substr(cursor, html.length - cursor));
            code += 'return r.join("");';
            return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
        };
        /* var template =
         'My skills:' +
         '<%if(this.showSkills) {%>' +
         '<%for(var index in this.skills) {%>' +
         '<a href="#"><%this.skills[index]%></a>' +
         '<%}%>' +
         '<%} else {%>' +
         '<p>none</p>' +
         '<%}%>';
         console.log(TemplateEngine(template, {
         skills: ["js", "html", "css"],
         showSkills: false
         }));*/
        var myDate = function (date) {
            var d = new Date(date);
            return d.getHours() + ":" + d.getMinutes();
        };
        var scrollToBottom = function (obj) {
            // console.log($(obj).height());
            $(obj).scrollTop($(obj).children().height());

        };
        myChat.prototype.addMsg = function (option) {
            //option 参数
            option = option || {};
            option.date = option.date || new Date().getTime();
            /**
             * option={
         * user:{
         * username:"",
         * id:"",
         * lv:"",
         * avatar:""
         *
         * }
         * type:comment,
         * messages:"",//传递的消息
         * to:"",
         * date:date,
         * option.super
         *  }
             **/
            /* if(!this.checkInit()){
             alert("初始化失败");
             return;
             }*/
            if (option.type === "comment") {
                // if (cache.user.lv==="0")
                var chatTem = '<div class="onlineItem';
                if (option.user.lv === "0") {
                    chatTem += ' super'
                }
                chatTem += '"><div class="userInfo" data-uid="' + option.user.id + '" data-ulv="' + option.user.lv +
                    '"><span class="time">' + myDate(option.date) + '</span>';
                if (option.user.lv !== "") {
                    chatTem += '<img src="' + cache.dir + 'images/lv/' + option.user.lv + '.gif" alt="" class="lv lv1"> ';
                }
                chatTem += '<span class="name">' + option.user.username + '</span>' +
                    ' <div class="manage-menu "> <div class="at pointer">@Ta</div> <div class="line"></div> <div class="shield pointer">屏蔽</div> ';
                if (option.user.lv === "0") {
                    chatTem += '<div class="line"></div> <div class="shield pointer">私聊</div>';
                }
                chatTem += '</div></div><div class="messages">' +
                    '<p>' + this.content(option.messages) + '</p>' +
                    '</div></div>';
                $(".chatListW .itemW").append(chatTem);
                $(window).trigger("resize");
                if (scroll_switch) {
                    scrollToBottom(".chatListW");
                }

                // console.log(chatTem);
            }
            if (option.type === "to") {
                var chatTem = '<div class="onlineItem';
                if (option.user.lv === "0") {
                    chatTem += ' super'
                }
                chatTem += '"><div class="userInfo" data-uid="' + option.user.id + '"data-ulv="' + option.user.lv +
                    '"><span class="time">' + myDate(option.date) + '</span>';
                if (option.user.lv !== "") {
                    chatTem += '<img src="' + cache.dir + 'images/lv/' + option.user.lv + '.gif" alt="" class="lv lv1"> ';
                }
                chatTem += '<span class="name">' + option.user.username + '</span>';
                if (option.to.lv === "") {
                    chatTem +='<span class="dui">对</span><span class="name">' +option.to.username+
                        '</span>'
                }else {
                    chatTem +='<span class="dui">对</span> <img src="images/lv/' +option.to.lv+
                        '.gif" alt="" class="lv lv1"> <span class="name">' +option.to.username+
                        '</span>';
                }
                chatTem += ' <div class="manage-menu "> <div class="at pointer">@Ta</div> <div class="line"></div> <div class="shield pointer">屏蔽</div> ';
                if (option.user.lv === "0") {
                    chatTem += '<div class="line"></div> <div class="shield pointer">私聊</div>';
                }
                chatTem += '</div></div><div class="messages">' +
                    '<p>' + this.content(option.messages) + '</p>' +
                    '</div></div>';
                $(".chatListW .itemW").append(chatTem);
                $(window).trigger("resize");
                if (scroll_switch) {
                    scrollToBottom(".chatListW");
                }

            }
            if (option.type === "system") {
                $(".chatListW .itemW").append('  <div class="onlineItem"><div class="system">'+option.messages+'</div></div>');
                $(window).trigger("resize");
                if (scroll_switch) {
                    scrollToBottom(".chatListW");
                }
            }
        };
        myChat.prototype.init = function (data) {
            $.extend(true, cache, data);
        };
        myChat.prototype.content = function (content) {
            var html = function (end) {
                return new RegExp('\\n*\\[' + (end || '') + '(pre|div|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
            };
            content = (content || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
                .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;') //XSS
               /* .replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2') //转义@*/

                .replace(/face\[([^\s\[\]]+?)\]/g, function (face) {  //转义表情
                    var alt = face.replace(/^face/g, '');
                    return '<img alt="' + alt + '" title="' + alt + '" src="' + faces[alt] + '">';
                })
                .replace(/img\[([^\s]+?)\]/g, function (img) {  //转义图片
                    return '<img class="layui-layim-photos" src="' + img.replace(/(^img\[)|(\]$)/g, '') + '">';
                })
                .replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function (str) { //转义链接
                    var href = (str.match(/a\(([\s\S]+?)\)\[/) || [])[1];
                    var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1];
                    if (!href) return str;
                    return '<a href="' + href + '" target="_blank">' + (text || href) + '</a>';
                }).replace(html(), '\<$1 $2\>').replace(html('/'), '\</$1\>') //转移HTML代码
                .replace(/\n/g, '<br>'); //转义换行
            return content;
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
                // console.log("resize");
                relH = $(node).children().height();//总的高度
                ListH = $(node).outerHeight();//壳的高度
                if (relH < ListH) {
                    $scrollBar.css("display", "none");
                } else {
                    $scrollBar.css("display", "block");
                }
                scro_barH = (ListH * ListH) / relH;//滚动条的高度
                $scrollBar.css("height", scro_barH);
                scrollH = $scroll.height();
                var ratio = $(node).scrollTop() / relH;
                $scrollBar.css("top", ListH * ratio + pT);
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
    });
}(jQuery, window);
