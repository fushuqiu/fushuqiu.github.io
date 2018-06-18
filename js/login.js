 var aInputs = document.getElementsByTagName('input');
  var oClear = document.getElementById('clear');
  var db = openDatabase('zuchedenglu', '1.0', 'textdb', '1024*1024');
  db.transaction(function(contex) {
    //  tx.executeSql('drop table userinf');
    //contex.executeSql('create table if not exists userinf(id unique,name,password)');
    contex.executeSql('create table if not exists userinf(id integer primary key AutoIncrement,name,password)');
  });
  var oBtn = document.getElementById('btn');
  var blogin = true;
  oBtn.onclick = function() {
    if (aInputs[0].value && aInputs[1].value) {
      db.transaction(function(contex) {
        contex.executeSql('select * from userinf', [], function(con, data) {
          var leg = data.rows.length,
            i;
          for (var i = 0; i < leg; i++) {
            if (aInputs[0].value == data.rows.item(i).name && aInputs[1].value == data.rows.item(i).password) {
              blogin = false;
              break;
            }
          }
          if (blogin) {
            alert('请输入正确的账号和密码！');
          } else {
            alert('登陆成功！');
            window.location.href='Main.html';
          }
        });
      });
    } else {
      alert('请填写完整的账号密码！');
      window.location.href='index.html';
    }
  }
  oClear.onclick = function() {
    db.transaction(function(contex) {
      contex.executeSql('drop table userinf');
    });
  }
