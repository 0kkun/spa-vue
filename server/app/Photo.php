<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

/**
 * プライマリキーの値を初期設定（int）から変更したい場合は $keyType を上書きする。
 * Photo 作成時に忘れずに setId を呼ばなくてはいけないのはデフォルトのルールと違っていて分かりにくい。
 * そのためコンストラクタで自動的に setId を呼び出している。
 */
class Photo extends Model
{
    /** プライマリキーの型 */
    protected $keyType = 'string';

    public $incrementing = false;

    /** IDの桁数 */
    const ID_LENGTH = 12;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        if (! Arr::get($this->attributes, 'id')) {
            $this->setId();
        }
    }

    /**
     * ランダムなID値をid属性に代入する
     */
    private function setId()
    {
        $this->attributes['id'] = $this->getRandomId();
    }

    /**
     * ランダムなID値を生成する
     * @return string
     */
    private function getRandomId()
    {
        $characters = array_merge(
            range(0, 9), range('a', 'z'),
            range('A', 'Z'), ['-', '_']
        );

        $length = count($characters);

        $id = "";

        for ($i = 0; $i < self::ID_LENGTH; $i++) {
            $id .= $characters[random_int(0, $length - 1)];
        }

        return $id;
    }
}
