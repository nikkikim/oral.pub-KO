// function toggleMenu() {

//     let x = document.getElementById("links");
//     if (x.style.display === "block") {
//         x.style.display = "none";
//     } else {
//         x.style.display = "block";
//     }

//     let m = document.getElementById("bars");
//     if (m.src.endsWith("images/menu.png")) {
//         m.src = "images/cross.png";
//     } else {
//         m.src = "images/menu.png";
//     }
// }
function toggleMenu() {

    let x = document.getElementById("links");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }

    let m = document.getElementById("menuBars");
    let ic = document.getElementById("icon");
    let sic = document.getElementById("soundIcon");
    if (m.src.endsWith("images/menu.png")) {
        m.src = "images/cross.png";
        ic.style.backgroundColor = "rgba(34, 34, 34, 0.5)";
        sic.style.backgroundColor = "rgba(34, 34, 34, 0.5)";
    } else {
        m.src = "images/menu.png";
        ic.style.backgroundColor = "black";
        sic.style.backgroundColor = "black";
    }
}
function toggleSound() {

    let m = document.getElementById("soundBars");
    let s = document.getElementById("bgm");
    if (m.src.endsWith("images/soundOff.png")) {
        m.src = "images/soundOn.png";
        s.play();
    } else {
        m.src = "images/soundOff.png";
        s.pause();
    }
}

var hasStarted = false;
var isMobile = true;
if(/Macintosh|Windows/i.test(navigator.userAgent)){
    // false for not mobile device
    isMobile = false;
    document.writeln("<div style='position:fixed;width:100%;height:100%;top:250px;left:0px;background-color:black;'><img style='width:50%;margin:0 auto;display:block;' src='ma.jpg'></div>");
    // window.stop();
}else{
    // true for mobile device
    isMobile = true;
    // document.write("mobile device");
    // console.log("mobile");
}

window.onload = function (){
    if (isMobile){
        console.log("ismobile");
        let container = document.getElementById('content2');
        let slider = document.getElementById('slider');

        if (document.getElementById('video2') != undefined){
            document.getElementById('video2').addEventListener('ended', videoHandler, false);
            // window.onscroll = function () { window.scrollTo(0, 0); };

        } else {
            document.getElementById('content2').style.display = 'block';
        }
        doc = window.document;
        context = doc.querySelector('.js-loop');
        clones = context.querySelectorAll('.is-clone');
        console.log(clones);
        disableScroll = false;
        scrollHeight = 0;
        scrollPos = 0;
        clonesHeight = 0;
        i = 0;
        init();
        autoScroll();
    } else {
        // document.getElementById('video2').style.display = 'none';
        // document.getElementById('contents').style.display = 'none';

        // document.getElementById('content2').style.display = 'none';
        document.getElementById('startviddiv').remove();
        document.getElementById('contents').remove();
        document.getElementById('content2').remove();
    }
};

// function videoHandler(e) {
//     // What you want to do after the event
//     document.getElementById('content2').style.display = 'block';
//     document.getElementById('video2').style.display = 'none';

//     activateButton([0, 3], false);
//     activateButton([1, 2], true);
// }

function isClickBackground(event){
    console.log("click!!");
    if (!hasStarted){
        document.getElementById('introImage').remove();
        let vid = document.getElementById('video2');
        if (vid != undefined){
            vid.style.display = 'block';
        }
        toggleSound();
        activateButton([0, 4], true);
        hasStarted = true;
        return true;
    }
    // let soundBar = document.getElementById('soundBars');
    let menus = [];
    menus.push(document.getElementById('soundIcon'));
    menus.push(document.getElementById('soundBars'));
    menus.push(document.getElementById('menuTextp'));
    menus.push(document.getElementById('menuMinusa'));
    menus.push(document.getElementById('menuPlusa'));
    menus.push(document.getElementById('menuSkipa'));
    menus.push(document.getElementById('menuSkipp'));
    menus.push(document.getElementById('menuScrolla'));
    menus.push(document.getElementById('menuScrollp'));
    menus.push(document.getElementById('menuScrollbara'));
    menus.push(document.getElementById('menuScrollbarp'));
    menus.push(document.getElementById('menuScrollbarimg'));

    console.log("detect click");
    console.log(event.target);
    for (let i = 0; i < menus.length; i++){
        if (event.target === menus[i]){
            return true;
        }
    }
    return false;
}

var doc;
var context;
var clones;
var disableScroll;
var scrollHeight;
var scrollPos;
var clonesHeight;
var i;
var isAutoScroll = false;
var isShowScrollbar = true; // Changed default to true

document.addEventListener('click', function( event ) {
    if (isMobile){
        if (isClickBackground(event)) {
            console.log("isssss");
        } else {
            let slider = document.getElementById('slider');
            if (slider != undefined){
                let sList = slider.classList;
                let isOpen = slider.classList.contains('slide-in');
                slider.classList.remove("slide-in");
                slider.classList.remove("slide-out");

                slider.classList.add(isOpen ? 'slide-out' : 'slide-in');
            }
        }
    }
});

function videoHandler(e) {
    // What you want to do after the event
    document.getElementById('video2').remove();
    document.getElementById('startviddiv').remove();
    document.getElementById('content2').style.display = 'block';
    window.onscroll = function () {};
    $('.viewport').scroll(function() {
        // $('video').each(function(){
        //     if ($(this)[0].id === 'video2'){
        //         return;
        //     }
        //     if ($(this).is(':in-viewport(100)')) {
        //         $(this)[0].play();
        //     } else {
        //         $(this)[0].pause();
        //     }
        // });
        // $('.chapterTitle').css({'text-decoration':'none'});
        // $('.chapter:in-viewport(950)').each(function(){
        //     let chpT = document.getElementById('T'+$(this)[0].id);
        //     chpT.style.textDecoration = 'underline';
        // });
        reCalc();
        window.requestAnimationFrame(scrollUpdate);
    });
    // document.getElementById('content2').style.display = 'block';
    // document.getElementById('video2').style.display = 'none';
    activateButton([4], false);
    activateButton([0, 1, 2, 3], true);
    isAutoScroll = false;
    textFontSize = 2.5;
}

function getScrollPos () {
    // return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
    return $('.viewport')[0].scrollTop;
}

function setScrollPos (pos) {
    // document.body.scrollTop = pos;
    $('.viewport')[0].scrollTop = pos;
    console.log("cspos Set");
    console.log($('.viewport')[0].scrollTop);
    console.log($('.viewport')[0]);
}

function getClonesHeight () {
    clonesHeight = 0;

    for (i = 0; i < clones.length; i += 1) {
        clonesHeight = clonesHeight + clones[i].offsetHeight;
    }

    return clonesHeight;
}

function reCalc () {
    scrollHeight = context.scrollHeight;
    clonesHeight = getClonesHeight();

    if (scrollPos <= 0) {
        setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
    }
}

function scrollUpdate () {

    console.log(getScrollPos());
  if (!disableScroll) {
      scrollPos = getScrollPos();
      // console.log(scrollPos);
      // console.log(clonesHeight);
      // console.log(scrollHeight);

      if (scrollPos > 10000){
          $('.scrollIcon').hide();
      }

      if (clonesHeight + scrollPos >= scrollHeight) {
          // Scroll to the top when you’ve reached the bottom
          console.log("scroll up");
          setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
          disableScroll = true;
      }
    //   } else if (scrollPos <= 0) {
    //       // Scroll to the bottom when you reach the top
    //       console.log("scroll down");
    //       setScrollPos(scrollHeight - clonesHeight);
    //       disableScroll = true;
    // }
  }

  if (disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
    window.setTimeout(function () {
      disableScroll = false;
    }, 40);
  }
}

function init () {
  reCalc();
  // context.addEventListener('scroll', function () {
  //     console.log("hahahah");
  //   window.requestAnimationFrame(scrollUpdate);
  // }, false);

  window.addEventListener('resize', function () {
    window.requestAnimationFrame(reCalc);
  }, false);
}

// if (document.readyState !== 'loading') {
//     init();
// } else {
//     doc.addEventListener('DOMContentLoaded', init, false);
// }

function autoScroll(){
    let scrollSpeed = 1;
    if (isAutoScroll){
        let sp = getScrollPos();
        setScrollPos(sp+scrollSpeed);
    }

    setTimeout(autoScroll, 5);
}

function smallerText(){
    console.log("smaller");
}

var textFontSize = 2.5;
var fsUnit = 0.5;

function toggleText(sign){
    let elems = document.querySelectorAll(".textContent,.vrContent,.imageContent");
    let origPos = getScrollPos();
    let elemIdx = 0;
    let elemIdxPlus = 0;
    let currMaxPos = 0;
    let currMinPos = 9999999;

    textFontSize += sign * fsUnit;
    for (let i = 0; i < elems.length; i++){
        let eh = elems[i].offsetTop;
        if (eh < origPos && eh > currMaxPos){
            currMaxPos = eh;
            elemIdx = i;
        }
        if (eh > origPos && eh < currMinPos){
            currMinPos = eh;
            elemIdxPlus = i;
        }
    }

    let texts = document.getElementsByClassName("textContent");
    for (let i = 0; i < texts.length; i++){
        texts[i].style.fontSize = textFontSize.toString() + "vh";
    }

    let perc = (origPos - currMaxPos) / (currMinPos - currMaxPos);
    reCalc();
    let newPos = elems[elemIdx].offsetTop + (elems[elemIdxPlus].offsetTop - elems[elemIdx].offsetTop) * perc;
    setScrollPos(newPos);
}

function toggleAutoScroll(){
    isAutoScroll = !isAutoScroll;
}

// function togglePlusText(){
//     let texts = document.getElementsByClassName("textContent");
//     // let perc = (clonesHeight + getScrollPos()) / scrollHeight;
//     let perc = getScrollPos() / scrollHeight;

//     textFontSize += fsUnit;
//     for (let i = 0; i < texts.length; i++){
//         texts[i].style.fontSize = textFontSize.toString() + "vh";
//     }
//     reCalc();
//     setScrollPos(scrollHeight*perc*1.009);
// }

function activateButton(list, isOn){
    let elems = [];
    elems.push(document.getElementById('soundBars'));
    elems.push(document.getElementById('menuTextp'));
    elems.push(document.getElementById('menuScrollbarp'));
    elems.push(document.getElementById('menuScrollp'));
    elems.push(document.getElementById('menuSkipp'));


    let img = document.getElementById('menuScrollbarimg');

    console.log(elems);
    for (let i = 0; i < elems.length; i++){
        if (list.includes(i)){
            if (isOn){
                elems[i].style.isActive = true;
                if (i == 0){
                    elems[i].style.opacity = '1.00';
                } else {
                    elems[i].style.color = '#FFFFFFFF';
                    let children = elems[i].childNodes;
                    for (let j = 0; j < children.length; j++){
                        let tn = children[j].tagName;
                        if (tn == "A"){
                            children[j].style.color = '#FFFFFFFF';
                        } else if (tn == "IMG") {
                            children[j].style.opacity = '1.00';
                        }
                    }
                }
            } else {
                elems[i].style.isActive = false;
                if (i == 0){
                    elems[i].style.opacity = '0.25';
                } else {
                    elems[i].style.color = '#FFFFFF40';
                    let children = elems[i].childNodes;
                    for (let j = 0; j < children.length; j++){
                        let tn = children[j].tagName;
                        if (tn == "A"){
                            children[j].style.color = '#FFFFFF40';
                        } else if (tn == "IMG") {
                            children[j].style.opacity = '0.25';
                        }
                    }
                }
            }
        }
    }
}


function toggleScrollbar(){
    if (document.getElementById('menuScrollbarimg').style.opacity.toString() < 1.0){
        return;
    }
    let ps = getScrollPos();
    let image = document.getElementById("menuScrollbarimg");
    let vp = $(".viewport")[0];
    console.log("toggle");
    console.log(isShowScrollbar);
    isShowScrollbar = !isShowScrollbar;
    console.log(isShowScrollbar);
    if (isShowScrollbar){
        vp.style.marginRight = "0px";
        vp.style.paddingRight = "0px";
        image.src = "eyeOpen.png";
    } else {
        vp.style.marginRight = "-100px";
        vp.style.paddingRight = "100px";
        image.src = "eyeClose.png";
    }
    setScrollPos(ps);

}
