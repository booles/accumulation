;(function(util) {

  var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g
  var SLASH_RE = /\\\\/g

  util.parseDependencies = function(code) {
    var ret = [], m
    REQUIRE_RE.lastIndex = 0
    code = code.replace(SLASH_RE, '')

    while ((m = REQUIRE_RE.exec(code))) {
      if (m[2]) ret.push(m[2])
    }

    return util.unique(ret)
  }

})(seajs._util);

/
"(?:\"|[^"])"| #双引号里内容
'(?:\'|[^'])'| #单引号里内容
\/*[\S\s]?\\/| #多行注释符里内容
\/(?:\\/|[^/\r\n])+\/(?=[^\/])| #处理正则表达式
\/\/.| #处理单行注释
.\srequire| #处理a.require的特殊情况
(?:^|[^$])\brequire\s(\s(["'])(.+?)\1\s*) #提取require
/g

var SLASH_RE = /\\\\/g
code = code.replace(SLASH_RE, '')  // 处理以 \\ 结束的字符串