<?php

namespace app\models;

use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

class Tag extends ActiveRecord
{

    public function fields()
    {
        return ["id","name","postId"]; // TODO: Change the autogenerated stub
    }

    public function scenarios()
    {
        return [
            self::SCENARIO_DEFAULT => $this->fields()
        ];
    }
    public static function tableName()
    {
        return 'Tag';
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
        return [
            ["name","string",'length' => [0, 50]]
        ]; // TODO: Change the autogenerated stub
    }

}
