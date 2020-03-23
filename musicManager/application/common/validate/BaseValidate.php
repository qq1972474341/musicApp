<?php

namespace app\common\validate;

use think\Validate;

class BaseValidate extends Validate
{
    public function goCheck($scene = '')
    {
        if (!$this->scene($scene)->check(request()->param())) {
            TApiException($this->getError(), 10000, 400);
        }
        return true;
    }
}
