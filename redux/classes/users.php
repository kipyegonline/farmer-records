<?php


class User{
 public function addUser(array $payload){

        $sql="insert into farm_users (
          user_name,user_email,user_phone, password,firstName,auth_id,uuid, addedon) 
VALUES(:name,:email, :user_phone,:password,:firstName,:auth,:uuid,now())";



$pwd=$this->hashPassword($this->sanitizeInput($payload, 'password'));
$email=$this->sanitizeInput($payload, 'email');
$phone=$this->sanitizeInput($payload, 'phone');
$username=$this->sanitizeInput($payload, 'username');
$name=$this->sanitizeInput($payload, 'name');

$arr =Array(
    
":name"=>$username,
":email"=>filter_var($email,FILTER_SANITIZE_EMAIL),
":user_phone"=>filter_var($phone,FILTER_SANITIZE_NUMBER_INT),
":password"=>$pwd,
":firstName"=>$name,
":auth"=>$payload['altId'],
":uuid"=>$payload['altId']
);
  if(Database::create($sql,$arr)>0){
header("http/status",200);
header('statusText',"User added successfully");
echo json_encode(["status"=>200,'statusText'=>"User added successfully"]);
  }else{
     header("http/status",200);
  }

    }

private function sanitizeInput($payload,$value){
  if(!empty($value)){
 $input= htmlentities(htmlspecialchars(strip_tags($payload[$value])));
 return $input;
  }
     
    }
private function hashPassword($pwd){
        return password_hash($pwd,PASSWORD_BCRYPT,["cost"=>12]);
}

}