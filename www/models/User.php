<?php

namespace app\models;

use yii\db\ActiveRecord;
use yii\rbac\CheckAccessInterface;
use yii\web\IdentityInterface;

class User extends ActiveRecord implements IdentityInterface,CheckAccessInterface
{
    public static function hash($password=""){
        return md5("goAwayHack".$password);
    }
    public static function tableName()
    {
        return 'User';
    }

    /**
     * 根据给到的ID查询身份。
     *
     * @param string|integer $id 被查询的ID
     * @return IdentityInterface|null 通过ID匹配到的身份对象
     */
    public static function findIdentity($id)
    {
        return static::findOne(["username"=>$id]);
    }

    /**
     * 根据 token 查询身份。
     *
     * @param string $token 被查询的 token
     * @return IdentityInterface|null 通过 token 得到的身份对象
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return NULL;
    }

    /**
     * @return int|string 当前用户ID
     */
    public function getId()
    {
        return $this->username;
    }

    /**
     * @return string 当前用户的（cookie）认证密钥
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * @param string $authKey
     * @return boolean if auth key is valid for current user
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function fields()
    {
        return ["username","password","isAdmin"]; // TODO: Change the autogenerated stub
    }
    public function scenarios()
    {
        return [
            self::SCENARIO_DEFAULT => $this->fields()
        ];
    }


    public function checkAccess( $userId , $permissionName , $params = [] )
    {
        if($permissionName==="admin"){

            return intval(User::findOne (["username"=>$userId])["isAdmin"] ) == 1;
        }elseif ($permissionName==="author"){
            $data = Comment::findOne (["id"=>\YII::$app->request->get ("id",-1)]);
            if($data!==null){
                if($data->author === $userId){
                    return true;
                }
            }
            return false;

        }else{
            return true;
        }
    }

    public function rules()
    {
        return [
            ["username","trim"],
            [["username","password"],"string","length"=>[1,50]]
        ]; // TODO: Change the autogenerated stub
    }
}
