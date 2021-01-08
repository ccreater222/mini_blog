<?php
namespace app\controllers;

use app\models\Tag;
use app\models\User;
use yii\rest\ActiveController;
use yii\filters\AccessControl;
class TagController extends ActiveController
{
    public function behaviors()
    {

        $behaviors = parent::behaviors ();
        $behaviors["access"] = [
            'class' => AccessControl::className(),
            'rules' => [
                [
                    'allow' => true,
                    'roles' => [User::findOne (["isAdmin"=>"1"])->username],
                    'actions' => ["index","view","create","update","delete","options","all"]
                ],[
                    "allow"=>true,
                    "actions"=>["view","index","all"],
                    'roles' =>['?']
                ]
            ],
        ];

        return $behaviors; // TODO: Change the autogenerated stub
    }

    public function actionAll(){
        return Tag::find ()->all ();
    }



    public $modelClass = 'app\models\Tag';


}