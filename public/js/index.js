const sideNavElems = document.querySelector('.sidenav');
const selectElems = document.querySelector('#status');

M.Sidenav.init(sideNavElems);
M.FormSelect.init(selectElems);

CKEDITOR.replace('editor1', {
  plugins: 'wysiwygarea, toolbar, basicstyles, link',
});
