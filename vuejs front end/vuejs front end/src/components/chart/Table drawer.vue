
<template>
  <div>
    <table border="1" cellpadding="3" id="printTable">
	<tbody>
  <tr>
		<th>First Name</th>
		<th>Last Name</th>		
		<th>Points</th>
	</tr>
	<tr>
		<td>Jill</td>
		<td>Smith</td>		
		<td>50</td>
	</tr>
	<tr>
		<td>Eve</td>
		<td>Jackson</td>		
		<td>94</td>
	</tr>
	<tr>
		<td>John</td>
		<td>Doe</td>		
		<td>80</td>
	</tr>
	<tr>
		<td>Adam</td>
		<td>Johnson</td>		
		<td>67</td>
	</tr>
</tbody></table>

<br/>
<br/>

 <button onclick="myFunction()">Print me</button>
  </div>
</template>

<script>
export default {
    mount(){
  function printData()
{
   var divToPrint=document.getElementById("printTable");
   newWin= window.open("");
   newWin.document.write(divToPrint.outerHTML);
   newWin.print();
   newWin.close();
}

function myFunction() {
  var table = document.getElementById("printTable").createCaption();
  table.innerHTML = "<b>My table caption</b>";
  printData()
}
}
}
</script>

<style>

</style>