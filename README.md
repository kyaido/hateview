hateview
==========

## TODO
* 全てのブックマークを表示
* ユーザー検索可
* オートページャー
* browserify
* タグをビジュアライゼーション
* タグで絞り込める  
タグをクリックすると絞り込まれる
* ルーティング
* 


## REF

### hatebu API

http://b.hatena.ne.jp/help/entry/api

http://developer.hatena.ne.jp/ja/documents/bookmark/misc/feed

http://syncer.jp/hatebu-api-matome

http://blog.56doc.net/Entry/472/

### gulp, browserify

http://qiita.com/seanchas_t/items/96fbb63e5fe36f94a42e

### infinite scroll

http://int128.hatenablog.com/entry/2015/02/18/230206

http://qiita.com/hashrock/items/cf3abd70a56c5c97ccb4

http://t-horikiri.hatenablog.jp/entry/20140311/1394528655


## MEMO

* changeイベントで呼ぶのは無謀っぽい、ユーザーが見つからないとエラーになるし。  
なのでとりあえずユーザーの指定はなしでいいかも。
* filterのやりかたがわからん