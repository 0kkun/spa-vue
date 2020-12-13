<?php

// APIのURL以外のリクエストに対してはindexテンプレートを返す
// 画面遷移はフロントエンドのVueRouterが制御する
// PHP 7.4 から導入されたアロー関数の文法を用いている
Route::get('/{any?}', fn() => view('index'))->where('any', '.+');
