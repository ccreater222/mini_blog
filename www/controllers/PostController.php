<?php
namespace app\controllers;

use app\models\Comment;
use app\models\Tag;
use app\models\Post;
use app\models\User;
use yii\rest\ActiveController;
use yii\filters\AccessControl;
use yii\rest\DeleteAction;

class PostController extends ActiveController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors ();
        $behaviors["access"] = [
            'class' => AccessControl::className(),
            'rules' => [
                // 允许认证用户
                [
                    'allow' => true,
                    'roles' => [User::findOne (["isAdmin"=>"1"])->username],
                    'actions' => ["index","view","create","update","delete","options","all"]
                ],[
                    "allow"=>true,
                    "actions"=>["view","index","all"]
                ]
                // 默认禁止其他用户
            ],
        ];

        return $behaviors; // TODO: Change the autogenerated stub
    }

    public function actions()
    {
        $actions = parent::actions ();
        $actions["delete"]["class"]="app\controllers\PostDelete";
        return $actions; // TODO: Change the autogenerated stub
    }

    public function actionAll(){
        return Post::find ()->all ();

    }

    public $modelClass = 'app\models\Post';
}


class PostDelete extends DeleteAction{
    public function run( $id )
    {
        parent::run ( $id ); // TODO: Change the autogenerated stub
        Comment::deleteAll('`to` = :to', array(':to' => $id));
        Tag::deleteAll('`postId` = :postId', array(':postId' => $id));//TODO: 懒得加事务功能，，

    }
}

