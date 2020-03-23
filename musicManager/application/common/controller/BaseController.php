<?php

namespace app\common\controller;

use think\Controller;
use think\Request;

class BaseController extends Controller
{
    //初始化
    protected function initialize()
    {
    }
    //返回统一数据格式  有数据
    static public function showResCode($msg = '未知数据', $data = [], $code = 200)
    {
        $res = [
            'msg' => $msg,
            'data' => $data
        ];
        return json($res, $code);
    }
    //返回统一数据格式  无数据
    static public function showResCodeWithOut($msg = '未知', $code = 200)
    {

        return self::showResCode($msg, [], $code);
    }
}
