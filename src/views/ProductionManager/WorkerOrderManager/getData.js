export default param => {
  return ConvertJson(param)
}

function ConvertJson(strJson) {
  var Data = new Array()
  console.log(strJson)
  for (var i = 0; i < strJson.length; i++) {
    // console.log(strJson[i].loginname);
    // var user = {};
    // user["userid"] = strJson[i].userid;
    // user["roleid"] = strJson[i].roleid;
    // user["loginname"] = strJson[i].loginname;
    // // user["password"]=strJson[i].password;
    // user["username"] = strJson[i].username;
    // user["jobnumber"] = strJson[i].jobnumber;
    // user["stationcode"] = strJson[i].stationcode;
    // user["position"] = strJson[i].position;
    // user["telnumber"] = strJson[i].telnumber;
    // user["email"] = strJson[i].email;
    // if (strJson[i].is_enable == 1) {
    //   user["is_enable"] = "有效";
    // } else {
    //   user["is_enable"] = "无效";
    // }
    // user["updatetime"] = strJson[i].updatetime;
    // user["updateuser"] = strJson[i].updateuser;
    // Data.push(user);
  }
  // console.log(Data);
  return Data
}
