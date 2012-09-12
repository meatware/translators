{
	"translatorID": "f318ab1e-71c6-4f67-8ac3-4b1144e5bf4e",
	"label": "APS-Physics",
	"creator": "Will Shanks",
	"target": "^https?://(?:www\\.)?(physics)\\.aps\\.org[^/]*/(articles)/?",
	"minVersion": "1.0.0b3.r1",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcs",
	"lastUpdated": "2012-09-12 12:32:50"
}

// Works for APS Physics Viewpoints and Focus articles: http://physics.aps.org/

function detectWeb(doc, url) {
	return "journalArticle";
}

function doWeb(doc, url) {
	
	Zotero.debug(doc.title);
	
	//Get abstract (called 'byline' on page)
	var abs = ZU.xpathText(doc, '//article/header/p[contains(@class, "byline")]');
	
	//Check if page is a Viewpoint.  Only Viewpoints have PDFs
	var title = ZU.xpathText(doc, '//article/header/h1[contains(@class, "title")]');
	var hasPDF = (title.indexOf('Viewpoint:') != -1);
	
	//Get DOI
	var doi = ZU.xpathText(doc, '//article/header/div[contains(@class, "pubinfo")]/abbr[contains(@class, "doi")]/@title');
	
	//Set up urls
	var pdfurl = 'http://physics.aps.org/articles/pdf/' + doi;
	var urlRIS = 'http://physics.aps.org/articles/export/' + doi + '/ris';
	
	Zotero.Utilities.HTTP.doGet(urlRIS, function(text) {
		//DOI is stored in ID field. Fix it.
		text = text.replace(/^ID\s\s?-\s/mg, 'DO  - ');
		// load translator for RIS
		var translator = Zotero.loadTranslator("import");
		translator.setTranslator("32d59d2d-b65a-4da4-b0a3-bdd3cfb979e7");
		translator.setString(text);
		translator.setHandler("itemDone", function(obj, item) {
			item.attachments = [
				{document:doc, title:"APS Snapshot"}];
			if (hasPDF) {
				item.attachments.push({url:pdfurl, title:"APS Full Text PDF", mimeType:"application/pdf"});
			}
			
			if (abs) item.abstractNote = abs;
			item.complete();
		});
		translator.translate();
	}, null, 'UTF-8');
}/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "http://physics.aps.org/articles/v5/100",
		"items": [
			{
				"itemType": "journalArticle",
				"creators": [
					{
						"lastName": "de Beer",
						"firstName": "Sissi",
						"creatorType": "author"
					},
					{
						"lastName": "Müser",
						"firstName": "Martin H.",
						"creatorType": "author"
					}
				],
				"notes": [],
				"tags": [],
				"seeAlso": [],
				"attachments": [
					{
						"title": "APS Snapshot"
					},
					{
						"title": "APS Full Text PDF",
						"mimeType": "application/pdf"
					}
				],
				"publisher": "American Physical Society",
				"DOI": "10.1103/Physics.5.100",
				"title": "Surface Folds Make Tears and Chips",
				"publicationTitle": "Physics",
				"journalAbbreviation": "Physics",
				"volume": "5",
				"pages": "100",
				"date": "September 4, 2012",
				"url": "http://link.aps.org/doi/10.1103/Physics.5.100",
				"abstractNote": "Fluidlike folding instabilities of solid surfaces complicate the machining of metals to perfection",
				"libraryCatalog": "APS-Physics",
				"accessDate": "CURRENT_TIMESTAMP"
			}
		]
	},
	{
		"type": "web",
		"url": "http://physics.aps.org/articles/v5/101",
		"items": [
			{
				"itemType": "journalArticle",
				"creators": [
					{
						"lastName": "Schirber",
						"firstName": "Michael",
						"creatorType": "author"
					}
				],
				"notes": [],
				"tags": [],
				"seeAlso": [],
				"attachments": [
					{
						"title": "APS Snapshot"
					}
				],
				"publisher": "American Physical Society",
				"DOI": "10.1103/Physics.5.101",
				"title": "Measuring the Smallest Trickle",
				"publicationTitle": "Physics",
				"journalAbbreviation": "Physics",
				"volume": "5",
				"pages": "101",
				"date": "September 10, 2012",
				"url": "http://link.aps.org/doi/10.1103/Physics.5.101",
				"abstractNote": "Researchers used a nanoscale tunnel in a silicon chip to measure a flow rate of a few picoliters per minute, which is smaller than any previous observation.",
				"libraryCatalog": "APS-Physics",
				"accessDate": "CURRENT_TIMESTAMP"
			}
		]
	}
]
/** END TEST CASES **/