let backendUrl = location.protocol === 'file:' ? "https://tiktok-chat-reader.zerody.one/" : undefined;

let connection = new TikTokIOConnection(backendUrl),

  gameWords = [],

  realWords = [],

  gamegameSelectedWord = null,

  gameTimer = null,

  gameStatus = false,

  confComment = false,

  confGift = false,

  confLike = false,

  confShare = false,

  confJoin = false,

  confBw = false,

  confGlare = false,

  confTTS = true,

  baseHeight = 600

  //tambahan
  gameWinner = [],

  giftUser = [],

  likeUser = [],
  
  allLike= [
    {"sumLike" : 0,
    "resetLike" : 0,
    "gameResLike" : 0
  }
  ],
  totalAllLike = allLike[0].sumLike,
  totalLikeReset = allLike[0].resetLike,
  totalResGame = allLike[0].gameResLike,
  queueChat = [],

  queueGift = [],

  resumeGame = false,

  musicRun = false,




  


$(document).ready(() => {

  function _0x4b63ee() {

    let widthWindow = window.innerWidth,

      heightWindow = window.innerHeight

    var widthGame = Math.round(0.45 * heightWindow),

      heightGame = heightWindow

    if (widthWindow <= widthGame) {

      var widthGame = widthWindow,

        heightGame = Math.round(2.2222 * widthWindow)

    }

    $('#gameSize').html(widthGame + 'x' + heightGame)

    $('.wrapper').outerWidth(widthGame)

    $('.container').outerWidth(widthGame)

    $('.background').outerWidth(widthGame)

    $('.printer').outerWidth(widthGame)

    $('.animation').outerWidth(widthGame)

    $('.container').outerHeight(heightGame)

    $('.background').outerHeight(heightGame)

    $('.printer').outerHeight(heightGame)

    $('.animation').outerHeight(heightGame)

    let _0x362207 = $('#paperContainer').outerHeight()

    var paperHeight = Math.round(_0x362207 * 1.03)

    let paperWidth = Math.round(widthGame * 0.63)

    $('#paper').outerHeight(paperHeight)

    $('#paper').outerWidth(paperWidth)

    $('#paperPerspective').css('perspective', paperHeight + 'px')

    let _0x386887 = heightGame / baseHeight,

      _0x2b5839 = 10 * _0x386887,

      _0x54cf3e = 16 * _0x386887,

      sizePpWinner = 80 * _0x386887,

      _0x378621 = 125 * _0x386887

    $('#paper').css('font-size', _0x2b5839 + 'px')

    $('#textBottom').css('font-size', _0x54cf3e + 'px')

    $('#winnerAvatar').css('width', sizePpWinner + 'px')

    $('#winnerAvatar').css('height', sizePpWinner + 'px')



    $('#paper').animate({ scrollTop: $('#paper').get(0).scrollHeight }, 0)

  }

  _0x4b63ee()

  $(window).resize(function () {

    _0x4b63ee()

    setTimeout(() => {

      _0x4b63ee()

    }, 250)

  })

  setInterval(() => {

    _0x4b63ee()

  }, 1000)

  $('#targetConnect').click(function (_0x1a2bfa) {

    !gameStatus && prepareGame()

    let uniqueId = $('#targetUsername').val()

    connect(uniqueId)

    saveSetting()

  })

  $('#btnGameToggle').click(function (_0x4aaea8) {

    toggleGamePlay()

  })

  $('#btnSkipWord').click(function (_0x18b733) {

    skipGameWord()
    
    

  })

  $('#btnFullscr').click(function (_0x18b733) {

    toggleFullscreen()
    

  })

  $('#btnPrepare').click(function (_0x13bc05) {

    !gameStatus && prepareGame()

    let uniqueId = $('#targetUsername2').val()

    connect(uniqueId)

    saveSetting()

  })


  $('#controlPanel').click(function (_0x56723c) {})

  $('#btnSaveUI').click(function (_0x5201e1) {

    saveSetting()

    parseConfig()

  })

  $('#btnResetSetting').click(function (_0x32da8b) {

    confirm('Reset setting?') == true &&

      (localStorage.clear(), location.reload(), loadConfig())

  })

  $('#confMinGift').change(function () {

    saveSetting()

  })

  $("input[type='checkbox']").click(function (_0x107eee) {

    saveSetting()

  })

  //tambahan

  $('#coinBtn').click(function (_0x5201e1) {

    saveSetting()

  })

  
  $('#coinSpBtn').click(function (_0x5201e1) {

    saveSetting()

  })

  $('#giftDurBtn').click(function (_0x5201e1) {

    saveSetting()

  })

  $('#giftSpDurBtn').click(function (_0x5201e1) {

    saveSetting()

  })

  $('#welcomeDurBtn').click(function (_0x5201e1) {

    saveSetting()

  })

  $('#followDurBtn').click(function (_0x5201e1) {

    saveSetting()

  })





  
  //connect ke userid
  $('#winnerAvatar').click(function () {

    !gameStatus && prepareGame()

    let uniqueId = $('#targetUsername2').val()

    connect(uniqueId)

    saveSetting()
  })
  //skip word atau kata
  $('.text-guess').click(function () {

    gameStatus && loadGame()

  })
 
  // klik running text untuk munculkan command MP
  $('#uiText1').click(function () {
    
    localStorage.setItem('prefVol', $('#volMusic').val())
    musicRun = true
    playMusic(1)

  })
 
 // klik running text untuk munculkan command MP
 $('#uiText2').click(function () {

  localStorage.setItem('prefVol', $('#volMusic').val())
    musicRun = false
    playMusic(0)


  })


  // klik running text untuk munculkan command MP
  $('#musicPlayBtn').click(function () {
    localStorage.setItem('prefVol', $('#volMusic').val())
    musicRun = true
    playMusic(1)

  })
  
  // klik running text untuk munculkan command MP
  $('#musicStopBtn').click(function () {
    localStorage.setItem('prefVol', $('#volMusic').val())
    musicRun = false
    playMusic(0)


  })

    // klik running text untuk munculkan command MP
    $('#volMusic').change(function () {
      localStorage.setItem('prefVol', $('#volMusic').val())
      if ( musicRun ){
        playMusic(1)

      }

    
    
      })



 
  // klik running text untuk munculkan command MP
  $('#uiText3').click(function () {

    

    addContent(

      "<img src='assets/lang/en/media/taptap.png' style='width:100%'>"

    )
    
    playSound(6)


    

  })

  //klik nama pemenang untuk munculkan like
  $('#textWinner').click(function () {

    confLike = true

    setTimeout(function() {

      confLike = false

    }, 12000);

  })

  //klik taptap button
  $('#tapBtn').click(function (_0x18b733) {
    playSound(9)

    addContent(

      "<img src='assets/lang/en/media/taptap.png' style='width:100%'>"

    )

  })

  $('#musicBtn').click(function (_0x18b733) {
    playMusic(1)

  })

  document.addEventListener('keydown', function(event) {
    if(event.keyCode == 49) {
      addContent(

        "<img src='assets/lang/en/media/mp.png' style='width:100%'>"
  
      );
    }
    else if(event.keyCode == 50) {
      addContent(

        "<img src='assets/lang/en/media/follow.png' style='width:100%'>"
  
      );
      playSound(7)
    }
    else if(event.keyCode == 51) {
      addContent(

        "<img src='assets/lang/en/media/taptap.png' style='width:100%'>"
  
      );
      playSound(6)
    }
    //angka4
    else if(event.keyCode == 52) {
      alert('4 was pressed');
    }
    //angka5
    else if(event.keyCode == 53) {
      confComment = true
    }
    //angka6
    else if(event.keyCode == 54) {
      confLike = true
    }
    //angka7
    else if(event.keyCode == 56) {
      confComment = false
    }
    //angka8
    else if(event.keyCode == 57) {
      confLike = false
    }

    //atas enter
    else if(event.keyCode == 107) {
      playMusic(1)
    }
    //atas enter 2
    else if(event.keyCode == 109) {
      playMusic(0)
    }
    //icon vol up
    else if(event.keyCode == 191) {
      playSound(1)
    }
    //icon vol down
    else if(event.keyCode == 106) {
      playSound(2)
    }
    //icon mute
    else if(event.keyCode == 8) {
      playSound(1)
    }
    //icon power
    else if(event.keyCode == 48) {
      !gameStatus && prepareGame()

      let uniqueId = $('#targetUsername2').val()
  
      connect(uniqueId)
  
      saveSetting()
    }



  });

  loadConfig()

  parseConfig()

})

function speakTTS(chat) {

  if (!confTTS) {

    return

  }

  speak(chat, {

    amplitude: 100,

    pitch: 40,

    speed: 150,

    wordgap: 5,

  })

}

function censor(word) {

  if (!(typeof word === 'string')) {

    return null

  }

  let cencored = [],

    length = word.length,

    target = Math.ceil(length / 2),

    range_end = target

  for (let i = 0; i < length; i++) {

    let c = word.charAt(i)

    i >= 2 && i <= range_end

      ? c === ' '

        ? cencored.push('  ')

        : cencored.push('*')

      : cencored.push(c)

  }

  return cencored.join('')

}

function copyArray(_0x41357b) {

  let _0x3d2321 = []

  for (i = 0; i < _0x41357b.length; i++) {

    _0x3d2321[i] = _0x41357b[i]

  }

  return _0x3d2321

}

function shuffle(_0x4d0e03) {

  let _0x2da09d, _0x3a4fba, _0x1ec82c

  for (_0x1ec82c = _0x4d0e03.length - 1; _0x1ec82c > 0; _0x1ec82c--) {

    _0x2da09d = Math.floor(Math.random() * (_0x1ec82c + 1))

    _0x3a4fba = _0x4d0e03[_0x1ec82c]

    _0x4d0e03[_0x1ec82c] = _0x4d0e03[_0x2da09d]

    _0x4d0e03[_0x2da09d] = _0x3a4fba

  }

  return copyArray(_0x4d0e03)

}

function countDown(waktu) {

  let detik = waktu

  gameTimer != null && clearInterval(gameTimer)

  gameTimer = setInterval(function () {

    detik <= 0 && (clearInterval(gameTimer), loadGame())

    $('#gameTimeout').html(detik.toLocaleString() + 's')

    detik -= 1

  }, 1000)

}

function loadGame() {

  detik = $('#wordDur').val()


  gameWords.length < 1 && (gameWords = shuffle(WORDS.split(/\r?\n/)))

  gameSelectedWord = gameWords.pop().trim()

  $('#gameWords').html(gameWords.length)

  if (typeof gameSelectedWord === 'string') {

    splittedWord = gameSelectedWord.split('|')

    gameSelectedWord = splittedWord[1]

    let _0xcf25ef = censor(gameSelectedWord)

    _0xcf25ef != null

      ? ($('#textGuess').html(

          "<div style='font-size:70%;padding-bottom:1.5%;'>" +

            splittedWord[0] +

            '</div>' +

            censor(gameSelectedWord)

        ),

        countDown(detik))

      : loadGame()

  } else {

    loadGame()

  }

}

function checkWinner(data, _0x3a0dd7) {

  //confComment = false

  if (typeof gameSelectedWord === 'string' && typeof _0x3a0dd7 === 'string') {

    if (

      gameSelectedWord.trim().toLowerCase() == _0x3a0dd7.trim().toLowerCase()

    ) {

      let uniqueId = data.uniqueId,

        ppUrl = data.profilePictureUrl,

        _0x1e1367 = 125 * (window.innerHeight / baseHeight)

      //menambahkan user ke list pemenang
      if (gameWinner.find(gameWinner => gameWinner.uniqueId === uniqueId)){
        winUsername = gameWinner.findIndex((obj => obj.uniqueId== uniqueId));
        gameWinner[winUsername].winCount +=1
        
      }
      else{
        let addWinner = { 
          "uniqueId" : uniqueId,
          "winCount" : 1

        };
        gameWinner.push(addWinner)
      }
      winUsername = gameWinner.findIndex((obj => obj.uniqueId== uniqueId));
      totalWin = gameWinner[winUsername].winCount
   
      

      //rank mode
      userRank = setWinRank(totalWin)[0]
      colRank = setWinRank(totalWin)[1]
      
      addContent(

        "<div style=\"text-align:center;font-size:120%;\">\n"+
            "<div class='benarFont' style='padding-bottom:.25rem;'>🎉🎊 BENAR! 🎉🎊</div>\n "+
            "<div class='benarFont' style='padding-bottom:0.5rem; text-transform:uppercase;'>\n ANSWER : "+gameSelectedWord+" \n </div>\n "+
            "<div>\n "+
                "<div style='padding-bottom:.5rem;'><img class='avatar' src=\"" + ppUrl + '" style="width:' + _0x1e1367 + 'px;height:' + _0x1e1367 +'px;border-radius: 50%;"/>\n </div>\n'+
                '<div class="benarFont2" style="padding-bottom:.25rem;font-weight: bold;">' + uniqueId + '</div>\n'+
                '<div class="benarFont" style="padding-bottom:0rem;border-radius: 5px;background: #E5B513;">\n MENANG '+totalWin+'x GAME \n </div>\n '+
                '<div class="benarFont" style="padding-bottom:0rem;border-radius: 5px;background: '+colRank+';">\n RANK: '+userRank+'\n </div>\n '+
            '</div>\n'+
        '</div>'

      )

      $('#textWinner').html(uniqueId)

      $('#winnerAvatar').attr('src', ppUrl)

      playSound(3)

      playSound(4)
      

      let chatWhinner = MSG_WINNER.replace('|username|', data.uniqueId)

      setTimeout(function() {

        confetti.start()

      }, 0);

      setTimeout(function() {

        confetti.stop()

      }, 800);

      //add delay komen

      /*

      setTimeout(function() {

        confComment = true

      }, 1000);*/

      speakTTS(chatWhinner)

      loadGame()

    }

  }

}

function setWinRank(totalWin) {
  let userRank = "",
      colRank = "";

   //rank mode
   rank1 = "PUBLIC"
   rank2 = "STUDENT"
   rank3 = "JUNIOR HS"
   rank4 = "SENIOR HS"
   rank5 = "BACHELOR"
   rank6 = "PROFESSOR"
   rank7 = "PRESIDENT"
   

  if (totalWin <= 3){
    userRank = rank1
    colRank = "#e5e5e5"
    chatCol = "#e5e5e5"
    //abu
  }
  else if (totalWin <= 6){
    userRank = rank2
    colRank = "#16c60c"
    chatCol = "#adf8d7"
    //ijo
  }
  else if (totalWin <= 12){
    userRank = rank3
    colRank = "#0078d7"
    chatCol = "#aee8ff"
    //biru
  }
  else if (totalWin <= 24){
    userRank = rank4
    colRank = "#9626f6"
    chatCol = "#d7abff"
    //ungu
  }
  else if (totalWin <= 50){
    userRank = rank5
    colRank = "#dd58be"
    chatCol = "#ffabb0"
    //pink
  }
  else if (totalWin <= 100){
    userRank = rank6
    colRank = "#f99747"
    chatCol = "#fc8835"
    //orange
  
  }
  else if (totalWin <= 200){
    userRank = rank7
    colRank = "#fdc515"
    chatCol = "#fde837"
    //gold
  }

  return [userRank,colRank,chatCol]
}

function setGiftRank(totalGift) {
  let userRank = "",
      colRank = "";

   //rank mode
   rank1 = "TIKTOKER"
   rank2 = "EMPLOYER 💼"
   rank3 = "👳‍♂️ BUSSINESMAN 👳‍♂️"
   rank4 = "👸 NOBLE 👸"
   rank5 = "👑 SULTAN 👑"
   rank6 = "🚀 CEO TIKTOK 🚀"
   rank7 = "👹💂👹 AMIN RICHMAN 👹💂👹"

  //chat attribute


  if (totalGift <= 4){
    userRank = rank1
    colRank = "#e5e5e5"
    chatCol = "#e5e5e5"
    colColor = "rgba(229, 229, 229, 0)"
    chatAtr = ""
    //abu
  }
  else if (totalGift <= 30){
    userRank = rank2
    colRank = "#16c60c"
    chatCol = "#adf8d7"
    colColor = "rgba(173, 248, 215, 0.4)"
    chatAtr = "💼"
    //ijo
  }
  else if (totalGift <= 80){
    userRank = rank3
    colRank = "#0078d7"
    chatCol = "#85e3ff"
    colColor = "rgba(133, 227, 255, 0.5)"
    chatAtr = "👳‍♂️"
    //biru
  }
  else if (totalGift <= 200){
    userRank = rank4
    colRank = "#9626f6"
    chatCol = "#d7abff"
    colColor = "rgba(215, 171, 255, 0.5)"
    chatAtr = "👸"
    //ungu
  }
  else if (totalGift <= 700){
    userRank = rank5
    colRank = "#dd58be"
    chatCol = "#ffabb0"
    colColor = "rgba(255, 171, 176, 0.5)"
    chatAtr = "👑"
    //pink
  }
  else if (totalGift <= 999){
    userRank = rank6
    colRank = "#f99747"
    chatCol = "#fc8835"
    colColor = "rgba(252, 136, 53, 0.5)"
    chatAtr = "🚀"
    //orange
  
  }
  else if (totalGift <= 2000){
    userRank = rank7
    colRank = "#fdc515"
    chatCol = "#fde837"
    colColor = "rgba(253, 232, 55, 0.5)"
    chatAtr = "👹💂👹"
    //gold
  }

  return [userRank,colRank,chatCol,colColor,chatAtr]
}


function setLikeRank(totalLike) {
  let likeAtr = ""

   //rank mode
   rank1 = "🌟"
   rank2 = "🌟🌟"
   rank3 = "🌟🌟🌟"
   rank4 = "🌟🌟🌟🌟"
   rank5 = "🌟🌟🌟🌟🌟"

  //chat attribute

  if (totalLike <= 2000){
    likeAtr = rank1
  }

  else if (totalLike <= 3000){
    likeAtr = rank2
  }
  else if (totalLike <= 4000){
    likeAtr = rank3
  }
  else if (totalLike <= 5000){
    likeAtr = rank4
  }
  else if (totalLike >= 5000){
    likeAtr = rank5
  }

  return [likeAtr]
}



function setCheckBox(_0x3a1428, _0x760bf) {

  String(_0x760bf) == 'true'

    ? _0x3a1428.attr('checked', 'checked')

    : _0x3a1428.removeAttr('checked')

}

function loadConfig() {

  let prefUsername = localStorage.getItem('prefUsername'),

    prefUsername2 = localStorage.getItem('prefUsername2'),

    prefComment = localStorage.getItem('prefComment') ?? true,

    prefGift = localStorage.getItem('prefGift') ?? true,

    prefShare = localStorage.getItem('prefShare') ?? true,

    prefLike = localStorage.getItem('prefLike') ?? false,

    prefJoin = localStorage.getItem('prefJoin') ?? false,

    prefBw = localStorage.getItem('prefBw') ?? false,

    prefGlare = localStorage.getItem('prefGlare') ?? false,

    prefTTS = localStorage.getItem('prefTTS') ?? false,

    prefMinCoins = localStorage.getItem('prefMinCoins') ?? 1,

    prefUIText0 = localStorage.getItem('prefUIText0') ?? $('#uiText0').html(),

    prefUIText1 = localStorage.getItem('prefUIText1') ?? $('#uiText1').html(),

    prefUIText2 = localStorage.getItem('prefUIText2') ?? $('#uiText2').html(),

    prefUIText3 = localStorage.getItem('prefUIText3') ?? $('#uiText3').html(),
    
    prefWodDur = localStorage.getItem('prefWordDur') ?? 120,

    prefGiftDur = localStorage.getItem('prefGiftDur') ?? 2,

    prefSPGiftDur = localStorage.getItem('prefSPGiftDur') ?? 3,

    prefWelDur = localStorage.getItem('prefWelDur') ?? 360,

    prefFollowDur = localStorage.getItem('prefFollowDur') ?? 240,

    prefVol = localStorage.getItem('prefVol') ?? 100


  setCheckBox($('#confComment'), prefComment)

  setCheckBox($('#confGift'), prefGift)

  setCheckBox($('#confLike'), prefLike)

  setCheckBox($('#confShare'), prefShare)

  setCheckBox($('#confJoin'), prefJoin)

  setCheckBox($('#confBw'), prefBw)

  setCheckBox($('#confGlare'), prefGlare)

  setCheckBox($('#confTTS'), prefTTS)

  $('#targetUsername').val(prefUsername)

  $('#targetUsername2').val(prefUsername2)

  $('#confMinGift').val(prefMinCoins)

  $('#confText0').val(prefUIText0)

  $('#confText1').val(prefUIText1)

  $('#confText2').val(prefUIText2)

  $('#confText3').val("❤️ ------ Link saweria ada dibio buat jajan ------ ❤️ ------ Jangan lupa follow tiktok : statusngapak_ ------ ❤️")

  $('#wordDur').val(prefWodDur)

  $('#giftDur').val(prefGiftDur)

  $('#spGiftDur').val(prefSPGiftDur)

  $('#welcomeDur').val(prefWelDur)

  $('#followDur').val(prefFollowDur)

  $('#volMusic').val(prefVol)

}

function saveSetting() {

  parseConfig()

  localStorage.setItem('prefComment', $('#confComment').prop('checked'))

  localStorage.setItem('prefGift', $('#confGift').prop('checked'))

  localStorage.setItem('prefLike', $('#confLike').prop('checked'))

  localStorage.setItem('prefShare', $('#confShare').prop('checked'))

  localStorage.setItem('prefJoin', $('#confJoin').prop('checked'))

  localStorage.setItem('prefBw', $('#confBw').prop('checked'))

  localStorage.setItem('prefGlare', $('#confGlare').prop('checked'))

  localStorage.setItem('prefTTS', $('#confTTS').prop('checked'))

  localStorage.setItem('prefUsername', $('#targetUsername').val())

  localStorage.setItem('prefUsername2', $('#targetUsername2').val())

  localStorage.setItem('prefMinCoins', $('#confMinGift').val())

  localStorage.setItem('prefUIText0', $('#confText0').val())

  localStorage.setItem('prefUIText1', $('#confText1').val())

  localStorage.setItem('prefUIText2', $('#confText2').val())

  localStorage.setItem('prefUIText3', $('#confText3').val())

  localStorage.setItem('prefWordDur', $('#wordDur').val())

  localStorage.setItem('prefGiftDur', $('#giftDur').val())

  localStorage.setItem('prefSPGiftDur', $('#spGiftDur').val())

  localStorage.setItem('prefWelDur', $('#welcomeDur').val())

  localStorage.setItem('prefFollowDur', $('#followDur').val())

  localStorage.setItem('prefVol', $('#volMusic').val())

}

function parseConfig() {

  confComment = $('#confComment').prop('checked')

  confGift = $('#confGift').prop('checked')

  confLike = $('#confLike').prop('checked')

  confShare = $('#confShare').prop('checked')

  confJoin = $('#confJoin').prop('checked')

  confBw = $('#confBw').prop('checked')

  confGlare = $('#confGlare').prop('checked')

  confTTS = $('#confTTS').prop('checked')

  confBw

    ? $('#paper').addClass('grayscale')

    : $('#paper').removeClass('grayscale')

  confGlare ? $('#glareAnimation').show() : $('#glareAnimation').hide()

  confTTS ? $('#captionTTS').show() : $('#captionTTS').hide()

  $('#uiText0').html($('#confText0').val())

  $('#uiText1').html($('#confText1').val())

  $('#uiText2').html($('#confText2').val())

  $('#uiText3').html("❤️ ------ Link saweria ada dibio buat jajan ------ ❤️ ------ Jangan lupa follow tiktok : statusngapak_ ------ ❤️")

  welcomeDur = Number.parseInt($('#welcomeDur').val()*1000),
  

  followDur = Number.parseInt($('#followDur').val()*1000)

  

}

function prepareGame() {

  playSound(1)

  playSound(2)

  playSound(3)

  playSound(4)

  playSound(5)

  playSound(6)

  playSound(7)

  playSound(8)

  playSound(10)

  playSound(11)

  playSound(12)

  playSound(13)

  playSound(14)

  playSound(15)

  speakTTS(MSG_TEST)



  addContent(

    "<img src='assets/lang/en/media/mp.png' style='width:100%'>"

  )



  loadGame()

  gameStatus = true

  autoMsg()

  $('#btnGameToggle').html('\u274C STOP')

}

function toggleGamePlay() {

  gameStatus

    ? (clearInterval(gameTimer),

      (gameStatus = false),

      $('#btnGameToggle').html('\u25B6 START'),

      $('#gameTimeout').html('STOP'),

      $('#gameWords').html('&infin;'),

      $('#textGuess').html(

        "<div style='font-size:70%;padding-bottom:1.5%;'>***</div>***"

      ))

    : (loadGame(),

      (gameStatus = true),

      $('#btnGameToggle').html('\u274C STOP'),

      $('#gameTimeout').html('Starting'))

}

function skipGameWord() {

  gameStatus && loadGame()

}

function toggleFullscreen() {

  let elem = document.querySelector('body')

  !document.fullscreenElement

    ? elem.requestFullscreen().catch((error) => {

        alert(

          'Error attempting to enable fullscreen mode: ' +

            error.message +

            ' (' +

            error.name +

            ')'

        )

      })

    : document.exitFullscreen()

}

function connect(username) {

  username !== ''

    ? ($('#stateText').text('Connecting...'),

      $('#usernameTarget').html('@' + username),

      connection

        .connect(username, { enableExtendedGiftInfo: true })

        .then((state) => {

          $('#stateText').text('Connected ' + state.roomId)

        })

        .catch((errorMessage) => {

          $('#stateText').text(errorMessage)

        }))

    : alert('Enter username first!')

}

function sanitize(text) {

  return text.replace(/</g, '&lt;')

}

function isPendingStreak(data) {
  
  return data.giftType === 1 && !data.repeatEnd

}

function playSound(audio) {
  let soundFx = document.getElementById('sfx' + audio)
  if (audio == 1 || audio == 2) {
    soundFx.volume = 0.30; // 75%
    soundFx.play()
  }
  else{
    soundFx.play()
  }
  

}

function playMusic(audio) {
  let music = document.getElementById('sfx9'),
    volMusic = Number.parseInt($('#volMusic').val())/100

  if (musicRun && audio == 1) {
    music.volume = volMusic; // 75%
    music.play()
  }
  else if(!musicRun && audio == 0) {
    music.pause();
    music.currentTime = 0;
  }
 
}

function addContent(data) {

  let container = $('#paper')

  container.append("<div class='item'>" + data + '</div>')

  container.animate({ scrollTop: container.get(0).scrollHeight }, 0)

}

function addChat(username, chat) {

  let totalWin = 0,
      totalCoin = 0,
      totalLike = 0,
      chatCol = "",
      giftCol = "",
      chatAtr = "",
      likeAtr = ""


  if (gameWinner.find(gameWinner => gameWinner.uniqueId === username)){

    winUsername = gameWinner.findIndex((obj => obj.uniqueId== username));
    totalWin = gameWinner[winUsername].winCount
    
  
    //rank mode
    userRank = setWinRank(totalWin)[0]
    chatCol = setWinRank(totalWin)[2]

  }
  
  if (giftUser.find(giftUser => giftUser.uniqueId === username)){
    
    giftUsername = giftUser.findIndex((obj => obj.uniqueId == username));
    totalCoin = giftUser[giftUsername].giftCount 
    giftUrl = giftUser[giftUsername].giftUrl 

    //rank mode
    userRank = setGiftRank(totalCoin)[0]
    giftCol = setGiftRank(totalCoin)[2]
    //setcolom color
    colColor =  setGiftRank(totalCoin)[3]

  }

  if (likeUser.find(likeUser => likeUser.uniqueId === username)){
    likeUsername = likeUser.findIndex((obj => obj.uniqueId== username));
    totalLike =  likeUser[likeUsername].likeCount

    //rank mode
    likeAtr = setLikeRank(totalLike)[0]
  }

  if (totalWin >=1 && totalCoin >= 1 && totalLike >= 1){
    addContent(

      "<img src=\'" + giftUrl + "' style='width:6%;height:6%;'/><span style='font-weight: bold;padding-bottom:0rem;border-radius: 5px;background:"+giftCol+";width: 20%; height: 10%'>" + username + likeAtr+ ":</span> " + chat 
  
    )

  }else if (totalWin >=1 && totalCoin >= 1){
    addContent(

      "<img src=\'" + giftUrl + "' style='width:6%;height:6%;'/><span style='font-weight: bold;padding-bottom:0rem;border-radius: 5px;background:"+giftCol+";width: 20%; height: 10%'>" + username + ":</span> " + chat 
  
    )

  }else if (totalWin >=1 && totalLike >= 1){
    addContent(

      "<span style='font-weight: bold;padding-bottom:0rem;border-radius: 5px;background:"+chatCol+";width: 20%; height: 10%'>" + username +likeAtr+ ":</span> " + chat 
  
    )

  }else if (totalCoin >=1 && totalLike >= 1){
    addContent(

      "<img src=\'" + giftUrl + "' style='width:6%;height:6%;'/><span style='font-weight: bold;padding-bottom:0rem;border-radius: 5px;background:"+giftCol+";width: 20%; height: 10%'>" + username +likeAtr+ ":</span> " + chat 
  
    )

  }else if(totalWin >=1) {

    addContent(

      "<span style='font-weight: bold;padding-bottom:0rem;border-radius: 5px;background:"+chatCol+";width: 20%; height: 10%'>" + username + "</span>: " + chat 
  
    )
  }else if(totalCoin >= 1){
    addContent(

      "<img src=\'" + giftUrl + "'style='width:5%;height:5%;'/><span style='font-weight: bold;padding-bottom:0rem;border-radius: 5px;background:"+giftCol+";width: 20%; height: 10%'>" + username + "</span>: " + chat 
  
    )
    
  }else if(totalLike >= 1){
    addContent(

      "<span style='font-weight: bold;padding-bottom:0rem;border-radius: 5px;'>" + username +likeAtr+ "</span>: " + chat 
  
    )
    
  }
  
    
  else{
    addContent(
      "<span style='font-weight: bold;padding-bottom:0rem;width: 20%; height: 10%''>" + username + '</span>: ' + chat 
  
    )
  }


  playSound(1)

}

function addSocial(uniqueId, chat) {
  addContent(

    "<div style=\"text-align:center;font-size:90%;\">\n      <div style='padding-bottom:.25rem;'>⭐"+

    chat+" ⭐</div>\n                    <div style='font-size:125%;font-weight: bold;'>" +

    uniqueId + " </div>\n              </div>"

  )

  playSound(1)

}



function addMessage(data) {

  let username = data.uniqueId,
    textSanitize = data.comment
    chat = sanitize(textSanitize),

    commandChat = chat.split(' ')[0]

  if (commandChat == '/say' || commandChat == '/ngomong') {

    let ttsChat = chat.replace('/say', '').replace('/ngomong', '')

    speakTTS(ttsChat)

  } else {

    confComment && addChat(username, chat)

    }

  }

  function addGiftSingle(data, id) {
    
    //matikan gift dan chat
    let giftDur = Number.parseInt($('#giftDur').val())*1000,
        spGiftDur = Number.parseInt($('#spGiftDur').val())*1000
    
   
    
    if (id == 1){
      confGift = false
      confComment = false
      let username = data.uniqueId,
          ppUrl = data.profilePictureUrl,
          giftUrl = data.giftPictureUrl,
          giftName = data.giftName,
          repeatCount = data.repeatCount,
          totalCoin = data.diamondCount * data.repeatCount,
          sizePP = 110 * (window.innerHeight / baseHeight)
      
      //menambahkan user ke list gifter
      if (giftUser.find(giftUser => giftUser.uniqueId === username)){
        giftUsername = giftUser.findIndex((obj => obj.uniqueId == username));
        giftUser[giftUsername].giftCount += totalCoin
        
      }
      else{
        let addGifter = { 
          "uniqueId" : username,
          "giftCount" : totalCoin,
          "giftUrl" : giftUrl

        };
        giftUser.push(addGifter)
      }
      giftUsername = giftUser.findIndex((obj => obj.uniqueId== username));
      totalGift = giftUser[giftUsername].giftCount

      //rank mode
      userRank = setGiftRank(totalGift)[0]
      giftCol = setGiftRank(totalGift)[2]
      //setcolom color
      colColor =  setGiftRank(totalGift)[3]
     


    
      addContent(

        "<div style=\"text-align:center;font-size:110%;border-radius: 5px;\">\n "+
            "<div class='tyg';style='padding-bottom:.5rem;'>\n"+
                "<span style='font-size: 40%;'> ❤️ </span> THANKYOU <span style='font-size: 40%;'> ❤️ </span> <span style='font-weight: bold;'></span>\n"+
            "</div>\n"+
            "<div style='padding-bottom:.5rem;'>\n"+
                "<img class='avatar' src=\'"+ppUrl+"' style='width:"+sizePP+"px;height:" +sizePP + "px;border-radius: 50%;'/>\n"+
            "</div>\n"+
            "<div style='padding-bottom:.5rem;'>\n<span style='font-weight: bold;font-size:120%;'>" + username + "</span>\n"+
            "<div style='padding-bottom:.5rem;'>\n<span style='font-weight: bold;font-size:100%;border-radius: 5px;background: "+giftCol+";'>" + userRank + "</span>\n"+
            "</div>\n"+
            "<div style='font-weight: bold;padding-bottom:.5rem;'>\n "+
            "<img src=\'" + giftUrl + "' style='width:30px;height:30px;'/> <span style='font-size:100%'>" + repeatCount.toLocaleString() + "x "+giftName+" </span>\n"+
            "</div>\n"+
            "<div style='font-weight: bold;border-radius: 5px;background: "+colColor+";'><span style='font-size:100%'>You Get "+totalCoin+" Point </span>\n "+
            "<div><span style='font-size:120%;'>Your Point: "+totalGift+"</span></div></div>\n "+
            "</div>\n"+
        "</div>"

      )
      setTimeout(function() {
        confetti.start()
      }, 0);
    
      setTimeout(function() {
        confetti.stop()
      }, 500);
    
      setTimeout(function() {
        confGift = true
        confComment = true
      }, spGiftDur);
    
      
      if ( 5 <= totalCoin && totalCoin < 10){
        playSound(15)
      }
      else if ( 10 <= totalCoin && totalCoin < 15){
        playSound(12)
      }
      else if (15 <= totalCoin && totalCoin < 20){
        playSound(10)
      }
      else if (20 <= totalCoin && totalCoin < 25 ){
        playSound(14)
      }

      else if (25 <= totalCoin  ){
        playSound(11)
      }
      playSound(13)
      playSound(2)
      playSound(5)

    }
    if (id == 2){
      confGift = false
      confComment = false
      data1 = data[0]
      data2 = data[1]
      let username1 = data1.uniqueId,
        username2 = data2.uniqueId,
        ppUrl1 = data1.profilePictureUrl,
        ppUrl2 = data2.profilePictureUrl,
        giftUrl1 = data1.giftPictureUrl,
        giftUrl2 = data2.giftPictureUrl,
        giftName1 = data1.giftName,
        giftName2 = data2.giftName,
        repeatCount1 = data1.repeatCount,
        repeatCount2 = data2.repeatCount,
        totalCoin1 = data1.diamondCount * data1.repeatCount,
        totalCoin2 = data2.diamondCount * data2.repeatCount,
        sizePP = 70 * (window.innerHeight / baseHeight)

      //menambahkan user1 ke list gifter
      if (giftUser.find(giftUser => giftUser.uniqueId === username1)){
        giftUsername = giftUser.findIndex((obj => obj.uniqueId== username1));
        giftUser[giftUsername].giftCount += totalCoin1
      }
      else{
        let addGifter = { 
          "uniqueId" : username1,
          "giftCount" : totalCoin1
        };
        giftUser.push(addGifter)
      }

      giftUsername = giftUser.findIndex((obj => obj.uniqueId== username1));
      totalGift1 = giftUser[giftUsername].giftCount
     

      //menambahkan user2 ke list gifter
      if (giftUser.find(giftUser => giftUser.uniqueId === username2)){
        giftUsername = giftUser.findIndex((obj => obj.uniqueId== username2));
        giftUser[giftUsername].giftCount += totalCoin2
        
      }
      else{
        let addGifter = { 
          "uniqueId" : username2,
          "giftCount" : totalCoin2

        };
        giftUser.push(addGifter)
      }
      giftUsername2 = giftUser.findIndex((obj => obj.uniqueId == username2));
      totalGift2 = giftUser[giftUsername].giftCount
      
      
      //rank mode
      userRank1 = setGiftRank(totalGift1)[0]
      giftCol1 = setGiftRank(totalGift1)[2]
      //setcolom color
      colColor1 =  setGiftRank(totalGift1)[3]
      
      //rank mode
      userRank2 = setGiftRank(totalGift2)[0]
      giftCol2 = setGiftRank(totalGift2)[2]
      //setcolom color
      colColor2 =  setGiftRank(totalGift2)[3]


      addContent(

        "<table class='tg' style='text-align:center;width: 100%'>"+
          "<thead>"+
            "<tr>"+
              "<td class='tg-0lax' style='text-align:center;border-radius: 5px;background: "+colColor1+";'>"+
                "<div style=\"text-align:center;font-size:110%;\">\n "+
                    "<div class='tyg';style='padding-bottom:.5rem;'>\n"+
                        "<span style='font-size: 40%;'> ❤️ </span> THANKYOU <span style='font-size: 40%;'> ❤️ </span> <span style='font-weight: bold;'></span>\n"+
                    "</div>\n"+
                    "<div style='padding-bottom:.5rem;'>\n"+
                        "<img class='avatar' src=\'"+ppUrl1+"' style='width:"+sizePP+"px;height:" +sizePP + "px;border-radius: 50%;'/>\n"+
                    "</div>\n"+
                    "<div style='padding-bottom:.5rem;'>\n<span style='font-weight: bold;'>" + username1 + "</span>\n"+
                    "<div style='padding-bottom:.5rem;'>\n<span style='font-weight: bold;border-radius: 5px;background: "+giftCol1+";'>" + userRank1 + "</span>\n"+
                    "</div>\n"+
                    "<div style='font-weight: bold;padding-bottom:.5rem;'>\n "+
                    "<div style='font-weight: bold;padding-bottom:0rem;'>\n "+
                        "<img src=\'" + giftUrl1 + "' style='width:30px;height:30px;'/> <span style='font-size:60%'>" + repeatCount1.toLocaleString() + "x "+giftName1+" </span>\n"+
                    "</div>\n"+
                    "<span style='font-size:80%'>You Get "+totalCoin1+" Point </span>\n "+
                    "<div style='font-weight: bold;padding-bottom:.5rem;'><span style='font-size:100%'>Your Point: "+totalGift1+"</span></div>\n "+
                "</div>"+
              "</td>"+
              "<td class='tg-0lax' style='text-align:center;border-radius: 5px;background: "+colColor2+";'>"+
                "<div style=\"text-align:center;font-size:110%;\">\n "+
                    "<div class='tyg';style='padding-bottom:.5rem;'>\n"+
                        "<span style='font-size: 40%;'> ❤️ </span> THANKYOU <span style='font-size: 40%;'> ❤️ </span> <span style='font-weight: bold;'></span>\n"+
                    "</div>\n"+
                    "<div style='padding-bottom:.5rem;'>\n"+
                        "<img class='avatar' src=\'"+ppUrl2+"' style='width:"+sizePP+"px;height:" +sizePP + "px;border-radius: 50%;'/>\n"+
                    "</div>\n"+
                    "<div style='padding-bottom:.5rem;'>\n<span style='font-weight: bold;'>" + username2 + "</span>\n"+
                    "<div style='padding-bottom:.5rem;'>\n<span style='font-weight: bold;border-radius: 5px;background: "+giftCol2+";'>" + userRank2 + "</span>\n"+
                    "</div>\n"+
                    "<div style='font-weight: bold;padding-bottom:0rem;'>\n "+
                        "<img src=\'" + giftUrl2 + "' style='width:30px;height:30px;'/> <span style='font-size:60%'>" + repeatCount2.toLocaleString() + "x "+giftName2+" </span>\n"+
                    "</div>\n"+
                    "<span style='font-size:80%'>You Get "+totalCoin2+" Point </span>\n "+
                    "<div style='font-weight: bold;padding-bottom:.5rem;'><span style='font-size:100%;'>Your Point: "+totalGift2+"</span></div>\n "+
                "</div>"+
              "</td>"+

          "</tr>"+
        "</thead>"+
      "</table>" 
      )

      setTimeout(function() {
        confetti.start()
      }, 0);
    
      setTimeout(function() {
        confetti.stop()
      }, 500);
    
      setTimeout(function() {
        confGift = true
        confComment = true
      }, giftDur);
    
      playSound(13)
      playSound(2)
      playSound(5)
      }

  }
  
let checkGift = []

function addGift(data) {


  if (data.length > 1){
    data1 = data[0]
    data2 = data[1]
    let totalCoin1 = data1.diamondCount * data1.repeatCount,
        totalCoin2 = data2.diamondCount * data2.repeatCount,
        minCoin = Number.parseInt($('#confMinGift').val())

    minCoin <= 0 && (minCoin = 1)
    
    //check coin data 1
    if (totalCoin1 > 1){
      addGiftSingle(data1,1)
      
    } else{
      
      checkGift.push(data1)
    }
    //check coin data 2
    if (totalCoin2 > 1){
      addGiftSingle(data2,1)
     
    } else{
     
      checkGift.push(data2)
    }
    //print jadi 2 yg 1 coin
   
    if (checkGift.length >= 2) {
      flush = checkGift.splice(0,2)
      addGiftSingle(flush,2)

     
    }
    if (checkGift.length == 1 && queueGift.length == 0) {
      addGiftSingle(checkGift.shift())
      

      //pending masih kesimpen 1 object

    }
  }


  //let ttsGift = MSG_GIFT.replace('|username|', username)

  //speakTTS(ttsGift)

}


function autoMsg() {

//waktu utk welcome screen
var intervalWelcome = setInterval(function() {
  if (gameStatus){
   
    addContent(

      "<div><img src='assets/lang/en/media/mp.png' style='width:100%;border-radius: 10px;'></div>"
  
    )
  }


}, welcomeDur);

//waktu utk follow screen
var intervalFollow = setInterval(function() {
  if (gameStatus){
    
    addContent(

      "<div><img src='assets/lang/en/media/follow.png' style='width:100%;border-radius: 10px;'></div>"
  
    )
    playSound(7)
  }

}, followDur);


}





//waktu utk cetak chat
var intervalSkipWord = setInterval(function() {
  if (totalAllLike ==1){
    skipGameWord()
  }
}, 500);


//waktu utk cetak chat
var intervalChat = setInterval(function() {
  if (confComment && queueChat.length >=1){
    cetakChat()
  }
}, 100);

//cetak chat
function cetakChat(){

  msg = queueChat.shift()
  addMessage(msg)
  checkWinner(msg, msg.comment)
  
}

//waktu utk cetak gift
var intervalGift = setInterval(function() {
  if (confGift && queueGift.length >=1){
    cetakGift()
  }
}, 100);

let giftTable = []
//cetak gift
function cetakGift(){

  if (queueGift.length > 1){
    giftData = queueGift.splice(0,2)
    addGift(giftData)
  }
  else if (queueGift.length == 1){
    let newGiftdata = []
    if (checkGift == 1){
      newGiftdata.push(checkGift.shift())
      newGiftdata.push(queueGift.shift())
      addGift(newGiftdata)
    } else {
      addGiftSingle(queueGift.shift(),1)
    }
    
  }

  
  
}

function stopAll(){
  totalResGame = 0
  resumeGame = true
  confGift = false
  confComment = false
  confLike = true
  
}

function resumeAll(){
  resumeGame = false
  confGift = true
  confComment = true
  confLike = false
}

//koneksi chat
connection.on('chat', (msg) => {
  queueChat.push(msg)

})

//koneksi gift
connection.on('gift', (data) => {

  !isPendingStreak(data) &&

    data.diamondCount > 0 &&

    queueGift.push(data)
    

})


connection.on('like', (data) => {
  confLike &&

  addChat(

    data.uniqueId,

    data.label

      .replace('{0:user}', '')

      .replace('likes', data.likeCount + ' likes')

  )
}
)



connection.on('social', (data) => {

  confShare &&

    addSocial(data.uniqueId, data.label.replace('{0:user}', ''))

})

let joinMsgDelay = 0

connection.on('member', (data) => {

  let addDelay = 250

  if (joinMsgDelay > 500) {

    addDelay = 100

  }

  if (joinMsgDelay > 1000) {

    addDelay = 0

  }

  joinMsgDelay += addDelay

  setTimeout(() => {

    joinMsgDelay -= addDelay

    confJoin && addChat(data.uniqueId, 'joined')

  }, joinMsgDelay)

})

connection.on('streamEnd', () => {

  $('#stateText').text('Stream ended.')

})
