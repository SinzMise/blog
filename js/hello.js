if (window.console) {
  Function.prototype.makeMulti = function () {
    let l = new String(this);
    l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"));
    return l;
  };
  let string = function () {
    /*
 __ _                  _          _      _                          
/ _(_)_ __  ____ /\/\ (_)___  ___( )__  | |__   ___  _   _ ___  ___ 
\ \| | '_ \|_  //    \| / __|/ _ \/ __| | '_ \ / _ \| | | / __|/ _ \
_\ \ | | | |/ // /\/\ \ \__ \  __/\__ \ | | | | (_) | |_| \__ \  __/
\__/_|_| |_/___\/    \/_|___/\___||___/ |_| |_|\___/ \__,_|___/\___|
Welcome to SinzMise's house!
    */
  };
  console.log("\n%c Hexo 6.3.0 %c Butterfly 4.5.1 ","color:#444;background:#eee;padding:5px 0;","color:#F8F8FF;background:#2d402c;padding:5px 0;");
  console.log(string.makeMulti());
}