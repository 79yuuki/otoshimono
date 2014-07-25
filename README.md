# おとしもの

[http://otoshimono.herokuapp.com/]
※callback_urlとdeveloper.facebook.comでの設定変更が必要。

## quick start

起動

```

  npm install
  npm start

```

## Routing

### /login/:id (GET)
落とす側のログイン

### /auth/facebook (GET)
落とす人が叩く facebook ログイン

成功callback先 -> /message/[:id]

失敗すると/loginへ

### /message/:id (GET)
メッセージやりとり
- [ ] ログインしていたら落とした人判定

### /message/comment (POST)
メッセージを自分のユーザー名で送る
param: id, comment
return: json (ex) { "comment": "使わないかもしれないけどコメント内容が一応返ってくるよ" }

### /message/list (POST)
メッセージ取得

### /profile/:id (GET)
拾った人が最初にみるプロフページ
- [ ] 名前登録されていたらその名前でmessageページヘ

### /profile/finder (POST) 
- [ ] 拾った人の名前登録
param: name

