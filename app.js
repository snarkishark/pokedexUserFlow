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
	});
	
});

function getRequest(query1,query2){
	//parameters
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

function goToURL(url,name,displayItem){
	$.getJSON(url, function(dataObj){
			listResults(name,displayItem,dataObj);
	});	
//	console.log(data.responseText);	
}

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
		var dataURL = dataSet[index].url;
		getURL(dataURL,abilityName,displayAbility);	
	});
};

function listTypes(data){
	$(".results ul").empty();
	var dataSet = data.results;
	$.each (dataSet, function(index,value){
		var typeName = dataSet[index].name;
		var dataURL = dataSet[index].url;
		goToURL(dataURL,typeName,displayType);
		//listResults(typeName,displayType,data);
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
	}else if (query =="type"){
		var dataSet = data.pokemon;
		$.each(dataSet, function(index,value){
			var pokemon = dataSet[index].pokemon;
			goToURL(pokemon.url,pokemon.name,displayPokemon);
		});
		
	}
};
//This function gets and displays information of a certain region. Takes a parameter "someRegion"
function displayRegion(region){
	getRequest("pokedex",region);//get request to API
};

//This function gets and displays information of a certain Ability. Takes a parameter "someAbility"
function displayAbility(ability){
	var abilitySheet = $(".ability").clone().removeClass("hidden");
	abilitySheet.find(".title").text(ability.name);
	abilitySheet.find(".entry").text(ability.effect_entries[0].effect);
	$(".results ul").empty();
	$(".container").append(abilitySheet);	

};

//This function gets and displays information of a certain type. Takes a parameter "someType"
function displayType(type){
	var pokemon = type.pokemon;
	var typeSheet = $(".ability").clone().removeClass("hidden");
	typeSheet.find(".title").text(type.name);
	listPokemon("type",type);
		
	//$(typeSheet).
	$(".results").append(typeSheet);
	
};

//This function gets and displays information of a certain pokemon. Takes a parameter "somePokemon"
function displayPokemon(pokemon){
	console.log(pokemon);//get request to API
};

function addTitle(title){

};