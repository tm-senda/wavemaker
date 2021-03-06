Social_Facebook.widgets = {
	buttonPushVar: ["wm.Variable", {"type":"NumberData"}, {}, {
		binding: ["wm.Binding", {}, {}, {
			wire: ["wm.Wire", {"expression":"0","source":false,"targetProperty":"dataValue"}, {}]
		}]
	}],
	buttonClickDialog: ["wm.GenericDialog", {"button1Caption":"Close","button1Close":true,"corner":"cr","desktopHeight":"102px","height":"102px","positionNear":"basicButton","userPrompt":"You pushed the button!"}, {}],
	layoutBox1: ["wm.Layout", {"_classes":{"domNode":["MainContent"]},"horizontalAlign":"left","verticalAlign":"top"}, {}, {
		panel9: ["wm.Panel", {"height":"100%","horizontalAlign":"left","verticalAlign":"top","width":"100%"}, {}, {
			panel20: ["wm.Panel", {"height":"50px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"middle","width":"100%"}, {}, {
				label4: ["wm.Label", {"_classes":{"domNode":["DemoHeader"]},"autoSizeWidth":true,"caption":"Button Widget","padding":"4","width":"85px"}, {}, {
					format: ["wm.DataFormatter", {}, {}]
				}]
			}],
			panel1: ["wm.Panel", {"height":"100%","horizontalAlign":"left","layoutKind":"left-to-right","margin":"0,0,0,10","verticalAlign":"top","width":"100%"}, {}, {
				panel7: ["wm.Panel", {"height":"100%","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
					panel14: ["wm.Panel", {"height":"100%","horizontalAlign":"left","minWidth":450,"verticalAlign":"top","width":"100%"}, {}, {
						label14: ["wm.Label", {"_classes":{"domNode":["wm_FontSizePx_16px","wm_BackgroundColor_LightGray"]},"caption":"Try It!","height":"32px","padding":"4","width":"100%"}, {}, {
							format: ["wm.DataFormatter", {}, {}]
						}],
						label16: ["wm.Label", {"caption":"<b>Directions:</b> Click the facebook like button to register that you like this application on facebook.  It will make us feel good too.","height":"41px","padding":"4","singleLine":false,"width":"100%"}, {}, {
							format: ["wm.DataFormatter", {}, {}]
						}],
						panel3: ["wm.Panel", {"height":"100px","horizontalAlign":"left","layoutKind":"left-to-right","padding":"0,0,0,20","verticalAlign":"middle","width":"100%"}, {}, {
							gadgetFacebookLikeButton1: ["wm.gadget.FacebookLikeButton", {"height":"80px","href":"http://widgetexamples.cloudfoundry.com"}, {}]
						}],
						label17: ["wm.Label", {"caption":"<b>Directions:</b> Select a web site to monitor for activity","height":"41px","padding":"4","singleLine":false,"width":"100%"}, {}, {
							format: ["wm.DataFormatter", {}, {}]
						}],
						gadgetFacebookActivityFeed1Panel: ["wm.Panel", {"height":"400px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
							listSet1: ["wm.ListSet", {"caption":"Select site to monitor","captionAlign":"left","captionPosition":"top","captionSize":"28px","dataField":"dataValue","dataValue":["dev.wavemaker.com"],"displayField":"dataValue","displayValue":"dev.wavemaker.com","height":"100%","options":"dev.wavemaker.com,wavemaker.com,developers.facebook.com,http://www.bbcamerica.com/doctor-who/","selectionMode":"single","showSearchBar":false}, {}],
							gadgetFacebookActivityFeed1: ["wm.gadget.FacebookActivityFeed", {"colorscheme":"light","width":"100%"}, {}, {
								binding: ["wm.Binding", {}, {}, {
									wire: ["wm.Wire", {"expression":undefined,"source":"listSet1.dataValue","targetProperty":"site"}, {}]
								}]
							}]
						}]
					}],
					panel17: ["wm.MainContentPanel", {"height":"100%","horizontalAlign":"left","margin":"0,0,0,10","minWidth":280,"verticalAlign":"top","width":"50%"}, {}, {
						fancyPanel2: ["wm.FancyPanel", {"labelHeight":"36","title":"Description"}, {}, {
							panel2: ["wm.EmphasizedContentPanel", {"height":"100%","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
								html2: ["wm.Html", {"height":"100%","html":"<p>WaveMaker ships with a couple of basic Facebook widgets</p>\n<h4>Documentation</h4>\n<ul>\n<li><a href=\"http://dev.wavemaker.com/wiki/bin/wmjsref_6.5/FacebookLikeButton\" target=\" _blank\" =\"\"=\"\">Facebook Like Button</a></li>\n<li><a href=\"http://dev.wavemaker.com/wiki/bin/wmjsref_6.5/FacebookActivityFeed\" target=\" _blank\" =\"\"=\"\">Facebook Activity Feed</a></li>\n</ul>\n","margin":"5","minDesktopHeight":15}, {}]
							}]
						}]
					}]
				}]
			}]
		}]
	}]
}