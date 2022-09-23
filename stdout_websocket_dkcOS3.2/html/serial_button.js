

function serialkey(gesture) {


	if (hdirection==1){
		      console.log("hdirection direction switched");

		if (gesture=="r"){ gesture="l";}
		else if (gesture=="l"){ gesture="r";}
	}
	
	
	

  if (first == 0) { // Press ANY KEY
    first = 1;
    //fade in the whole UI
    block_homeDown();
    console.log('UI DOWN');
    timerstart();
    $(".note").animate({
      "opacity": "0"
    });


  } else if (sleeping) {
    $("#block_black").animate({
      "opacity": "0"
    });
    timerClear();
    timerstart();
  } else {
    timerClear();
    timerstart();

    if (gesture == "l" && !poslock) { // left


      if (wasright) {
        bgtoppos = bgtoppos + 100;
      }

      console.log("bgtoppos 1: " + bgtoppos);


      //     $('#s_back').get(0).currentTime = 0;
      //     $('#s_back').get(0).play();

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


        if  (page!=3 || (page==3 && menu!=2 ) ){

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

      //$( ".hposition" ).animate({ "left": leftpos+"px" }, "fast" );
      wasleft = true;
      wasright = false;

    } else if (gesture == "r" && !poslock) { // right


      if (wasleft) {
        bgtoppos = bgtoppos - 100;
      }

      // show messages selector
      if (page == 4 && messagenum == 1) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "260px",
          "left": "113px",
        });
        messagenum = 2;
      } else if (page == 4 && messagenum == 2) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "397px",
          "left": "140px",
        });
        messagenum = 3;

      } else if (page == 4 && messagenum == 3) {
        //$("#vselector").animate({"opacity": "1"});
        $("#vselector").animate({
          "opacity": "1",
          "top": "536px",
          "left": "164px",
        });
        messagenum = 4;
      }

      if (leftpos != 400) {
          if  (page!=3 || (page==3 && menu<4 ) ){

                $("#selector").animate({
                  "left": "+=100px"
                }, "fast");
                leftpos = leftpos + 100;
                console.log("leftpos 6:" + leftpos);
                $('#s_changer').get(0).currentTime = 0;
                $('#s_changer').get(0).play();
                edge = false;
                console.log('right 1');

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

    } else if (gesture == "u") { // UP  //83
      console.log('up');

      sec_timeout = 0; // go to sleep

      /*
        bgvpos = bgvpos - 300;
        $("#innerblock").animate({
          "backgroundPositionY": bgvpos + "px"
        }, "fast");
        
        */
      $('#s_change').get(0).currentTime = 0;
      $('#s_change').get(0).play();

    } else if (gesture == "d") { // down

      console.log('down / current page: ' + page);

      if (page != 1) { // GO TO HOME PAGE
        page = 1;
        block_homeUp();
        console.log('block_homeDown');

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


    if (gesture == "c") { //67 Capture

		        

      if (page == 2) {
        $('#photo').get(0).currentTime = 0;
        $('#photo').get(0).play();
        $("#videoElement, #canvas").animate({
          opacity: 0,
        }, 100, function () {
          $("#videoElement, #canvas").animate({
            opacity: 1
          }, 100);
        });
        console.log('Capture 000');
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


    if (gesture == "t") { //T Tap enter
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
        }, 500);
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
      } else if ((page == 3 && menu == 3 && ctrack == 1) || (ctrack == 3 && menu == 4 && page == 3)) { // do the play and pause
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

    // camera filter

    if (bgvpos == 300 && leftpos == 100) {
      console.log('filter');

      $("#videoElement").addClass("f1");

    } else if (bgvpos == 300 && leftpos == 200) {
      console.log('filter');

      $("#videoElement").addClass("f2");

    } else if (bgvpos == 300 && leftpos == 300) {
      console.log('filter');

      $("#videoElement").addClass("f3");

    } else {
      $("#videoElement").removeClass();

    }


  } // end of big else

}



