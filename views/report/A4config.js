module.exports = {
  "format": "A4",
  "orientation": "portrait",
  "border": "0",
  "header": {
    "height": "10mm",
    "contents": '<div id="cabecalho" style="text-align: center;">Felipe Muner '+`${new Date().getHours() + '/' + new Date().getMinutes() }`+'</div>'
  },
  "footer": {
    "height": "10mm",
    "contents": {
      "first": "Cover page",
      "2": "Second Page",
      "default": '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
      "last": "Last Page"
    }
  }
}
