# オンライン手書き数字認識システム

## What is this??

ブラウザ上で動作する手書き数字認識システムです。  
ブラウザ上のキャンバスに数字を一文字書いて識別ボタンを押すと、書いた数字が何だったか判定してくれます。  
（ChromeとSafariは動作確認済み。）

## What is used??

・Python 3.4.3
・jQuery 2.1.4
・bootstrap 3.3.5

## How to run??

```
$ git clone https://github.com/piruty-joy/online_handwrite_number_recog.git # ソースコードの取得
$ cd online_handwrite_number_recog
$ pip install -r requirements.txt # python3で使用するライブラリのインストール
$ python3 app.py # サーバーの起動
```

## How to recognize?

1. サーバーを起動する
1. ブラウザでアクセスする。（デフォルトでは[http://localhost:5000](http://localhost:5000)）
1. 画面上のキャンバス部分に数字を一つ書く
1. 「識別」ボタンを押す。
1. 生暖かい目で結果を見守る。
