var main = document.getElementById('main');
var start = document.getElementById('startSection');
var win = document.getElementById('winMsg');
//start game after click on button
function startgame(){
	main.style.display = 'block';
	start.style.display = 'none'
}
// create random array
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var res = arr.concat(arr); // double values
shuffle(res); 

// create cards
res.map((v)=>{
	var div = document.createElement('div');
	var p = document.createElement('p');
	div.classList.add('cards');
	div.onclick = findWinner(v);

	div.appendChild(p); // display p inside cards
	main.appendChild(div) // display cards inside main section
});

var check = [];
var count = 0;

function findWinner(val) {
	return function() {
		count++;
		var _thisP = this.children[0]; // get children P element from parent div
		_thisP.innerHTML = val; 
		_thisP.style.visibility = 'visible';
		this.style.pointerEvents = 'none'; 

		check.push({elementP: _thisP, _val: val});

		if(count % 2 === 0){
			check.map((v, i)=>{
				if(JSON.stringify(check[0]) === JSON.stringify(check[1])){ //if two objects' values are the same 
					v.elementP.parentElement.classList.add('pointerEventBg'); //both add bg and none selected event
				}else{
					setTimeout(() => {
						v.elementP.style.visibility = 'hidden';
						v.elementP.parentElement.style.pointerEvents = 'auto'
					}, 300);
				}
			})
			check = [];
		}

		var csrdsList = document.querySelectorAll('.cards');
		var allSelected = document.querySelectorAll('.pointerEventBg');
		// check if all cards coincide
		if(csrdsList.length === allSelected.length){
			win.innerHTML = 'Congrats! You Win!!!';
			setTimeout(() => {
				main.style.display = 'none';
				start.style.display = 'block';
				win.innerHTML = ''
			}, 3000);
		}
	};
}