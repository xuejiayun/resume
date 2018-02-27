$(document).ready(function(){

    //动态加载数据
    $.get("./others/message.json",function(data){
        $("#info-name").text(data.name);
        $("#loveword").text(data.motto);
        $("#info-email").text(data.email);
        $("#info-phone").text(data.phone);
        $("#info-work").text(data.work);
        $("#education-college").text(data.college);
        $("#education-major").text(data.major);
        $("#education-degree").text(data.degree);
        $("#education-join").text(data.join);
        var skill = data.skill[0];
        var hidden = "";
        for(var key in skill){
            var adata = skill[key].split("-");
            $("#war-content-skill").append('<li class="skill_list">' +
                '<div class="course">'+key+' : </div>'+
                '<div style="overflow: hidden;"><div id="'+key+'" class="courses" style="background-color: '+adata[1]+';width:0;">'+adata[0]+'</div></div>'+
                '</li>');
            hidden += key+":"+adata[0]+",";
        }
        $("#hidden").addClass(hidden);
        var project = data.project;
        for(var proj in project){
            var aTime = project[proj].time.split("-");
            $("#war-project-right").append('<div class="project-list">'+
                '<div class="project-list-left"><div>'+aTime[0]+'</div><div>|</div><div>'+aTime[1]+'</div></div>'+
                    '<div class="project-list-right">'+
                        '<div class="project-list-name"><a href="'+project[proj].link+'" target="_blank">'+project[proj].name+'</a></div>'+
                        '<div class="project-list-work"><span class="list-title">职能分工：</span>'+project[proj].work+'</div>'+
                        '<div class="project-list-info"><span class="list-title">项目简介：</span>'+project[proj].info+'</div>'+
                    '</div>'+
                '</div>');
        }
        var hobby=data.hobby;
        for(var hob in hobby){
            $('#hobby_war').append('<div class="hobbyInfo_list"><'+hobby[hob]+'></div>');
        }

        var evaluation=data.evaluation;
        for(var eva in evaluation){
            $('#info_war').append('<div class="hobbyInfo_list"><'+evaluation[eva]+'></div>');
        }
    });


    //fullpage的参数传递
    $.fn.fullpage({
        scrollingSpeed:500,
        scrollOverflow:false,
        anchors:["page1","page2","page3","page4","page5","page6","page7","page8"],
        menu:"header,aside",
        verticalCentered: false,
        onLeave: function(index,nextIndex,direction){
            if(index === 1){
                $(".war-content-1").removeClass("current");
            }
            if(index === 2){
                $("#war-2-sun").fadeOut(200);
                $("#lou").slideUp(200);
                $("#info-photo").fadeOut(200,function(){
                    $("#info-name").fadeOut(200,function(){
                        $("#info-love").animate({width:"0"},800,function(){
                            $("#loveword").fadeOut(200,function(){
                                $("#info-email").fadeOut(200,function(){
                                    $("#info-phone").fadeOut(200,function(){
                                        $("#info-work").fadeOut(200);
                                    })
                                })
                            })
                        })
                    })
                });
            }
            if(index === 3){
                $("#war-3-moon").animate({"right":"-200px"},300);
                $(".courses").animate({"width":0},300);
                $("#war-skill-bg").slideUp(300);
            }
            if(index === 4){
                $("#topLeft_bg").fadeOut(400);
                $("#topRight_bg").fadeOut(400);
                $("#war-project-bg").animate({"left":"-600px"},400,"easeOutQuint");
                $("#war-project-right").animate({"height":"0"},400,"easeOutCirc");
            }
            if(index === 5) {
                $(".education-list-con").slideUp(300);
            }
            if(index === 6){
                $("#hobby_main").animate({
                    'margin-top': "50%",
                    'margin-left': "50%",
                    height: 0,
                    width: 0

                },200);
            }
        },
        afterLoad: function(link,index){
            //aside的激活状态
            var eleId = $(".page").eq(index - 1).attr("ID");
            $(".page").css({"background-position":"5px 5px"});
            $(".page#"+eleId).css({"background-position":"0 bottom"});
            if(index === 1){
                $(".war-content-1").addClass("current");
            }
            if(index === 2){
                $("#war-2-sun").fadeIn(3500);
                $("#lou").slideDown(2500);
                $("#info-photo").fadeIn(500,function(){
                    $("#info-name").fadeIn(500,function(){
                        $("#info-love").animate({width:"100%"},500,function(){
                            $("#loveword").fadeIn(500,function(){
                                $("#info-email").fadeIn(500,function(){
                                    $("#info-phone").fadeIn(500,function(){
                                        $("#info-work").fadeIn(500);
                                    })
                                })
                            })
                        })
                    })
                });
            }
            if(index === 3){
               $("#war-3-moon").animate({"right":"200px"},1000);
               var hiddenDate = $("#hidden").attr("class").split(",");
                for (var i = 0; i < hiddenDate.length; i++) {
                    var skillName = hiddenDate[i].split(":")[0];
                    var skillNumber = hiddenDate[i].split(":")[1];
                    $("#"+skillName).animate({width: skillNumber},1000,"easeOutQuart");
                    $("#war-skill-bg").slideDown(1500);
                }
            }
            if(index === 4){
                $("#topLeft_bg").fadeIn(2500);
                $("#topRight_bg").fadeIn(2500);
                $("#war-project-bg").animate({"left":"0"},2500,"easeOutQuint");
                $("#war-project-right").animate({"height":"800px"},3000,"easeInCirc");
            }
            if(index === 5){
                $("#education-college").slideDown(800,"easeOutElastic");
                    $("#education-major").delay(300).slideDown(800,"easeOutElastic");
                    $("#education-degree").delay(600).slideDown(800,"easeOutElastic");
                    $("#education-join").delay(900).slideDown(800,"easeOutElastic");
            }
            if(index === 6){
               $("#hobby_main").animate({
                   'margin-top': 0,
                   'margin-left': 0,
                   height: '500px',
                   width: '1000px'

               },2000,"easeOutElastic");
            }
        }
    });

    //适配屏幕高度
    var setSize = function(){
      var windowHeight = $(window).height();
      var asideHeight = (windowHeight-$("aside").height())/2;

      $("aside").css({"top":asideHeight+"px"});
    };
    setSize();
    $(window).resize(function(){
        setSize();
    })
});