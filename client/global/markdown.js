marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlightClass: 'hljs',
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});