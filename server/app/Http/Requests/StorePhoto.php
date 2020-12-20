<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePhoto extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * 写真投稿 API は写真ファイルのみを受け取る
     * 必須入力であること・ファイルであること・ファイルタイプが jpg,jpeg,png,gif であることをルールとして定義
     *
     * @return array
     */
    public function rules()
    {
        return [
            'photo' => 'required|file|mimes:jpg,jpeg,png,gif'
        ];
    }
}
