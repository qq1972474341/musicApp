<?php

namespace app\common\validate;



class UserValidate extends BaseValidate
{
    /**
     * 定义验证规则
     * 格式：'字段名'	=>	['规则1','规则2'...]
     *
     * @var array
     */
    protected $rule = [
        'openid' => 'require',
        'avatarUrl' => 'require',
        'nickName'=>'require'
    ];

    /**
     * 定义错误信息
     * 格式：'字段名.规则名'	=>	'错误信息'
     *
     * @var array
     */
    protected $message = [];
    //场景
    protected $scene = [
        //登录场景
        'Login' => 'openid,avatarUrl,nickName'
    ];
}
