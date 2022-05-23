<?php
$db="FarmRecords";
$host="localhost";
$user="vince";
$password="//matata11";
define("APP_DB_DSN","mysql:host=$host;dbname=$db");
define("APP_DB_USER",$user);
define("APP_DB_PASSWORD",$password);


class Database extends PDO {
  
  // A static variable to hold our single instance
  private static $_instance = null;
  
  // Make the constructor private to ensure singleton
  private function __construct()
  {
    // Call the PDO constructor
    parent::__construct(APP_DB_DSN, APP_DB_USER, APP_DB_PASSWORD);
  }

  // A method to get our singleton instance
  public static function getInstance()
  {
    if (!(self::$_instance instanceof Database)) {
      self::$_instance = new Database();
    }
    
    return self::$_instance;
  }
  public static function create(string $sql, array $array){
      try {
          //code...
          $stmt=self::getInstance()->prepare($sql);
          if($stmt){
             $stmt->execute($array);
             $id=self::getInstance()->lastInsertId();
             $datum= $stmt->fetch();
            if($id>0) return $id;
            else throw new Error("Error adding to database, Try again later ". $stmt->errorInfo());
          }
      } catch (PDOException $e) {
          //throw $th;
          echo "Error ". $e->getMessage();
      }

  }

  public static function getAll($query){
  try {
          //code...
          $stmt=self::getInstance()->query($query);
          if($stmt){
             //$stmt->query();           
             $datum= $stmt->fetchAll(PDO::FETCH_ASSOC);
           return $datum;
           
          }
      } catch (PDOException $e) {
          //throw $th;
      }
  }
}

