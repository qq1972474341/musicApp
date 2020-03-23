<?php

namespace app\api\controller\v1;

use app\common\controller\BaseController;
use app\common\model\User as ModelUser;
use app\common\validate\UserValidate;

class User extends BaseController
{
    //用户登录
    public function Login()
    {
        (new UserValidate())->goCheck('Login');
        $user=(new ModelUser())->Login();
        return self::showResCode('登录成功',$user,200);
    }
}
