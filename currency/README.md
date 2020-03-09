# Currency 
----  FUNCTIONNALITY ----

The overall functionnality of the algorithm is to convert any amount of money in bitcoin.

----  HOW TO USE THE PROGRAL : BEGINNER'S GUIDE ----

1) install node.js : https://nodejs.org/en/download/
2) Go to you repertory : cd /path/to/3-musketeers/currency
3) install npm  : npm install #or npm yarn
4) use the application by typing : node cli.js #AMOUNT #CURFROM #CURTO

With #AMOUNT being the amount of money you want to convert and #CURFROM/#CURTO a 3 letter code representing the currency code.
If left empty #CURFROM = USD, #AMOUNT = 1 and #CURTO = BTC
If you want to convert to BTC, just mention the currency you want to convert in BTC.
If you want to convert to currencies, mention BTC first then the code associated to your currency.

(Exemple : -node cli.js 100 EUR will display the equivalent in bitcoin of 100EUR
		   -node cli.js 1 BTC USD will display the equivalent in USD of 1BTC )

You can find further informations about currency code here : http://www2.1010data.com/documentationcenter/discover/FunctionReference/DataTypesAndFormats/currencyUnitCodes.html
You can find valid #CURFROM/#CURTO that can be used over here : https://api.exchangeratesapi.io/latest

