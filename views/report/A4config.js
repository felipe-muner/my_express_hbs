module.exports = {
  "format": "A4",
  "orientation": "landscape",
  "border": "0",
  "header": {
    "height": "10mm",
    "contents": '<div id="cabecalho" style="text-align: center;">Felipe Muner '+`${new Date().toDateString()}`+'</div>'
  },
  "footer": {
    "height": "10mm",
    "contents": {
      //"first": "Cover page",
      //"2": "Second Page",
      "default": '<div style="text-align:right;"><span style="color: #aaa;">qweqw{{page}}</span>/<span>{{pages}}</span></div>',
      //"last": "Last Page"
    }
  }
}
