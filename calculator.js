//function parseAmount(dollar, cent)
//{
//	var amount = 0.00
//	if(cent.value != "")
//	{
//		amount = parseFloat(dollar.value) + parseFloat(cent.value/100)
//		return amount
//	} 
//	
//	amount = parseFloat(dollar.value)
//	return amount
//}

function calcPositionSize()
{
		//Get a reference to the form id="cakeform"
		var theForm = document.forms["form_964382"];
		//Get reference to all values
		var selectedPositionType = theForm.elements["element_5"];
		var formEquity = theForm.elements["element_1_1"];
		var formEquityRisk = theForm.elements["element_6_1"];
		var formEntry = theForm.elements["element_2_1"];
		var formTarget = theForm.elements["element_3_1"];
		var formStop = theForm.elements["element_4_1"];

		// transform input fields to amounts
		var equity = parseFloat(formEquity.value);
		var risk = parseFloat(formEquityRisk.value)/100;
		var entry = parseFloat(formEntry.value);
		var target = parseFloat(formTarget.value);
		var stop = parseFloat(formStop.value);

		if(selectedPositionType.value==1)
		{
			return calcLongPosition(equity, risk, entry, target, stop);
			
		}
		return calcShortPosition(equity, risk, entry, target, stop);
}

function calcLongPosition(equity, risk, entry, target, stop) {
	var priceDR = entry - stop;
	var equityDR = equity * risk;
	var positionSize = equityDR / priceDR;
	var stopCost = (positionSize * entry) - (positionSize * stop);
	var targetGain = (positionSize * target) - (positionSize * entry);
	var rrRatio = targetGain/stopCost;
	
	healthCheck(rrRatio);
	return "|Koop " + roundNumber(positionSize, 8)+ " coins" + " <br><br>  |Als Stop loss geraakt wordt $" + roundNumber(stopCost, 8) + " verlies"  + "<br><br>  |Als target gehaald wordt $" + roundNumber(targetGain,8) + " winst" + "<br><br> |Geeft een Risk to Reward: " + roundNumber(rrRatio,8);
}



function calcShortPosition(equity, risk, entry, target, stop) {
	var priceDR = stop - entry;
	var equityDR = equity * risk;
	var positionSize = equityDR / priceDR;
	var stopCost = (positionSize * stop) - (positionSize * entry);
	var targetGain = (positionSize * entry) - (positionSize * target);
	var rrRatio = targetGain/stopCost;
	
	healthCheck(rrRatio);
	return "|Verkoop " + roundNumber(positionSize, 8) + " coins" + " <br><br> |Als Stop loss geraakt wordt $" + roundNumber(stopCost, 8) + " verlies" + " <br><br> |Als target gehaald wordt $" + roundNumber(targetGain,8) + " winst" + "<br><br> <br>  |Geeft een Risk to Reward: " + roundNumber(rrRatio,8);

}

function healthCheck(rrr) {
	var x = document.querySelector("#footer");
	
		if(rrr <= 1 || !rrr) {
			// reds
			x.style.color = 'black';
			
		} else if(rrr > 1 && rrr <= 1.5) {
			// orange
			x.style.color = 'black';
			
		} else if(rrr > 1.5 && rrr < 3) {
			// yellow
			x.style.color = 'black';
			
		} else {
			// green
			x.style.color = 'black';
			x.style.fontSize = "18px"
		}
}

function roundNumber(number, precision){
    precision = Math.abs(parseInt(precision)) || 0;
    var multiplier = Math.pow(10, precision);
    return (Math.round(number * multiplier) / multiplier);
}

function calcTotal()
{
	var postype = calcPositionSize();
	//display the result
    document.getElementById('footer').innerHTML = postype;
}
