# おとしもの

## quick start

起動

```

  npm install
  npm start

```

## Routing

### /login/[:id] (GET)
落とす側のログイン

### /auth/facebook (GET)
落とす人が叩く facebook ログイン
成功callback先 -> /message/[:id]
失敗すると/login

### /message/[:id] (GET)
メッセージやりとり

### /profile/[:id] (GET)
拾った人が最初にみるプロフページ

