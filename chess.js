const http = require('http');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Chess Game</title>
<style>
  body { font-family: sans-serif; }
  #board { border-collapse: collapse; }
  #board td { width: 60px; height: 60px; text-align: center; vertical-align: middle; font-size: 40px; cursor: pointer; }
  .white { background: #eee; }
  .black { background: #888; color: white; }
</style>
</head>
<body>
<h1>Chess</h1>
<table id="board"></table>
<script>
let board = [
 ['r','n','b','q','k','b','n','r'],
 ['p','p','p','p','p','p','p','p'],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['P','P','P','P','P','P','P','P'],
 ['R','N','B','Q','K','B','N','R'],
];
let selected = null;
let turn = 'w';
const pieces = {
 'r':'\u265C','n':'\u265E','b':'\u265D','q':'\u265B','k':'\u265A','p':'\u265F',
 'R':'\u2656','N':'\u2658','B':'\u2657','Q':'\u2655','K':'\u2654','P':'\u2659'
};
function render() {
 const tbl = document.getElementById('board');
 tbl.innerHTML = '';
 for (let r=0;r<8;r++) {
  const tr=document.createElement('tr');
  for (let c=0;c<8;c++) {
   const td=document.createElement('td');
   td.className=(r+c)%2==0?'white':'black';
   if (selected && selected[0]==r && selected[1]==c) td.style.outline='2px solid red';
   td.dataset.r=r;
   td.dataset.c=c;
   const piece=board[r][c];
   td.textContent=pieces[piece] || '';
   td.onclick=onClick;
   tr.appendChild(td);
  }
  tbl.appendChild(tr);
 }
}
function onClick(e) {
 const r=+this.dataset.r, c=+this.dataset.c;
 const piece=board[r][c];
 if (selected) {
  const [sr,sc]=selected;
  if (isLegalMove(sr,sc,r,c)) {
   board[r][c]=board[sr][sc];
   board[sr][sc]='';
   selected=null;
   turn = turn==='w'?'b':'w';
   render();
   return;
  } else {
   selected=null;
   render();
  }
 } else {
  if (piece && ((turn==='w' && piece===piece.toUpperCase()) || (turn==='b' && piece===piece.toLowerCase()))) {
   selected=[r,c];
   render();
  }
 }
}
function isLegalMove(sr,sc,r,c) {
 const piece=board[sr][sc];
 if (!piece) return false;
 const target=board[r][c];
 const isWhite=piece===piece.toUpperCase();
 const dir=isWhite?-1:1;
 switch (piece.toLowerCase()) {
  case 'p':
   if (sc===c && !target) {
     if (r===sr+dir) return true;
     if ((isWhite && sr===6 || !isWhite && sr===1) && r===sr+2*dir && !board[sr+dir][sc]) return true;
   }
   if (Math.abs(sc-c)===1 && r===sr+dir && target && (isWhite ? target===target.toLowerCase() : target===target.toUpperCase())) return true;
   break;
  case 'r':
   if (sr===r || sc===c) return clearPath(sr,sc,r,c) && captureOk(isWhite,target);
   break;
  case 'b':
   if (Math.abs(sr-r)===Math.abs(sc-c)) return clearPath(sr,sc,r,c) && captureOk(isWhite,target);
   break;
  case 'q':
   if (sr===r || sc===c || Math.abs(sr-r)===Math.abs(sc-c)) return clearPath(sr,sc,r,c) && captureOk(isWhite,target);
   break;
  case 'n':
   if ((Math.abs(sr-r)===2 && Math.abs(sc-c)===1) || (Math.abs(sr-r)===1 && Math.abs(sc-c)===2)) return captureOk(isWhite,target);
   break;
  case 'k':
   if (Math.max(Math.abs(sr-r), Math.abs(sc-c))===1) return captureOk(isWhite,target);
   break;
 }
 return false;
}
function captureOk(isWhite,target) {
 if (!target) return true;
 return isWhite ? target===target.toLowerCase() : target===target.toUpperCase();
}
function clearPath(sr,sc,r,c) {
 const dr = Math.sign(r-sr);
 const dc = Math.sign(c-sc);
 let i=sr+dr, j=sc+dc;
 while (i!==r || j!==c) {
  if (board[i][j]) return false;
  i+=dr; j+=dc;
 }
 return true;
}
render();
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.end(html);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Chess app running on http://localhost:${PORT}`);
});
