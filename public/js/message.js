/* global $, id, loginUser, guestUser */

'use strict';

$(function(){
  // TODO ページの更新ボタン要る？？？？？？？？？？？？？？？？？

  $.ajax({
    type: 'post',
    url: '/message/list',
    data: JSON.stringify({id: id}),
    contentType: 'application/json',
    dataType: 'json',
    success: function(result){
      if (result.error) {
        return console.log(result.error);
      }

      var htmlData = '';
      $.each(result.list, function (i, data) {
        data = JSON.parse(data);
        console.log(data);
        if (data.user === "null") {
          return true;
        }
        console.log(data.user, loginUserName);
        var messageOwner = (data.user === loginUserName) ? 'owner' : 'finder';
        if (messageOwner == 'owner') {
          var innerMessage = '<td class="icon"><img src="https://graph.facebook.com/' + loginUserId  + '/picture" alt=""><td class="fukidashi"></td><td colspan="3" class="message"><p>' + data.comment + '</p></td>'
        } else {
          var innerMessage = '<td colspan="3" class="message"><p>' + data.comment + '</p></td><td class="fukidashi"></td><td class="icon"><img src="/resources/images/icon_finder.png" alt="">'
        }
        var htmlMessage = '<tr class="messageWrapper ' + messageOwner + '">' + innerMessage + '</tr>';
        console.log(htmlMessage);
        htmlData += htmlMessage;
      });
      console.log(htmlData)
      $('#messageArea').html(htmlData);
    },
    error: function(){
      console.log('Server error.');
    },
    complete: function(){
      // 成功失敗かかわらずやる処理
    }
  });

  if (isOwner) {
    var postUserName = loginUserName;
  } else {  
    var postUserName = guestUser;
  }
  
  $('#commentSendBtn').click(function(){
    $.ajax({
      type: 'post',
      url: '/message/comment',
      data: JSON.stringify({id: id, comment: $('#commentText').val(), user: postUserName}),
      contentType: 'application/json',
      dataType: 'json',
      success: function(result){
        if (result.error) {
          return console.log(result.error);
        }
        console.log(result.comment);
        window.location.reload();
      },
      error: function(){
        console.log('Server error.');
      },
      complete: function(){
        // 成功失敗かかわらずやる処理
      }
    });
  });
});

