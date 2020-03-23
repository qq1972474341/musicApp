<?php

namespace app\common\model;

use think\Model;

class User extends Model
{
    //开启自动时间戳
    protected $autoWriteTimestamp = true;
    //用户登录
    public function Login()
    {
        //微信用户登录
        $param = request()->param();
        $user = $this->where('openid', $param['openid'])->find();
        //无此用户自动创建账号
        if (!$user) {
            $user = self::create([
                'openid' => $param['openid'],
                'avatarUrl' => $param['avatarUrl'],
                'nickName' => $param['nickName'],
                'playNum' => 15, //默认赠送15点播放
            ]);
            return $user;
        }
        $user->avatarUrl = $param['avatarUrl'];
        $user->nickName = $param['nickName'];
        $user->save();
        return $user;
    }
}
