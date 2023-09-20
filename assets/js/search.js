const btnSearch = document.getElementById('btn-search')

btnSearch.addEventListener('click', () => searchPokemon())

function searchPokemon() {
	let nameNumber = document.getElementById('input-search').value.toLowerCase()
	
	openDetails(nameNumber)
}
		

document.addEventListener("keypress", function(e) {
	if(e.key === 'Enter') {
			
	var btn = document.querySelector("#btn-search");
			  
	 btn.click();
			
	}
});