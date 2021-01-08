<?php

namespace app\models;

use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

class Post extends ActiveRecord
{

    public function fields()
    {

        if(intval(User::findOne (["username"=>\YII::$app->user->getId ()])["isAdmin"] ) == 1){
            return ["id","content","title","date","needPassword"=>function(){return $this->password!="";},"password"];
        }
        return ["id","content","title","date","needPassword"=>function(){return $this->password!="";}]; // TODO: Change the autogenerated stub
    }

    public function scenarios()
    {
        return [
            self::SCENARIO_DEFAULT => ["id","content","password","title","date"]
        ];
    }
    public static function tableName()
    {
        return 'Post';
    }
    public function save( $runValidation = true , $attributeNames = null )
    {
        if($this->id===null){
            $this->id = $this->find()->max('id')?:0;
            $this->id++;
        }
        return parent::save ( $runValidation , $attributeNames ); // TODO: Change the autogenerated stub
    }
    public function rules()
    {
        return [["title","string","length"=>[0,50]],["date","date","format"=>"yyyy-mm-dd"]]; // TODO: Change the autogenerated stub
    }

}
