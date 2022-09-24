var first = 0;
var leftpos = 0;
var bgtoppos = -100;
var bgvpos = 0;

var toppos = 100;
var poslock = false;
var wasright = false;
var wasleft = false;
var vdirection = 0;
var hdirection = 0;

var maxout = false;
var vmute = true;

var leftcontrol = 65;
var rightcontrol = 68;
var upcontrol = 87;
var downcontrol = 83;
var homecontrol = 72;
var unlockcontrol = 85;
var lockcontrol = 76;
var capturecontrol = 67;
var tapcontrol = 84;

var liftcontrol = 88;


var zoomincontrol = 221;
var zoomoutcontrol = 219;

var vol = 3;
var bigstep = false;


var mode = 0;

var menu = 1;
var page = 1;
var playing = false;
var pagewas = 1;
var edge = false;
var messagenum = 0;

var sec_timeout = 0;
var timeoutduration = 1200;
var sleeping = true;

var ctrack = 1;
var trackwas = 3;
var trigger = 0;
var mediacontrol = 1;

var ges;


  var justlocked = false;
  var flowcontrol = 3;
  var flowcount = 0;
  var maxval = 6;


$(function () {

  hideAllblocksDown();


  $("#mediacontrol").click(function () {
    if (mediacontrol == 0) {
      mediacontrol = 1;
      $("#mediacontrol").removeClass("bt_sel");


    } else {
      mediacontrol = 0;
      $("#mediacontrol").addClass("bt_sel");


    }
  });


  $("#hdirection").click(function () {
    if (hdirection == 0) {
      hdirection = 1;
      $("#hdirection").text("Reverse R/L Swipe Direction ON ");
      $("#hdirection").css("background-color", "#888888");
      leftcontrol = 65;
      rightcontrol = 68;
    } else {
      hdirection = 0;
      $("#hdirection").text("Reverse R/L Swipe Direction OFF");
      $("#hdirection").css("background-color", "#333333");
      leftcontrol = 68;
      rightcontrol = 65;
    }
  });


  $("#vdirection").click(function () {
    if (vdirection == 0) {
      vdirection = 1;
      $("#vdirection").text("Reverse Up/Down Swipe Direction ON ");
      $("#vdirection").css("background-color", "#888888");
      upcontrol = 87;
      downcontrol = 83;
    } else {
      vdirection = 0;
      $("#vdirection").text("Reverse Up/Down Swipe Direction OFF");
      $("#vdirection").css("background-color", "#333333");
      upcontrol = 83;
      downcontrol = 87;
    }

  });


  //hposition left 500


  $("html").on("keydown", function (event) {
    console.log(event.which);


    trigger = event.which;
	  
	  
	  
	  
	  
    displaylogic();


  }); // end of key press detection


  var leftcontrol = 65;
  var rightcontrol = 68;
  var upcontrol = 87;
  var downcontrol = 83;
  var homecontrol = 72;
  var unlockcontrol = 85;
  var capturecontrol = 67;

  var tapcontrol = 84;


  socket.on('std_data', function (msg) {


    var item = document.createElement('li');


    // New geustures

    if (-1 != msg.indexOf("Hand Up Gesture Type = GestSingleFingerH+")) {
		//if (flowcount>flowcontrol){
				ges = rightcontrol;
				bigstep=false;

		//		flowcount=0;
		//}else{
		//	ges = "";
		//}
		
		flowcount++;
    } else if (-1 != msg.indexOf("Hand Up Gesture Type = GestSingleFingerH-")) {
		
		//if (flowcount>flowcontrol){
				ges = leftcontrol;
		bigstep=false;
		//		flowcount=0;
		//}else{
		//	ges = "";
		//}
		
		//flowcount++;
		
    } else if (-1 != msg.indexOf("Hand Up Gesture Type = GestSingleFingerV-")) {
				bigstep=false;

      ges = downcontrol;

    } else if (-1 != msg.indexOf("Hand Up Gesture Type = GestSingleFingerV+")) {
				bigstep=false;

      ges = upcontrol;
    }


	  // old 
	  
	  else if (-1 != msg.indexOf("GestSingleFingerSlideRight") && sleeping) {
      ges = rightcontrol;
		  bigstep=true;
		  
    } else if (-1 != msg.indexOf("GestSingleFingerSlideLeft") && sleeping) {
      ges = leftcontrol;
		  bigstep=true;
    }
	  
	  
	  
    // OLD
    else if (-1 != msg.indexOf("GestSingleFingerSlideRight") && !sleeping) {
      ges = rightcontrol;
      //			  ges="1r";
    } else if (-1 != msg.indexOf("GestSingleFingerSlideLeft") && !sleeping) {
      ges = leftcontrol;
      //			  ges="1l";
    } else if (-1 != msg.indexOf("GestSingleFingerSlideDown") && !sleeping) {
      ges = downcontrol;

      //			  ges="1d";
    } else if (-1 != msg.indexOf("GestSingleFingerSlideUp") && !sleeping) {
      ges = upcontrol;

      //			  ges="1u";
    } else if (-1 != msg.indexOf("GestSingleFingerOneClick")) {
      ges = tapcontrol;

    } else if (-1 != msg.indexOf("GestSingleFingerDoubleClick")) {} else if (-1 != msg.indexOf("GestSingleFingerTripleClick")) {} else if (-1 != msg.indexOf("GestTwoFingerSlideUp")) {

      ges = homecontrol;

    } else if (-1 != msg.indexOf("GestTwoFingerSlideDown")) {
      ges = capturecontrol;
    } else if (-1 != msg.indexOf("GestTwoFingerSlideRight") && sleeping) {
      ges = unlockcontrol;
				justlocked=false;

    } else if ((-1 != msg.indexOf("GestTwoFingerSlideLeft") || -1 != msg.indexOf("Hand Up Gesture Type = PalmTouch"))&& !sleeping) {
      ges = lockcontrol;
		console.log("just locked");
		justlocked=true;
		

    } else if (-1 != msg.indexOf("GestTwoFingerZoomIn")) {
      ges = zoomincontrol;

    } else if (-1 != msg.indexOf("GestTwoFingerZoomOut")) {
      ges = zoomoutcontrol;
    } else if (-1 != msg.indexOf("Finger Lifted.") && justlocked) {
      ges = "";
		justlocked=false;
				  console.log("Just locked");

    }
	  else if (-1 != msg.indexOf("Finger Lifted.") && !justlocked) {
      ges = "";
				  console.log("!Just locked / sleeping: " + sleeping);

    }
//	  else if (-1 != msg.indexOf("Finger Lifted.") && !sleeping) {
//      ges = "";
//    }
	  else if (-1 != msg.indexOf("Finger Lifted.") && sleeping) {
      ges = liftcontrol;
		  console.log("Finger Lifted and true sleeping");
    } else if (-1 != msg.indexOf("Hand Up Gesture Type = RealTimeGesture") && !sleeping) {
      ges = "";
    } else if (-1 != msg.indexOf("Finger touched, detecting gesture...") && !sleeping) {
      ges = "";
    } else if (-1 != msg.indexOf("\n") && !sleeping) {
      ges = "";
    }


    console.log("raw_msg>>" + msg+"<<raw_msg / Translate: "+ ges);
//    console.log(ges + " : " + msg);
    trigger = ges;
    displaylogic();

  });


  // 
  //
  clockUpdate();
  setInterval(clockUpdate, 1000);
  //  
  //  

  //$("#block").click();


});


function hideAllblocksUp() {
  // $("#vselector").css({ "opacity": "0"});

  $(".block").animate({
      "top": "-150px",
      "opacity": "0"
    }, 200,
    function () {

      $("#block_black").animate({
        "opacity": "0"
      }, 200);

      $(".block").css("top", "200px");
      $("#videoElement, #canvas").css({
        "opacity": "0"
      });
      console.log("hideAllblocksUp");

    }
  );
}

function hideAllblocksDown() {
  //$("#vselector").css({ "opacity": "0"});


  $("#canvas, #videoElement").animate({
    "opacity": "0"
  });

  $(".block").animate({
      "top": "200px",
      "opacity": "0"
    }, 200,
    function () {
      $(".block").css("top", "-150px");
      //$("#videoElement").css({"opacity": "0"});
      // console.log("hideAllblocksDown");

    }
  );


}

function block_homeDown() {


  var mode = 0;

  var menu = 1;
  var page = 1;

  hideAllblocksUp();
  console.log('running block_homeDown');


  $("#block_home").animate({
    "top": "50px",
    "opacity": "1"
  }, 200, function () {
    $("#block_menu").css("top", "50px");
    $("#block_menu").animate({
      "opacity": "1"
    });
  });

  $("#block_clock").css("top", "-50px");


  $("#block_clock").animate({
    "top": "50px",
    "opacity": "1"
  }, 200);


}


function block_homeUp() {
  hideAllblocksDown();


  if (pagewas == 2) {
    leftpos = 0;
    $("#selector").css({
      "left": "0px",
      "opacity": "0"
    });
  } else if (pagewas == 3) {
    leftpos = 100;
    $("#selector").css({
      "left": "100px",
      "opacity": "0"
    });
  } else if (pagewas == 4) {
    leftpos = 200;
    $("#selector").css({
      "left": "200px",
      "opacity": "0"
    });
  } else if (pagewas == 5) {
    leftpos = 300;
    $("#selector").css({
      "left": "300px",
      "opacity": "0"
    });
  } else if (pagewas == 6) {
    leftpos = 400;
    $("#selector").css({
      "left": "400px",
      "opacity": "0"
    });
  }

  console.log('running block_homeUp');

  $("#block_home").css("top", "-150px");

  $("#block_home").animate({
    "top": "50px",
    "opacity": "1"
  }, 200, function () {
    $("#block_menu").css("top", "50px");
    $("#block_menu").animate({
      "opacity": "1"
    });
    $("#selector").animate({
      "opacity": "1"
    });
  });

  $("#block_clock").css("top", "-150px");

  $("#block_clock").animate({
    "top": "50px",
    "opacity": "1"
  }, 200);

}


function block_capture() {

  hideAllblocksUp();


  $("#block_capture").animate({
    "top": "50px",
    "opacity": "1"
  }, 200, function () {
    $("#block_menu").css("top", "50px");
    $("#block_menu").animate({
      "opacity": "1"
    });
    $("#videoElement").animate({
      "opacity": "1"
    });

  })
}

function block_music() {
  hideAllblocksUp();

  leftpos = 200;
  $("#selector").css({
    "left": "200px",
    "opacity": "0"
  });

  $("#block_music").animate({
    "top": "50px",
    "opacity": "1"
  }, 200, function () {
    $("#block_menu").css("top", "50px");
    $("#block_menu").animate({
      "opacity": "1"
    });
    $("#selector").animate({
      "opacity": "1"
    });
  })

}


function block_messages() {
  hideAllblocksUp();

  leftpos = 200;
  $("#selector").css({
    "left": "200px",
    "opacity": "0"
  });


  $("#block_messages").animate({
    "top": "50px",
    "opacity": "1"
  }, 200, function () {
    //$("#block_menu").css("top", "50px");
    //$("#block_menu").animate({"opacity": "1"});
    //$("#selector").animate({"opacity": "1"});
    $("#block_v").css({
      "opacity": "1"
    });
    $("#vselector").animate({
      "opacity": "1",
      "top": "122px",
      "left": "93px",
    }, 200);
  })
  messagenum = 1;


}

function block_reminders() {
  hideAllblocksUp();

  leftpos = 200;
  $("#selector").css({
    "left": "200px",
    "opacity": "0"
  });

  $("#block_reminders").animate({
    "top": "50px",
    "opacity": "1"
  }, 200)

}

function block_settings() {
  hideAllblocksUp();

  leftpos = 200;
  $("#selector").css({
    "left": "200px",
    "opacity": "0"
  });

  $("#block_settings").animate({
    "top": "50px",
    "opacity": "1"
  }, 200, function () {

  })

}


function clockUpdate() {
  var date = new Date();

  function addZero(x) {
    if (x < 10) {
      return x = '0' + x;
    } else {
      return x;
    }
  }

  function twelveHour(x) {
    if (x > 12) {
      return x = x - 12;
    } else if (x == 0) {
      return x = 12;
    } else {
      return x;
    }
  }

  var h = addZero(twelveHour(date.getHours()));
  var m = addZero(date.getMinutes());
  //var s = addZero(date.getSeconds());

  $('.digital-clock').text(h + ':' + m)
}


var func;
sec_timeout = timeoutduration;


function timerstart() {
  func = setInterval(function () {

    $("#seconds").html(--sec_timeout);
    if (sec_timeout < 1) {
      $("#block_black").animate({
        "opacity": "1"
      }, 200);
      sleeping = true;
    } else {
      sleeping = false;
    }
  }, 1000);
}

function myStopFunction() {
  clearInterval(func);
}

function timerClear() {
  myStopFunction();
  $("#seconds").html(timeoutduration);
  sec_timeout = timeoutduration;
}


function displaylogic() {

  if ( (trigger == unlockcontrol) && first == 0) { // Press 85 U to unlock, wake the screen
    first = 1;
    //fade in the whole UI


    block_homeDown();
    console.log('UI DOWN');
    //timerstart();
    $(".note").animate({
      "opacity": "0"
    }, 200);
    sleeping = false;

    $("#selector").animate({
      "opacity": "1"
    });
    menu = 1;
    page = 1;


  } else if (sleeping) {

    //$("#block_black").html("");


    //mediacontrol=0;1


    if ( (trigger == upcontrol) && mediacontrol == 0) { // vol up as up swipe
						   $("#block_black").html("");
						  $("#block_black").animate({
							"opacity": "1"
						  }, 11);


						  if (vol == 8) {
							vol = 8;
							maxout = true;
						  } else if (vol == 9) {
							vol = 8;
							maxout = true;
						  } else {
							maxout = false;
							vol++;
						  }


						  console.log('VOL UP / mediacontrol =1 / vol:' + vol);



						  for (let i = 0; i < vol; i++) {
							if (!maxout) {
							  $("#block_black").append("<span></span>");
							} else {
							  $("#block_black").append('<span class="maxout"></span>');
							}
						  }


    } else if ( (trigger == downcontrol) && mediacontrol == 0) { // vol down as down swipe
     
						 $("#block_black").html("");
					  $("#block_black").animate({
						"opacity": "1"
					  }, 11);
					  console.log('VOL Down  / mediacontrol =0');


					  if (vol == 1) {
						vol = 1;
						maxout = true;
					  } else if (vol == 0) {
						vol = 1;
						maxout = true;
					  } else {
						maxout = false;
						vol--;
					  }


					  for (let i = 0; i < vol; i++) {
						if (!maxout) {
						  $("#block_black").append("<span></span>");
						} else {
						  $("#block_black").append('<span class="maxout"></span>');
						}
					  }

		
		
    }
    /////////////////////////////////////////// 
    /////////////////////////////////////////// 
    /////////////////////////////////////////// 
     else if (trigger == liftcontrol && !justlocked ) {
		
      console.log('lifted / Hide vol bar / justlocked = false');
		 
      $("#block_menu").animate({
        "opacity": "0"
      }, 150);
		 
		 $("#block_black").html("");

      $("#block_black").animate({
        "opacity": "1"
      }, 150);


    }
	  else if (trigger == liftcontrol && justlocked ) {
		
      console.log('lifted / Hide vol bar / justlocked = true');
		        $("#block_black").html("");

      $("#block_black").animate({
        "opacity": "1"
      }, 150);
		  
		  justlocked=false;


    }
	  
	  else if (trigger == liftcontrol && sleeping ) {
		
      console.log('lifted / Hide vol bar / sleeping = true');
      $("#block_black").animate({
        "opacity": "0"
      }, 150);


    } else if (trigger == rightcontrol && mediacontrol == 1) {
      $("#block_black").html("");
      $("#block_black").animate({
        "opacity": "1"
      }, 11);


		
		if (bigstep){ 
			vol=vol+2;
		}
		
		
		if (vol == maxval) {
        vol = maxval;
        maxout = true;
      } else if ((vol == maxval+1)|| (vol > (maxval+1)) ) {
        vol = maxval;
        maxout = true;
      } else {
        maxout = false;
        vol++;
      }
		
		


      console.log('VOL UP / mediacontrol =1 / vol:' + vol);



		
		
		bigstep=false;
		
		for (let i = 0; i < vol; i++) {
				if (!maxout) {
				  $("#block_black").append("<span></span>");
				} else {
				  $("#block_black").append('<span class="maxout"></span>');
				}
			  }
		
      



    } else if (trigger == leftcontrol && mediacontrol == 1) {
      $("#block_black").html("");
      $("#block_black").animate({
        "opacity": "1"
      }, 11);
      console.log('VOL Down  / mediacontrol =1');

		
		if (bigstep){ 
			vol=vol-2;
		}
		

      if (vol == 1) {
        vol = 1;
        maxout = true;
      } else if ((vol == 0) ||  (vol < 0)) {
        vol = 1;
        maxout = true;
      } else {
        maxout = false;
        vol--;
      }

		
		
		
		for (let i = 0; i < vol; i++) {
							if (!maxout) {
							  $("#block_black").append("<span></span>");
							} else {
							  $("#block_black").append('<span class="maxout"></span>');
							}
						  }
		
		
		

    } else if (trigger == rightcontrol && mediacontrol == 0) {
				// swipe right as skip 

		      $("#block_black").html("");
		      console.log('Skip Track');
		      $("#block_black").append('<span id="track_info_display_off">  Skip Track  </span>');


				  $("#block_black span").animate({
					"opacity": "1"
				  }, 500, function () {
					$("#block_black span, #block_black div").animate({
					  "opacity": "0"
					}, 50);


				  });


    } else if (trigger == leftcontrol && mediacontrol == 0) {
				      // swipe left as skip back
				      $("#block_black").html("");
				      console.log('Skip Back');


				      $("#block_black").append('<span id="track_info_display_off"> Previous Track </span>');


					  $("#block_black span").animate({
						"opacity": "1"
					  }, 500, function () {
						$("#block_black span, #block_black div").animate({
						  "opacity": "0"
						}, 50);


					  });
    }

if (mediacontrol==1 && (trigger==upcontrol || trigger==downcontrol) ) {
			vmute=true;
	
}else  {
vmute=false;
}

	  
	  
    if (!maxout && !vmute ) {
      $('#s_change').get(0).currentTime = 0;
      $('#s_change').get(0).play();
    } else if (!vmute){
      $('#s_max').get(0).currentTime = 0;
      $('#s_max').get(0).play();
    }


  } else if (trigger == lockcontrol) {


    $("#block_black").animate({
      "opacity": "1"
    }, 200);
    sleeping = true;
	  justlocked=true;
    first = 0;


    console.log("Turn display Off");

    //      timerClear();
    //      timerstart();
  }
  /*
	else if (sleeping && trigger != 0) {
      $("#block_black").animate({
        "opacity": "0"
      }, 200);
//      timerClear();
//      timerstart();
		
			 console.log("-----");

    } 
	*/
  else {
    //      timerClear();
    //      timerstart();

    if (trigger == leftcontrol && !poslock) { // left


      if (wasright) {
        bgtoppos = bgtoppos + 100;
      }

      console.log("bgtoppos 1: " + bgtoppos);


      if (leftpos == 0 && bgtoppos == 0 && edge) {
        $('#s_back').get(0).currentTime = 0;
        $('#s_back').get(0).play();
        edge = false;
      } else {
        $('#s_changel').get(0).currentTime = 0;
        $('#s_changel').get(0).play();
      }
      console.log('left');
      $("#videoElement").removeClass();
      $("#canvas").removeClass();


      if (page != 3 || (page == 3 && menu != 2)) {

        if (leftpos == 100 && wasleft) {
          console.log("leftpos 31:" + leftpos);
          $("#selector").animate({
            "left": "-=100px"
          }, "fast");
          leftpos = leftpos - 100;
          $('#s_changer').get(0).currentTime = 0;
          $('#s_changer').get(0).play();
          edge = true;
        } else if (leftpos != 0) {
          console.log("leftpos 3:" + leftpos);
          $("#selector").animate({
            "left": "-=100px"
          }, "fast");
          leftpos = leftpos - 100;
        }
      }

      wasleft = true;
      wasright = false;

    } else if (trigger == rightcontrol && !poslock) { // right


      if (wasleft) {
        bgtoppos = bgtoppos - 100;
      }


      if (leftpos != 400) {


        if (page != 3 || (page == 3 && menu < 4)) {
          $("#selector").animate({
            "left": "+=100px"
          }, "fast");
          leftpos = leftpos + 100;
          console.log("leftpos 6:" + leftpos);
          $('#s_changer').get(0).currentTime = 0;
          $('#s_changer').get(0).play();
          edge = false;
          console.log('right 1');
          console.log("page:" + page);

          if (leftpos == 400) {
            edge = true;

          }
        }


      } else if (leftpos == 400 && edge) {
        $('#s_back').get(0).currentTime = 0;
        $('#s_back').get(0).play();
        // edge=false;
        console.log('right stop');

      } else if (leftpos == 400) {

        edge = true;
        $('#s_changer').get(0).currentTime = 0;
        $('#s_changer').get(0).play();
        console.log('right 400');

      }


      //console.log('right');
      wasleft = false;
      wasright = true;

    } else if (trigger == upcontrol) { // UP  //83
      console.log('up');

      sec_timeout = 0; // go to sleep


      // show messages selector
      if (page == 4 && messagenum == 3) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "260px"
        }, 200);
        messagenum = 2;
      } else if (page == 4 && messagenum == 4) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "397px"
        }, 200);
        messagenum = 3;

      } else if (page == 4 && messagenum == 1) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "536px",
        }, 200);
        messagenum = 4;
      } else if (page == 4 && messagenum == 2) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "122px",
        }, 200);
        messagenum = 1;
      }


      $('#s_change').get(0).currentTime = 0;
      $('#s_change').get(0).play();

    } else if (trigger == downcontrol) { // down

      console.log('down / current page: ' + page);


      // show messages selector
      if (page == 4 && messagenum == 1) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "260px"
        }, 200);
        messagenum = 2;
      } else if (page == 4 && messagenum == 2) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "397px"
        }, 200);
        messagenum = 3;

      } else if (page == 4 && messagenum == 3) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "536px",
        }, 200);
        messagenum = 4;
      } else if (page == 4 && messagenum == 4) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "122px",
        }, 200);
        messagenum = 1;
      }


      $('#s_change').get(0).currentTime = 0;
      $('#s_change').get(0).play();


    }

    if (leftpos == 0) {
      console.log('on menu 1');
      menu = 1;
    }
    if (leftpos == 100) {
      console.log('on menu 2');
      menu = 2;
    }
    if (leftpos == 200) {
      console.log('on menu 3');
      menu = 3;
    }
    if (leftpos == 300) {
      console.log('on menu 4');
      menu = 4;
    }
    if (leftpos == 400) {
      console.log('on menu 5');
      menu = 5;
    }


    if (trigger == capturecontrol) { //67 Capture C 


      if (page == 2) {
        // takepicture();

        $('#photo').get(0).currentTime = 0;
        $('#photo').get(0).play();
        $("#videoElement, #canvas").animate({
          opacity: 0,
        }, 200, function () {
          $("#videoElement, #canvas").animate({
            opacity: 1
          }, 200);
        });
        console.log('Capture');
      } else {

        // launch capture page
        page = 2;
        pagewas = 2;

        block_capture();
        $("#block_clock").animate({
          "margin-top": "0",
          "opacity": "0"
        }, 500);

      }


    }

    if (trigger == zoomincontrol) { //]
      $('#videoElement').css({
        "width": "440px",
        "height": "340px",
        "top": "170px",
        "left": "150px",

      });

      console.log("ZOOM IN");

      $('#s_change').get(0).currentTime = 0;
      $('#s_change').get(0).play();

    }

    if (trigger == zoomoutcontrol) { //[


      $('#videoElement').css({
        "width": "",
        "height": "",
        "top": "",
        "left": "",

      });


      console.log("ZOOM Default");
      $('#s_change').get(0).currentTime = 0;
      $('#s_change').get(0).play();


    }


    if (trigger == tapcontrol) { //T Tap enter 84
      console.log("Enter / Tap");


      $("#selector").addClass("selector2").delay(200).queue(function (next) {
        $(this).removeClass("selector2");
        next();
      });

      if (menu == 1 && page == 2) {
        $('#photo').get(0).currentTime = 0;
        $('#photo').get(0).play();
      } else if (menu == 2 && page == 2) {
        $('#video').get(0).currentTime = 0;
        $('#video').get(0).play();
      } else {
        $('#s_select').get(0).currentTime = 0;
        $('#s_select').get(0).play();
      }
      // Go to capture page 2
      if (menu == 1 && page == 1) {
        page = 2;
        pagewas = 2;

        block_capture();
        $("#block_clock").animate({
          "margin-top": "0",
          "opacity": "0"
        }, 200);
      } // menu 1 camera end
      // Go to music page 3
      else if (menu == 2 && page == 1) {
        page = 3;
        block_music();
      } else if (playing && menu == 3 && page == 3) { // pause music
        console.log("pause music");
        $('#music1').get(0).pause();
        $('#music2').get(0).pause();
        $('#music3').get(0).pause();


        $('#block_music').removeClass();
        $('#block_music').addClass("paused" + ctrack + " block");


        //$('#music, #music2, #music3').get(0).currentTime = 0;

        playing = false;
      } else if (!playing && menu == 3 && page == 3) { // resume music
        console.log("resume music");


        $('#block_music').removeClass();
        $('#block_music').addClass("playing" + ctrack + " block");

        $('#music' + ctrack).get(0).currentTime = 0;
        $('#music' + ctrack).get(0).play();


        //$('#music, #music2, #music3').get(0).currentTime = 0;

        playing = true;
      } else if ((page == 3 && menu == 3 && ctrack == 1) || (ctrack == 3 && menu == 4)) { // do the play and pause
        page = 3;
        pagewas = 3;
        ctrack = 1;

        console.log("play music track 1");

        playing = true;
        $('#music2').get(0).pause();
        $('#music3').get(0).pause();

        $('#music1').get(0).currentTime = 0;
        $('#music1').get(0).play();
        //$('#block_music').removeClass();
        //$('#block_music').addClass("playing1");

        //$('#block_music').fadeOut(100, function(){
        $('#block_music').removeClass();
        $('#block_music').addClass("playing" + ctrack + " block");
        $('#block_music').fadeIn(100);

        // });                

      } else if (page == 3 && menu == 4 && ctrack == 1) { // do the play and pause music 2
        page = 3;
        pagewas = 3;
        ctrack = 2;

        console.log("play music track 2");

        playing = true;
        $('#music1').get(0).pause();
        $('#music3').get(0).pause();

        $('#music2').get(0).currentTime = 0;
        $('#music2').get(0).play();
        //$('#block_music').fadeOut(100, function(){
        $('#block_music').removeClass();
        $('#block_music').addClass("playing" + ctrack + " block");
        //  $('#block_music').fadeIn(100);

        // }); 


      } else if (page == 3 && menu == 4 && ctrack == 2) { // do the play and pause music 2
        page = 3;
        pagewas = 3;
        ctrack = 3;
        console.log("play music track 3");
        playing = true;
        $('#music1').get(0).pause();
        $('#music2').get(0).pause();

        $('#music3').get(0).currentTime = 0;
        $('#music3').get(0).play();
        // $('#block_music').fadeOut(100, function(){
        $('#block_music').removeClass();
        $('#block_music').addClass("playing" + ctrack + " block");
        //     $('#block_music').fadeIn(100);

        //  }); 

      } // menu  msuic end

      // SKIP BACK
      else if (page == 3 && menu == 2 && ctrack == 1) { // do the play and pause music 2
        page = 3;
        pagewas = 3;
        ctrack = 3;
        console.log("play music track 3");
        playing = true;
        $('#music1').get(0).pause();
        $('#music2').get(0).pause();

        $('#music3').get(0).currentTime = 0;
        $('#music3').get(0).play();
        // $('#block_music').fadeOut(100, function(){
        $('#block_music').removeClass();
        $('#block_music').addClass("playing" + ctrack + " block");
        //      $('#block_music').fadeIn(100);

        //  }); 

      } // menu  msuic end   
      else if (page == 3 && menu == 2 && ctrack == 2) { // do the play and pause music 2
        page = 3;
        pagewas = 3;
        ctrack = 1;
        console.log("play music track 1");
        playing = true;
        $('#music3').get(0).pause();
        $('#music2').get(0).pause();
        $('#music1').get(0).currentTime = 0;
        $('#music1').get(0).play();
        // $('#block_music').fadeOut(100, function(){
        $('#block_music').removeClass();
        $('#block_music').addClass("playing" + ctrack + " block");
        //    $('#block_music').fadeIn(100);

        // }); 

      } // menu  msuic end           
      else if (page == 3 && menu == 2 && ctrack == 3) { // do the play and pause music 2
        page = 3;
        pagewas = 3;
        ctrack = 2;
        console.log("play music track 2");
        playing = true;
        $('#music1').get(0).pause();
        $('#music3').get(0).pause();
        $('#music2').get(0).currentTime = 0;
        $('#music2').get(0).play();
        //$('#block_music').fadeOut(100, function(){
        $('#block_music').removeClass();
        $('#block_music').addClass("playing" + ctrack + " block");
        //  $('#block_music').fadeIn(100);

        // }); 

      } // menu  msuic end    


      // Go to messages page 4
      else if (menu == 3 && page == 1) {
        page = 4;
        pagewas = 4;
        block_messages();


      } // menu messages end
      // Go to reminders page 4
      else if (menu == 4 && page == 1) {
        page = 5;
        pagewas = 5;
        block_reminders();


      } // menu reminderts end
      // Go to settings page 4
      else if (menu == 5 && page == 1) {
        page = 6;
        pagewas = 6;
        block_settings();
      } // menu settings end


    }
    if (trigger == homecontrol) { //H Go HOME 72

      if (page != 1) { // GO TO HOME PAGE
        page = 1;
        block_homeUp();
        console.log('block_homeDown');

      }
    }

    // camera filter

    if (bgvpos == 300 && leftpos == 100) {
      console.log('filter');

      $("#videoElement, #canvas").addClass("f1");

    } else if (bgvpos == 300 && leftpos == 200) {
      console.log('filter');

      $("#videoElement, #canvas").addClass("f2");

    } else if (bgvpos == 300 && leftpos == 300) {
      console.log('filter');

      $("#videoElement, #canvas").addClass("f3");

    } else {
      $("#videoElement, #canvas").removeClass();

    }


  }

}
