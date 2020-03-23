<?php

namespace app\common\model;

use think\Model;

class User extends Model
{
    //开启自动时间戳
    protected $autoWriteTimestamp = true;
    //生成token
    public function createSaveToken($arr = [])
    {
        //生成token
        $token = sha1(md5(uniqid(md5(microtime(true)), true)));
        $arr['token'] = $token;
        //登录过期时间
        $expire = array_key_exists('expires_in', $arr) ? $arr['expires_in'] : config('api.token_expire');
        //保存到缓存中
        if (!cache($token, $arr, config('api.token_expire'))) TApiException();
        return $token;
    }
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
