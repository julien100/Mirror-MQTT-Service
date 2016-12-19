/* global Module */

/* Magic Mirror
 * Module: MMM-MQTT-Service
 *
 * MIT Licensed.
 */

Module.register('MMM-MQTT-Service',{
	defaults: {

	},
	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		console.log(notification);
		console.log(payload);

		if (notification === "MQTT_COMMAND") {
			if (payload.receiver === "VOICE_FOOTBALL") {
				this.sendNotification("VOICE_FOOTBALL" , payload.command);
			} else if (payload.receiver === "MQTT-SERVICE"){
				if (payload.command === "GO_TO_SLEEP") {
					MM.getModules().enumerate(function(module) {
	    				module.hide(1000, function() {
                    	//Module hidden.
                		});
					});
				} else if (payload.command === "WAKE_UP") {
					MM.getModules().enumerate(function(module) {
	    				module.show(1000, function() {
                    	//Module shown.
                		});
                	});
				} else if (payload.command === "HIDE_MODULE") {
					var moduleToHide;
					console.log("Hide Module: " + payload.value);
					if (payload.value === 'NFL') {
						moduleToHide = 'MMM-NFL';
					} else if (payload.value === 'clock') {
						moduleToHide = 'clock';
					} else if (payload.value === 'comic') {
						moduleToHide = 'DailyXKCD';
					}
					MM.getModules().withClass(moduleToHide).enumerate(function(module) {
	    				module.hide(1000, function() {
                    	//Module hidden.
                		});
					});
				} else if (payload.command === "SHOW_MODULE") {
					var moduleToShow;
					console.log("Show Module: " + payload.value);
					if (payload.value === 'NFL') {
						moduleToShow = 'MMM-NFL';
					} else if (payload.value === 'clock') {
						moduleToShow = 'clock';
					} else if (payload.value === 'comic') {
						moduleToShow = 'DailyXKCD';
					}
					MM.getModules().withClass(moduleToShow).enumerate(function(module) {
	    				module.show(1000, function() {
                    	//Module shown.
                		});
					});
				}
			} else if (payload.receiver === "PODCAST") {
				console.log("podcast is receiver");
				if (payload.command === "START_PODCAST") {
					console.log("start podcast");
					this.sendNotification("PODCAST", payload.command);
				}
			}

		}
	},
	start: function() {
		this.sendSocketNotification('BUTTON_CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	},
	notificationReceived: function() {
		if (notification === "ALL_MODULES_STARTED") {
			console.log("debug");
			MM.getModules().enumerate(function(module) {
					console.log(module);
					// module.hide(1000, function() {
					// 				//Module shown.
					// 			});
			});
		}
	}
});
