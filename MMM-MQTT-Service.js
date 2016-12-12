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
		if (notification === "MQTT_COMMAND") {
			this.sendNotification("VOICE_FOOTBALL" + payload);
		}
		console.log(notification);
		console.log(payload);
	},
	start: function() {
		this.sendSocketNotification('BUTTON_CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	}
});
