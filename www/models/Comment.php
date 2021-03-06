<?php

namespace app\models;

use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

class Comment extends ActiveRecord
{

    public function fields()
    {
        return ["id","content","to","parent","author"]; // TODO: Change the autogenerated stub
    }



    public function scenarios()
    {
        return [
            self::SCENARIO_DEFAULT => $this->fields()
        ];
    }
    public static function tableName()
    {
        return 'Comment';
    }
    public function save( $runValidation = true , $attributeNames = null )
    {

        $this->id = $this->find()->max('id')?:0;//一定要从0开始，php对字典和数组没有区分，所以在yii输出json的时候[0=>""]会被认为是一个数组而[1=>""]会被认为是一个字典
        $this->id++;
        $this->author = \YII::$app->user->getId ();
        return parent::save ( $runValidation , $attributeNames ); // TODO: Change the autogenerated stub
    }

}
