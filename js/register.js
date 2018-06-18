 var aInputs = document.getElementsByTagName('input');
  var oClear = document.getElementById('clear');
  var db = openDatabase('zuchedenglu', '1.0', 'textdb', '1024*1024');
  db.transaction(function(contex) {
    contex.executeSql('create table if not exists userinf(id unique,name,password)');
  });
  var oBtn = document.getElementById('btn');
  var num = 0;
  oBtn.onclick = function() {
    if (aInputs[0].value && aInputs[1].value) {
      db.transaction(function(contex) {
        contex.executeSql('select * from userinf', [], function(con, data) {
          var leg = data.rows.length,
            i;
          for (var i = 0; i < leg; i++) {
            if (aInputs[0].value == data.rows.item(i).name) {
              alert('该用户名已注册！');
              return;
            }
          }
          num =leg +1;
        });
        contex.executeSql('insert into userinf(id,name,password) values("' + num + '","' + aInputs[0].value + '","' + aInputs[1].value + '")');
        alert('注册成功');
      });
    } else {
      alert('请填写完整的账号密码！');
    }
  }
  oClear.onclick=function(){
    db.transaction(function(contex) {
      contex.executeSql('drop table userinf');
    });
  }
