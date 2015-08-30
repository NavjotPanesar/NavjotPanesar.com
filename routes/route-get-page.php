<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 7/4/15
 * Time: 12:38 PM
 */
include_once("nbbc.php");
include_once 'DAL.php';
include 'misc.php';

$page = htmlspecialchars($_GET['page']);

$dal = DAL::getDAL();
$data = $dal->getSinglePostData($page);

$bbcode = new BBCode;

$content = $data->content;
$bbcodeText = $bbcode->Parse($content);
$data->content = htmlspecialchars_decode($bbcodeText);

echo json_encode($data);

//echo htmlspecialchars_decode($bbcode->Parse($data->content));