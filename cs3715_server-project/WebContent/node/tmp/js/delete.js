function deleteItem(item){
	var parent = item.parentNode;
	var thisMap = parent.getElementsByClassName('maps');
	
	for (var i = 0; i < thisMap.length; i++) {
	    thisMap[i].style.display = 'none';
	}
	changeDeleteFlag(parent.id);
	var deletedItem=parent.innerHTML;
	parent.innerHTML="";

	deletedItem = deletedItem.replace('<img src="../img/delete.png" onclick="deleteItem(this);" class="icon" title="Click to delete">','')
	var deletedItemsDiv = document.getElementById("deletedItems");
	deletedItemsDiv.innerHTML += deletedItem;
}