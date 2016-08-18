$(function(){
		// $("div").addClass("hidden");
	$(".home").removeClass("hidden");
	$.each($(".button"), function(i, val){
		var i=1;
		var val = $(".button").length;
		var button = this;
		var toShow ="."+$(button).attr('class').split(" ")[1];
		$(button).on('click', function(e){
			// $("div").addClass("hidden");
			$(".results ul").empty();
			$(toShow).removeClass("hidden");
		});
		i+=1;
	});
	$(".kanto").on('click',function(e){
		getRequest("region","");
	});
	$(".abilities").on('click',function(e){
		getRequest("ability","");
	});
	$(".types").on('click',function(e){
		getRequest("type","");
	})
	
});

function getRequest(query1,query2){
	var query1 = query1;
	var query2 = query2;
	url = 'http://pokeapi.co/api/v2/'+query1+"/"+query2;

	$.getJSON(url, function(data){
		if (query1 == "region"){
			listRegions(data);
		}else if (query1=="pokedex"){
			listPokemon(query1, data);
		}else if (query1=="ability"){
			listAbilities(data);
		}else if (query1 == "type"){
			listTypes(data);
		}

		});
};


//insert results into the DOM and add event listeners to list items
function listResults(item, displayItem,data){
	$(".results ul").append("<li>"+item+"</li>");
	$(".results ul li").last().addClass("linky").on('click',function(e){
		displayItem(data);
	});
};

function listRegions(data){
	$(".results ul").empty();
	var dataSet = data.results;
	$.each (dataSet, function(index,value){
		var regionName = dataSet[index].name;
		listResults(regionName,displayRegion,dataSet);
	});//api call for regions
};
function listAbilities(data){
	$(".results ul").empty();
	var dataSet = data.results;
	$.each (dataSet, function(index,value){
		var abilityName = dataSet[index].name;
		listResults(abilityName,displayAbility,dataSet[index]);
	});//api call for abilities
};

function listTypes(data){
	$(".results ul").empty();
	var dataSet = data.results;
	$.each (dataSet, function(index,value){
		var typeName = dataSet[index].name;
		listResults(typeName,displayType);
	})
};
function listPokemon(query, data){
	$(".results ul").empty();
	if (query == "pokedex"){
		var dataSet = data.pokemon_entries; //notaion for pokedex api
		$.each (dataSet, function(index,value){
			var pokemonName = dataSet[index].pokemon_species.name; //notaion for pokedex api
			listResults(pokemonName,displayPokemon);
		});

	}else if (query == "ability"){
		var dataSet = data.pokemon;
		console.log(dataSet);
	}else if (query =="type"){

	}
};
//This function gets and displays information of a certain region. Takes a parameter "someRegion"
function displayRegion(region){
	getRequest("pokedex",region);//get request to API
};

//This function gets and displays information of a certain Ability. Takes a parameter "someAbility"
function displayAbility(data){
	$(".results ul").empty();
	console.log(data);
	$(".results").append(
		addTitle(data.name);
		);
};

//This function gets and displays information of a certain type. Takes a parameter "someType"
function displayType(type){
	console.log(type);//get request to API
};

//This function gets and displays information of a certain pokemon. Takes a parameter "somePokemon"
function displayPokemon(pokemon){
	console.log(pokemon);//get request to API
};

function addTitle(title){

};