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
      console.log(result.list);
      $('#messageArea').html(/* resultをlist表示とか？おまかせします！ */);
    },
    error: function(){
      console.log('Server error.');
    },
    complete: function(){
      // 成功失敗かかわらずやる処理
    }
  });

  var postUserName = loginUser.displayName || guestUser;

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

